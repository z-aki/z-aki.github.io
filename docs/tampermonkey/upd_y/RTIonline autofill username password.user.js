// ==UserScript==
// @name         RTIonline autofill username password
// @version      0.1
// @description  Set username and password autocomplete attributes
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://rtionline.gov.in/request/status.php
// @icon         https://rtionline.gov.in/images/rti-header.png
// @grant        none
// @require      https://gist.githubusercontent.com/adamhotep/7c9068f2196326ab79145ae308b68f9e/raw/373f5e8405b98781001aea9a9e74585367344960/waitForKeyElements.js
// ==/UserScript==

function fix() {
  return function () {
    "use strict";
    console.log("blahfoo");
    var e = document.querySelectorAll('[id="registration_no"]');
    e[0].setAttribute("autocomplete", "username");

    e = document.querySelectorAll('[id="Email"]');
    e[0].setAttribute("autocomplete", "password");
    e[0].setAttribute("type", "password");
  };
}

waitForKeyElements('input[id="registration_no"]', fix, false);
