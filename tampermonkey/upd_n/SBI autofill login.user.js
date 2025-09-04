// ==UserScript==
// @name         SBI autofill login
// @version      0.1
// @description  State Bank of India login autocomplete credentials
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://retail.onlinesbi.sbi/retail/login*
// @icon         https://icons.duckduckgo.com/ip2/retail.onlinesbi.sbi.ico
// @grant        none
// @require      https://github.com/adamhotep/nofus.js/raw/refs/heads/main/nofus.js
// @downloadURL  none
// ==/UserScript==

nf.wait$("input[autocomplete=off][id=username]", function (e) {
  "use strict";
  console.log("blahfoo");
  e.setAttribute("autocomplete", "username");
  e.removeAttribute("onfocus");
  e.removeAttribute("onblur");
  e.removeAttribute("oncopy");
  e.removeAttribute("onpaste");
  e.removeAttribute("onkeypress");
  e.removeAttribute("onkeydown");
});

nf.wait$("input[autocomplete=off][id=label2]", function (e) {
  "use strict";
  console.log("blahfoo");
  e.setAttribute("autocomplete", "current-password");
  e.removeAttribute("onfocus");
  e.removeAttribute("onblur");
  e.removeAttribute("oncopy");
  e.removeAttribute("onpaste");
  e.removeAttribute("onkeypress");
  e.removeAttribute("onkeydown");
});

nf.wait$("input[autocomplete=off][id=loginCaptchaValue]", function (e) {
  "use strict";
  console.log("blahfoo");
  e.removeAttribute("autocomplete");
  e.removeAttribute("onfocus");
  e.removeAttribute("onblur");
  e.removeAttribute("oncopy");
  e.removeAttribute("onpaste");
  e.removeAttribute("onkeypress");
  e.removeAttribute("onkeydown");
});

nf.wait$("form[autocomplete=off][name=quickLookForm]", function (e) {
  "use strict";
  console.log("blahfoo");
  e.removeAttribute("autocomplete");
});
