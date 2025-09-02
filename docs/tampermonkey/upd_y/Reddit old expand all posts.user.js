// ==UserScript==
// @name         Reddit old expand all posts
// @version      0.1
// @description  Expand all posts
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://old.reddit.com*
// @icon         https://external-content.duckduckgo.com/ip3/www.reddit.com.ico
// @grant        none
// @require      https://github.com/adamhotep/nofus.js/raw/refs/heads/main/nofus.js
// ==/UserScript==

function fix() {
  "use strict";
  console.log("Entered Expand all posts");

  // Select the elements that contain the old HTML structure
  const oldEntries = document.querySelectorAll(".entry.unvoted");

  oldEntries.forEach((entry) => {
    // Find the expando button for video elements
    const expandoButton = entry.querySelector(
      ".expando-button.collapsed.hide-when-pinned"
    );
    if (expandoButton) {
      // Simulate a click on the expando button
      expandoButton.click();
    }
  });
}

nf.wait$("div.sitetable.linklisting", fix);
