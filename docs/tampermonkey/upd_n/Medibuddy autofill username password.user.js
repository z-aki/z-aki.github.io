// ==UserScript==
// @name         Medibuddy autofill username password
// @version      0.1
// @description  Set username and password autocomplete attributes
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://portal.medibuddy.in/*
// @icon         https://external-content.duckduckgo.com/ip3/www.medibuddy.in.ico
// @grant        none
// @require      https://gist.githubusercontent.com/adamhotep/7c9068f2196326ab79145ae308b68f9e/raw/373f5e8405b98781001aea9a9e74585367344960/waitForKeyElements.js
// @downloadURL  none
// ==/UserScript==

function fix() {
  "use strict";
  console.log("blahfoo");
  const y = document.querySelectorAll('[id="username"]');
  y[0].setAttribute("autocomplete", "username");
  y = document.querySelectorAll('[id="password"]');
  y[0].setAttribute("autocomplete", "password");
}

waitForKeyElements("iframe, frame", fix, false);
