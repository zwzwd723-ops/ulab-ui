// Optional business demo behaviour. Call after mountULAB; all state is local to root.
// No account records, network submission, pricing API or local storage are accessed.
const owners = new WeakMap();
const stages = [
  { label: '配列方案', description: '配列方案：选择配列、PCBA、外壳与外观。' },
  { label: '声学结构', description: '声学结构：选择轴体、定位板、卫星轴与填充材料。' },
  { label: '个性化', description: '个性化：配件、个性化按键、线材。' },
  { label: '包装', description: '包装：选择收纳与包装，完成整把键盘配置。' },
];

export function mountBusiness(root, { notify } = {}) {
  if (!root?.querySelectorAll || !root?.addEventListener) throw new TypeError('A DOM root is required');
  owners.get(root)?.();
  const doc = root.ownerDocument || root;
  const win = doc.defaultView || globalThis;
  const controller = new (win.AbortController || globalThis.AbortController)();
  const { signal } = controller;
  let cleaned = false;
  let notice;
  const inside = node => !!node && (node === root || root.contains(node));
  const closest = (node, selector) => {
    const match = node?.closest?.(selector);
    return inside(match) ? match : null;
  };
  const all = selector => [
    ...(root.matches?.(selector) ? [root] : []),
    ...root.querySelectorAll(selector),
  ];
  const message = text => {
    if (typeof notify === 'function') { notify(text); return; }
    if (!notice) {
      notice = doc.createElement('p');
      notice.className = 'u-field-hint business-demo-status';
      notice.setAttribute('role', 'status');
      notice.setAttribute('aria-live', 'polite');
      (root.nodeType === 9 ? root.body : root).append(notice);
    }
    notice.textContent = text;
  };
  const emit = (target, type, value) => target.dispatchEvent(new win.CustomEvent('ulab:business-change', { bubbles: true, detail: { type, value } }));

  function updateLine(row) {
    const input = row.querySelector('[data-quantity] input');
    const output = row.querySelector('[data-line-total]');
    const price = Number(row.dataset.unitPrice), rawQuantity = Number(input?.value);
    if (!output || !Number.isFinite(price) || price < 0 || !Number.isFinite(rawQuantity)) return;
    const quantity = Math.max(0, Math.round(rawQuantity));
    output.textContent = '¥' + (price * quantity).toLocaleString('zh-CN', { maximumFractionDigits: 2 });
  }

  function setStage(group, index, announce = true) {
    const steps = [...group.querySelectorAll('[data-lab-step]')];
    if (!steps.length) return;
    const current = Math.min(steps.length - 1, Math.max(0, Math.round(index)));
    steps.forEach((button, i) => {
      if (i === current) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
      button.classList.toggle('is-complete', i < current);
    });
    const description = group.querySelector('[data-stage-description]');
    if (description) description.textContent = stages[current]?.description || '';
    const previous = group.querySelector('[data-stage-prev]');
    if (previous) previous.disabled = current === 0;
    const next = group.querySelector('[data-stage-next]');
    if (next) {
      const arrow = next.querySelector('svg')?.cloneNode(true);
      next.textContent = current === steps.length - 1 ? '完成配置' : '下一步：' + (stages[current + 1]?.label || '继续');
      if (arrow) next.append(arrow);
    }
    group.dataset.currentStage = String(current);
    if (announce) emit(group, 'stage', current);
  }

  function updateProgress(input) {
    const group = closest(input, '[data-model-demo]');
    if (!group) return;
    const number = Number(input.value);
    const progress = Math.max(0, Math.min(100, Number.isFinite(number) ? Math.round(number) : 0));
    input.value = String(progress);
    const percent = group.querySelector('[data-model-percent]');
    if (percent) percent.textContent = String(progress);
    const circle = group.querySelector('.model-load-progress');
    if (circle) circle.style.strokeDashoffset = String(100 - progress);
  }

  all('[data-unit-price]').forEach(updateLine);
  all('[data-lab-stages]').forEach(group => {
    const steps = [...group.querySelectorAll('[data-lab-step]')];
    const current = steps.findIndex(button => button.getAttribute('aria-current') === 'step');
    setStage(group, Math.max(0, current), false);
  });
  all('[data-model-progress]').forEach(updateProgress);

  root.addEventListener('ulab:change', event => {
    if (event.detail?.type !== 'quantity') return;
    const row = closest(event.target, '[data-unit-price]');
    if (row) updateLine(row);
  }, { signal });

  root.addEventListener('click', event => {
    const button = closest(event.target, '[data-lab-step],[data-stage-prev],[data-stage-next]');
    if (!button || button.disabled || button.getAttribute('aria-disabled') === 'true') return;
    const group = closest(button, '[data-lab-stages]');
    if (!group) return;
    event.preventDefault();
    const steps = [...group.querySelectorAll('[data-lab-step]')];
    const active = Math.max(0, steps.findIndex(step => step.getAttribute('aria-current') === 'step'));
    if (button.hasAttribute('data-lab-step')) setStage(group, steps.indexOf(button));
    else if (button.hasAttribute('data-stage-prev')) setStage(group, active - 1);
    else if (active < steps.length - 1) setStage(group, active + 1);
    else message('配置流程示例已完成，未创建商品或订单。');
  }, { signal });

  const onProgress = event => {
    const input = closest(event.target, '[data-model-progress]');
    if (input) updateProgress(input);
  };
  root.addEventListener('input', onProgress, { signal });
  root.addEventListener('change', onProgress, { signal });

  root.addEventListener('submit', event => {
    const form = closest(event.target, 'form[data-demo-form]');
    if (!form) return;
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      message('请检查必填信息和邮箱格式。');
      return;
    }
    message('资料格式检查通过。这是组件示例，未提交供应商资料。');
    emit(form, 'validation', true);
  }, { signal });

  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    controller.abort();
    notice?.remove();
    if (owners.get(root) === cleanup) owners.delete(root);
  };
  owners.set(root, cleanup);
  return cleanup;
}
