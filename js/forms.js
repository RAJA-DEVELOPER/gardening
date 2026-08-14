/* ============================================================
   BOTANICAL LIFESTYLE — FORM VALIDATION
   forms.js — Real-time validation, submission handling
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initAllForms();
  initNewsletterForms();
});

// ─── Validators ───────────────────────────────────────────────
const validators = {
  required: (val) => val.trim().length > 0,
  email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
  phone: (val) => /^[\d\s\+\-\(\)]{7,20}$/.test(val.trim()),
  minLength: (val, len) => val.trim().length >= parseInt(len),
  maxLength: (val, len) => val.trim().length <= parseInt(len),
  url: (val) => {
    try { new URL(val); return true; } catch { return false; }
  }
};

const messages = {
  required:  'This field is required.',
  email:     'Please enter a valid email address.',
  phone:     'Please enter a valid phone number.',
  minLength: (len) => `Must be at least ${len} characters.`,
  maxLength: (len) => `Must be no more than ${len} characters.`,
  url:       'Please enter a valid URL.'
};

// ─── Validate Single Field ────────────────────────────────────
function validateField(field) {
  const rules = (field.dataset.validate || '').split(' ').filter(Boolean);
  const val = field.value;
  const group = field.closest('.form-group');
  const errorEl = group?.querySelector('.form-error');
  const successEl = group?.querySelector('.form-success');

  let isValid = true;
  let errorMsg = '';

  for (const rule of rules) {
    if (rule.includes(':')) {
      const [name, param] = rule.split(':');
      if (validators[name] && !validators[name](val, param)) {
        isValid = false;
        errorMsg = typeof messages[name] === 'function' ? messages[name](param) : messages[name];
        break;
      }
    } else {
      if (validators[rule] && !validators[rule](val)) {
        isValid = false;
        errorMsg = messages[rule] || 'Invalid value.';
        break;
      }
    }
  }

  // Skip validation if empty and not required
  if (!rules.includes('required') && !val.trim()) {
    field.classList.remove('is-valid', 'is-invalid');
    errorEl?.classList.remove('is-visible');
    successEl?.classList.remove('is-visible');
    return true;
  }

  field.classList.toggle('is-valid', isValid);
  field.classList.toggle('is-invalid', !isValid);

  if (errorEl) {
    errorEl.textContent = errorMsg;
    errorEl.classList.toggle('is-visible', !isValid);
  }

  if (successEl) {
    successEl.classList.toggle('is-visible', isValid);
  }

  return isValid;
}

// ─── Init All Forms ───────────────────────────────────────────
function initAllForms() {
  document.querySelectorAll('form[data-validate-form]').forEach(form => {
    const fields = form.querySelectorAll('[data-validate]');
    const submitBtn = form.querySelector('[type="submit"]');

    // Real-time validation on blur
    fields.forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.classList.contains('is-invalid')) {
          validateField(field);
        }
      });
    });

    // Submit handling
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      let formValid = true;
      fields.forEach(field => {
        if (!validateField(field)) formValid = false;
      });

      if (!formValid) {
        const firstInvalid = form.querySelector('.is-invalid');
        firstInvalid?.focus();
        firstInvalid?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      // Show loading state
      submitBtn?.querySelectorAll('.ripple').forEach(r => r.remove());
      const originalText = submitBtn?.innerHTML;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner" style="width:18px;height:18px;border-width:2px;display:inline-block;vertical-align:middle;margin-right:8px;"></span> Sending…';
      }

      // Simulate async submission
      await new Promise(r => setTimeout(r, 1800));

      // Success
      const successMsg = form.dataset.successMsg || 'Message sent! We\'ll get back to you soon.';
      window.BotanicaApp?.showToast(successMsg, 'success', 4000);

      // Reset form
      form.reset();
      fields.forEach(f => {
        f.classList.remove('is-valid', 'is-invalid');
        const group = f.closest('.form-group');
        group?.querySelector('.form-error')?.classList.remove('is-visible');
        group?.querySelector('.form-success')?.classList.remove('is-visible');
      });

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }

      // Show success state in form if element exists
      const formSuccess = form.querySelector('.form-submit-success');
      if (formSuccess) {
        formSuccess.style.display = 'flex';
        setTimeout(() => formSuccess.style.display = '', 5000);
      }
    });
  });
}

// ─── Newsletter Forms ─────────────────────────────────────────
function initNewsletterForms() {
  document.querySelectorAll('[data-newsletter-form]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('[type="email"]');
      const btn = form.querySelector('[type="submit"]');
      if (!emailInput) return;

      if (!validators.email(emailInput.value)) {
        emailInput.classList.add('is-invalid');
        window.BotanicaApp?.showToast('Please enter a valid email address.', 'error');
        return;
      }

      emailInput.classList.remove('is-invalid');
      const orig = btn?.innerHTML;
      if (btn) { btn.disabled = true; btn.innerHTML = '…'; }

      await new Promise(r => setTimeout(r, 1200));

      window.BotanicaApp?.showToast('You\'re subscribed! Welcome to Botanica.', 'success', 4000);
      form.reset();
      if (btn) { btn.disabled = false; btn.innerHTML = orig; }
    });
  });
}
