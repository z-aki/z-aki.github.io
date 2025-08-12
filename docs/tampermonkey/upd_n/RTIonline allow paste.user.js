// ==UserScript==
// @name         RTIonline allow paste
// @version      0.1
// @description  Allow pasting in the OTP field of the RTI portal
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://rtionline.gov.in/*
// @icon         https://rtionline.gov.in/images/rti-header.png
// @grant        none
// @require      https://gist.githubusercontent.com/adamhotep/7c9068f2196326ab79145ae308b68f9e/raw/373f5e8405b98781001aea9a9e74585367344960/waitForKeyElements.js
// @downloadURL  none
// ==/UserScript==

function fix(elem) {
  elem.onkeydown = null;
  elem.type = "number";
}

waitForKeyElements("input#otp", fix);
