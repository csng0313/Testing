(function () {
  var SIE_URL = "https://zn2ukynhmxdi4ug6f-krogerxmit.siteintercept.qualtrics.com/SIE/?Q_ZID=ZN_2uKyNHmXdi4UG6f";
  var ROOT_ID = "qualtrics-intercept-root";
  var ZONE_ID = "ZN_2uKyNHmXdi4UG6f";
  var COOKIE_NAME = "QSI_TestPopUp";

  function ensureRoot() {
    var el = document.getElementById(ROOT_ID);
    if (!el) {
      el = document.createElement("div");
      el.id = ROOT_ID;
      el.style.display = "none";
      document.body.appendChild(el);
    }
    return el;
  }

  function ensureZoneDiv() {
    if (!document.getElementById(ZONE_ID)) {
      var div = document.createElement("div");
      div.id = ZONE_ID;
      document.body.appendChild(div);
    }
  }

  function loadQualtrics() {
    ensureRoot();
    ensureZoneDiv();

    // Set QSI config
    window.QSI = window.QSI || {};
    window.QSI.config = Object.assign(window.QSI.config || {}, {
      externalReference: COOKIE_NAME
    });

    // If already loaded, just run it
    if (window.QSI && window.QSI.API && typeof window.QSI.API.run === "function") {
      try { window.QSI.API.run(); } catch (e) { console.warn("QSI.API.run failed", e); }
      return;
    }

    // Otherwise load the SIE script
    if (!document.querySelector("script[src='" + SIE_URL + "']")) {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = SIE_URL;
      script.crossOrigin = "anonymous";
      script.onload = function () {
        if (window.QSI && window.QSI.API) {
          if (typeof window.QSI.API.load === "function") window.QSI.API.load();
          if (typeof window.QSI.API.run === "function") window.QSI.API.run();
        }
      };
      document.body.appendChild(script);
    }
  }

  if (document.readyState === "complete") {
    loadQualtrics();
  } else {
    window.addEventListener("load", loadQualtrics, false);
  }
})();
