---
name: tailored-cv-generator
description: Generates concise job-specific cover letters from a target job description and an existing resume, emphasizing credible frontend-engineer fit
---

# Tailored CV Generator

## When to Use This Skill

- Applying to a specific job and needing a tailored cover letter
- Turning an existing public resume into a role-specific application narrative
- Highlighting the strongest matching experience for one company or position
- Adapting tone and emphasis for different employers without rewriting the resume itself
- Preparing a concise, credible motivation letter for frontend or adjacent product-engineering roles

## What This Skill Does

1. **Analyzes The Job Description**: Extracts required skills, responsibilities, product context, and likely hiring priorities
2. **Uses The Resume As Evidence**: Pulls only supported experience from the user's existing resume or YAMLResume sections
3. **Builds A Focused Narrative**: Selects 2 to 4 of the strongest proof points and turns them into a coherent cover letter
4. **Optimizes Relevance**: Uses role-relevant language and keywords naturally, without sounding templated
5. **Handles Gaps Honestly**: Reframes adjacent or transferable experience when direct matches are limited
6. **Produces Application-Ready Copy**: Returns a polished, concise cover letter, with optional variants only when requested

## Default Workflow

When a user requests a job-specific CV letter:

1. Read the job description and identify the role title, company, and hiring priorities
2. Read the existing resume or relevant YAMLResume sections as the source of truth
3. Select the strongest matching experience, skills, and achievements
4. Build a letter around concrete evidence instead of generic enthusiasm
5. Return a polished cover letter tailored to that role only
6. Add notes, variants, or talking points only if the user explicitly asks for them

## Inputs This Skill Expects

Prefer these inputs, in order of importance:

- The full job description
- Company name and role title
- Existing resume, YAMLResume file, or relevant sections like `content.work`, `content.projects`, `content.skills`, and `content.basics`
- Target language if multiple resume versions exist
- Optional tone, length, or emphasis preferences

If the user does not provide a full resume, use the provided background as evidence and state where details are thin.

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

Only include extras when explicitly requested, such as:
- a shorter version
- a more formal version
- a more technical version
- interview talking points derived from the letter
- a brief note on the main evidence used to shape the letter

## Example

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
- Keeps the tone specific, professional, and role-focused

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
