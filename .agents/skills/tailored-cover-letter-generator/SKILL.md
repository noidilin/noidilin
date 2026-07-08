---
name: tailored-cover-letter-generator
description: Generates concise job-specific cover letters from a target job description and an existing resume, emphasizing credible frontend-engineer fit. Supports reading a job/application markdown file such as @cover-letters/company-role.md and writing the result back into its cover letter section.
---

# Tailored Cover Letter Generator

## When to Use This Skill

- Applying to a specific job and needing a tailored cover letter
- Turning an existing public resume into a role-specific application narrative
- Highlighting the strongest matching experience for one company or position
- Adapting tone and emphasis for different employers without rewriting the resume itself
- Preparing a concise, credible motivation letter for frontend or adjacent product-engineering roles
- Updating an application tracking markdown file, such as `@cover-letters/company-role.md`, by reading its job requirements and filling its cover letter section

## What This Skill Does

1. **Analyzes The Job Description**: Extracts required skills, responsibilities, product context, and likely hiring priorities
2. **Uses The Resume As Evidence**: Pulls only supported experience from the user's existing resume or YAMLResume sections
3. **Builds A Focused Narrative**: Selects 2 to 4 of the strongest proof points and turns them into a coherent cover letter
4. **Optimizes Relevance**: Uses role-relevant language and keywords naturally, without sounding templated
5. **Handles Gaps Honestly**: Reframes adjacent or transferable experience when direct matches are limited
6. **Produces Application-Ready Copy**: Returns a polished, concise cover letter, with optional variants only when requested
7. **Updates Application Files When Requested**: If the user provides a file path and asks to write into it, reads the job requirements from that file and edits only the cover letter section

## Default Workflow

When a user requests a job-specific cover letter:

1. Read the job description and identify the role title, company, and hiring priorities
2. Read the existing resume or relevant YAMLResume sections as the source of truth
3. Select the strongest matching experience, skills, and achievements
4. Build a letter around concrete evidence instead of generic enthusiasm
5. Return a polished cover letter tailored to that role only
6. Add notes, variants, or talking points only if the user explicitly asks for them

When a user provides an application file path, such as `@cover-letters/hong-yac.md`, and asks to write the letter into that file:

1. Treat the path as the target application file; resolve `@path` to a repository-relative file path when supported by the harness or by context
2. Read the file and extract the company, role, and job requirements from sections such as `## Job Description`, `## Requirements`, `## Role`, or equivalent headings; if a `## Source` section exists, use it only for provenance/context, not as a substitute for the JD
3. Read the existing resume or relevant YAMLResume sections as the source of truth
4. Generate the tailored cover letter using the normal rules in this skill
5. Locate a section named `## Cover Letter`, `## Motivation Letter`, or a clearly equivalent section
6. Replace only that section's placeholder/body while preserving all other file content, headings, notes, and job details
7. If the target section is missing or ambiguous, ask the user whether to add a new section or which section to update before editing

## Inputs This Skill Expects

Prefer these inputs, in order of importance:

- The full job description, or a file path containing the job description, such as `@cover-letters/company-role.md`
- A collector-prepared application file with `## Source`, `## Job Description`, and `## Cover Letter` sections
- Company name and role title, either provided directly or discoverable in the target file
- Existing resume, YAMLResume file, or relevant sections like `content.work`, `content.projects`, `content.skills`, and `content.basics`
- Target language if multiple resume versions exist
- Optional tone, length, or emphasis preferences
- Optional instruction to write the generated letter back into a specific section of the target file

If the user does not provide a full resume, use the provided background as evidence and state where details are thin.

For this repository, prefer `resumes/resume-en.yml` for English applications and `resumes/resume-zh-TW.yml` for Traditional Chinese applications unless the user specifies a different resume file.

## Source-Of-Truth Rules

- The existing resume is the factual source of truth
- Do not invent experience, tools, responsibilities, metrics, or domain knowledge
- If a requirement is only partially supported, frame it honestly as adjacent or transferable experience
- Prefer evidence from `work` and `projects` over unsupported claims from memory or generic role assumptions
- Do not rewrite the public resume as part of this workflow unless the user explicitly asks for that separately

## Repo-Specific Writing Rules

Follow these authoring rules for this repo:

- Present the candidate as a frontend engineer in the present tense
- Keep a cohesive frontend-engineer voice even when drawing on finance, design, or creative experience
- Use direct action language rooted in engineering impact, product delivery, and user-facing value
- Favor recruiter-friendly frontend terms such as `admin dashboard`, `customer-facing flows`, `auth/session handling`, `typed API integration`, `responsive layouts`, and `export/reporting workflows`
- Treat finance and design background as supporting differentiators, not as competing identities
- Keep language concise, specific, and credible
- Avoid filler like `I am passionate`, `I am excited to apply`, or broad praise with no substance unless the tone explicitly calls for it

## How To Analyze The Job Description

Extract and prioritize:

- Must-have technical skills and tools
- Product surfaces or workflow hints, such as dashboards, payments, account management, reporting, or internal tooling
- Collaboration expectations, such as cross-functional work, stakeholder communication, or ownership
- Domain context, such as SaaS, fintech, ecommerce, healthcare, or B2B platforms
- Repeated terms that reveal what the employer cares about most

Build a simple priority map:

- Priority 1: Core requirements that should appear directly in the letter if supported
- Priority 2: Strong supporting qualifications that reinforce fit
- Priority 3: Nice-to-have areas that can be addressed briefly or omitted if weakly supported

## How To Map Resume Evidence

For each important requirement:

- Find the most credible supporting example from `work` or `projects`
- Prefer recent, production-facing experience over older or less relevant background
- Use one concrete outcome, workflow, or implementation detail when possible
- If no direct match exists, choose the closest transferable evidence and frame it carefully
- Avoid stuffing every keyword into the letter; select only the strongest support

## Letter Structure

Default structure:

### Paragraph 1

- Name the role and company
- State the strongest high-level reason the candidate fits
- Ground interest in product, scope, or role shape rather than generic praise

### Paragraph 2

- Lead with the most aligned evidence from recent work or projects
- Connect that evidence to the employer's likely needs
- Use one or two concrete systems, workflows, or product surfaces at most

### Paragraph 3

- Reinforce fit in one sentence
- Express interest in discussing how the candidate can contribute
- Keep the close brief and professional

Prefer three short paragraphs by default. Add a fourth paragraph only when the user explicitly asks for a longer version.

## Tone And Length

- Default to a concise professional cover letter
- Aim for roughly 150 to 220 words unless the user requests otherwise
- Prefer three short paragraphs over a comprehensive multi-paragraph narrative
- Prioritize clarity, specificity, and relevance over completeness
- Sound specific and thoughtful, not theatrical or overly formal
- Match the company tone when the job description strongly suggests it, while preserving credibility

## What To Avoid

- Do not copy resume bullets verbatim into paragraph form
- Do not list every skill or project just because it appears in the resume
- Do not flatter the company generically without linking it to role fit
- Do not overemphasize unrelated experience that weakens the frontend narrative
- Do not overclaim seniority, leadership scope, or domain expertise
- Do not write a vague letter that could be sent to any employer
- Do not exceed 220 words by default
- Do not append meta commentary, analysis, or proof-point notes unless requested

## Output Format

Default output should include:

1. A tailored cover letter in plain prose

If the user explicitly asks to update a file, edit the file instead of only returning prose. After editing, respond with a concise confirmation that names the updated file and section. Do not include analysis or proof-point notes unless requested.

Only include extras when explicitly requested, such as:

- a shorter version
- a more formal version
- a more technical version
- interview talking points derived from the letter
- a brief note on the main evidence used to shape the letter

## Example

### Direct Prompt Example

**User Request:**

```text
Write a cover letter for this frontend engineer role.

Company: ExampleSoft
Role: Frontend Engineer

Job Description:
- Build customer-facing web experiences in React and TypeScript
- Collaborate with product, design, and backend teams
- Improve internal dashboards and operational workflows
- Experience with modern frontend architecture and API integration preferred

Use my existing YAMLResume as the source of truth.
```

**Generated Output:**

```text
Dear Hiring Team,

I am applying for the Frontend Engineer role at ExampleSoft. My background aligns well with your mix of customer-facing product work, internal dashboard improvements, and modern React and TypeScript development. I currently build frontend features across user-facing flows and operational tools with a focus on maintainable architecture, typed API integration, and reliable UX.

In recent work, I have delivered dashboards, account and support flows, and export-oriented workflows that required close collaboration with product, design, and backend partners. That experience maps well to your need for someone who can improve internal operations while continuing to strengthen the customer experience.

I would welcome the opportunity to discuss how I could contribute to ExampleSoft's frontend platform and product experience.

Sincerely,
[Your Name]
```

**Why this works:**

- Connects the role directly to supported frontend experience
- Uses concrete product and workflow evidence instead of generic claims
- Keeps the tone specific, professional and role-focused

### File Update Example

**User Request:**

```text
Use tailored-cover-generator on @cover-letters/hong-yac.md.
Read the job description in that file and write the result into the cover letter section.
Use resumes/resume-en.yml as the source of truth.
```

**Expected File Shape:**

```md
# Hong Yac Frontend Engineer Application

## Job Description

...

## Cover Letter

TODO
```

**Agent Behavior:**

- Read `cover-letters/hong-yac.md`
- Extract company, role, and job requirements from the file
- Read `resumes/resume-en.yml`
- Generate a concise tailored cover letter
- Replace only the body under `## Cover Letter`
- Preserve the job description and any other notes in the file
- If `## Cover Letter` does not exist, ask before adding or editing a different section

## Strategic Recommendations

After producing the letter, optionally include these only when requested:

- **Strongest Proof Points**: The 2 to 4 pieces of evidence carrying the application
- **Gap Notes**: Requirements that are only partially covered and how to frame them honestly
- **Interview Hooks**: Stories worth preparing based on the letter's claims
- **Variant Ideas**: Ways to shift tone toward more technical, product-focused, or formal language

## Best Practices

- Use the resume as evidence, not as text to be copied
- Build the letter around relevance, not completeness
- Prefer one or two strong examples over a long list of shallow claims
- Keep the role/company references specific enough that the letter feels genuinely tailored
- Preserve the candidate's established voice and market positioning
- If the job description is weak or vague, infer priorities carefully and state assumptions through the letter's emphasis rather than explicit caveats

## Privacy Note

This skill uses personal resume content and job application materials to generate a tailored cover letter. Always review the final letter before sending it to ensure the claims, tone, and role emphasis are accurate and appropriate.
