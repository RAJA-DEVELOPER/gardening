/* ============================================================
   BOTANICAL LIFESTYLE — HERO SLIDER
   slider.js
   ============================================================ */

'use strict';

class HeroSlider {
  constructor(element, options = {}) {
    this.el = element;
    this.opts = {
      autoplay: true,
      interval: 5500,
      pauseOnHover: true,
      ...options
    };

    this.slides = [...element.querySelectorAll('.hero-slide')];
    this.bullets = [...element.querySelectorAll('.hero-slider__bullet')];
    this.prevBtn = element.querySelector('[data-slider-prev]');
    this.nextBtn = element.querySelector('[data-slider-next]');
    this.progressBar = element.querySelector('.hero-slider__progress-bar');

    this.current = 0;
    this.total = this.slides.length;
    this.timer = null;
    this.progressTimer = null;
    this.isAnimating = false;

    if (this.total < 2) return;
    this.init();
  }

  init() {
    this.goTo(0, false);
    this.bindEvents();
    if (this.opts.autoplay) this.startAutoplay();
  }

  goTo(index, animate = true) {
    if (this.isAnimating && animate) return;
    if (index >= this.total) index = 0;
    if (index < 0) index = this.total - 1;

    // Deactivate current
    const prev = this.slides[this.current];
    prev?.classList.remove('is-active');

    this.current = index;
    const next = this.slides[this.current];
    next.classList.add('is-active');

    // Bullets
    this.bullets.forEach((b, i) => b.classList.toggle('is-active', i === this.current));

    // Progress
    this.animateProgress();

    if (animate) {
      this.isAnimating = true;
      setTimeout(() => { this.isAnimating = false; }, 900);
    }
  }

  next() { this.goTo(this.current + 1); this.resetAutoplay(); }
  prev() { this.goTo(this.current - 1); this.resetAutoplay(); }

  animateProgress() {
    if (!this.progressBar) return;
    this.progressBar.style.transition = 'none';
    this.progressBar.style.width = '0%';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.progressBar.style.transition = `width ${this.opts.interval}ms linear`;
        this.progressBar.style.width = '100%';
      });
    });
  }

  startAutoplay() {
    this.stopAutoplay();
    this.timer = setInterval(() => this.next(), this.opts.interval);
  }

  stopAutoplay() {
    clearInterval(this.timer);
  }

  resetAutoplay() {
    if (this.opts.autoplay) {
      this.stopAutoplay();
      this.startAutoplay();
    }
  }

  bindEvents() {
    this.prevBtn?.addEventListener('click', () => this.prev());
    this.nextBtn?.addEventListener('click', () => this.next());

    this.bullets.forEach((bullet, i) => {
      bullet.addEventListener('click', () => {
        this.goTo(i);
        this.resetAutoplay();
      });
    });

    // Pause on hover
    if (this.opts.pauseOnHover) {
      this.el.addEventListener('mouseenter', () => this.stopAutoplay());
      this.el.addEventListener('mouseleave', () => {
        if (this.opts.autoplay) this.startAutoplay();
      });
    }

    // Touch / Swipe
    let startX = 0;
    this.el.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    this.el.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? this.next() : this.prev();
      }
    }, { passive: true });

    // Keyboard
    this.el.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') this.next();
      if (e.key === 'ArrowLeft')  this.prev();
    });

    // Visibility change
    document.addEventListener('visibilitychange', () => {
      document.hidden ? this.stopAutoplay() : this.startAutoplay();
    });
  }
}

// ─── Auto-init on DOM Ready ───────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const heroSliderEl = document.querySelector('.hero-slider');
  if (heroSliderEl) {
    window.heroSlider = new HeroSlider(heroSliderEl);
  }
});
