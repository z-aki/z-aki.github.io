// ==UserScript==
// @name         IPGRS karnataka remove waiting GIF
// @version      0.1
// @description  Remove preloader div
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://ipgrs.karnataka.gov.in/*
// @icon         https://ipgrs.karnataka.gov.in/Content/img/new_logo%20(2).png
// @grant        none
// @require      https://gist.githubusercontent.com/adamhotep/7c9068f2196326ab79145ae308b68f9e/raw/373f5e8405b98781001aea9a9e74585367344960/waitForKeyElements.js
// ==/UserScript==

function fix(elem) {
  console.log("blahfoo");
  // Delete elem
  elem.remove();
}

waitForKeyElements("div#preloder", fix);
