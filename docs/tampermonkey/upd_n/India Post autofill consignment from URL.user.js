// ==UserScript==
// @name         India Post autofill consignment from URL
// @version      0.1
// @description  Autofills the consignment number using the con parameter in the URL.
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://*.indiapost.gov.in/*
// @icon         https://www.indiapost.gov.in/images/home/schemes/IPPB.svg
// @grant        none
// @require      https://github.com/adamhotep/nofus.js/raw/refs/heads/main/nofus.js
// @downloadURL  none
// ==/UserScript==

function autofill(elem) {
  console.log("blahfoo filling");
  const urlParams = new URLSearchParams(window.location.search);
  const con = urlParams.get("con");
  if (con) {
    const retryF = setInterval(() => {
      console.log("aa");
      const input = elem.querySelector("input");
      const nativeSetter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value"
      ).set;
      nativeSetter.call(input, con);
      // Fire input event so that the search button activates without having to modify the input field.
      input.dispatchEvent(
        new InputEvent("input", { bubbles: true, cancelable: true })
      );
      // Focus on the captcha field for smoother experience.
      const captcha_input = elem.querySelector("#captcha-input");
      captcha_input.focus();
    }, 500);

    // Repeatedly try to fill the parameter since the website clears it multiple times.
    setTimeout(() => {
      clearInterval(retryF);
    }, 5000);
  }
}

nf.wait$("div#trackandtraceview", autofill);

