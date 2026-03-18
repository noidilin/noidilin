---
name: tailored-cv-generator
description: Generates job-specific cover letters from a target job description and an existing resume, emphasizing credible frontend-engineer fit
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
6. **Produces Application-Ready Copy**: Returns a polished cover letter, with optional shorter or more formal variants

## Default Workflow

When a user requests a job-specific CV letter:

1. Read the job description and identify the role title, company, and hiring priorities
2. Read the existing resume or relevant YAMLResume sections as the source of truth
3. Select the strongest matching experience, skills, and achievements
4. Build a letter around concrete evidence instead of generic enthusiasm
5. Return a polished cover letter tailored to that role only
6. Optionally add brief notes on gaps, talking points, or alternative emphasis choices

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

### Opening

- Name the role and company
- State the strongest high-level reason the candidate fits
- Ground interest in product, scope, or role shape rather than generic praise

### Body Paragraph 1

- Lead with the most aligned experience
- Connect the user's work to the employer's likely needs
- Mention concrete systems, workflows, or product surfaces when useful

### Body Paragraph 2

- Add a second differentiator, such as design systems, localization, admin tooling, dashboards, auth/session flows, or customer-facing UX
- Show how this differentiator improves delivery quality, maintainability, or user outcomes

### Closing

- Reinforce fit in one sentence
- Express interest in discussing how the candidate can contribute
- Keep the close professional and concise

## Tone And Length

- Default to a concise professional cover letter
- Aim for roughly 250 to 400 words unless the user requests otherwise
- Sound specific and thoughtful, not theatrical or overly formal
- Match the company tone when the job description strongly suggests it, while preserving credibility

## What To Avoid

- Do not copy resume bullets verbatim into paragraph form
- Do not list every skill or project just because it appears in the resume
- Do not flatter the company generically without linking it to role fit
- Do not overemphasize unrelated experience that weakens the frontend narrative
- Do not overclaim seniority, leadership scope, or domain expertise
- Do not write a vague letter that could be sent to any employer

## Output Format

Default output should include:

1. A tailored cover letter in plain prose
2. A brief note on the main evidence used to shape the letter
3. Optional alternatives such as:
   - shorter version
   - more formal version
   - more technical version
   - interview talking points derived from the letter

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

I am applying for the Frontend Engineer role at ExampleSoft. My background aligns closely with the combination of customer-facing product work, internal operational tooling, and modern React development described in the role. I currently build frontend features across admin dashboards and user-facing applications using React, Next.js, TypeScript, and typed API integrations, with a strong focus on maintainable architecture and reliable UX.

In recent work, I have delivered both operational and customer-facing product flows, including data management interfaces, payment-related experiences, account settings, support flows, and export workflows. That mix of responsibilities has required balancing implementation detail with broader product concerns such as auth and session handling, localization, responsive layouts, and consistency across complex UI states. It also matches well with your emphasis on improving dashboards while continuing to strengthen the customer experience.

I would also bring a cross-disciplinary perspective shaped by design and visual production work, which helps me build interfaces with strong usability and clarity while still keeping engineering quality high. I value close collaboration with design, product, and backend partners, and I am comfortable turning product requirements into frontend systems that are scalable, predictable, and easy to extend.

I would welcome the opportunity to discuss how I could contribute to ExampleSoft's frontend platform and product experience.

Sincerely,
[Your Name]
```

**Why this works:**

- Connects the role directly to supported frontend experience
- Uses concrete product and workflow evidence instead of generic claims
- Keeps the tone specific, professional, and role-focused

## Strategic Recommendations

After producing the letter, optionally include:

- **Strongest Proof Points**: The 2 to 4 pieces of evidence carrying the application
- **Gap Notes**: Requirements that are only partially covered and how to frame them honestly
- **Interview Hooks**: Stories worth preparing based on the letter's claims
- **Variant Ideas**: Ways to shift tone toward more technical, product-focused, or formal language

## Best Practices

- Use the resume as evidence, not as text to be copied
- Build the letter around relevance, not completeness
- Prefer two strong examples over six shallow claims
- Keep the role/company references specific enough that the letter feels genuinely tailored
- Preserve the candidate's established voice and market positioning
- If the job description is weak or vague, infer priorities carefully and state assumptions through the letter's emphasis rather than explicit caveats

## Privacy Note

This skill uses personal resume content and job application materials to generate a tailored cover letter. Always review the final letter before sending it to ensure the claims, tone, and role emphasis are accurate and appropriate.
