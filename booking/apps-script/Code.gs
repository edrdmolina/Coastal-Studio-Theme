/**
 * Coastal Film Lab appointment booking: Google Apps Script web app.
 *
 * Not theme code. Shopify's GitHub sync ignores this folder; the owner pastes
 * this file into an Apps Script project and deploys it as a web app. Setup:
 * booking/README.md.
 *
 * doGet  - the product page's appointment picker asks for busy times on one
 *          calendar. Only start/end times go back, never titles or guests.
 * doPost - Shopify Flow ("Order paid") sends the paid order. Each line item
 *          carrying an _appointment_start property becomes a calendar event,
 *          with the customer invited.
 *
 * Script properties (Project Settings -> Script properties):
 *   FLOW_TOKEN          Required. Shared secret Flow sends with every order.
 *                       Run setup() once to create it.
 *   OWNER_EMAIL         Optional. Who gets double-booking and error emails.
 *                       Defaults to the account that deployed the script.
 *   EXTRA_CALENDAR_IDS  Optional. Comma-separated calendars this account can
 *                       edit but doesn't own (a calendar a coworker shared).
 *                       Calendars this account owns work without listing.
 */

// The bit after /store/ in admin.shopify.com links to this shop.
var ADMIN_STORE_HANDLE = 'd61956-2';
var BUSY_CACHE_SECONDS = 120;
var MAX_RANGE_DAYS = 100;
var DOUBLE_BOOKED_PREFIX = '⚠ DOUBLE-BOOKED – ';

/* ---------- Availability (called by the product page) ---------- */

function doGet(e) {
  var params = (e && e.parameter) || {};
  try {
    var calendarId = String(params.calendar || '').trim();
    var start = new Date(params.start);
    var end = new Date(params.end);
    if (!calendarId || isNaN(start) || isNaN(end) || end <= start) {
      return json_({ ok: false, error: 'bad_request' });
    }
    if (end - start > MAX_RANGE_DAYS * 86400000) {
      return json_({ ok: false, error: 'range_too_long' });
    }

    var cache = CacheService.getScriptCache();
    var cacheKey = 'busy:' + hash_(calendarId + '|' + start.toISOString() + '|' + end.toISOString());
    var cached = cache.get(cacheKey);
    if (cached) return json_(JSON.parse(cached));

    var calendar = allowedCalendar_(calendarId);
    if (!calendar) return json_({ ok: false, error: 'calendar_not_allowed' });

    var busy = calendar
      .getEvents(start, end)
      .filter(blocksTime_)
      .map(function (event) {
        return [event.getStartTime().getTime(), event.getEndTime().getTime()];
      });
    var result = { ok: true, busy: busy };
    cache.put(cacheKey, JSON.stringify(result), BUSY_CACHE_SECONDS);
    return json_(result);
  } catch (error) {
    console.error(error);
    return json_({ ok: false, error: 'server_error' });
  }
}

/* ---------- Paid orders (called by Shopify Flow) ---------- */

function doPost(e) {
  var order;
  try {
    order = JSON.parse(e.postData.contents);
  } catch (error) {
    return json_({ ok: false, error: 'bad_json' });
  }

  var token = PropertiesService.getScriptProperties().getProperty('FLOW_TOKEN');
  if (!token || order.token !== token) {
    console.warn('Rejected a POST with a missing or wrong token');
    return json_({ ok: false, error: 'unauthorized' });
  }

  // One order at a time, so a Flow retry can't race the first attempt.
  var lock = LockService.getScriptLock();
  lock.waitLock(25000);
  try {
    var results = (order.lineItems || []).filter(Boolean).map(function (lineItem) {
      try {
        return bookLineItem_(order, lineItem);
      } catch (error) {
        console.error(error);
        notifyOwner_(
          'Booking not added to calendar: order ' + order.orderName,
          'The appointment on order ' + order.orderName + ' could not be added to Google Calendar.\n\n' +
            'Error: ' + error + '\n\nOrder: ' + adminOrderUrl_(order) + '\n\nPlease add it by hand.'
        );
        return { lineItem: lineItem.id, error: String(error) };
      }
    });
    return json_({ ok: true, results: results });
  } finally {
    lock.releaseLock();
  }
}

function bookLineItem_(order, lineItem) {
  var attributes = {};
  (lineItem.attributes || []).filter(Boolean).forEach(function (attribute) {
    attributes[attribute.key] = attribute.value;
  });
  if (!attributes._appointment_start) return { lineItem: lineItem.id, skipped: 'not_a_booking' };

  var start = new Date(attributes._appointment_start);
  var end = new Date(attributes._appointment_end || NaN);
  if (isNaN(start)) throw new Error('Unreadable appointment time: ' + attributes._appointment_start);
  if (isNaN(end) || end <= start) end = new Date(start.getTime() + 30 * 60000);

  // Missing or unknown calendar: fall back to this account's main calendar
  // rather than lose a paid booking.
  var calendarNote = '';
  var calendar = attributes._calendar_id ? allowedCalendar_(attributes._calendar_id) : null;
  if (!calendar) {
    calendar = CalendarApp.getDefaultCalendar();
    if (attributes._calendar_id) {
      calendarNote = '\n\nNote: the booking named calendar "' + attributes._calendar_id +
        '", which this script may not use, so it went on the main calendar.';
    }
  }

  // Idempotent per order + line item: Flow retries and re-runs don't duplicate.
  var key = order.orderId + ':' + lineItem.id;
  var properties = PropertiesService.getScriptProperties();
  if (properties.getProperty('done:' + key)) return { lineItem: lineItem.id, skipped: 'already_added' };

  var overlapping = calendar.getEvents(start, end);
  var existing = overlapping.filter(function (event) {
    return event.getTag('shopifyKey') === key;
  })[0];
  if (existing) {
    properties.setProperty('done:' + key, existing.getId());
    return { lineItem: lineItem.id, skipped: 'already_added' };
  }
  var clashes = overlapping.filter(blocksTime_);

  var customer = order.customerName || order.billingName || order.email || 'Customer';
  var phone = order.phone || order.billingPhone || order.shippingPhone || '';
  var service = lineItem.title + (lineItem.variantTitle ? ' (' + lineItem.variantTitle + ')' : '');
  var title = [lineItem.title, customer, order.orderName].filter(Boolean).join(' – ');
  if (clashes.length) title = DOUBLE_BOOKED_PREFIX + title;

  var description = [
    'Shopify order ' + order.orderName + ' (paid)',
    'Order: ' + adminOrderUrl_(order),
    'Service: ' + service,
    'Customer: ' + customer,
    'Email: ' + (order.email || '—'),
    'Phone: ' + (phone || '—'),
    'Booked for: ' + (attributes.Appointment || start.toString()),
  ];
  if (Number(lineItem.quantity) > 1) description.push('Quantity: ' + lineItem.quantity + ' (check with the customer)');
  if (clashes.length) {
    description.push('', 'DOUBLE-BOOKED with: ' + clashes.map(function (event) { return event.getTitle(); }).join('; '));
  }

  var options = { description: description.join('\n') + calendarNote };
  if (isEmail_(order.email)) {
    options.guests = order.email;
    options.sendInvites = true;
  }
  var event = calendar.createEvent(title, start, end, options);
  event.setTag('shopifyKey', key);
  event.setTag('shopifyOrder', String(order.orderId));
  properties.setProperty('done:' + key, event.getId());

  if (clashes.length) {
    notifyOwner_(
      'Double booking: ' + order.orderName + ' at ' + (attributes.Appointment || start),
      'Order ' + order.orderName + ' (' + customer + ') was paid for a time that is already taken:\n\n' +
        (attributes.Appointment || start) + '\n\nAlready on the calendar: ' +
        clashes.map(function (e) { return e.getTitle(); }).join('; ') +
        '\n\nThe new event is marked "DOUBLE-BOOKED". Please contact the customer to move it.\n\n' +
        'Order: ' + adminOrderUrl_(order) + '\nEmail: ' + (order.email || '—') + '\nPhone: ' + (phone || '—')
    );
  }
  return { lineItem: lineItem.id, created: event.getId(), doubleBooked: clashes.length > 0 };
}

/* ---------- One-time setup (run by hand from the editor) ---------- */

/**
 * Run once: asks for Calendar and Gmail permission, creates FLOW_TOKEN if it
 * doesn't exist, and prints it under Execution log for pasting into Flow.
 */
function setup() {
  var properties = PropertiesService.getScriptProperties();
  var token = properties.getProperty('FLOW_TOKEN');
  if (!token) {
    token = Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '');
    properties.setProperty('FLOW_TOKEN', token);
  }
  var owned = CalendarApp.getAllOwnedCalendars().map(function (calendar) {
    return calendar.getName() + ': ' + calendar.getId();
  });
  MailApp.getRemainingDailyQuota();
  console.log('FLOW_TOKEN (paste into the Flow secret): ' + token);
  console.log('Calendars this account owns (paste one ID into the theme editor):\n' + owned.join('\n'));
}

/* ---------- Helpers ---------- */

// Only calendars this account owns, or ones listed in EXTRA_CALENDAR_IDS, so
// the web app can't be used to look at anybody else's calendar.
function allowedCalendar_(calendarId) {
  var calendar = CalendarApp.getCalendarById(calendarId);
  if (!calendar) return null;
  if (calendar.isOwnedByMe()) return calendar;
  var extra = (PropertiesService.getScriptProperties().getProperty('EXTRA_CALENDAR_IDS') || '')
    .split(',')
    .map(function (id) { return id.trim(); });
  return extra.indexOf(calendarId) !== -1 ? calendar : null;
}

// Events marked "Free", or ones this account declined, don't block a slot.
// All-day events do, so an all-day "Closed" event closes the day.
function blocksTime_(event) {
  if (event.getMyStatus && event.getMyStatus() === CalendarApp.GuestStatus.NO) return false;
  if (event.getTransparency && event.getTransparency() === CalendarApp.EventTransparency.TRANSPARENT) return false;
  return true;
}

function notifyOwner_(subject, body) {
  var to = PropertiesService.getScriptProperties().getProperty('OWNER_EMAIL') ||
    Session.getEffectiveUser().getEmail();
  MailApp.sendEmail(to, subject, body);
}

function adminOrderUrl_(order) {
  return 'https://admin.shopify.com/store/' + ADMIN_STORE_HANDLE + '/orders/' + order.orderId;
}

function isEmail_(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function hash_(text) {
  return Utilities.base64EncodeWebSafe(
    Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, text, Utilities.Charset.UTF_8)
  );
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
