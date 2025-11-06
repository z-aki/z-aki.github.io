// ==UserScript==
// @name         RTIonline Karnataka captcha and credential autofill
// @version      0.1
// @description  Autofill using password manager for email, phonenumber. Auto solve captcha for RTI karnataka portal
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://rtionline.karnataka.gov.in/*
// @icon         https://rtionline.karnataka.gov.in/images/logo/rti-logo.png
// @grant        none
// @require      https://github.com/adamhotep/nofus.js/raw/refs/heads/main/nofus.js
// @downloadURL  none
// ==/UserScript==

function fix() {
  "use strict";
  console.log("blahfoo");

  var y = document.querySelectorAll('input[id="Email"]');
  y[0].setAttribute("autocomplete", "username");
  y[0].setAttribute("type", "username");
  y[0].removeAttribute("value");

  y = document.querySelectorAll('input[id="cell"]');
  y[0].setAttribute("autocomplete", "password");
  y[0].setAttribute("type", "password");

  y = document.querySelectorAll('input[id="6_letters_code"]');
  const captcha = document.querySelectorAll('input[id="capVal"]');
  y[0].value = captcha[0].getAttribute("value");
}

nf.wait$('form[name="FrmFirstAppeal"]', fix);
