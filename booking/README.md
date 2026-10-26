<!-- markdownlint-disable MD013 MD029 -->

# Appointment booking (replacing BookEasy)

This folder isn't theme code. Shopify's GitHub sync ignores folders that aren't part of a theme, so nothing here reaches the store. It holds the small Google script that links bookings to Google Calendar, plus this guide.

## How it works

1. On a service's product page (Take-5, for example) the customer picks a **day**, then a **time**, then clicks **Add to cart** and pays at the normal Shopify checkout. There are no pop-ups and no Google screens.
2. The chosen time is saved on the cart line, so it shows in the cart, at checkout, on the order and in the order emails as **Appointment: Thu, Oct 29, 2026 at 11:30 AM**.
3. The picker hides times that are already busy on your Google Calendar. It asks the Google script for busy times only, never event names or guests.
4. **Nothing goes on the calendar until the order is paid.** When it's paid, a Shopify Flow workflow sends the order to the Google script, which:
   - creates the event, e.g. "Take-5 Repair Service – Jane Doe – #1234", with the order link, email and phone in the description
   - invites the customer, so they get a Google Calendar invite
   - never creates the same event twice, even if Flow sends the order again
5. If two people pay for the same time (both picked it before either paid), the second event is still created, but its title starts with **⚠ DOUBLE-BOOKED** and you get an email so you can move one of them.
6. If the Google script can't be reached, the picker still offers times from your booking hours and tells the customer it couldn't check live availability. Sales don't stop, and any clash is caught by step 5.

## What you change in the theme editor

**Online Store → Themes → Customize → Products → Default product** (or the template the service uses), then click the **Appointment picker** block.

| Setting | What it does |
| --- | --- |
| Products that use this picker | The picker only appears on these products. Everything else on the template is unchanged. |
| Heading / Note under the picker | Customer-facing text. The note defaults to "Your appointment is confirmed once your order is paid." |
| Monday opens … Sunday closes | Booking hours for each day. Pick **Closed** for days off. |
| Appointment length | How long each booking lasts. Start times are this far apart. |
| Break between appointments | Gap kept clear before and after each booking. |
| How far ahead customers can book (days) | Days shown in the day strip. |
| Minimum notice | Hides times that start sooner than this. |
| Calendar ID | Which Google Calendar is checked and written to. |

Services with different hours or lengths get their own block: click **Add block → Appointment picker** and choose different products. If a product is in two blocks, the first one wins.

**Theme settings (gear icon) → Appointment booking** holds two things that are set once: the **Apps Script web app URL** and the **Store time zone** (America/New_York).

To close a single day (a holiday, a staff day out), add an **all-day event** to the booking calendar. All-day events block the whole day. Events marked "Free" in Google Calendar don't block anything.

While the picker is on for a product, that product's quantity box and "Buy it now" button are hidden (one booking per cart line), and the BookEasy widget doesn't attach to it.

## One-time setup

Allow about 30 minutes. Do it signed in to the Google account that owns the booking calendar.

### 1. Choose the calendar and copy its ID

1. Open [Google Calendar](https://calendar.google.com) → gear icon → **Settings**.
2. On the left, under **Settings for my calendars**, click the calendar to use. Your main calendar is fine, or create a new one first (**Other calendars → + → Create new calendar**, e.g. "Coastal bookings") if you'd like to keep bookings separate.
3. Scroll to **Integrate calendar** and copy the **Calendar ID**. Your main calendar's ID is your email address; others look like `abc123…@group.calendar.google.com`.

The script only works with calendars **this account owns**, so nobody can use it to look at anyone else's calendar.

### 2. Create the Google script

1. Go to [script.google.com](https://script.google.com) → **New project**.
2. Click "Untitled project" at the top and name it **Coastal booking**.
3. Delete everything in `Code.gs`, then paste in the whole of [`apps-script/Code.gs`](apps-script/Code.gs) from this folder. Click **Save** (disk icon).
4. In the toolbar's function menu pick **setup**, then click **Run**.
5. Google asks for permission: **Review permissions** → choose your account → **Advanced** → **Go to Coastal booking (unsafe)** → **Allow**. ("Unsafe" only means Google hasn't reviewed a script you wrote yourself.) It needs your calendar, to read busy times and add bookings, and email, to send you double-booking alerts.
6. The **Execution log** at the bottom shows two things. Keep the tab open; you'll need them:
   - `FLOW_TOKEN …` is a long password that Flow sends so only your store can add bookings.
   - A list of your calendars and their IDs.

### 3. Deploy it as a web app

1. Click **Deploy → New deployment**.
2. Click the gear next to "Select type" → **Web app**.
3. Description: `v1`. **Execute as: Me**. **Who has access: Anyone**. (Anyone means the website can ask it for busy times. It never returns event details, and adding events needs the token.)
4. Click **Deploy** and copy the **Web app URL**. It ends in `/exec`.

If "Anyone" isn't in the list, your Google Workspace admin settings block public web apps. Ask whoever manages the Workspace to allow it, or use a personal Google account that owns the calendar.

**Quick check:** paste this into a browser, with your URL and calendar ID in place of the capitals (an `@` in the ID can stay as it is):

```text
YOUR_WEB_APP_URL?calendar=YOUR_CALENDAR_ID&start=2026-11-01T00:00:00Z&end=2026-11-08T00:00:00Z
```

You should see something like `{"ok":true,"busy":[[1793…,1793…]]}`. `calendar_not_allowed` means the account doesn't own that calendar.

### 4. Connect the theme

1. **Online Store → Themes →** the theme → **Customize**.
2. Gear icon (**Theme settings**) → **Appointment booking** → paste the Web app URL → **Save**.
3. Open a Take-5 product page in the editor (Products → Default product, then pick Take-5 Repair Service in the preview's product menu) → click **Appointment picker** → paste the **Calendar ID** → check the hours → **Save**.

### 5. Create the Shopify Flow workflow

1. In Shopify admin, open **Apps → Flow** (install **Shopify Flow** from the App Store if it isn't there; it's free).
2. **Create workflow**.
3. **Select a trigger** → search **Order paid** → select it.
4. Click **+** under the trigger → **Condition**. Build: **Order → Line items → Custom attributes → Key** · **is equal to** · `_appointment_start`. Where Flow asks how to match the lists, choose **At least one of** for both Line items and Custom attributes.
5. Under **Then** → **Action** → search **Send HTTP request**. Fill in:
   - **HTTP method:** POST
   - **URL:** your Web app URL (`…/exec`)
   - **Headers:** key `Content-Type`, value `application/json`
   - **Body:** paste the block below exactly. Then replace `{{secrets.booking_token}}` using **Add secret**: create a secret with handle `booking_token` and the `FLOW_TOKEN` value from step 2 as its value. Flow hides secrets from its run logs. If your Flow has no **Add secret** option, paste the token itself between the quotes instead.

```liquid
{
  "token": "{{secrets.booking_token}}",
  "orderId": "{{order.legacyResourceId}}",
  "orderName": {{order.name | json}},
  "email": {{order.email | json}},
  "phone": {{order.phone | json}},
  "billingPhone": {{order.billingAddress.phone | json}},
  "shippingPhone": {{order.shippingAddress.phone | json}},
  "customerName": {{order.customer.displayName | json}},
  "billingName": {{order.billingAddress.name | json}},
  "lineItems": [
    {% for li in order.lineItems %}{% for ca in li.customAttributes %}{% if ca.key == "_appointment_start" %}
    {
      "id": {{li.id | json}},
      "title": {{li.title | json}},
      "variantTitle": {{li.variantTitle | json}},
      "quantity": {{li.quantity}},
      "attributes": [
        {% for a in li.customAttributes %}{"key": {{a.key | json}}, "value": {{a.value | json}}},{% endfor %}
        null
      ]
    },
    {% endif %}{% endfor %}{% endfor %}
    null
  ]
}
```

   The trailing `null`s are deliberate. They keep the JSON valid after the loops' last comma, and the script ignores them.

6. Response handling: leave the defaults (retry on 5XX and 429). Google answers with a redirect, which Flow counts as success.
7. Name the workflow **Add paid bookings to Google Calendar** → **Turn on workflow**.

Variable names (`order.lineItems`, `customAttributes` with `key`/`value`, `legacyResourceId`, `| json`) are taken from Shopify's Flow docs. Flow checks every variable when you save, so a red error at that point means a name needs fixing. Tell the developer which one.

### 6. Let Take-5 go through without BookEasy

The BookEasy app embed (still on, site-wide) **removes from the cart any BookEasy service that wasn't booked through BookEasy**. Take-5 is a BookEasy service, so a Take-5 added with the new picker disappears from the cart until BookEasy stops treating it as one. In the BookEasy app, either:

- **remove Take-5 from BookEasy's services** (recommended, at the moment you switch over), or
- turn on BookEasy's option that makes booking optional for Take-5.

Either change affects the live store straight away: until the new theme is published, live Take-5 customers could add to cart without picking a time. So do this right before the test booking, and publish soon after.

### 7. Do a test booking

1. Open the dev theme preview: <https://www.coastalfilmlab.com/products/quickie?preview_theme_id=156880306230>.
2. Pick a day and time. Add to cart stays greyed out until you do.
3. Add to cart. The cart should show **Appointment: …** under Take-5.
4. Check out. A cheap way is a one-use 100% discount code for Take-5 (a $0 order still counts as paid), or pay $30 and refund it.
5. Within a minute or two, check:
   - the booking calendar has "Take-5 Repair Service – your name – #order"
   - the customer email got a Google Calendar invite
   - the order in Shopify shows the Appointment line
   - Flow → the workflow → **Recent runs** shows a successful run
6. Reload the product page: the time you booked no longer appears (allow up to 2 minutes, as busy times are cached briefly).
7. Optional: book the same time again to see the ⚠ DOUBLE-BOOKED event and the email. Delete both test events afterwards.

### 8. Go live, then switch off BookEasy

1. Once the test works, have the developer merge `dev` into `master`, which publishes it on the live theme.
2. Take-5 now books through the picker. The other services (photo class, color profile, studio, 8x10, camera training) are still on BookEasy.
3. Move each remaining service over the same way: add it to an Appointment picker block (or add a new block with its own hours and length), remove it from BookEasy, and test.
4. When nothing is left on BookEasy: **Customize → App embeds → BookEasy → off → Save**, then uninstall BookEasy from **Settings → Apps**. That also removes the two reCAPTCHA copies and the widget script BookEasy loads on every page (see `PERFORMANCE-TODO.md`).

Studio products use the **book-studio** product template. Add an Appointment picker block to that template when you move them.

## Changing the script later

Paste the new code, **Save**, then **Deploy → Manage deployments** → pencil icon → **Version: New version** → **Deploy**. The URL stays the same, so the theme and Flow need no changes.

Optional script properties (**Project Settings → Script properties**):

- `OWNER_EMAIL`: where double-booking and error emails go (default: the script's account)
- `EXTRA_CALENDAR_IDS`: comma-separated calendars this account can edit but doesn't own

## If something's wrong

| What you see | Likely cause |
| --- | --- |
| Picker says it "couldn't check live availability" | Theme setting URL is blank or wrong; deployment access isn't **Anyone**; or the Calendar ID isn't owned by the script's account. Try the Quick check URL. |
| Take-5 vanishes from the cart | BookEasy still lists Take-5 (step 6). |
| Paid, but no calendar event | Flow → Recent runs for errors; Apps Script → **Executions** for script errors. A wrong token shows as "Rejected a POST" there. If an event can't be created, the script emails you the order to add by hand. |
| Event on your main calendar instead of the booking one | The block's Calendar ID was blank when the customer booked, or names a calendar this account doesn't own. |

## Things it doesn't do (yet)

- **Cancellations and refunds** don't remove the calendar event. Delete it by hand.
- **One length per block.** A product whose variants are different lengths (One-On-One Camera Training: 15 / 30 / 60 min) books every variant at the block's length. Give each length its own product, or ask for variant-based lengths.
- **No hold before payment.** Two customers can pay for the same time. The second is flagged and emailed (step 5 of "How it works").
- A customer who leaves a time in their cart for days can still check out after it's passed. The event is created, so you'll see it and can get in touch.
