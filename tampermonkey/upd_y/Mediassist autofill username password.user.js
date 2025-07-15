// ==UserScript==
// @name         Mediassist autofill username password
// @version      0.1
// @description  Set username and password autocomplete attributes
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://*.mediassist.in/*
// @match        https://*.medibuddy.in/*
// @grant        none
// @icon         https://external-content.duckduckgo.com/ip3/www.mediassist.in.ico
// @require      https://gist.githubusercontent.com/adamhotep/7c9068f2196326ab79145ae308b68f9e/raw/373f5e8405b98781001aea9a9e74585367344960/waitForKeyElements.js
// ==/UserScript==

waitForKeyElements(
  '[id="username"]',
  function () {
    "use strict";
    console.log("blahfoo");
    var y = document.querySelectorAll('input[class="form-control"]');
    y[0].setAttribute("autocomplete", "email");
    y[0].setAttribute("type", "text");
    y[1].setAttribute("autocomplete", "current-password");
    y[1].setAttribute("required", "on");
    var form = document.querySelectorAll('form[id="MediForm"]')[0];
    form.setAttribute("autocomplete", "on");
  },
  false
);
