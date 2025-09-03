// ==UserScript==
// @name         Income tax portal allow paste
// @version      0.1
// @description  Allow paste on income tax eportal IEC
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://eportal.incometax.gov.in/*
// @icon         https://external-content.duckduckgo.com/ip3/www.incometax.gov.in.ico
// @grant        none
// @require      https://github.com/adamhotep/nofus.js/raw/refs/heads/main/nofus.js
// ==/UserScript==

function fix(elem) {
  "use strict";
  console.log("blahfoo allow paste");
  elem.removeAttribute("onpaste");
  elem.setAttribute("autocomplete", "on");
}

nf.wait$("input[onpaste]", fix);
