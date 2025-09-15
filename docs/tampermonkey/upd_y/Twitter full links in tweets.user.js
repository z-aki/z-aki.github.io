// ==UserScript==
// @name         Twitter full links in tweets
// @version      0.1
// @description  Replace twitter short t.co urls with full links in tweets
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://twitter.com/*
// @match        https://twitter.com/*
// @match        https://x.com/*
// @match        https://x.com/*
// @icon         https://external-content.duckduckgo.com/ip3/www.twitter.com.ico
// @grant        none
// @require      https://github.com/adamhotep/nofus.js/raw/refs/heads/main/nofus.js
// ==/UserScript==

function fix(link) {
  var new_link = link.innerText;
  new_link = new_link.replaceAll("\n", "");
  new_link = encodeURI(new_link);

  // remove "..." from the end
  if (new_link.endsWith("%E2%80%A6")) {
    new_link = new_link.substring(0, new_link.length - 9);
  }
  link.setAttribute("href", new_link);
  link.innerText = new_link;
}

nf.wait$('a[href^="https://t.co"].css-1jxf684', fix);
