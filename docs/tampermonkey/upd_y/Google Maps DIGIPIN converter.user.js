// ==UserScript==
// @name         Google Maps DIGIPIN converter
// @version      0.1
// @description  Add DIGIPON row to google maps right click menu
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://www.google.com/maps/*
// @icon         https://www.google.com/images/branding/product/ico/maps15_bnuw3a_32dp.ico
// @grant        none
// @require      https://gist.githubusercontent.com/adamhotep/7c9068f2196326ab79145ae308b68f9e/raw/373f5e8405b98781001aea9a9e74585367344960/waitForKeyElements.js
// ==/UserScript==

// elem is the table's one and only div div. It has all the divs with all items. First item is the coordinates.
// This fn adds a last row which has a link to z-aki.github.io/digipin/tool with urlcoords as the coordinates.
function fix(innerdiv) {
  console.log("Fixing element", innerdiv);
  const coordinates = innerdiv
    .querySelector("div:first-child:first-child")
    .textContent.trim();
  const newinnerdiv = document.createElement("div");
  newinnerdiv.innerHTML = `<a href="https://z-aki.github.io/digipin/tool/?urlcoords=${encodeURIComponent(
    coordinates
  )}" target="_blank">DIGIPIN</a>`;

  const newrow = document.createElement("div");

  newrow.setAttribute("tabindex", "0");
  newrow.setAttribute("data-index", "11");
  newrow.setAttribute("ved", "1i:11,t:123456,e:10");
  newrow.appendChild(newinnerdiv);
  innerdiv.appendChild(newrow);
}

waitForKeyElements("div#action-menu > div", fix, false);
