// ==UserScript==
// @name         Indian bank Credit Card expand terms and conditions
// @version      0.1
// @description  Removes the height style from the parent div of country1/2/3/4.
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://www.indianbankcreditcard.in/indbcreditcustomer/*
// @icon         https://apps.indianbank.in/cgrc/assets/images/logo.png
// @grant        none
// @require      https://github.com/adamhotep/nofus.js/raw/refs/heads/main/nofus.js
// ==/UserScript==

function fix(elem) {
  console.log("Tampermonkey: Fixing height");
  elem.parentElement.style.height = "";
}

nf.wait$("div[id='country2']", fix);

// waitForKeyElements(
//   () => {
//     console.log("selector");
//     return
//       ?.contentWindow.document.querySelectorAll("div[id='country2']");
//   },
//   fix,
//   false
// );
