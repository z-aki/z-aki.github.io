// ==UserScript==
// @name         Reddit old click over 18
// @version      0.1
// @description  Automatically clicks the "yes" button on Reddit's age confirmation page
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://old.reddit.com/over18*
// @icon         https://www.reddit.com/favicon.ico
// @grant        none
// @require      https://gist.githubusercontent.com/adamhotep/7c9068f2196326ab79145ae308b68f9e/raw/373f5e8405b98781001aea9a9e74585367344960/waitForKeyElements.js
// @downloadURL  none
// ==/UserScript==

waitForKeyElements('button[name="over18"][value="yes"]', function (elem) {
  "use strict";
  console.log("Clicked the 'yes' button for age confirmation");
  elem.click();
});
