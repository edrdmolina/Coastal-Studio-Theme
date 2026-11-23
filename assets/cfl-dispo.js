/*
  Coastal Disposable Camera pack builder (sections/cfl-dispo-buy.liquid).

  The shopper picks a pack size, then splits it across designs with steppers.
  Every design's quantity input is a real form field, so the form still posts
  to /cart/add without this script. With it, the total updates live, the
  button only enables once the pack is full, and the add goes through
  /cart/add.js so zero-quantity designs and the optional label are handled
  cleanly.

  Pack prices shown here mirror the automatic discounts in Shopify admin; the
  cart applies the real discount. Step 3 upgrades (prints, XL scans) are their
  own products, added once per camera in the pack: they apply to the whole
  order, so staff never have to track which camera gets which upgrade.
*/
(function () {
  function formatMoney(cents, format) {
    var value = (cents / 100).toFixed(2).replace(/\.00$/, '');
    var withCommas = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return (format || '${{amount}}').replace(/\{\{\s*amount[a-z_]*\s*\}\}/, withCommas);
  }

  // The floating cut-out: one design at a time, front or back.
  function initStage(root) {
    var stage = root.querySelector('[data-cfl-dispo-stage]');
    if (!stage) return null;
    var floats = stage.querySelectorAll('[data-cfl-dispo-float]');
    var sideButtons = stage.querySelectorAll('[data-cfl-dispo-side]');
    var swatches = stage.querySelectorAll('[data-cfl-dispo-show]');
    var side = 'front';
    var current = null;

    function applySide() {
      floats.forEach(function (fig) {
        var front = fig.querySelector('[data-side="front"]');
        var back = fig.querySelector('[data-side="back"]');
        var showBack = side === 'back' && back;
        if (front) front.hidden = !!showBack;
        if (back) back.hidden = !showBack;
      });
      sideButtons.forEach(function (btn) {
        btn.setAttribute('aria-pressed', btn.dataset.cflDispoSide === side ? 'true' : 'false');
      });
    }

    // Hidden cut-outs start as loading="lazy", so the browser would only fetch
    // them when shown and the entrance animation would play on an empty
    // image. warm() starts the download early and asks the browser to decode
    // it ahead of time.
    function warm(img) {
      if (!img) return;
      if (img.loading === 'lazy') img.loading = 'eager';
      if (!img._cflWarm && img.decode) {
        img._cflWarm = true;
        img.decode().catch(function () {});
      }
    }

    // Resolves once the image has downloaded (or failed).
    function loaded(img) {
      if (!img || (img.complete && img.naturalWidth)) return Promise.resolve();
      return new Promise(function (resolve) {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      });
    }

    function wait(ms) {
      return new Promise(function (resolve) { setTimeout(resolve, ms); });
    }

    function imageFor(fig, wantedSide) {
      return fig.querySelector('[data-side="' + wantedSide + '"]') || fig.querySelector('[data-side="front"]');
    }

    // Swap straight away when the image is already here. Otherwise wait a
    // moment for it, so the swap doesn't land on a blank frame, but never
    // hold a click up for long on a slow connection.
    function ready(img) {
      warm(img);
      return Promise.race([loaded(img), wait(350)]);
    }

    var pending = 0;

    function show(variantId) {
      variantId = String(variantId);
      if (variantId === current) return;
      var target = stage.querySelector('[data-cfl-dispo-float="' + variantId + '"]');
      if (!target) return;
      current = variantId;
      swatches.forEach(function (btn) {
        btn.setAttribute('aria-pressed', btn.dataset.cflDispoShow === variantId ? 'true' : 'false');
      });
      var ticket = ++pending;
      ready(imageFor(target, side)).then(function () {
        // A later click wins.
        if (ticket !== pending) return;
        floats.forEach(function (fig) {
          fig.hidden = fig !== target;
        });
        // Restart the entrance animation on the newly shown camera.
        target.classList.remove('is-entering');
        void target.offsetWidth;
        target.classList.add('is-entering');
      });
    }

    sideButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var wanted = btn.dataset.cflDispoSide;
        var fig = stage.querySelector('[data-cfl-dispo-float="' + current + '"]');
        side = wanted;
        sideButtons.forEach(function (b) {
          b.setAttribute('aria-pressed', b.dataset.cflDispoSide === side ? 'true' : 'false');
        });
        ready(fig && imageFor(fig, wanted)).then(function () {
          if (side === wanted) applySide();
        });
      });
      btn.addEventListener('pointerenter', function () {
        var fig = stage.querySelector('[data-cfl-dispo-float="' + current + '"]');
        if (fig) warm(imageFor(fig, btn.dataset.cflDispoSide));
      });
    });

    swatches.forEach(function (btn) {
      btn.addEventListener('click', function () {
        show(btn.dataset.cflDispoShow);
      });
      // Start the fetch the moment someone reaches for a swatch.
      ['pointerenter', 'touchstart', 'focus'].forEach(function (type) {
        btn.addEventListener(type, function () {
          var fig = stage.querySelector('[data-cfl-dispo-float="' + btn.dataset.cflDispoShow + '"]');
          if (fig) warm(imageFor(fig, side));
        }, { passive: true });
      });
    });

    var visible = stage.querySelector('[data-cfl-dispo-float]:not([hidden])');
    if (visible) current = visible.dataset.cflDispoFloat;

    // Once the page has finished loading, quietly fetch the other designs'
    // fronts together, then every back, so switching is instant. Each batch
    // waits at most a moment, so a stuck image can't hold up the next one.
    function warmAll() {
      var fronts = stage.querySelectorAll('[data-cfl-dispo-float] [data-side="front"]');
      var backs = stage.querySelectorAll('[data-cfl-dispo-float] [data-side="back"]');
      function batch(list) {
        Array.prototype.forEach.call(list, warm);
        return Promise.race([
          Promise.all(Array.prototype.map.call(list, loaded)),
          wait(1500)
        ]);
      }
      batch(fronts).then(function () { batch(backs); });
    }
    function idle(fn) {
      if (window.requestIdleCallback) window.requestIdleCallback(fn, { timeout: 2000 });
      else setTimeout(fn, 200);
    }
    if (document.readyState === 'complete') idle(warmAll);
    else window.addEventListener('load', function () { idle(warmAll); });

    return { show: show };
  }

  function initForm(form, stage) {
    var packs = form.querySelectorAll('input[name="cfl-dispo-pack"]');
    var designs = Array.prototype.slice.call(form.querySelectorAll('[data-cfl-dispo-design]'));
    var qtyInputs = designs
      .map(function (d) { return d.querySelector('[data-cfl-dispo-qty]'); })
      .filter(Boolean);
    var label = form.querySelector('[data-cfl-dispo-label]');
    var xl = form.querySelector('[data-cfl-dispo-xl]');

    // Upgrades chosen in step 3, each charged once per camera.
    function upgrades() {
      var list = [];
      var prints = form.querySelector('input[name="cfl-dispo-prints"]:checked');
      if (prints && prints.value) list.push({ id: parseInt(prints.value, 10), price: parseInt(prints.dataset.price, 10) });
      if (xl && xl.checked) list.push({ id: parseInt(xl.value, 10), price: parseInt(xl.dataset.price, 10) });
      return list;
    }
    var totalEl = form.querySelector('[data-cfl-dispo-total]');
    var noteEl = form.querySelector('[data-cfl-dispo-total-note]');
    var countEl = form.querySelector('[data-cfl-dispo-count]');
    var submit = form.querySelector('[data-cfl-dispo-submit]');
    var errorEl = form.querySelector('[data-cfl-dispo-error]');
    var moneyFormat = form.dataset.moneyFormat;
    var basePrice = parseInt(form.dataset.basePrice, 10);
    var hint = countEl ? countEl.textContent.trim() : '';

    if (!qtyInputs.length) return;

    function selectedPack() {
      var checked = form.querySelector('input[name="cfl-dispo-pack"]:checked');
      return checked || packs[0];
    }

    function packSize() {
      return parseInt(selectedPack().value, 10);
    }

    function picked() {
      return qtyInputs.reduce(function (sum, input) {
        return sum + (parseInt(input.value, 10) || 0);
      }, 0);
    }

    function spread(size) {
      var n = qtyInputs.length;
      qtyInputs.forEach(function (input, i) {
        input.value = Math.floor(size / n) + (i < size % n ? 1 : 0);
      });
    }

    function render() {
      var size = packSize();
      var count = picked();
      var pack = selectedPack();
      var each = parseInt(pack.dataset.each, 10) || basePrice;
      var saved = parseInt(pack.dataset.saved, 10) || 0;
      var perCamera = upgrades().reduce(function (sum, u) { return sum + u.price; }, 0);
      var total = (each + perCamera) * size + (label && label.checked ? parseInt(label.dataset.price, 10) : 0);

      totalEl.textContent = formatMoney(total, moneyFormat);
      noteEl.textContent = saved > 0 ? ' · you save ' + formatMoney(saved, moneyFormat) : '';

      qtyInputs.forEach(function (input) {
        var row = input.closest('[data-cfl-dispo-design]');
        var value = parseInt(input.value, 10) || 0;
        row.querySelector('[data-cfl-dispo-minus]').disabled = value <= 0;
        // On a single, + swaps to this design instead of being blocked.
        row.querySelector('[data-cfl-dispo-plus]').disabled = size === 1 ? value >= 1 : count >= size;
        row.classList.toggle('is-picked', value > 0);
      });

      if (count === size) {
        countEl.textContent = size === 1 ? 'Got it. ' + hint : 'All ' + size + ' picked. ' + hint;
        submit.disabled = false;
        submit.textContent = size === 1 ? 'Add 1 camera to cart' : 'Add ' + size + ' cameras to cart';
      } else if (count < size) {
        var left = size - count;
        countEl.textContent = count + ' of ' + size + ' picked. Choose ' + left + ' more.';
        submit.disabled = true;
        submit.textContent = 'Pick ' + left + ' more';
      } else {
        countEl.textContent = count + ' picked, but this pack holds ' + size + '. Take ' + (count - size) + ' away.';
        submit.disabled = true;
        submit.textContent = 'Too many picked';
      }
    }

    packs.forEach(function (radio) {
      radio.addEventListener('change', function () {
        var size = packSize();
        if (size === 1) {
          // Keep whichever design they were leaning towards.
          var keep = qtyInputs.reduce(function (best, input) {
            return (parseInt(input.value, 10) || 0) > (parseInt(best.value, 10) || 0) ? input : best;
          }, qtyInputs[0]);
          qtyInputs.forEach(function (input) { input.value = input === keep ? 1 : 0; });
        } else {
          spread(size);
        }
        render();
      });
    });

    designs.forEach(function (row) {
      var input = row.querySelector('[data-cfl-dispo-qty]');
      if (!input) return;
      var plus = row.querySelector('[data-cfl-dispo-plus]');
      var minus = row.querySelector('[data-cfl-dispo-minus]');

      plus.addEventListener('click', function () {
        if (packSize() === 1) {
          qtyInputs.forEach(function (other) { other.value = 0; });
        }
        input.value = (parseInt(input.value, 10) || 0) + 1;
        if (stage) stage.show(row.dataset.variantId);
        render();
      });
      minus.addEventListener('click', function () {
        input.value = Math.max(0, (parseInt(input.value, 10) || 0) - 1);
        render();
      });
      input.addEventListener('input', render);
    });

    if (label) label.addEventListener('change', render);
    if (xl) xl.addEventListener('change', render);
    form.querySelectorAll('input[name="cfl-dispo-prints"]').forEach(function (radio) {
      radio.addEventListener('change', render);
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (picked() !== packSize()) return;

      var items = qtyInputs
        .map(function (input) {
          var row = input.closest('[data-cfl-dispo-design]');
          return { id: parseInt(row.dataset.variantId, 10), quantity: parseInt(input.value, 10) || 0 };
        })
        .filter(function (item) { return item.quantity > 0; });

      var size = packSize();
      upgrades().forEach(function (u) { items.push({ id: u.id, quantity: size }); });
      if (label && label.checked) items.push({ id: parseInt(label.value, 10), quantity: 1 });

      errorEl.hidden = true;
      submit.disabled = true;
      submit.setAttribute('aria-busy', 'true');
      submit.textContent = 'Adding…';

      fetch((window.Shopify && window.Shopify.routes ? window.Shopify.routes.root : '/') + 'cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ items: items })
      })
        .then(function (response) {
          return response.json().then(function (body) {
            if (!response.ok) throw new Error(body.description || body.message || 'Something went wrong.');
            return body;
          });
        })
        .then(function () {
          window.location.href = form.dataset.cartUrl;
        })
        .catch(function (error) {
          errorEl.textContent = error.message + ' Please try again, or contact us if it keeps happening.';
          errorEl.hidden = false;
          submit.removeAttribute('aria-busy');
          render();
        });
    });

    render();
  }

  function init() {
    document.querySelectorAll('.cfl-dispo').forEach(function (root) {
      var stage = initStage(root);
      var form = root.querySelector('[data-cfl-dispo-form]');
      if (form) initForm(form, stage);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
