// ==UserScript==
// @name         Indian bank CGRS autofill complaint from URL
// @version      0.1
// @description  Autofills the complaint number using the OPT parameter in the URL.
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://apps.indianbank.in/cgrc*
// @icon         https://apps.indianbank.in/cgrc/assets/images/logo.png
// @grant        none
// @require      https://github.com/adamhotep/nofus.js/raw/refs/heads/main/nofus.js
// @require      https://cdn.jsdelivr.net/npm/crypto-js@4.2.0/crypto-js.min.js
// @downloadURL  none
// ==/UserScript==

function fix(elem) {
  const urlParams = new URLSearchParams(window.location.search);
  const opt = urlParams.get("opt");
  if (opt) {
    setTimeout(() => {
      elem.value = opt.replace("track", "");
    }, 1000);
  }
}

nf.wait$("input#Txt_ticket_no", fix);
