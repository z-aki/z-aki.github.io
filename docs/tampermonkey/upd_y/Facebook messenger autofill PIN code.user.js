// ==UserScript==
// @name         Facebook messenger autofill PIN code
// @version      0.1
// @description  Set password autocomplete attribute
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://www.messenger.com/*
// @match        https://www.facebook.com/*
// @grant        none
// @icon         https://external-content.duckduckgo.com/ip3/www.messenger.com.ico
// @require      https://gist.githubusercontent.com/adamhotep/7c9068f2196326ab79145ae308b68f9e/raw/373f5e8405b98781001aea9a9e74585367344960/waitForKeyElements.js
// ==/UserScript==

function fix() {
  "use strict";
  console.log("blahfoo");
  const y = document.querySelectorAll(
    '[id="mw-numeric-code-input-prevent-composer-focus-steal"]'
  );
  y[0].setAttribute("autocomplete", "password");
  y[0].setAttribute("type", "password");
}
// This works for messenger.com
waitForKeyElements(
  "div.x1pi30zi.x1swvt13.x6s0dn4.x193iq5w.x2lah0s.xdt5ytf.x78zum5.x1ja2u2z.x1n2onr6.x9f619, frame",
  fix,
  false
);

// This works for facebook.com
waitForKeyElements(
  "input.x1i10hfl.x9f619.xggy1nq.x1s07b3s.x1kdt53j.x1a2a7pz.x5yr21d.xg01cxk.x10l6tqk.x17qophe.x13vifvy.xh8yej3",
  fix,
  false
);
