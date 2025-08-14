---
title: Ombudsman portal Reserve Bank of India Vulnerability 2024
date:
  created: 2025-08-14
  updated: 2025-08-14
---

The CMS portal (<https://cms.rbi.org.in>) for the Ombudsman scheme of the RBI had a
vulnerability in an API which allowed serial access to the complaint acknowledgement files.

Summary of the vulnerabilities:

| Sr | API  | Date reported | Date fixed | Days taken | CERT-in reference number |
|----|------|---------------|------------|------------|--------------------------|
| 1  | [PDFFileDownload](#1-pdffiledownload) | 15 December 2024 | before 19 December 2024 | less than 4 | 46947024 |

The vulnerability was fixed very promptly.

### 1. PDFFileDownload

This API accepted a query parameter `caseId` and provided the PDF file
containing name, email, phone number and address of the complainant with
some complaint details.

Typically, the same content is sent via email to the complainant after registration of a complaint.

```bash title="sample_script.sh" linenums="1"
curl 'https://cms.rbi.org.in/rbi/api/rbipdfapi/PDFFileDownload?caseId=5683001&objectType=9&templateId=5608' \
 -o "rbi_vuln.pdf"
```

!!! note "Sample response"
    [Open full PDF](./contents_cms_rbi/cms_rbi_vuln_1.pdf)

    ![pdf](./contents_cms_rbi/cms_rbi_vuln_1.pdf){ type=application/pdf  }
