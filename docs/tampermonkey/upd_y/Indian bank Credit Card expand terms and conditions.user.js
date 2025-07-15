// ==UserScript==
// @name         Indian bank Credit Card expand terms and conditions
// @version      0.1
// @description  Removes the height style from the parent div of country1/2/3/4.
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://www.indianbankcreditcard.in/indbcreditcustomer/html/UAMLogin.jsp
// @icon         https://www.indianbankcreditcard.in/indbcreditcustomer/html/favicons/android-icon-192x192.png
// @grant        none
// @require      https://gist.githubusercontent.com/adamhotep/7c9068f2196326ab79145ae308b68f9e/raw/373f5e8405b98781001aea9a9e74585367344960/waitForKeyElements.js
// ==/UserScript==

function fix(elem) {
  console.log("Tampermonkey: Fixing height");
  // remove the height style from the parent div of country1/2/3/4
  elem.parentElement.style.height = "";
}

waitForKeyElements("div[id='country2']", fix, false, "frame[name='mainframe']");
