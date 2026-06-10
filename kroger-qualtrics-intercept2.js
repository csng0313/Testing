(function () {
  var ZID = "ZN_2uKyNHmXdi4UG6f";
  var qualtricsURL = "https://zn2ukynhmxdi4ug6f-krogerxmit.siteintercept.qualtrics.com/SIE/?Q_ZID=" + ZID;
  var scriptLoaded = false;

  function ensureDiv() {
    if (!document.getElementById(ZID)) {
      var div = document.createElement("div");
      div.id = ZID;
      document.body.appendChild(div);
    }
  }

  function loadQualtrics() {
    if (scriptLoaded) return;
    scriptLoaded = true;
    var a = document.createElement("script");
    a.type = "text/javascript";
    a.src = qualtricsURL;
    document.body.appendChild(a);
  }

  // Keep the div alive even if React removes it
  var observer = new MutationObserver(function () {
    ensureDiv();
  });

  function init() {
    ensureDiv();
    observer.observe(document.body, { childList: true, subtree: false });
    loadQualtrics();
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init, false);
  }
})();
