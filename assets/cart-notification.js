class CartNotification extends HTMLElement {
  constructor() {
    super();

    this.notification = document.getElementById('cart-notification');
    this.header = document.querySelector('sticky-header');
    this.onBodyClick = this.handleBodyClick.bind(this);

    this.notification.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.close());
    this.querySelectorAll('button[type="button"]').forEach((closeButton) =>
      closeButton.addEventListener('click', this.close.bind(this))
    );
  }

  open() {
    this.notification.classList.add('animate', 'active');

    this.notification.addEventListener(
      'transitionend',
      () => {
        this.notification.focus();
        trapFocus(this.notification);
      },
      { once: true }
    );

    document.body.addEventListener('click', this.onBodyClick);
  }

  close() {
    this.notification.classList.remove('active');
    document.body.removeEventListener('click', this.onBodyClick);

    removeTrapFocus(this.activeElement);
  }

  renderContents(parsedState) {
    this.cartItemKey = parsedState.key;
    // Adds can now come from the suggestions inside the open popup.
    const wasOpen = this.notification.classList.contains('active');
    this.getSectionsToRender().forEach((section) => {
      document.getElementById(section.id).innerHTML = this.getSectionInnerHTML(
        parsedState.sections[section.id],
        section.selector
      );
    });

    if (this.header) this.header.reveal();

    if (wasOpen) {
      // open() waits for a slide-in transition that won't run when already
      // open, and the button that was pressed has just been replaced. Put
      // focus back on the dialog so it isn't lost to <body>.
      this.notification.focus();
      trapFocus(this.notification);
    } else {
      this.open();
    }
  }

  getSectionsToRender() {
    return [
      {
        id: 'cart-notification-product',
        selector: `[id="cart-notification-product-${this.cartItemKey}"]`,
      },
      {
        id: 'cart-notification-button',
      },
      {
        id: 'cart-icon-bubble',
      },
      {
        id: 'cfl-cart-notification-upsell',
      },
      {
        // Fifth section: Shopify's /cart/add returns at most five.
        id: 'cfl-free-shipping-progress',
      },
    ];
  }

  getSectionInnerHTML(html, selector = '.shopify-section') {
    // A section that fails to render comes back null; leave its slot empty
    // rather than throwing and never opening the popup.
    if (!html) return '';
    const element = new DOMParser().parseFromString(html, 'text/html').querySelector(selector);
    return element ? element.innerHTML : '';
  }

  handleBodyClick(evt) {
    const target = evt.target;
    if (target !== this.notification && !target.closest('cart-notification')) {
      const disclosure = target.closest('details-disclosure, header-menu');
      this.activeElement = disclosure ? disclosure.querySelector('summary') : null;
      this.close();
    }
  }

  setActiveElement(element) {
    // Keep the original trigger (e.g. the product page's Add to cart) when an
    // add comes from inside the popup: that button is about to be re-rendered,
    // and close() returns focus to this element.
    if (element && this.notification.contains(element)) return;
    this.activeElement = element;
  }
}

customElements.define('cart-notification', CartNotification);
