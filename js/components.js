/* ============================================================
   BOTANICAL LIFESTYLE — COMPONENTS JS
   components.js — FAQ Accordion, Tabs, Image Lightbox
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initAccordion();
  initTabs();
  initProductQuickView();
  initCategoryFilter();
  initCountdown();
  initScrollProgress();
});

// ─── FAQ Accordion ────────────────────────────────────────────
function initAccordion() {
  const accordions = document.querySelectorAll('.accordion');

  accordions.forEach(accordion => {
    const items = accordion.querySelectorAll('.accordion-item');
    const allowMultiple = accordion.dataset.multiple === 'true';

    items.forEach(item => {
      const trigger = item.querySelector('.accordion-trigger');
      const body = item.querySelector('.accordion-body');
      if (!trigger || !body) return;

      trigger.setAttribute('aria-expanded', 'false');
      trigger.setAttribute('role', 'button');

      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // Close others if not multiple
        if (!allowMultiple) {
          items.forEach(other => {
            if (other !== item && other.classList.contains('is-open')) {
              closeAccordion(other);
            }
          });
        }

        isOpen ? closeAccordion(item) : openAccordion(item);
      });

      // Keyboard
      trigger.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          trigger.click();
        }
      });
    });
  });
}

function openAccordion(item) {
  const body = item.querySelector('.accordion-body');
  const inner = item.querySelector('.accordion-body-inner');
  const trigger = item.querySelector('.accordion-trigger');

  item.classList.add('is-open');
  trigger.setAttribute('aria-expanded', 'true');

  if (body && inner) {
    body.style.maxHeight = inner.scrollHeight + 'px';
  }
}

function closeAccordion(item) {
  const body = item.querySelector('.accordion-body');
  const trigger = item.querySelector('.accordion-trigger');

  item.classList.remove('is-open');
  trigger?.setAttribute('aria-expanded', 'false');
  if (body) body.style.maxHeight = '0';
}

// ─── Tabs ─────────────────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach(tabGroup => {
    const triggers = tabGroup.querySelectorAll('[data-tab-trigger]');
    const panels = tabGroup.querySelectorAll('[data-tab-panel]');

    triggers.forEach((trigger, i) => {
      trigger.addEventListener('click', () => {
        triggers.forEach(t => {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        panels.forEach(p => {
          p.classList.remove('is-active');
          p.setAttribute('hidden', '');
        });

        trigger.classList.add('is-active');
        trigger.setAttribute('aria-selected', 'true');
        panels[i]?.classList.add('is-active');
        panels[i]?.removeAttribute('hidden');
      });
    });

    // Init first tab
    triggers[0]?.click();
  });
}

// ─── Product Quick View ───────────────────────────────────────
function initProductQuickView() {
  document.querySelectorAll('[data-quick-view]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const productId = btn.dataset.quickView;
      // Placeholder for quick view modal — in full impl would fetch product data
      window.BotanicaApp?.showToast(`Quick view: ${productId}`, 'default');
    });
  });
}

// ─── Category Filter ──────────────────────────────────────────
function initCategoryFilter() {
  const filterGroups = document.querySelectorAll('[data-filter-group]');

  filterGroups.forEach(group => {
    const btns = group.querySelectorAll('[data-filter]');
    const targetSelector = group.dataset.filterTarget;
    if (!targetSelector) return;
    const items = document.querySelectorAll(targetSelector);

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const filter = btn.dataset.filter;

        items.forEach(item => {
          const category = item.dataset.category || '';
          const show = filter === 'all' || category === filter;
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';

          setTimeout(() => {
            item.style.display = show ? '' : 'none';
            if (show) {
              requestAnimationFrame(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
              });
            }
          }, 200);
        });
      });
    });

    // Activate first button
    btns[0]?.classList.add('is-active');
  });

  // Add transition to filterable items
  document.querySelectorAll('[data-category]').forEach(item => {
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  });
}

// ─── Countdown Timer ──────────────────────────────────────────
function initCountdown() {
  const countdowns = document.querySelectorAll('[data-countdown]');

  countdowns.forEach(el => {
    const target = new Date(el.dataset.countdown).getTime();

    function update() {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        el.innerHTML = '<span>00</span>:<span>00</span>:<span>00</span>:<span>00</span>';
        return;
      }

      const days    = Math.floor(diff / 86400000);
      const hours   = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      const pad = n => String(n).padStart(2, '0');

      el.innerHTML = `
        <div class="countdown-unit">
          <span class="countdown-num">${pad(days)}</span>
          <span class="countdown-label">Days</span>
        </div>
        <span class="countdown-sep">:</span>
        <div class="countdown-unit">
          <span class="countdown-num">${pad(hours)}</span>
          <span class="countdown-label">Hours</span>
        </div>
        <span class="countdown-sep">:</span>
        <div class="countdown-unit">
          <span class="countdown-num">${pad(minutes)}</span>
          <span class="countdown-label">Mins</span>
        </div>
        <span class="countdown-sep">:</span>
        <div class="countdown-unit">
          <span class="countdown-num">${pad(seconds)}</span>
          <span class="countdown-label">Secs</span>
        </div>
      `;
    }

    update();
    setInterval(update, 1000);
  });
}

// ─── Reading Progress Bar ─────────────────────────────────────
function initScrollProgress() {
  const bar = document.querySelector('.reading-progress-bar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const doc = document.documentElement;
    const scrollTop = window.scrollY;
    const total = doc.scrollHeight - doc.clientHeight;
    bar.style.width = (scrollTop / total * 100) + '%';
  }, { passive: true });
}
