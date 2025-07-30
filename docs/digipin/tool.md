---
title: Digipin converter
date:
  created: 2025-07-27
  updated: 2025-07-27
---

## Maps to DIGIPIN

<script src="/javascripts/libs/digipin.js"></script>
<script type="module" src="/javascripts/tool.js"></script>
<!-- onsubmit="event.preventDefault(); window.location.href = window.location.pathname + '?url=' + encodeURIComponent(document.getElementById('md_maps_url').value);" -->

<textarea id="md_maps_url"
type="text"
style="border:2px solid; outline:none; width:90%;padding:5px;"
placeholder="http(s)://...lattitude,longitude... or 28.491177530557465,77.12099871070163, or 28°29'28.6&quot;N,77°07'16.4&quot;E"></textarea>

<div id="md_collected_coords"></div>
<div id="md_digipin_output">
  <!-- Digipin (click to copy) -->
  (click <span class="twemoji"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 21H8V7h11m0-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m-3-4H4a2 2 0 0 0-2 2v14h2V3h12z"/></svg></span> to copy)
  <pre style="width:20em"><span></span><code></code></pre>
</div>

## DIGIPIN to Maps

<textarea id="dm_digipin"
type="text"
style="border:2px solid; outline:none; width:90%;padding:5px;"
placeholder="Enter DIGIPIN, e.g. 39J-L84-TF4F or 39JL84TF4F"></textarea>

<div id="dm_calculated_coords">(click <span class="twemoji"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 21H8V7h11m0-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m-3-4H4a2 2 0 0 0-2 2v14h2V3h12z"/></svg></span> to copy)</div>
<div id="dm_calculated_coords_copy">
  <pre style="width:20em"><span></span><code></code></pre>
</div>
<div id="dm_maps_url_output">
  <a href=""></a>
</div>
<div id="dm_google_maps_url_output">
  <a href=""></a>
</div>

---

Courtesy of <https://github.com/CEPT-VZG/digipin/>

This tool is unaffiliated from Google Maps, Apple Maps, Department of Posts (GOI) and any entities who developed DIGIPIN. The data may be inaccurate. The reliable source is <https://dac.indiapost.gov.in/mydigipin/home>

<https://app.indiapost.gov.in/enterpriseportal/digipin>

Full license of the [digipin.js file](/javascripts/libs/digipin.js) (Copyright 08.04.2025 Department of Posts) is present in [license file](/javascripts/libs/LICENSE). Rest of the code follows the top level repo license.
