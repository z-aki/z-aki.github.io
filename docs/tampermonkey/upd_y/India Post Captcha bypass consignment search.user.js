// ==UserScript==
// @name         India Post Captcha bypass consignment search
// @version      0.1
// @description  Tracks the consignment or money order or complaint without any captcha solution
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://www.indiapost.gov.in/*
// @icon         https://external-content.duckduckgo.com/ip3/www.indiapost.gov.in.ico
// @grant        none
// @require      https://gist.githubusercontent.com/adamhotep/7c9068f2196326ab79145ae308b68f9e/raw/373f5e8405b98781001aea9a9e74585367344960/waitForKeyElements.js
// @require      https://cdn.jsdelivr.net/npm/crypto-js@4.2.0/crypto-js.min.js
// ==/UserScript==

function fix(searchButton) {
  console.log("blahfoo");
  // Add click event listener
  searchButton.addEventListener("click", function () {
    const consignmentInput = document.getElementById("moNumber").value.trim();
    const currentTime = Date.now();

    // Validate the consignment number format
    const encryptedData = CryptoJS.AES.encrypt(
      `${consignmentInput}_${currentTime}`,
      "fbds23894b234u2348923h4"
    ).toString();

    const encryptedUrl = `/track-result/article-number/${encodeURIComponent(
      encryptedData
    )}`;
    window.location.href = encryptedUrl; // Redirect to the encrypted URL
  });
}

waitForKeyElements("div#trackandtraceview  button.searchButton", fix, false);
