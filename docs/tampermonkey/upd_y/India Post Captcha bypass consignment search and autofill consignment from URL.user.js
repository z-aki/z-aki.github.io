// ==UserScript==
// @name         India Post Captcha bypass consignment search and autofill consignment from URL
// @version      0.1
// @description  Tracks the consignment or money order or complaint without any captcha solution. Also autofills the consignment number using the con parameter in the URL.
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://*.indiapost.gov.in/*
// @icon         https://www.indiapost.gov.in/images/home/schemes/IPPB.svg
// @grant        none
// @require      https://github.com/adamhotep/nofus.js/raw/refs/heads/main/nofus.js
// @require      https://cdn.jsdelivr.net/npm/crypto-js@4.2.0/crypto-js.min.js
// ==/UserScript==

function encrypted(input) {
  const currentTime = Date.now();

  // Validate the consignment number format
  const encryptedData = CryptoJS.AES.encrypt(
    `${input}_${currentTime}`,
    "fbds23894b234u2348923h4"
  ).toString();

  const encryptedUrl = `${encodeURIComponent(encryptedData)}`;
  return encryptedUrl;
}

function red(URL) {
  window.location.href = URL;
}

function redirect(URL, input) {
  const encryptedUrl = URL + encrypted(input);
  red(encryptedUrl); // Redirect to the encrypted URL
}

function fix(topDiv) {
  console.log("blahfoo");
  const searchButton = topDiv.querySelector("button.searchButton");
  searchButton.removeAttribute("disabled");
  searchButton.addEventListener("click", function () {
    const activeTab = topDiv.querySelector("button:not(.border-transparent)");
    const inner = activeTab.innerText.toLowerCase();
    console.log(inner);
    const input = topDiv.querySelector("input").value.trim();
    if (inner.includes("consignment")) {
      red("/track-result/article-number/" + encrypted(input) + "?con=" + input);
    } else if (inner.includes("money")) {
      red("/track-result/moneyorder/" + encrypted(input) + "?con=" + input);
    } else if (inner.includes("complaint")) {
      red("/track-result/complaints/" + encrypted(input) + "?con=" + input);
    } else {
      console.log("unknown tab");
    }
  });

  autofill(topDiv);
}

function fixOffice(topDiv) {
  console.log("blahfoo office");
  const searchButton = topDiv.querySelector("button.searchButton");
  searchButton.removeAttribute("disabled");
  searchButton.addEventListener("click", function () {
    const input = topDiv.querySelector("input");
    const activeTab = topDiv.querySelector("button:not(.border-transparent)");
    console.log(activeTab?.innerText);
    const inner = activeTab.innerText.toLowerCase();
    if (inner.includes("pincode")) {
      redirect("locate-postoffice?pincode=", input.value);
    } else if (inner.includes("state")) {
      red(
        "locate-postoffice?state=" +
          encrypted(topDiv.querySelectorAll("select")[0].value) +
          "&district=" +
          encrypted(topDiv.querySelectorAll("select")[1].value)
      );
    } else if (inner.includes("office")) {
      redirect("locate-postoffice?officeName=", input.value);
    } else {
      console.log("unknown tab");
    }
  });
}

function autofill(elem) {
  console.log("blahfoo filling");
  const urlParams = new URLSearchParams(window.location.search);
  const con = urlParams.get("con");
  if (con) {
    const timer = setInterval(() => {
      console.log("aa");
      const input = elem.querySelector("input");
      const nativeSetter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value"
      ).set;
      nativeSetter.call(input, con);
      console.log(input, con, nativeSetter);
      input.dispatchEvent(
        new InputEvent("input", { bubbles: true, cancelable: true })
      );
    }, 500);
    setTimeout(() => {
      clearInterval(timer);
    }, 5000);
  }
}

nf.wait$("div#trackandtraceview", autofill);
//nf.wait$("div#LocatePostOfficeHome", fixOffice);
