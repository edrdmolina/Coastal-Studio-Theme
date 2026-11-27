/*
  Black Friday 2026 sale page: gallery carousels (sections/cfl-bfb-*).

  The track is a native scroll-snap row, so swiping, trackpads and keyboard
  scrolling all work without this file. The script only adds the arrow
  buttons (shown once the row overflows), the position dots and the
  "current" state for the dots. Smooth scrolling is skipped when the visitor
  prefers reduced motion.
*/
if (!customElements.get('bfb-carousel')) {
  customElements.define(
    'bfb-carousel',
    class BfbCarousel extends HTMLElement {
      connectedCallback() {
        this.track = this.querySelector('[data-bfb-track]');
        this.arrows = this.querySelector('[data-bfb-arrows]');
        this.dotsWrap = this.querySelector('[data-bfb-dots]');
        if (!this.track) return;
        this.slides = Array.from(this.track.querySelectorAll('[data-bfb-slide]'));
        this.prev = this.arrows && this.arrows.querySelector('[data-bfb-dir="-1"]');
        this.next = this.arrows && this.arrows.querySelector('[data-bfb-dir="1"]');
        this.reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

        if (this.dotsWrap) {
          this.dots = this.slides.map((slide, i) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'bfb-dot';
            dot.tabIndex = -1;
            dot.addEventListener('click', () => this.goTo(i));
            this.dotsWrap.appendChild(dot);
            return dot;
          });
        }

        if (this.arrows) {
          this.arrows.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-bfb-dir]');
            if (!btn) return;
            this.step(parseInt(btn.getAttribute('data-bfb-dir'), 10));
          });
        }

        this.onScroll = () => {
          if (this.raf) return;
          this.raf = requestAnimationFrame(() => {
            this.raf = null;
            this.update();
          });
        };
        this.track.addEventListener('scroll', this.onScroll, { passive: true });
        window.addEventListener('resize', this.onScroll, { passive: true });
        this.update();
      }

      disconnectedCallback() {
        if (!this.track) return;
        this.track.removeEventListener('scroll', this.onScroll);
        window.removeEventListener('resize', this.onScroll);
      }

      behavior() {
        return this.reduce.matches ? 'auto' : 'smooth';
      }

      // Scroll offset that lines a slide up with the track's start padding.
      offsetOf(i) {
        const pad = parseFloat(getComputedStyle(this.track).scrollPaddingLeft) || 0;
        return this.slides[i].offsetLeft - pad; // the track is position: relative, so it is the offsetParent
      }

      currentIndex() {
        const left = this.track.scrollLeft;
        let best = 0;
        let bestDist = Infinity;
        this.slides.forEach((s, i) => {
          const d = Math.abs(this.offsetOf(i) - left);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        return best;
      }

      goTo(i) {
        const idx = Math.max(0, Math.min(this.slides.length - 1, i));
        this.track.scrollTo({ left: this.offsetOf(idx), behavior: this.behavior() });
      }

      // One arrow press moves by however many whole cards fit in view.
      step(dir) {
        const first = this.slides[0];
        const second = this.slides[1];
        const stride = second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
        const perView = Math.max(1, Math.floor((this.track.clientWidth - 40) / stride));
        this.goTo(this.currentIndex() + dir * perView);
      }

      update() {
        const max = this.track.scrollWidth - this.track.clientWidth;
        const scrollable = max > 4;
        if (this.arrows) {
          this.arrows.hidden = !scrollable;
          this.prev.disabled = this.track.scrollLeft <= 4;
          this.next.disabled = this.track.scrollLeft >= max - 4;
        }
        if (this.dots) {
          this.dotsWrap.hidden = !scrollable;
          let current = this.currentIndex();
          if (this.track.scrollLeft >= max - 4) current = this.slides.length - 1;
          this.dots.forEach((dot, i) => dot.classList.toggle('is-current', i === current));
        }
      }
    }
  );
}
