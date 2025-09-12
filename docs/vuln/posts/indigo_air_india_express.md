---
title: Indigo Vulnerability 2022-2024 and Air india vulnerability 2025
date:
  created: 2025-08-13
  updated: 2025-09-12
---

Interglobe Indigo's manage booking portal(<https://www.goindigo.in/edit-booking.html>) and Air India Express (<https://www.airindiaexpress.com/manage>)
leaked a passenger's number, email, date of birth
address and emergency contact information by a PNR and name of a passenger. Even though the content is masked in the UI,
the network activity shows the full data.

This was originally reported to Indigo in 2022 but was not fixed.

- Tweet by [@_sirius93](https://twitter.com/_sirius93_) exposing this vulnerability in 2022 <https://twitter.com/_sirius93_/status/1508423479594733568>
- Tweet by Indigo denying this and not fixing the issue <https://twitter.com/IndiGo6E/status/1508748146717130758>
- News covering this incident

      - <https://economictimes.indiatimes.com/magazines/panache/how-indigo-passenger-hacked-into-carriers-website-to-track-his-missing-luggage-airline-responds/articleshow/90567643.cms?from=mdr>
      - <https://www.bbc.com/news/world-asia-india-60937480>
      - <https://www.ndtv.com/offbeat/indigos-response-after-techie-hacks-website-to-find-lost-luggage-2853781>
      - <https://www.livemint.com/news/india/passenger-hacks-indigo-s-website-to-find-lost-bag-airline-responds-11648690601840.html>

After reporting via email to Indigo in July 2024, an incomplete fix was implemented.

After reporting to CERT in November 2024, Indigo implemented a complete fix.

Air India warns its customers to not display PNR online in its tweets and asks them to share it via DMs.

Summary of the vulnerabilities:

| Sr | API  | Date reported | Date fixed | Days taken | CERT-in reference number |
|----|------|---------------|------------|------------|--------------------------|
| 1  | [Indigo itinerary](#1-indigo-itinerary)  | 28 March 2022, 22 July 2024, 23 November 2024 | December 2024 | 1009, 162, 39 | 64401624 |
| 2  | [Air India RetrieveData](#2-air-india-retrievedata)  | 2 August 2025 | September 2024 | 30 | 25019125 |

Root cause in [OWASP](https://cheatsheetseries.owasp.org/index.html) terms:

- A01 2021 Broken Access Control: CWE-284 Improper Access Control, CWE-285 Improper Authorization
- A07 2021 Identification and Authentication Failures: CWE-287 Improper Authentication, CWE-613 Insufficient Session Expiration

<!-- more -->

### 1. Indigo itinerary

```text
https://api-prod-itinerary-skyplus6e.goindigo.in/v1/itinerary
```

<details>
<summary> Sample response</summary>
```json linenums="1" hl_lines="750-820"
---8<--- "docs/vuln/posts/content_indigo/indigo_vuln_1.json"
```
</details>

### 2. Air India RetrieveData

```bash title="sample_script.sh" linenums="1"
time=$(date '+%F_%T')
curl 'https://api.airindiaexpress.com/b2c-CheckIn/v2/mmb/retrieve/byRecordLocator' \
  -X POST \
  -H 'Ocp-Apim-Subscription-Key: fe65ec9eec2445d9802be1d6c0295158' \
  --data-raw '{"addtnlDetail":"$$$$$$$$$$","recordLocator":"$$$$$$$$$$","sessionType":"WebAnonUser"}' \
  -o bookings_$time.json
```

<details>
<summary> Sample response</summary>
```json linenums="1" hl_lines="119-190"
---8<--- "docs/vuln/posts/content_indigo/air_india_vuln_1.json"
```
</details>
