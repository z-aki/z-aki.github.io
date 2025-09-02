// ==UserScript==
// @name         IPGRS karnataka remove waiting GIF
// @version      0.1
// @description  Remove preloader div
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://ipgrs.karnataka.gov.in/*
// @icon         https://ipgrs.karnataka.gov.in/Content/img/new_logo%20(2).png
// @grant        none
// @require      https://github.com/adamhotep/nofus.js/raw/refs/heads/main/nofus.js
// ==/UserScript==

function fix(elem) {
  console.log("blahfoo");
  // Delete elem
  elem.remove();
}

nf.wait$("div#preloder", fix);
