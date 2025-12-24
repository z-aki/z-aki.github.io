// ==UserScript==
// @name         Namma BMTC AVLS width auto
// @version      0.1
// @description  Namma BMTC AVLS width
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://nammabmtcapp.karnataka.gov.in/*
// @icon         https://nammabmtcapp.karnataka.gov.in/assets/img/bmtc_logo.png
// @grant        none
// @require      https://github.com/adamhotep/nofus.js/raw/refs/heads/main/nofus.js
// ==/UserScript==

function fix(elem) {
    console.log("blahfoo");
    const className = elem.classList[0];
    const styl = `.${className} { width: unset !important; }`;
    nf.style$(styl, elem);
}

// Wait for both class names and call the fix function
nf.wait$("div.parent-slide", fix);
nf.wait$("div.child-slide", fix);
