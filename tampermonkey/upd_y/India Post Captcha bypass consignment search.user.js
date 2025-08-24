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

function redirect(URL, input) {
  const encryptedUrl = URL + encrypted(input);
  red(encryptedUrl); // Redirect to the encrypted URL
}

function fix(topDiv) {
  console.log("blahfoo");
  const searchButton = topDiv.querySelector("button.searchButton");
  searchButton.addEventListener("click", function () {
    const activeTab = topDiv.querySelector(
      "div.trackandtraceview_tabs button.active"
    );
    console.log(activeTab.innerText);
    const inner = activeTab.innerText.toLowerCase();
    const input = document.getElementById("moNumber").value.trim();
    if (inner.includes("consignment")) {
      redirect("/track-result/article-number/", input);
    } else if (inner.includes("money")) {
      redirect("/track-result/moneyorder/", input);
    } else if (inner.includes("complaint")) {
      redirect("/track-result/complaints/", input);
    }
    console.log("unknown tab");
  });
}

waitForKeyElements("div#trackandtraceview", fix, false);

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

function fixOffice(topDiv) {
  console.log("blahfoo");
  const searchButton = topDiv.querySelector("button.searchButton");
  searchButton.addEventListener("click", function () {
    const input = topDiv.querySelector("div.p-4.px-2 input");
    const activeTab = topDiv.querySelector(
      "div.locatepostOffice_tabs button:not(.border-transparent)"
    );
    console.log(activeTab.innerText);
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
    }
    console.log("unknown tab");
  });
}

waitForKeyElements("div#LocatePostOfficeHome", fixOffice, false);

// function fixCaptcha_impl(captchaBlock, canvasElement) {
//   // Select the canvas element

//   // Navigate to the input element
//   const inputElement = captchaBlock.querySelector("input");

//   console.log(inputElement);
//   console.log(canvasElement.getAttribute("aria-label"));
//   // const match = canvasElement
//   //   .getAttribute("aria-label")

//   //   .join("");
//   console.log(
//     canvasElement
//       .getAttribute("aria-label")
//       .trim()
//       .replace("CAPTCHA security verification image. Text content:", "")
//   );
//   const cap = canvasElement
//     .getAttribute("aria-label")
//     .replaceAll("CAPTCHA security verification image. Text content:", "")
//     .trim()
//     .replaceAll("lowercase", "")
//     .replaceAll("capital", "")
//     .replaceAll("number", "")
//     .replaceAll(" ", "")
//     .replaceAll(",", "");
//   console.log(cap);
//   if (cap) {
//     inputElement.value = cap;
//   }
// }
// function fixCaptcha(captchaBlock) {
//   const canvasElement = captchaBlock.querySelector("canvas.captchaCanvas");
//   // Create a MutationObserver instance
//   const observer = new MutationObserver((mutations) => {
//     for (const mutation of mutations) {
//       if (
//         mutation.type === "attributes" &&
//         mutation.attributeName === "aria-label"
//       ) {
//         setTimeout(() => {
//           fixCaptcha_impl(captchaBlock, canvasElement);
//         }, 1000);
//       }
//     }
//   });

//   // Start observing the canvas element for attribute changes
//   observer.observe(canvasElement, { attributes: true });
// }
// waitForKeyElements("div.captch_block", fix, false);
