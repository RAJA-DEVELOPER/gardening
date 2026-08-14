/* ============================================================
   BOTANICAL LIFESTYLE — BLOG DETAIL RENDERER
   blog-details.js — Reads ?post=slug and renders the matching
   article into blog-details.html. Falls back to the featured
   post (indoor-botanical-space) when no match is found.
   ============================================================ */

'use strict';

(function () {
  const FALLBACK_SLUG = 'indoor-botanical-space';

  function getSlug() {
    const params = new URLSearchParams(window.location.search);
    return params.get('post') || FALLBACK_SLUG;
  }

  function render(slug) {
    const post = (window.BLOG_POSTS || {})[slug] || window.BLOG_POSTS[FALLBACK_SLUG];
    if (!post) return;

    // ── Page title & meta ────────────────────────────────
    document.title = `${post.title} — Botanica Journal`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', post.excerpt);

    // ── Header background ────────────────────────────────
    const header = document.querySelector('.article-header');
    if (header && post.headerBg) {
      header.style.backgroundImage = `url('${post.headerBg}')`;
    }

    // ── Breadcrumb last item ─────────────────────────────
    const crumb = document.querySelector('.article-header__inner nav ol li:last-child');
    if (crumb) crumb.textContent = post.category;

    // ── Header text ──────────────────────────────────────
    const setText = (sel, val) => {
      const el = document.querySelector(sel);
      if (el) el.textContent = val;
    };
    setText('.article-header__tag', post.tag);
    setText('.article-header__title', post.title);
    setText('.article-header__excerpt', post.excerpt);

    // ── Author ───────────────────────────────────────────
    const avatar = document.querySelector('.article-header__avatar');
    if (avatar && post.author) avatar.src = post.author.avatar;
    setText('.article-header__author-name', post.author?.name || 'Botanica');
    setText('.article-header__author-role', post.author?.role || 'Botanica Garden Studio');

    // ── Header meta (date / read time / views) ───────────
    const metaItems = document.querySelectorAll('.article-header__info span');
    if (metaItems.length >= 3) {
      metaItems[0].innerHTML = `${ICON.calendar} ${post.date}`;
      metaItems[1].innerHTML = `${ICON.clock} ${post.readTime}`;
      metaItems[2].innerHTML = `${ICON.eye} ${post.views}`;
    }

    // ── Hero image ───────────────────────────────────────
    const heroImg = document.querySelector('.article-hero-img');
    if (heroImg && post.hero) {
      heroImg.src = post.hero.src;
      heroImg.alt = post.hero.alt;
    }

    // ── Article body ─────────────────────────────────────
    const body = document.querySelector('.article-body');
    if (body) body.innerHTML = buildBody(post);

    // ── Author bio ───────────────────────────────────────
    if (post.author) {
      const bioImg = document.querySelector('.author-bio__img');
      if (bioImg) bioImg.src = post.author.avatar;
      setText('.author-bio__name', post.author.name);
      setText('.author-bio__desc', post.author.bio);
    }

    // ── TOC ──────────────────────────────────────────────
    const tocList = document.querySelector('.toc-list');
    if (tocList && post.sections && post.sections.length) {
      tocList.innerHTML = post.sections
        .map(s => `<a href="#${s.id}" class="toc-link">${s.title}</a>`)
        .join('');
      const links = tocList.querySelectorAll('.toc-link');
      if (links.length > 0) {
        links[0].classList.add('is-active');
        tocList.querySelectorAll('.toc-link').forEach(a => {
          a.addEventListener('click', () => {
            tocList.querySelectorAll('.toc-link').forEach(x => x.classList.remove('is-active'));
            a.classList.add('is-active');
          });
        });
      }
    }

    // Re-trigger reveal animations for dynamically added content
    if (window.dispatchEvent) {
      window.dispatchEvent(new Event('blog:rendered'));
    }
  }

  const ICON = {
    calendar: '<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="vertical-align:-0.125em"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>',
    clock: '<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="vertical-align:-0.125em"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    eye: '<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="vertical-align:-0.125em"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>'
  };

  function buildBody(post) {
    let html = '';
    for (const sec of post.sections) {
      if (sec.blockquote) {
        html += `<blockquote>${sec.blockquote.text}<cite>— ${sec.blockquote.cite}</cite></blockquote>`;
        continue;
      }
      if (sec.title) html += `<h2 id="${sec.id}">${sec.title}</h2>`;
      for (const p of sec.paras) html += `<p>${p}</p>`;
      if (sec.list) {
        const tag = sec.listType === 'ol' ? 'ol' : 'ul';
        html += `<${tag}>${sec.list.map(li => `<li>${li}</li>`).join('')}</${tag}>`;
      }
    }
    if (post.gallery) {
      html += `<div class="article-gallery">${post.gallery.map(g => `<img src="${g.src}" alt="${g.alt}" loading="lazy" />`).join('')}</div>`;
    }
    return html;
  }

  document.addEventListener('DOMContentLoaded', () => render(getSlug()));
})();
