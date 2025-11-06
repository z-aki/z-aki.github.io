// ==UserScript==
// @name         SSO Rajasthan allow paste and right click
// @version      0.1
// @description  Allow pasting password and right click in SSO Rajasthan
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://sso.rajasthan.gov.in
// @match        https://sso.rajasthan.gov.in/*
// @icon         https://external-content.duckduckgo.com/ip3/ssoid.net.in.ico
// @grant        none
// @require      https://github.com/adamhotep/nofus.js/raw/refs/heads/main/nofus.js
// @downloadURL  none
// ==/UserScript==

function fix(elem) {
  elem.onkeydown = null;
  $(elem).off("contextmenu selectstart dragstart drop cut copy paste");
}

nf.wait$("body", fix);
