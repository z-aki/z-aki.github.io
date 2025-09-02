// ==UserScript==
// @name         HDFC pension remove waiting GIF
// @version      0.1
// @description  emove preloader div
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://www.hdfcpension.com/*
// @icon         https://external-content.duckduckgo.com/ip3/www.hdfclife.com.ico
// @grant        none
// @require      https://github.com/adamhotep/nofus.js/raw/refs/heads/main/nofus.js
// ==/UserScript==

function fix(elem) {
  console.log("blahfoo");
  // Delete elem
  elem.remove();
}

nf.wait$("div#preloder", fix);
