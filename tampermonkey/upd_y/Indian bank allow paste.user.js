// ==UserScript==
// @name         Indian bank allow paste
// @version      0.1
// @description  allow paste on CGRS CGRC
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://apps.indianbank.in/cgrc*
// @icon         https://apps.indianbank.in/cgrc/assets/images/logo.png
// @grant        none
// @require      https://gist.githubusercontent.com/adamhotep/7c9068f2196326ab79145ae308b68f9e/raw/373f5e8405b98781001aea9a9e74585367344960/waitForKeyElements.js
// ==/UserScript==

function fix(elem) {
  "use strict";
  console.log("Indian bank allow paste");
  elem.removeAttribute("onpaste");
  elem.removeAttribute("oncopy");
  elem.removeAttribute("oncut");
  elem.setAttribute("autocomplete", "on");
}

waitForKeyElements("body", fix);
