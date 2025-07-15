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
// @require      https://gist.githubusercontent.com/adamhotep/7c9068f2196326ab79145ae308b68f9e/raw/373f5e8405b98781001aea9a9e74585367344960/waitForKeyElements.js
// ==/UserScript==

function fix(links) {
  for (var i = links.length - 1; i >= 0; i--) {
    var link = links[i];
    var new_link = link.innerText;
    new_link = encodeURI(new_link);

    // remove "..." from the end
    if (new_link.endsWith("%E2%80%A6")) {
      new_link = new_link.substring(0, new_link.length - 9);
    }
    link.setAttribute("href", new_link);
    link.innerText = new_link;
  }
}

waitForKeyElements('a[href^="https://t.co"]', fix);
