// ==UserScript==
// @name         Zerodha Coin Holdings Add PNL percentage
// @version      0.1
// @description  Zerodha Coin Holdings Add percentage Profile and loss P&L data
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://coin.zerodha.com/dashboard/mf/portfolio*
// @icon         https://external-content.duckduckgo.com/ip3/www.zerodha.com.ico
// @grant        none
// @require      https://github.com/adamhotep/nofus.js/raw/refs/heads/main/nofus.js
// @downloadURL  none
// ==/UserScript==

function fix(table) {
  console.log("blahfoo");
  if (!table) return;

  // Add new header
  const headerRow = table.querySelector("thead tr");
  const th = document.createElement("th");
  th.className = "text-right";
  th.textContent = "% P&L";
  headerRow.appendChild(th);

  // Add new cell for each row
  const rows = table.querySelectorAll("tbody tr");
  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    let txnUnitsIdx = Array.from(cells).findIndex((td) =>
      td.classList.contains("transaction-units")
    );
    const amount = parseFloat(
      cells[txnUnitsIdx - 2].textContent.replace(/,/g, "")
    );
    const plCell = cells[txnUnitsIdx + 1].querySelector("span");
    const pl = parseFloat(plCell.textContent.replace(/,/g, ""));
    const percent = amount !== 0 ? ((pl / amount) * 100).toFixed(2) : "0.00";

    const td = document.createElement("td");
    td.className = "text-right";

    const span = document.createElement("span");
    if (percent < 0) {
      span.className = "negative";
    } else {
      span.className = "positive-nosign";
    }
    span.textContent = percent + " %";

    td.appendChild(span);
    row.appendChild(td);
  });
}

nf.wait$("table.holdings-breakdown__table", fix);
