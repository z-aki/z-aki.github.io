// ==UserScript==
// @name         Zerodha Tradebook Add Total Amount Column
// @version      0.1
// @description  Zerodha Tradebook Add Total Amount Column
// @author       https://github.com/z-aki
// @namespace    https://github.com/z-aki
// @match        https://console.zerodha.com/reports/tradebook*
// @icon         https://external-content.duckduckgo.com/ip3/www.zerodha.com.ico
// @grant        none
// @require      https://github.com/adamhotep/nofus.js/raw/refs/heads/main/nofus.js
// ==/UserScript==

function fix(table) {
  "use strict";
  console.log("Adding amount to the table:", table);
  const header = table.querySelector("thead tr");
  if (!header.querySelector(".amount-header")) {
    const amountHeader = document.createElement("td");
    amountHeader.textContent = "Amount(custom)";
    amountHeader.classList.add("amount-header");
    header.appendChild(amountHeader);
  }

  const rows = table.querySelectorAll("tbody tr");
  rows.forEach((row) => {
    try {
      if (!row.querySelector(".amount-cell")) {
        const qty = row.querySelector(".qty").textContent.replace(/,/g, "");
        const price = row.querySelector(".price").textContent;
        const amount = (parseFloat(qty) * parseFloat(price)).toFixed(2);

        const amountCell = document.createElement("td");
        amountCell.textContent = amount;
        amountCell.classList.add("amount-cell");
        row.appendChild(amountCell);
      }
    } catch (error) {
      console.error("Error calculating amount:", error);
    }
  });
}

function refreshTable() {
  const table = document.querySelector("#tradebook_table");
  if (table) {
    // Clear existing amount columns
    const amountHeaders = table.querySelectorAll(".amount-header");
    amountHeaders.forEach((header) => header.remove());

    const amountCells = table.querySelectorAll(".amount-cell");
    amountCells.forEach((cell) => cell.remove());

    // Reapply the fix
    fix(table);
  }
}

function addPaginationListeners() {
  const pageOrSortButtons = document.querySelectorAll(
    ".pagination a, #tradebook_table thead tr td"
  );
  pageOrSortButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setTimeout(() => refreshTable(), 500);
    });
  });
}

function fixup(table) {
  fix(table);
  addPaginationListeners();
  // remove wfke_found="true"
  table.removeAttribute("wfke_found");
}

nf.wait$("#tradebook_table", fixup);
