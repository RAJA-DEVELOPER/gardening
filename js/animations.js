/* ============================================================
   BOTANICAL LIFESTYLE — SCROLL ANIMATIONS
   animations.js — Scroll Reveal, Parallax, Counters
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCounters();
  initParallax();
  initProgressBars();
  initMarquee();
});

// ─── Scroll Reveal ────────────────────────────────────────────
function initScrollReveal() {
  const elements = document.querySelectorAll(
    '.reveal, .reveal--up, .reveal--down, .reveal--left, .reveal--right, .reveal--scale, .reveal-stagger'
  );

  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Don't unobserve for continuous reveal on scroll back
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  elements.forEach(el => observer.observe(el));

  // Fallback reveal: guarantees reveal elements become visible even if
  // IntersectionObserver or the window 'load' event misbehave (slow
  // images, mobile browsers). Reveals whatever is in/near the viewport.
  const revealInViewport = () => {
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100 && rect.bottom > 0) {
        el.classList.add('is-visible');
      }
    });
  };
  window.addEventListener('scroll', revealInViewport, { passive: true });
  window.setTimeout(revealInViewport, 800);

  // When returning via bfcache, IntersectionObserver won't re-fire,
  // so force-reveal anything already in the viewport (or all elements).
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => el.classList.add('is-visible'));
    }
  });

  // Safety net: if IntersectionObserver isn't supported or the page was
  // painted before observing (e.g. slow mobile devices), reveal everything.
  if (typeof IntersectionObserver === 'undefined') {
    elements.forEach(el => el.classList.add('is-visible'));
  }

  window.addEventListener('load', () => {
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-visible');
      }
    });
  });
}

// ─── Animated Counters ────────────────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseFloat(el.dataset.counter);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = parseInt(el.dataset.duration) || 2000;
  const decimals = (target % 1 !== 0) ? 1 : 0;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;
    el.textContent = prefix + current.toFixed(decimals) + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = prefix + target.toFixed(decimals) + suffix;
    }
  }

  requestAnimationFrame(update);
}

// ─── Parallax ─────────────────────────────────────────────────
function initParallax() {
  const elements = document.querySelectorAll('[data-parallax]');
  if (!elements.length) return;

  // Skip on mobile (performance)
  if (window.matchMedia('(max-width: 768px)').matches) return;

  function handleParallax() {
    const scrollY = window.scrollY;

    elements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      const rect = el.closest('section')?.getBoundingClientRect() || el.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2 - window.innerHeight / 2;
      const offset = centerY * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
  }

  window.addEventListener('scroll', handleParallax, { passive: true });
  handleParallax();
}

// ─── Progress Bars (Skills / Stats) ──────────────────────────
function initProgressBars() {
  const bars = document.querySelectorAll('[data-progress]');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const value = bar.dataset.progress;
        bar.style.setProperty('--progress', value + '%');
        bar.style.width = value + '%';
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => {
    bar.style.width = '0%';
    bar.style.transition = 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(bar);
  });
}

// ─── Marquee Speed Control ────────────────────────────────────
function initMarquee() {
  // Marquee is CSS-driven, nothing to do here unless JS control needed
}

// ─── Cursor Glow (optional premium effect) ───────────────────
function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // no touch

  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  glow.style.cssText = `
    position: fixed;
    pointer-events: none;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(168, 184, 154, 0.08) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    z-index: 0;
    transition: opacity 0.3s;
    top: 0; left: 0;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  }, { passive: true });
}
