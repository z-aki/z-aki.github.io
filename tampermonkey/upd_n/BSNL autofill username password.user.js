// ==UserScript==
// @name         BSNL autofill username password
// @version      0.1
// @description  Set username and password autocomplete attributes
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://selfcare.bsnl.co.in/tungsten/UI/facelets/login.xhtml*
// @icon         https://portal.bsnl.in/favicon.ico
// @grant        none
// @require      https://github.com/adamhotep/nofus.js/raw/refs/heads/main/nofus.js
// @downloadURL  none
// ==/UserScript==

function fix() {
  "use strict";
  console.log("blahfoo");

  var y = document.querySelectorAll('[id="form:username"]');
  y[0].setAttribute("autocomplete", "username");
  y[0].setAttribute("type", "username");
  y[0].removeAttribute("value");

  y = document.querySelectorAll('[id="form:password"]');
  y[0].setAttribute("autocomplete", "password");
  y[0].setAttribute("type", "password");
}

nf.wait$(
  "input.ui-inputfield.ui-inputtext.ui-widget.ui-state-default.ui-corner-all",
  fix
);
