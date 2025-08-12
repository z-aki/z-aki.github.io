// ==UserScript==
// @name         Indian bank Credit Card expand terms and conditions
// @version      0.1
// @description  Removes the height style from the parent div of country1/2/3/4.
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://www.indianbankcreditcard.in/indbcreditcustomer/*
// @icon         https://www.indianbankcreditcard.in/indbcreditcustomer/html/favicons/android-icon-192x192.png
// @grant        none
// @require      https://raw.githubusercontent.com/CoeJoder/waitForKeyElements.js/16f3c035e2c41f8af0437a1eca1c9899e722ec37/waitForKeyElements.js
// ==/UserScript==

function fix(elem) {
  console.log("Tampermonkey: Fixing height");
  // remove the height style from the parent div of country1/2/3/4
  elem.parentElement.style.height = "";
}

waitForKeyElements(
  () => {
    console.log("selector");
    return document
      .querySelector("frame[name='mainframe']")
      ?.contentWindow.document.querySelectorAll("div[id='country2']");
  },
  fix,
  false
);
