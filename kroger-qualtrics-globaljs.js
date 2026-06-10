(function () {
  function mountElement() {
    if (!document.querySelector('kroger-qualtrics-intercept')) {
      var el = document.createElement('kroger-qualtrics-intercept');
      document.body.appendChild(el);
    }
  }

  function loadBundle() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://staffbasepoc.z13.web.core.windows.net/kroger-qualtrics-intercept15.js';
    script.onload = function () {
      mountElement();
    };
    document.body.appendChild(script);
  }

  if (document.readyState === 'complete') {
    loadBundle();
  } else {
    window.addEventListener('load', loadBundle, false);
  }
})();
