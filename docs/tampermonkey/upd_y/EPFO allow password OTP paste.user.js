// ==UserScript==
// @name         EPFO allow password OTP paste
// @version      0.1
// @description  Allow pasting password and OTP in EPFO portal
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://unifiedportal-mem.epfindia.gov.in/*
// @match        https://unifiedportal-emp.epfindia.gov.in/*
// @icon         https://pgportal.gov.in/Images/favicon.ico
// @grant        none
// @require      https://github.com/adamhotep/nofus.js/raw/refs/heads/main/nofus.js
// ==/UserScript==

function fixer(elem) {
  console.log("blahfoo");
  $(elem).off("cut copy paste drop");
}

function fix(elem) {
  setTimeout(() => {
    fixer(elem);
  }, 1000);
}

nf.wait$("#captcha", fix);
nf.wait$("input", fix);
