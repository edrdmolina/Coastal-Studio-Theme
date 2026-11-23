/*
  One-tap adds for the cart page suggestions (sections/cfl-cart-suggestions.liquid).

  Deliberately not <product-form>: on the cart page that element would open the
  "added to cart" popup over the cart the customer is already looking at, and
  it leaves the subtotal stale. Instead this posts the same product form, asks
  for the cart page's sections in the same request, and hands them to
  <cart-items> (assets/cart.js) to swap in — items, subtotal, header bubble and
  these suggestions all change together, with no reload.

  If <cart-items> is missing or a section comes back unrenderable, it falls
  back to a normal form post or a reload: the customer always ends up looking
  at a correct cart.

  The submit listener sits on the outer element because the cards inside are
  replaced after every cart change.
*/
if (!customElements.get('cfl-cart-suggestions')) {
  customElements.define(
    'cfl-cart-suggestions',
    class CflCartSuggestions extends HTMLElement {
      connectedCallback() {
        this.status = this.querySelector('[data-cfl-suggestions-status]');
        this.onSubmit = this.onSubmit.bind(this);
        this.addEventListener('submit', this.onSubmit);
      }

      disconnectedCallback() {
        this.removeEventListener('submit', this.onSubmit);
      }

      onSubmit(event) {
        const form = event.target.closest('.cfl-cart-suggestions__form');
        if (!form) return;

        const cartItems = document.querySelector('cart-items');
        // Let the browser post the form; /cart/add returns to the cart.
        if (!cartItems || typeof cartItems.renderCartPage !== 'function') return;

        event.preventDefault();

        const button = form.querySelector('[type="submit"]');
        if (button.getAttribute('aria-disabled') === 'true') return;

        this.setLoading(form, button, true);
        this.showError(form, '');

        const sections = cartItems.getSectionsToRender();
        const formData = new FormData(form);
        formData.append('sections', [...new Set(sections.map((section) => section.section))].join(','));
        formData.append('sections_url', window.location.pathname);

        const config = fetchConfig('javascript');
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
        delete config.headers['Content-Type'];
        config.body = formData;

        fetch(routes.cart_add_url, config)
          .then((response) => response.json())
          .then((response) => {
            if (response.status) {
              publish(PUB_SUB_EVENTS.cartError, {
                source: 'cfl-cart-suggestions',
                productVariantId: formData.get('id'),
                errors: response.errors || response.description,
                message: response.message,
              });
              this.showError(form, response.description || window.cartStrings.error);
              return;
            }

            // The add succeeded, so anything short of a full render means the
            // page is out of date. Reload rather than show the wrong total.
            if (!cartItems.renderCartPage(response.sections)) {
              window.location.reload();
              return;
            }

            this.announce(button.dataset.productTitle);

            publish(PUB_SUB_EVENTS.cartUpdate, {
              source: 'cfl-cart-suggestions',
              productVariantId: formData.get('id'),
              cartData: response,
            });
          })
          .catch((error) => {
            console.error(error);
            this.showError(form, window.cartStrings.error);
          })
          .finally(() => {
            // After a successful add the form has usually been replaced; this
            // only matters when it is still on the page (errors).
            if (form.isConnected) this.setLoading(form, button, false);
          });
      }

      setLoading(form, button, isLoading) {
        const spinner = form.querySelector('.loading__spinner');
        button.classList.toggle('loading', isLoading);
        if (spinner) spinner.classList.toggle('hidden', !isLoading);
        if (isLoading) {
          button.setAttribute('aria-disabled', 'true');
        } else {
          button.removeAttribute('aria-disabled');
        }
      }

      showError(form, message) {
        const error = form.querySelector('.cfl-cart-suggestions__error');
        if (!error) return;
        error.textContent = message;
        error.hidden = !message;
      }

      // The button the customer pressed is gone once the cart re-renders, so
      // focus would drop to the top of the page. Put it on the suggestions
      // heading if there still are suggestions, otherwise on the cart items.
      announce(title) {
        if (this.status && title) {
          this.status.textContent = '';
          window.setTimeout(() => {
            this.status.textContent = `${title} added to your cart.`;
          }, 100);
        }

        const target =
          this.querySelector('.cfl-cart-suggestions__heading') ||
          document.querySelector('cart-items .title--primary');
        if (!target) return;
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    }
  );
}
