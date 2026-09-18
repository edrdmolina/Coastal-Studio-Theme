/*
  Arrow-key control for the film ticker.

  The strip is a scroll container with a tabindex, so the arrow keys already
  move it once it has focus. That is not what the component looks like it
  does: it fills the screen, it has two big arrow buttons on it, and people
  reach for the arrow keys without clicking it first. This listens on the
  document so they work whenever the strip is the thing on screen.

  Arrow keys are shared property, though, and an earlier version of this
  component took them too freely. The guards below are the whole point of the
  file:

    - only while the strip is actually in view,
    - never while someone is typing in a field,
    - never while a drawer, modal or popup is open, since it owns the keyboard,
    - never when a modifier is held, which is browser navigation.

  Stepping goes through the buttons rather than scrolling directly, so a key
  press, a click and a tap all move by exactly one frame and stop at the same
  ends — the buttons carry the disabled state that says where the film stops.
*/
(function () {
  function isTyping(element) {
    if (!element) return false;
    if (element.isContentEditable) return true;
    var tag = element.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
  }

  function somethingIsOpenOverThePage() {
    return !!document.querySelector('dialog[open], [aria-modal="true"]');
  }

  function wire(root) {
    if (root.dataset.cflTickerKeys) return;

    var previous = root.querySelector('button[name="previous"]');
    var next = root.querySelector('button[name="next"]');
    if (!previous || !next) return;

    root.dataset.cflTickerKeys = 'bound';

    /*
      Visibility is measured when a key is pressed rather than watched with an
      IntersectionObserver. One rectangle per arrow press costs nothing, it
      keeps the answer correct even when the strip has just been scrolled or
      resized, and it does not depend on the observer ever having fired — which
      matters inside the theme editor, where sections are torn down and rebuilt
      under the page.
    */
    function isOnScreen() {
      var box = root.getBoundingClientRect();
      var screenHeight = window.innerHeight || document.documentElement.clientHeight;

      var visible = Math.min(box.bottom, screenHeight) - Math.max(box.top, 0);
      if (visible <= 0) return false;

      /*
        Two ways to count as "the thing on screen", because one test cannot
        cover both shapes this takes. On a desktop the strip is shorter than
        the window, so half the strip being visible is the right measure. On a
        phone a sheet of several strips is taller than the window and can never
        reach half of itself, so filling half the window counts too.
      */
      return visible >= box.height / 2 || visible >= screenHeight / 2;
    }

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (!isOnScreen()) return;
      if (isTyping(event.target)) return;
      if (somethingIsOpenOverThePage()) return;

      var button = event.key === 'ArrowLeft' ? previous : next;

      /*
        Held whether or not the film can still move, so the page does not
        lurch sideways at either end of the strip.
      */
      event.preventDefault();

      if (!button.hasAttribute('disabled')) button.click();
    });
  }

  function init(scope) {
    (scope || document).querySelectorAll('.cfl-ticker').forEach(wire);
  }

  init();
  document.addEventListener('DOMContentLoaded', function () {
    init();
  });

  /* The theme editor replaces a section's markup wholesale when it is edited. */
  document.addEventListener('shopify:section:load', function (event) {
    init(event.target);
  });
})();
