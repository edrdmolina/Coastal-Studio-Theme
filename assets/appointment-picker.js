/*
  Appointment picker for bookable services. See snippets/appointment-picker.liquid
  for the overall flow. No dependencies; loaded only on products that use it.

  Times are worked out in the shop's time zone (from theme settings) with Intl,
  so a visitor whose device is set to another zone still books shop-local times.
*/
if (!customElements.get('appointment-picker')) {
  const LOCALE = 'en-US';
  const FETCH_TIMEOUT_MS = 8000;
  const FALLBACK_MESSAGE =
    "We couldn't check live availability, so a time you pick may already be taken. If it is, we'll be in touch to find another.";

  const pad = (n) => String(n).padStart(2, '0');
  const toMinutes = (hhmm) => {
    const match = /^(\d{1,2}):(\d{2})$/.exec(hhmm || '');
    return match ? Number(match[1]) * 60 + Number(match[2]) : null;
  };

  // Wall-clock helpers for one IANA zone.
  function zoneTools(timeZone) {
    const partsFormat = new Intl.DateTimeFormat(LOCALE, {
      timeZone,
      hourCycle: 'h23',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
    const dayFormat = new Intl.DateTimeFormat(LOCALE, { timeZone, weekday: 'short', month: 'short', day: 'numeric' });
    const longDayFormat = new Intl.DateTimeFormat(LOCALE, { timeZone, weekday: 'long', month: 'long', day: 'numeric' });
    const fullDayFormat = new Intl.DateTimeFormat(LOCALE, {
      timeZone,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const timeFormat = new Intl.DateTimeFormat(LOCALE, { timeZone, hour: 'numeric', minute: '2-digit' });

    const parts = (ms) => {
      const out = {};
      for (const part of partsFormat.formatToParts(ms)) {
        if (part.type !== 'literal') out[part.type] = Number(part.value);
      }
      if (out.hour === 24) out.hour = 0; // older Safari
      return out;
    };
    // Minutes the zone is ahead of UTC at instant `ms` (New York: -240 or -300).
    const offset = (ms) => {
      const p = parts(ms);
      const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
      return Math.round((asUtc - Math.floor(ms / 1000) * 1000) / 60000);
    };
    // Instant for a wall-clock time in the zone; second pass settles DST days.
    const instant = (y, m, d, minutes) => {
      const guess = Date.UTC(y, m - 1, d, 0, minutes);
      const first = guess - offset(guess) * 60000;
      return guess - offset(first) * 60000;
    };
    const iso = (ms) => {
      const off = offset(ms);
      const sign = off < 0 ? '-' : '+';
      const abs = Math.abs(off);
      const local = new Date(ms + off * 60000).toISOString().slice(0, 19);
      return `${local}${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`;
    };

    return { parts, instant, iso, dayFormat, longDayFormat, fullDayFormat, timeFormat };
  }

  customElements.define(
    'appointment-picker',
    class AppointmentPicker extends HTMLElement {
      connectedCallback() {
        if (this.initialized) return;
        this.initialized = true;

        try {
          this.config = JSON.parse(this.querySelector('[data-appointment-config]').textContent);
          this.zone = zoneTools(this.config.timezone);
        } catch (error) {
          console.error('Appointment picker: bad config', error);
          return;
        }

        this.daysEl = this.querySelector('[data-days]');
        this.slotsEl = this.querySelector('[data-slots]');
        this.summaryEl = this.querySelector('[data-summary]');
        this.messageEl = this.querySelector('[data-message]');
        this.inputs = {};
        this.querySelectorAll('[data-prop]').forEach((input) => (this.inputs[input.dataset.prop] = input));
        this.form = document.getElementById(this.dataset.formId);

        this.status = 'loading';
        this.selectedDay = null;
        this.selectedSlot = null;
        this.busy = [];
        this.minutes = this.minutesForVariant();
        this.days = this.buildDays();

        this.renderDays();
        this.selectDay(this.days[0] || null);
        this.lockButton();
        this.guardForm();
        this.watchVariant();
        this.whenNearViewport(() => this.loadAvailability());
      }

      // Length for the chosen option, from "Lengths by product or option".
      minutesForVariant() {
        const { variantMinutes, slotMinutes } = this.config;
        const variantInput = this.form && this.form.querySelector('[name="id"]');
        const minutes = variantInput && variantMinutes ? variantMinutes[variantInput.value] : null;
        return Number(minutes) || Number(slotMinutes) || 30;
      }

      // Options with different lengths offer different times, so rebuild the
      // day strip when the option changes. The theme fires change on the
      // form's variant input.
      watchVariant() {
        if (!this.form) return;
        this.form.addEventListener('change', (event) => {
          if (event.target.name !== 'id') return;
          const minutes = this.minutesForVariant();
          if (minutes === this.minutes) return;
          this.minutes = minutes;
          this.selectSlot(null);
          this.days = this.buildDays();
          if (this.status === 'loading') {
            this.renderDays();
            this.selectDay(this.days[0] || null);
          } else {
            this.applyBusy();
            this.setStatus(this.status);
          }
        });
      }

      // Every open slot in the booking window, from the block's hours alone.
      buildDays() {
        const { hours, startEvery, bufferMinutes, daysAhead, noticeHours } = this.config;
        const slot = this.minutes;
        const step = Number(startEvery) || slot + (Number(bufferMinutes) || 0);
        const earliest = Date.now() + (Number(noticeHours) || 0) * 3600000;
        const today = this.zone.parts(Date.now());
        const days = [];

        for (let i = 0; i < (Number(daysAhead) || 21); i++) {
          const date = new Date(Date.UTC(today.year, today.month - 1, today.day + i));
          const [open, close] = (hours[date.getUTCDay()] || []).map(toMinutes);
          if (open === null || close === null || close <= open) continue;

          const y = date.getUTCFullYear();
          const m = date.getUTCMonth() + 1;
          const d = date.getUTCDate();
          const slots = [];
          for (let t = open; t + slot <= close; t += step) {
            const start = this.zone.instant(y, m, d, t);
            if (start >= earliest) slots.push({ start, end: start + slot * 60000, busy: false });
          }
          if (slots.length) days.push({ key: `${y}-${pad(m)}-${pad(d)}`, noon: this.zone.instant(y, m, d, 720), slots });
        }
        return days;
      }

      whenNearViewport(callback) {
        if (!('IntersectionObserver' in window)) return callback();
        const observer = new IntersectionObserver(
          (entries) => {
            if (!entries.some((entry) => entry.isIntersecting)) return;
            observer.disconnect();
            callback();
          },
          { rootMargin: '400px 0px' }
        );
        observer.observe(this);
      }

      async loadAvailability() {
        const { scriptUrl, calendarId, daysAhead } = this.config;
        if (!scriptUrl || !calendarId) return this.setStatus('fallback');

        // The whole booking window, so a change of option needs no new request.
        // Whole hours, so visitors share the script's short cache.
        const start = Math.floor(Date.now() / 3600000) * 3600000 - 86400000;
        const url = new URL(scriptUrl);
        url.searchParams.set('calendar', calendarId);
        url.searchParams.set('start', new Date(start).toISOString());
        url.searchParams.set('end', new Date(start + ((Number(daysAhead) || 21) + 2) * 86400000).toISOString());

        const controller = 'AbortController' in window ? new AbortController() : null;
        const timer = controller && setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
        try {
          // A plain GET with no custom headers, so there's no CORS preflight.
          // Apps Script answers with a redirect to googleusercontent.com,
          // which fetch follows and which allows any origin.
          const response = await fetch(url.toString(), {
            credentials: 'omit',
            signal: controller ? controller.signal : undefined,
          });
          const data = await response.json();
          if (!data || data.ok !== true || !Array.isArray(data.busy)) throw new Error(data && data.error);
          this.busy = data.busy;
          this.applyBusy();
          this.setStatus('live');
        } catch (error) {
          console.warn('Appointment picker: availability unavailable', error);
          this.setStatus('fallback');
        } finally {
          if (timer) clearTimeout(timer);
        }
      }

      // this.busy: [[startMs, endMs], ...]. The buffer keeps a gap either side.
      applyBusy() {
        const buffer = (Number(this.config.bufferMinutes) || 0) * 60000;
        this.days.forEach((day) =>
          day.slots.forEach((slot) => {
            slot.busy = this.busy.some(([start, end]) => start < slot.end + buffer && end > slot.start - buffer);
          })
        );
      }

      setStatus(status) {
        this.status = status;
        this.showMessage(status === 'fallback' ? FALLBACK_MESSAGE : '');

        if (this.selectedSlot && this.selectedSlot.busy) this.selectSlot(null);
        this.renderDays();
        const current = this.selectedDay && this.freeSlots(this.selectedDay).length ? this.selectedDay : null;
        this.selectDay(current || this.days.find((day) => this.freeSlots(day).length) || null);
      }

      freeSlots(day) {
        return day.slots.filter((slot) => !slot.busy);
      }

      renderDays() {
        if (!this.days.length) {
          this.daysEl.hidden = true;
          return;
        }
        const fragment = document.createDocumentFragment();
        this.days.forEach((day, index) => {
          const full = this.status !== 'loading' && !this.freeSlots(day).length;
          const [weekday, monthDay] = this.zone.dayFormat.format(day.noon).split(', ');
          const [month, date] = monthDay.split(' ');
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'appointment-picker__day';
          button.dataset.index = index;
          button.disabled = full;
          button.setAttribute('aria-pressed', String(day === this.selectedDay));
          button.setAttribute(
            'aria-label',
            `${this.zone.longDayFormat.format(day.noon)}${full ? ', fully booked' : ''}`
          );
          button.innerHTML = `<span class="appointment-picker__weekday">${weekday}</span><span class="appointment-picker__date">${date}</span><span class="appointment-picker__month">${
            full ? 'Full' : month
          }</span>`;
          fragment.appendChild(button);
        });
        this.daysEl.replaceChildren(fragment);

        if (!this.daysListening) {
          this.daysListening = true;
          this.daysEl.addEventListener('click', (event) => {
            const button = event.target.closest('button');
            if (button && !button.disabled) this.selectDay(this.days[Number(button.dataset.index)]);
          });
          this.daysEl.addEventListener('keydown', (event) => this.moveFocus(event));
        }
      }

      selectDay(day) {
        if (day !== this.selectedDay && this.selectedSlot) this.selectSlot(null);
        this.selectedDay = day;
        this.daysEl.querySelectorAll('button').forEach((button) => {
          button.setAttribute('aria-pressed', String(this.days[Number(button.dataset.index)] === day));
        });
        this.renderSlots();
      }

      renderSlots() {
        const note = (text) => `<p class="appointment-picker__message">${text}</p>`;
        if (!this.days.length) {
          this.slotsEl.innerHTML = note('No appointments are open right now. Please check back soon.');
          return;
        }
        if (this.status === 'loading') {
          this.slotsEl.innerHTML = note('Checking availability…');
          return;
        }
        if (!this.selectedDay) {
          this.slotsEl.innerHTML = note('Every time in the next few weeks is booked. Please check back soon.');
          return;
        }
        const slots = this.freeSlots(this.selectedDay);
        if (!slots.length) {
          this.slotsEl.innerHTML = note('No times left on this day.');
          return;
        }

        const fragment = document.createDocumentFragment();
        slots.forEach((slot) => {
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'appointment-picker__slot';
          button.textContent = this.zone.timeFormat.format(slot.start);
          button.setAttribute('aria-pressed', String(slot === this.selectedSlot));
          button.addEventListener('click', () => this.selectSlot(slot));
          fragment.appendChild(button);
        });
        this.slotsEl.replaceChildren(fragment);
      }

      selectSlot(slot) {
        this.selectedSlot = slot;
        const { zone } = this;
        if (slot) {
          const time = zone.timeFormat.format(slot.start);
          this.setInput('label', `${zone.fullDayFormat.format(slot.start)} at ${time}`);
          this.setInput('start', zone.iso(slot.start));
          this.setInput('end', zone.iso(slot.end));
          this.setInput('calendar', this.config.calendarId || '');
          this.summaryEl.textContent = `${zone.dayFormat.format(slot.start)} at ${time}`;
          if (this.status !== 'fallback') this.showMessage('');
        } else {
          Object.keys(this.inputs).forEach((key) => this.setInput(key, null));
          this.summaryEl.textContent = '';
        }
        this.slotsEl.querySelectorAll('button').forEach((button) => {
          button.setAttribute('aria-pressed', String(slot !== null && button.textContent === zone.timeFormat.format(slot.start)));
        });
        this.lockButton();
      }

      setInput(key, value) {
        const input = this.inputs[key];
        if (!input) return;
        input.value = value || '';
        input.disabled = value === null;
      }

      // Arrow keys move along the day strip; Tab still leaves it.
      moveFocus(event) {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
        const buttons = [...this.daysEl.querySelectorAll('button:not([disabled])')];
        const index = buttons.indexOf(document.activeElement);
        if (index === -1) return;
        const next = buttons[index + (event.key === 'ArrowRight' ? 1 : -1)];
        if (!next) return;
        event.preventDefault();
        next.focus();
      }

      showMessage(text) {
        this.messageEl.textContent = text;
        this.messageEl.hidden = !text;
      }

      submitButton() {
        return this.form && this.form.querySelector('[type="submit"][name="add"]');
      }

      // Add to cart stays disabled until a time is picked. Only re-enable what
      // this picker disabled, so a sold-out variant stays sold out. The theme
      // resets the button on variant change, hence the observer.
      lockButton() {
        const button = this.submitButton();
        if (!button) return;
        const variantInput = this.form.querySelector('[name="id"]');
        if (!this.selectedSlot) {
          if (!button.disabled) {
            button.disabled = true;
            button.dataset.appointmentLocked = '';
          }
        } else if ('appointmentLocked' in button.dataset) {
          delete button.dataset.appointmentLocked;
          if (!variantInput || !variantInput.disabled) button.disabled = false;
        }

        if (!this.buttonObserver) {
          this.buttonObserver = new MutationObserver(() => {
            const current = this.submitButton();
            if (current && !this.selectedSlot && !current.disabled) this.lockButton();
          });
          this.buttonObserver.observe(this.form, { attributes: true, attributeFilter: ['disabled'], subtree: true });
        }
      }

      // Runs before the theme's product-form handler (capture on document).
      // Stops a submit with no time, and stops the same time going in twice,
      // which Shopify would otherwise merge into one line with quantity 2.
      guardForm() {
        if (!this.form) return;
        document.addEventListener(
          'submit',
          (event) => {
            if (event.target !== this.form) return;
            if (this.cartChecked) {
              this.cartChecked = false;
              return;
            }
            event.preventDefault();
            event.stopImmediatePropagation();

            if (!this.selectedSlot) {
              this.showMessage('Please choose a day and time first.');
              const first = this.daysEl.querySelector('button:not([disabled])');
              if (first) first.focus();
              return;
            }
            this.alreadyInCart().then((inCart) => {
              if (inCart) {
                this.showMessage('That time is already in your cart.');
                return;
              }
              this.cartChecked = true;
              if (this.form.requestSubmit) {
                this.form.requestSubmit();
              } else {
                this.form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
              }
            });
          },
          true
        );
      }

      async alreadyInCart() {
        try {
          const root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';
          const response = await fetch(`${root}cart.js`, { headers: { Accept: 'application/json' } });
          const cart = await response.json();
          const start = this.inputs.start.value;
          return cart.items.some((item) => item.properties && item.properties._appointment_start === start);
        } catch (error) {
          return false;
        }
      }
    }
  );
}
