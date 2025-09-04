// ==UserScript==
// @name         Reddit old click over 18
// @version      0.1
// @description  Automatically clicks the "yes" button on Reddit's age confirmation page
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://old.reddit.com/over18*
// @icon         https://www.reddit.com/favicon.ico
// @grant        none
// @require      https://github.com/adamhotep/nofus.js/raw/refs/heads/main/nofus.js
// ==/UserScript==

function fix(elem) {
  "use strict";
  console.log("Clicked the 'yes' button for age confirmation");
  elem.click();
}

nf.wait$('button[name="over18"][value="yes"]', fix);
