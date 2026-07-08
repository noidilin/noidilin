---
name: job-description-collector
description: Collects job descriptions from recruiting-site URLs or pasted postings and creates cover-letter-ready markdown files. Use when the user asks to collect JD/JD links/job postings/recruiting-site roles into `cover-letters/` for a later cover-letter agent.
---

# Job Description Collector

## Purpose

Prepare one application handoff file per explicitly provided job posting so `tailored-cover-letter-generator` can later read the JD and replace only the `## Cover Letter` section.

Do **not** discover roles by default. Collect only from URLs, screenshots, copied text, or job records the user explicitly provides.

## Default Workflow

1. Resolve `@cover-letters/` to repository path `cover-letters/`.
2. For each supplied job:
   - Capture the recruiting-site source URL when available.
   - Fetch public pages with available browser/fetch tools.
   - If the page is dynamic, login-gated, expired, or blocks extraction, ask the user for pasted JD text instead of bypassing access controls.
   - Extract company, role title, location/remote status, employment type, language, and recruiting site when present.
   - Preserve the full JD wording with only light cleanup: remove navigation, ads, cookie text, repeated UI chrome, and unrelated recommendations.
   - Preserve bilingual text and employer-specific phrasing.
3. Create a new markdown file directly under `cover-letters/`.
4. Never overwrite an existing application file unless the user explicitly asks. If a filename collides, append a short disambiguator.
5. Report created file paths and any incomplete captures.

## File Naming

Use lowercase ASCII slugs:

```text
cover-letters/{role-family}-{company-slug}.md
```

Examples:

- `cover-letters/frontend-pic-collage.md`
- `cover-letters/devops-hytech.md`
- `cover-letters/sre-linker-vision.md`
- `cover-letters/cloud-nyx.md`

Choose the most recruiter-visible role family from the title (`frontend`, `backend`, `fullstack`, `devops`, `sre`, `cloud`, `data`, `ai`, etc.).

## Required File Shape

Each collected file must use this shape:

```md
# {Company} {Role Title}

## Source

- URL: {source URL or `N/A - pasted by user`}
- Site: {recruiting site or `Unknown`}
- Collected: {current date in YYYY-MM-DD}
- Language: {English / Traditional Chinese / Bilingual / Unknown}
- Location: {location/remote text or `Unknown`}
- Employment type: {full-time/contract/intern/etc. or `Unknown`}
- Status: JD collected; cover letter pending

## Job Description

{Lightly cleaned full job description. Preserve responsibilities, requirements,
benefits, salary, and company notes when present.}

## Cover Letter

TODO
```

Use `## Job Description` exactly, not `## Requirement`, for new files.
Use `## Cover Letter` exactly with `TODO` as the only body.

## Quality Checklist

Before finishing, verify:

- [ ] The file is under `cover-letters/`, not `cover-letters/done/`.
- [ ] The title includes both company and role.
- [ ] Source URL or pasted-source note is recorded.
- [ ] JD text is full enough for tailoring, not only a summary.
- [ ] No unrelated page chrome remains.
- [ ] `## Cover Letter` exists and contains only `TODO`.
- [ ] Existing files were not overwritten accidentally.

## Handoff Notes

Keep any collector uncertainty outside the cover letter section, either in `## Source` or a short `## Collector Notes` section before `## Cover Letter`. Useful notes include expired links, missing salary, unclear seniority, or incomplete extraction. Do not pre-write the cover letter or insert resume-matching analysis unless the user asks.
