/* Progressive enhancement: an initial shelf and full-collection links work
   without JS. Further cards stay inert until needed; no inventory API. */
if (!customElements.get('camera-store')) {
  customElements.define('camera-store', class extends HTMLElement {
    connectedCallback() {
      if (this.initialized) {
        if (this.onFinderLink) document.addEventListener('click', this.onFinderLink);
        if (this.onPopState) window.addEventListener('popstate', this.onPopState);
        return;
      }
      this.initialized = true;
      this.grid = this.querySelector('[data-product-grid]');
      if (!this.grid) return;
      this.cards = Array.from(this.querySelectorAll('[data-camera]'));
      this.querySelectorAll('[data-camera-template]').forEach(template => {
        this.cards.push(template.content.querySelector('[data-camera]'));
        template.remove();
      });
      this.form = this.querySelector('[data-finder]');
      this.search = this.querySelector('[data-search]');
      this.sort = this.querySelector('[data-sort]');
      this.more = this.querySelector('[data-load-more]');
      this.special = this.querySelector('[data-include-special]');
      this.pageSize = Number(this.dataset.pageSize) || 12;
      this.limit = this.pageSize;
      this.category = 'all';
      this.budget = 'all';
      this.form.hidden = false;
      this.querySelector('[data-shop-tools]').hidden = false;
      this.onFinderLink = event => {
        if (event.target.closest('a[href="#CameraFinder"]')) this.querySelector('#CameraFinder').open = true;
      };
      document.addEventListener('click', this.onFinderLink);
      this.special.addEventListener('change', () => {
        this.limit = this.pageSize;
        this.update();
      });
      this.form.addEventListener('submit', event => {
        event.preventDefault();
        this.category = this.form.elements.style.value;
        this.budget = this.form.elements.budget.value;
        this.limit = this.pageSize;
        this.update();
        this.scrollToResults();
      });
      this.querySelectorAll('[data-category][aria-pressed]').forEach(button => {
        // Hide empty categories based on the actual available selection.
        if (button.dataset.category !== 'all' && !this.cards.some(card => card.dataset.category === button.dataset.category)) {
          button.hidden = true;
          const option = this.form.elements.style.querySelector(`option[value="${button.dataset.category}"]`);
          if (option) option.disabled = true;
        }
        button.addEventListener('click', () => {
          this.category = button.dataset.category;
          this.form.elements.style.value = this.category === 'other' ? 'all' : this.category;
          this.limit = this.pageSize;
          this.update();
        });
      });
      this.search.addEventListener('input', () => {
        this.limit = this.pageSize;
        this.update();
      });
      this.sort.addEventListener('change', () => {
        this.limit = this.pageSize;
        this.update();
      });
      this.querySelectorAll('[data-reset]').forEach(button => button.addEventListener('click', () => {
        this.category = 'all';
        this.budget = 'all';
        this.search.value = '';
        this.form.reset();
        this.special.checked = false;
        this.limit = this.pageSize;
        this.update();
      }));
      this.more.addEventListener('click', () => {
        const previousLimit = this.limit;
        this.limit += this.pageSize;
        this.update();
        // Keep keyboard users in the newly revealed products, including when
        // the final batch hides the load-more button that held focus.
        this.matches[previousLimit]?.querySelector('h3 a')?.focus({ preventScroll: true });
      });
      this.restoreFromUrl();
      this.onPopState = () => this.restoreFromUrl();
      window.addEventListener('popstate', this.onPopState);
    }

    disconnectedCallback() {
      window.removeEventListener('popstate', this.onPopState);
      document.removeEventListener('click', this.onFinderLink);
    }

    restoreFromUrl() {
      const params = new URL(window.location.href).searchParams;
      const category = params.get('camera_type');
      const budget = params.get('camera_budget');
      this.category = Array.from(this.form.elements.style.options).some(option => option.value === category) ? category : 'all';
      this.budget = Array.from(this.form.elements.budget.options).some(option => option.value === budget) ? budget : 'all';
      // 'other' exists as a browse tab but is not a beginner-finder option.
      if (category === 'other') this.category = 'other';
      this.form.elements.style.value = this.category === 'other' ? 'all' : this.category;
      this.form.elements.budget.value = this.budget;
      this.search.value = params.get('camera_search') || '';
      const sort = params.get('camera_sort');
      this.sort.value = Array.from(this.sort.options).some(option => option.value === sort) ? sort : 'featured';
      this.special.checked = params.get('camera_special') === 'yes';
      this.limit = Math.min(Math.max(Number(params.get('camera_count')) || this.pageSize, this.pageSize), Math.max(this.cards.length, this.pageSize));
      this.update();
    }

    update() {
      const query = this.search.value.trim().toLocaleLowerCase();
      const words = query.split(/\s+/).filter(Boolean);
      const budget = Number(this.budget);
      this.matches = this.cards.filter(card =>
        (this.category === 'all' || card.dataset.category === this.category) &&
        (this.special.checked || card.dataset.special !== 'true') &&
        (this.budget === 'all' || Number(card.dataset.price) < budget) &&
        words.every(word => card.dataset.title.toLocaleLowerCase().includes(word))
      );
      const order = this.sort.value;
      this.matches.sort((a, b) => {
        if (order === 'price-asc') return Number(a.dataset.price) - Number(b.dataset.price);
        if (order === 'price-desc') return Number(b.dataset.price) - Number(a.dataset.price);
        if (order === 'newest') return Number(b.dataset.date) - Number(a.dataset.date);
        if (order === 'title') return a.dataset.title.localeCompare(b.dataset.title);
        return Number(a.dataset.index) - Number(b.dataset.index);
      });
      this.cards.forEach(card => { card.remove(); });
      this.matches.forEach((card, index) => {
        if (index < this.limit) this.grid.appendChild(card);
      });
      this.querySelectorAll('[data-category][aria-pressed]').forEach(button => {
        button.setAttribute('aria-pressed', String(button.dataset.category === this.category));
      });
      const count = this.matches.length;
      const visible = Math.min(this.limit, count);
      let message = `${count} available ${count === 1 ? 'camera' : 'cameras'}`;
      if (visible < count) message = `Showing ${visible} of ${message}`;
      if (this.budget !== 'all') {
        message += ` · ${this.form.elements.budget.selectedOptions[0].textContent}`;
      }
      this.querySelector('[data-result-count]').textContent = message;
      this.querySelector('[data-empty]').hidden = count > 0;
      this.more.hidden = visible >= count;
      this.querySelector('[data-stock-note]').hidden = count === 0;
      this.querySelector('.cs-result-row [data-reset]').hidden = this.category === 'all' && this.budget === 'all' && !query && !this.special.checked;
      // Keep a useful share/back URL without disturbing Shopify preview params.
      const url = new URL(window.location.href);
      const state = {
        camera_type: this.category === 'all' ? '' : this.category,
        camera_budget: this.budget === 'all' ? '' : this.budget,
        camera_search: query,
        camera_sort: order === 'featured' ? '' : order,
        camera_special: this.special.checked ? 'yes' : '',
        camera_count: this.limit > this.pageSize ? String(this.limit) : ''
      };
      Object.entries(state).forEach(([key, value]) => value ? url.searchParams.set(key, value) : url.searchParams.delete(key));
      if (url.href !== window.location.href) history.replaceState(history.state, '', url.href);
    }

    scrollToResults() {
      this.querySelector('[data-shop-tools]').scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        block: 'start'
      });
    }
  });
}
