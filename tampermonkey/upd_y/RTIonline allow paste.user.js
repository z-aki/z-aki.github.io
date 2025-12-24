// ==UserScript==
// @name         RTIonline allow paste
// @version      0.1
// @description  Allow pasting in the OTP field of the RTI portal
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://rtionline.gov.in/*
// @icon         https://rtionline.gov.in/images/rti-header.png
// @grant        none
// @require      https://github.com/adamhotep/nofus.js/raw/refs/heads/main/nofus.js
// ==/UserScript==

function fix(elem) {
  elem.onkeydown = null;
  elem.type = "number";
}

function fixHeader(elem) {
    console.log("blahfoo 1");
    const className = elem.id;
    const styl = `#${className} { height: unset !important; }`;
    nf.style$(styl, elem);
}

nf.wait$("div#menu", fixHeader);


nf.wait$("input#otp", fix);
