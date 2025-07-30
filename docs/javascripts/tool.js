import LatLon, {
  Dms,
} from "https://cdn.jsdelivr.net/npm/geodesy@2/latlon-ellipsoidal.js";

import {
  getDigiPin,
  getLatLngFromDigiPin,
} from "../javascripts/libs/digipin.js";

// Helper: Extract lat/lon from Google Maps URL
function extractCoordsFromUrl(url) {
  const match = url.match(/(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (!match) return null;
  return { lat: parseFloat(match[1]), lon: parseFloat(match[2]) };
}

// Helper: Update Digipin output
function updateDigipinOutput(lat, lon) {
  md_collected_coords.textContent = `Collected latitude, longitude = ${lat}, ${lon}`;
  const digiPin = getDigiPin(lat, lon);
  md_digipin_output.querySelector("code").textContent = digiPin;
}

// Helper: Update calculated coords from Digipin
function digipinToMap(digipin) {
  const sanitized = digipin.replace(/[^A-Z0-9-]/g, "");
  dm_digipin.value = sanitized;
  dm_digipin.focus();
  dm_digipin.setSelectionRange(sanitized.length, sanitized.length);
  fixHeight(dm_digipin);

  const coords = getLatLngFromDigiPin(sanitized);
  dm_calculated_coords_copy.querySelector(
    "code"
  ).textContent = `${coords.latitude}, ${coords.longitude}`;

  const googleMapsUrl = `https://google.com/maps/place/${coords.latitude},${coords.longitude}/data=!3m1!1e3`;
  dm_google_maps_url_output.querySelector("a").href =
    dm_google_maps_url_output.querySelector("a").textContent = googleMapsUrl;

  const appleMapsUrl = `maps://?q=pin&ll=${coords.latitude},${coords.longitude}`;
  dm_maps_url_output.querySelector("a").href = dm_maps_url_output.querySelector(
    "a"
  ).textContent = appleMapsUrl;
}

document$.subscribe(() => {
  const urlParams = new URLSearchParams(window.location.search);

  // Maps URL to Digipin
  const mapsURL = urlParams.get("url")
    ? decodeURIComponent(urlParams.get("url"))
    : null;
  if (mapsURL) {
    md_maps_url.value = mapsURL;
    md_maps_url.focus();
    md_maps_url.setSelectionRange(mapsURL.length, mapsURL.length);
    fixHeight(md_maps_url);
    const coords = extractCoordsFromUrl(mapsURL);
    if (!coords) {
      md_digipin_output.textContent = "Invalid Maps URL";
      return;
    }
    updateDigipinOutput(coords.lat, coords.lon);
    return;
  }

  // Coordinates to Digipin
  const coordsParam = urlParams.get("coords")
    ? decodeURIComponent(urlParams.get("coords"))
    : null;
  if (coordsParam) {
    md_maps_url.value = coordsParam;
    md_maps_url.focus();
    md_maps_url.setSelectionRange(coordsParam.length, coordsParam.length);
    fixHeight(md_maps_url);
    try {
      const latlon = LatLon.parse(coordsParam);
      updateDigipinOutput(latlon._lat, latlon._lon);
    } catch (error) {
      if (error instanceof TypeError) {
        md_digipin_output.textContent = "Invalid Coordinates";
        return;
      }
      throw error;
    }
  }

  // Digipin to Coordinates and map
  const digipinParam = urlParams.get("digipin")
    ? decodeURIComponent(urlParams.get("digipin")).toUpperCase()
    : null;
  if (digipinParam) {
    digipinToMap(digipinParam);
    return;
  }
});

// https://stackoverflow.com/a/25621277
function fixHeight(textarea) {
  document.querySelectorAll("textarea").forEach(function (textarea) {
    textarea.style.height = textarea.scrollHeight + "px";
    textarea.style.overflowY = "hidden";
  });
}
document.querySelectorAll("textarea").forEach(function (textarea) {
  textarea.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });
});

// Debounced input handlers
md_maps_url.oninput = debounce(() => {
  if (!md_maps_url.value) {
    window.location.href = "?";
    return;
  }
  if (md_maps_url.value.startsWith("http")) {
    window.location.href = `?url=${encodeURIComponent(md_maps_url.value)}`;
    return;
  }
  if (!md_maps_url.value.includes(",")) {
    md_maps_url.value = md_maps_url.value.replace(" ", ",");
  }
  window.location.href = `?coords=${encodeURIComponent(md_maps_url.value)}`;
}, 1000);

dm_digipin.oninput = debounce(() => {
  if (dm_digipin.value) {
    window.location.href = `?digipin=${encodeURIComponent(dm_digipin.value)}`;
  }
}, 1000);

// Debounce utility
function debounce(fn, delay) {
  let timeout = null;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}
