(function () {
  const TARGET_ID = '6a67ce3e74d80f255265adef';

  function belongsToTargetPage(host) {
    let cur = host;
    while (cur) {
      if (cur.getAttribute && cur.getAttribute('data-c13y-context-entity') === TARGET_ID) return true;
      cur = cur.parentElement;
    }
    return document.documentElement.getAttribute('data-menu-id') === TARGET_ID;
  }

  const SMILEY_CSS = `
    fieldset { display:flex !important; flex-direction:row !important; flex-wrap:wrap !important; justify-content:center !important; align-items:center !important; gap:16px !important; width:100% !important; }
    fieldset > p { width:100% !important; text-align:center !important; margin-bottom:8px !important; }
    .ds-radio__container { display:inline-flex !important; margin:0 !important; }
    .ds-radio__container input[type="radio"] { display:none !important; }
    .ds-radio__wrapper { cursor:pointer !important; display:flex !important; flex-direction:column !important; align-items:center !important; justify-content:center !important; padding:16px 20px !important; border:2px solid #e2e2e4 !important; border-radius:12px !important; background-color:#ffffff !important; transition:all 0.2s ease-in-out !important; min-width:100px !important; }
    .ds-radio__wrapper:hover { border-color:#b0b0b5 !important; transform:translateY(-2px) !important; box-shadow:0 4px 12px rgba(0,0,0,0.05) !important; }
    .ds-radio__wrapper:has(input:checked) { border-color:#0046ad !important; background-color:#f4f7ff !important; box-shadow:0 4px 14px rgba(0,70,173,0.12) !important; }
    .ds-radio-label { font-size:13px !important; font-weight:600 !important; color:#6b6d6f !important; margin-top:8px !important; text-transform:capitalize !important; display:flex !important; flex-direction:column !important; align-items:center !important; }
    .ds-radio__wrapper:has(input:checked) .ds-radio-label { color:#0046ad !important; }
    .ds-radio-label::before { content:"" !important; width:48px !important; height:48px !important; display:block !important; background-size:contain !important; background-repeat:no-repeat !important; background-position:center !important; transition:transform 0.2s ease !important; }
    .ds-radio__wrapper:hover .ds-radio-label::before { transform:scale(1.08) !important; }
    .ds-radio__container:nth-of-type(1) .ds-radio-label::before { background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="none" stroke="%2322c55e" stroke-width="6"/><circle cx="35" cy="40" r="6" fill="%2322c55e"/><circle cx="65" cy="40" r="6" fill="%2322c55e"/><path d="M 28 60 Q 50 85 72 60" fill="none" stroke="%2322c55e" stroke-width="6" stroke-linecap="round"/></svg>') !important; }
    .ds-radio__container:nth-of-type(2) .ds-radio-label::before { background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="none" stroke="%23eab308" stroke-width="6"/><circle cx="35" cy="40" r="6" fill="%23eab308"/><circle cx="65" cy="40" r="6" fill="%23eab308"/><line x1="28" y1="65" x2="72" y2="65" stroke="%23eab308" stroke-width="6" stroke-linecap="round"/></svg>') !important; }
    .ds-radio__container:nth-of-type(3) .ds-radio-label::before { background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="none" stroke="%23ef4444" stroke-width="6"/><circle cx="35" cy="40" r="6" fill="%23ef4444"/><circle cx="65" cy="40" r="6" fill="%23ef4444"/><path d="M 28 72 Q 50 48 72 72" fill="none" stroke="%23ef4444" stroke-width="6" stroke-linecap="round"/></svg>') !important; }
  `;

  function injectInto(host) {
    if (!host.shadowRoot) return;
    if (!belongsToTargetPage(host)) return;
    if (host.shadowRoot.querySelector('style[data-smiley-tiles]')) return;
    const style = document.createElement('style');
    style.setAttribute('data-smiley-tiles', 'true');
    style.textContent = SMILEY_CSS;
    host.shadowRoot.appendChild(style);
  }

  const observedRoots = new WeakSet();

  function scanAndWatch(root) {
    root.querySelectorAll('survey-plugin-employee-block').forEach(injectInto);
    root.querySelectorAll('*').forEach(el => { if (el.shadowRoot) scanAndWatch(el.shadowRoot); });
    if (observedRoots.has(root)) return;
    observedRoots.add(root);
    new MutationObserver(() => scanAndWatch(root)).observe(root, { childList: true, subtree: true });
  }

  // Catch every future shadow root, the moment it's created, anywhere on the page
  const nativeAttachShadow = Element.prototype.attachShadow;
  Element.prototype.attachShadow = function (init) {
    const shadowRoot = nativeAttachShadow.call(this, init);
    if (this.tagName === 'SURVEY-PLUGIN-EMPLOYEE-BLOCK') injectInto(this); // <-- the fix: check the host itself
    scanAndWatch(shadowRoot);
    return shadowRoot;
  };

  scanAndWatch(document);
})();
