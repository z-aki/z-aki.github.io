// ==UserScript==
// @name         Indian Bank domain redirect
// @version      0.1
// @description  Indian Bank redirect to bank.in
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://indianbank.in/*
// @match        https://www.indianbank.in/*
// @icon         https://apps.indianbank.in/cgrc/assets/images/logo.png
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
  "use strict";
  console.log("blahfoo");
  var currentUrl = window.location.href;
  if (
    currentUrl.startsWith("https://indianbank.in") ||
    currentUrl.startsWith("https://www.indianbank.in")
  ) {
    var oldUrl = currentUrl.replace("indianbank.in/", "indianbank.bank.in/");
    window.location.href = oldUrl;
  }
})();
