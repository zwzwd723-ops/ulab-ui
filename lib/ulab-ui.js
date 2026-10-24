// ULAB UI: optional, framework-free behaviour for the documented markup.
const owners = new WeakMap();
export function mountULAB(root = document, { notify } = {}) {
  owners.get(root)?.();
  const doc = root.ownerDocument || root, win = doc.defaultView || window;
  const controller = new win.AbortController(), signal = controller.signal;
  const timers = new Set(), openers = new WeakMap();
  let notice;
  const later = (fn, ms) => { const id = win.setTimeout(() => { timers.delete(id); fn(); }, ms); timers.add(id); return id; };
  const emit = (target, type, value) => target.dispatchEvent(new win.CustomEvent('ulab:change', { bubbles: true, detail: { type, value } }));
  const toast = message => {
    if (notify) return notify(message);
    if (!notice) { notice = doc.createElement('div'); notice.className = 'u-live-notice'; notice.setAttribute('role', 'status'); doc.body.append(notice); }
    notice.textContent = message;
    later(() => { if (notice?.textContent === message) notice.textContent = ''; }, 2800);
  };
  const quantity = (group, delta = 0) => {
    const input = group.querySelector('input'); if (!input || input.disabled) return;
    const min = Number(input.min || 1), max = input.max ? Number(input.max) : 99;
    input.value = String(Math.min(max, Math.max(min, Math.round(Number(input.value) || min) + delta)));
    const minus = group.querySelector('[data-quantity-minus]'), plus = group.querySelector('[data-quantity-plus]');
    if (minus) minus.disabled = Number(input.value) <= min;
    if (plus) plus.disabled = Number(input.value) >= max;
    emit(input, 'quantity', Number(input.value));
  };
  const select = (item, role) => {
    const group = item.closest(role === 'tab' ? '[role="tablist"]' : '[role="radiogroup"]');
    if (!group) return;
    group.querySelectorAll('[role="' + role + '"]').forEach(child => {
      const chosen = child === item; child.setAttribute(role === 'tab' ? 'aria-selected' : 'aria-checked', String(chosen)); child.tabIndex = chosen ? 0 : -1;
      if (role === 'tab') { const panel = doc.getElementById(child.getAttribute('aria-controls')); if (panel) panel.hidden = !chosen; }
    });
    const value = item.dataset.value || item.textContent.trim() || item.getAttribute('aria-label');
    if (role === 'radio') { const label = group.parentElement.querySelector('[data-swatch-label]'); if (label) label.textContent = '当前配色：' + value; }
    emit(item, role, value);
  };
  root.querySelectorAll('[data-quantity]').forEach(group => quantity(group));
  root.addEventListener('click', event => {
    const target = event.target.closest('button,a,[role="tab"],[role="radio"]');
    if (!target || target.disabled || target.getAttribute('aria-disabled') === 'true') return;
    if (target.matches('[role="switch"]')) { const value = target.getAttribute('aria-checked') !== 'true'; target.setAttribute('aria-checked', String(value)); emit(target, 'switch', value); }
    if (target.matches('[role="tab"]')) select(target, 'tab');
    if (target.matches('[role="radio"]')) select(target, 'radio');
    if (target.matches('[data-quantity-minus],[data-quantity-plus]')) quantity(target.closest('[data-quantity]'), target.hasAttribute('data-quantity-plus') ? 1 : -1);
    if (target.dataset.action === 'toast') { event.preventDefault(); toast(target.dataset.message || '已完成此示例操作'); }
    if (target.dataset.action === 'toggle') { const value = target.getAttribute('aria-pressed') !== 'true'; target.setAttribute('aria-pressed', String(value)); emit(target, 'toggle', value); }
    if (target.hasAttribute('data-step')) {
      const group = target.closest('[data-stepper]'), steps = group ? [...group.querySelectorAll('[data-step]')] : [];
      const active = steps.indexOf(target);
      steps.forEach((step, index) => { if (step === target) step.setAttribute('aria-current', 'step'); else step.removeAttribute('aria-current'); step.classList.toggle('is-complete', index < active); });
      if (active >= 0) emit(target, 'step', active);
    }
    if (target.dataset.action === 'dialog-open') {
      const dialog = doc.getElementById(target.dataset.dialog); if (!dialog) return;
      openers.set(dialog, target); if (!dialog.open) dialog.showModal();
      dialog.addEventListener('close', () => openers.get(dialog)?.focus(), { once: true, signal });
    }
    if (target.dataset.action === 'dialog-close') target.closest('dialog')?.close();
  }, { signal });
  root.addEventListener('change', event => {
    if (event.target.matches('[data-quantity] input')) quantity(event.target.closest('[data-quantity]'));
  }, { signal });
  root.addEventListener('keydown', event => {
    const item = event.target.closest('[role="tab"],[role="radio"]');
    if (!item || !['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key)) return;
    const role = item.getAttribute('role'), group = item.closest(role === 'tab' ? '[role="tablist"]' : '[role="radiogroup"]');
    if (!group) return;
    const items = [...group.querySelectorAll('[role="' + role + '"]')].filter(x => !x.disabled && x.getAttribute('aria-disabled') !== 'true');
    if (!items.length) return;
    event.preventDefault(); const index = items.indexOf(item);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (index + (['ArrowRight','ArrowDown'].includes(event.key) ? 1 : -1) + items.length) % items.length;
    select(items[next], role); items[next].focus();
  }, { signal });
  let cleaned = false;
  const cleanup = () => { if (cleaned) return; cleaned = true; controller.abort(); timers.forEach(id => win.clearTimeout(id)); notice?.remove(); if (owners.get(root) === cleanup) owners.delete(root); };
  owners.set(root, cleanup); return cleanup;
}
