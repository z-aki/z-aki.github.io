// ==UserScript==
// @name         Indian bank allow paste
// @version      0.1
// @description  allow paste on CGRS CGRC
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://apps.indianbank.in/cgrc*
// @icon         https://apps.indianbank.in/cgrc/assets/images/logo.png
// @grant        none
// @require      https://github.com/adamhotep/nofus.js/raw/refs/heads/main/nofus.js
// ==/UserScript==

function fix(elem) {
  "use strict";
  console.log("Indian bank allow paste");
  elem.removeAttribute("onpaste");
  elem.removeAttribute("oncopy");
  elem.removeAttribute("oncut");
  elem.setAttribute("autocomplete", "on");
}

nf.wait$("body", fix);
