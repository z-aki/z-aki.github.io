// ==UserScript==
// @name         Aadhaar Tathya input type number
// @version      0.1
// @description  Aadhaar Tathya login page set input type to number
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://tathya.uidai.gov.in/*
// @grant        none
// @icon         https://tathya.uidai.gov.in/favicon.ico
// @require      https://github.com/adamhotep/nofus.js/raw/refs/heads/main/nofus.js
// @downloadURL  none
// ==/UserScript==

function fix(elem) {
    elem.setAttribute("type", "number");
}

nf.wait$('input[name=uid]', fix);
