// ==UserScript==
// @name         HDFC pension remove waiting GIF
// @version      0.1
// @description  emove preloader div
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://www.hdfcpension.com/*
// @icon         https://external-content.duckduckgo.com/ip3/www.hdfclife.com.ico
// @grant        none
// @require      https://gist.githubusercontent.com/adamhotep/7c9068f2196326ab79145ae308b68f9e/raw/373f5e8405b98781001aea9a9e74585367344960/waitForKeyElements.js
// @downloadURL  none
// ==/UserScript==

function fix(elem) {
  console.log("blahfoo");
  // Delete elem
  elem.remove();
}

waitForKeyElements("div#preloder", fix);
