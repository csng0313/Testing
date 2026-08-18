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

  const SMILEY_CSS = `/* ...same CSS block as before... */`;

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
    scanAndWatch(shadowRoot);
    return shadowRoot;
  };

  scanAndWatch(document);
})();