/* ============================================================
   BOTANICAL LIFESTYLE — MAIN JS
   main.js — Core: Navbar, Theme, RTL, Back-to-top, Page Transition
   ============================================================ */

'use strict';

// ─── Icon SVGs (inline, inherit currentColor) ───────────────
const moonIcon = '<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
const sunIcon = '<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';
const leafIcon = '<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>';
const warningIcon = '<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>';
const checkIcon = '<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
const xIcon = '<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';

// ─── DOM Ready ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initNavbar();
  initMobileMenu();
  initBackToTop();
  initPageTransition();
  initLazyImages();
  initToastSystem();
  initActiveNavLink();
  initDropdowns();
});

// ─── Theme (Light/Dark) ─────────────────────────────────────
function initTheme() {
  const stored = localStorage.getItem('botanica-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');

  applyTheme(theme);

  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    updateThemeIcon(btn, theme);
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('botanica-theme', next);
      document.querySelectorAll('[data-theme-toggle]').forEach(b => updateThemeIcon(b, next));
      showToast(next === 'dark' ? `${moonIcon} Dark mode on` : `${sunIcon} Light mode on`, 'success');
    });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

function updateThemeIcon(btn, theme) {
  btn.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
  btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  btn.title = theme === 'dark' ? 'Light mode' : 'Dark mode';
}

// ─── RTL Toggle ─────────────────────────────────────────────
function initRTL() {
  const stored = localStorage.getItem('botanica-dir') || 'ltr';
  applyDir(stored);

  document.querySelectorAll('[data-rtl-toggle]').forEach(btn => {
    updateDirIcon(btn, stored);
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('dir') || 'ltr';
      const next = current === 'ltr' ? 'rtl' : 'ltr';
      applyDir(next);
      localStorage.setItem('botanica-dir', next);
      document.querySelectorAll('[data-rtl-toggle]').forEach(b => updateDirIcon(b, next));
      showToast(next === 'rtl' ? '↩ RTL layout on' : '↪ LTR layout on', 'success');
    });
  });
}

function applyDir(dir) {
  document.documentElement.setAttribute('dir', dir);
  document.documentElement.lang = dir === 'rtl' ? 'ar' : 'en';
}

function updateDirIcon(btn, dir) {
  btn.innerHTML = dir === 'rtl' ? 'LTR' : 'RTL';
  btn.style.fontSize = '10px';
  btn.style.fontWeight = '700';
  btn.style.letterSpacing = '0';
  btn.setAttribute('aria-label', dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
}

// ─── Navbar ──────────────────────────────────────────────────
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const isTransparent = navbar.classList.contains('is-transparent');

  function handleScroll() {
    const scrolled = window.scrollY > 50;
    navbar.classList.toggle('is-scrolled', scrolled);
    if (isTransparent) {
      navbar.classList.toggle('is-transparent', !scrolled);
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// ─── Active Nav Link ─────────────────────────────────────────
function initActiveNavLink() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__link, .mobile-menu__link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPage = href.split('/').pop();
    if (linkPage === page || (page === '' && linkPage === 'index.html')) {
      link.classList.add('is-active');
    }
  });
}

// ─── Mobile Menu ─────────────────────────────────────────────
function initMobileMenu() {
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileMenu = document.querySelector('.navbar__mobile-menu');
  const overlay = document.querySelector('.navbar__overlay');
  const closeBtn = document.querySelector('.mobile-menu__close');
  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    hamburger.classList.add('is-open');
    mobileMenu.classList.add('is-open');
    overlay?.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    hamburger.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    overlay?.classList.remove('is-visible');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', () => {
    hamburger.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  closeBtn?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
}

// ─── Dropdown (desktop keyboard) ─────────────────────────────
function initDropdowns() {
  document.querySelectorAll('.navbar__dropdown').forEach(dropdown => {
    const link = dropdown.querySelector('.navbar__link');
    const menu = dropdown.querySelector('.navbar__dropdown-menu');
    if (!link || !menu) return;

    link.setAttribute('aria-haspopup', 'true');
    link.setAttribute('aria-expanded', 'false');

    dropdown.addEventListener('mouseenter', () => link.setAttribute('aria-expanded', 'true'));
    dropdown.addEventListener('mouseleave', () => link.setAttribute('aria-expanded', 'false'));
  });
}

// ─── Back To Top ─────────────────────────────────────────────
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── Page Transition ─────────────────────────────────────────
function initPageTransition() {
  const overlay = document.querySelector('.page-transition');
  if (!overlay) return;

  // Guarantee the overlay can never stay covering the page: remove
  // transition classes and force it back off-screen, so even if a
  // transition/animation is interrupted the page content is visible.
  const hideOverlay = () => {
    overlay.classList.remove('is-entering');
    overlay.classList.remove('is-leaving');
    overlay.style.transform = 'translateY(100%)';
  };

  // Enter animation
  overlay.classList.add('is-entering');
  setTimeout(hideOverlay, 700);

  // On bfcache restore, the overlay may be frozen mid-transition
  // with .is-leaving still applied, covering the whole page green.
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) hideOverlay();
  });

  // Leave on link click
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') ||
        href.startsWith('tel:') || href.startsWith('http') ||
        link.hasAttribute('download') || link.target === '_blank') return;

    link.addEventListener('click', e => {
      e.preventDefault();
      overlay.classList.add('is-leaving');
      setTimeout(() => {
        hideOverlay();
        window.location.href = href;
      }, 450);
    });
  });
}

// ─── Lazy Image Loading ───────────────────────────────────────
function initLazyImages() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('is-loaded');
          io.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    images.forEach(img => {
      img.classList.add('lazy-img');
      io.observe(img);
    });
  }
}

// ─── Toast Notification System ────────────────────────────────
let toastContainer;

function initToastSystem() {
  toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
}

function showToast(message, type = 'default', duration = 3000) {
  if (!toastContainer) initToastSystem();

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <span class="toast__icon">${getToastIcon(type)}</span>
    <span>${message}</span>
  `;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('is-leaving');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

function getToastIcon(type) {
  const icons = { success: checkIcon, error: xIcon, warning: warningIcon, default: leafIcon };
  return icons[type] || icons.default;
}

// ─── Ripple Effect ───────────────────────────────────────────
document.addEventListener('click', e => {
  const btn = e.target.closest('.btn-ripple');
  if (!btn) return;

  const rect = btn.getBoundingClientRect();
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.cssText = `
    left: ${e.clientX - rect.left}px;
    top:  ${e.clientY - rect.top}px;
  `;
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
});

// ─── Smooth Scroll for # anchors ─────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ─── Reading Progress Bar ─────────────────────────────────────
function initReadingProgressBar() {
  const bar = document.querySelector('.reading-progress-bar');
  if (!bar) return;
  function updateBar() {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = Math.min(pct, 100) + '%';
  }
  window.addEventListener('scroll', updateBar, { passive: true });
  updateBar();
}

document.addEventListener('DOMContentLoaded', initReadingProgressBar);

// ─── Expose globals ──────────────────────────────────────────
window.BotanicaApp = { showToast, applyTheme, applyDir };
