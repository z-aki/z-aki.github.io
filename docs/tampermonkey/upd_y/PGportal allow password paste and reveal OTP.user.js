// ==UserScript==
// @name         PGportal allow password paste and reveal OTP
// @version      0.1
// @description  Allow pasting password and reveal OTP in CPGrams PGportal.gov.in
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://pgportal.gov.in/Signin
// @icon         https://pgportal.gov.in/Images/favicon.ico
// @grant        none
// @require      https://gist.githubusercontent.com/adamhotep/7c9068f2196326ab79145ae308b68f9e/raw/373f5e8405b98781001aea9a9e74585367344960/waitForKeyElements.js
// ==/UserScript==

function fix(elem) {
  elem.onkeydown = null;
  $("input:password").off("paste");
}

waitForKeyElements("input#TempPassword", fix, false);

function revealPassword(elem) {
  console.log("blahfoo");
  const input = elem.querySelector("#TempPassword");
  const toggleSpan = elem.querySelector(".input-group-addon");

  // Replace the existing span with a toggle eye icon
  toggleSpan.innerHTML = '<i id="showEye" class="fa fa-eye-slash"></i>';

  // Add toggle functionality
  toggleSpan.addEventListener("click", function () {
    // Toggle the input type between 'text' and 'password'
    input.type = input.type === "password" ? "text" : "password";

    toggleSpan.classList.add("toggleEffects");
    setTimeout(() => {
      toggleSpan.classList.remove("toggleEffects");
    }, 300);

    // Toggle the icon class
    const icon = toggleSpan.querySelector("i");
    icon.classList.toggle("fa-eye");
    icon.classList.toggle("fa-eye-slash");
  });
}

waitForKeyElements(
  "div.loginInput:has(input#TempPassword)",
  revealPassword,
  false
);
