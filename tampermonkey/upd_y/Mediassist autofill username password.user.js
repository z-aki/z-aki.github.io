// ==UserScript==
// @name         Mediassist autofill username password
// @version      0.1
// @description  Set username and password autocomplete attributes
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://*.mediassist.in/*
// @match        https://*.medibuddy.in/*
// @grant        none
// @icon         https://external-content.duckduckgo.com/ip3/www.mediassist.in.ico
// @require      https://github.com/adamhotep/nofus.js/raw/refs/heads/main/nofus.js
// ==/UserScript==

function fix() {
  "use strict";
  console.log("blahfoo");
  const y = document.querySelectorAll('input[class="form-control"]');
  y[0].setAttribute("autocomplete", "email");
  y[0].setAttribute("type", "text");
  y[1].setAttribute("autocomplete", "current-password");
  y[1].setAttribute("required", "on");
  const form = document.querySelectorAll('form[id="MediForm"]')[0];
  form.setAttribute("autocomplete", "on");
}

nf.wait$('[id="username"]', fix);
