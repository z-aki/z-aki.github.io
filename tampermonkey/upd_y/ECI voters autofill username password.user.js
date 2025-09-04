// ==UserScript==
// @name         ECI voters autofill username password
// @version      0.1
// @description  Set username and password autocomplete attributes
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://voters.eci.gov.in/*
// @grant        none
// @icon         https://voters.eci.gov.in/favicon.ico
// @require      https://github.com/adamhotep/nofus.js/raw/refs/heads/main/nofus.js
// ==/UserScript==

function fix() {
  return function () {
    "use strict";
    console.log("blahfoo");
    const y = document.querySelectorAll('input[name="mobOrEpic"]');
    y[0].setAttribute("autocomplete", "username");

    const form = document.querySelectorAll(
      "div.form_login > form.form_align"
    )[0];
    form.setAttribute("autocomplete", "on");
  };
}

nf.wait$('[class="form-login-wrapper"]', fix);
