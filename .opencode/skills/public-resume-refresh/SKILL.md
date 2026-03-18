---
name: public-resume-refresh
description: Refreshes an existing YAMLResume-based public resume for broad market visibility, recruiter scanning, and merge-in section updates
---

# Public Resume Refresh

## When to Use This Skill

- Updating a public-facing resume used on job-market websites
- Refreshing an existing YAMLResume file without rewriting the whole document
- Repositioning a resume for a broader frontend-engineer market, not one specific job posting
- Improving recruiter readability, ATS keyword coverage, and market fit
- Tightening summaries, skills, work bullets, and project highlights while preserving the existing structure
- Producing patch-ready YAML snippets that can be merged into the current resume

## What This Skill Does

1. **Uses Existing Resume As Source of Truth**: Starts from the current YAMLResume file instead of generating a brand-new resume from scratch
2. **Refreshes Market Positioning**: Updates language so the resume reads strongly for the target role family and public job-market context
3. **Improves Discoverability**: Strengthens durable keywords for recruiter search and ATS scanning without overfitting to one job ad
4. **Preserves YAMLResume Structure**: Works within schema-valid sections and existing repo conventions
5. **Returns Merge-In Updates**: Produces only changed sections or snippets, not a full file unless explicitly requested
6. **Flags Weaknesses**: Identifies stale bullets, weak evidence, duplicated ideas, thin metrics, and misplaced content between sections

## Default Workflow

When a user requests a resume refresh:

1. Read the existing YAMLResume file first
2. Infer the current positioning, strongest evidence, and stale or weak areas
3. Identify the target market direction, such as frontend engineer, React engineer, design engineer, or product-focused frontend
4. Refresh only the sections that need improvement
5. Return YAML snippets that can be merged into the existing resume
6. Briefly explain why the changes improve public-market fit

## Inputs This Skill Expects

Prefer these inputs, in order of importance:

- Existing YAMLResume file or relevant section content
- Target role family or market direction
- Language or locale if multiple resume versions exist
- Emphasis preferences, such as React, Next.js, B2B SaaS, design systems, design engineering, dashboards, or customer-facing flows
- Constraints such as page length, sections to keep stable, or sections to avoid touching

Do not require a job description by default.

If critical direction is missing, ask only for the minimum needed to decide positioning.

## YAMLResume Rules

Treat YAMLResume as the output contract.

- Default output is YAML snippets for merge-in updates
- Preserve existing top-level structure unless the user explicitly asks for structural changes
- Prefer editing schema-valid sections only, such as:
  - `content.basics`
  - `content.profiles`
  - `content.education`
  - `content.skills`
  - `content.work`
  - `content.projects`
  - `content.languages`
  - `content.interests`
  - optional sections like `content.awards`, `content.certificates`, `content.volunteer`, `content.publications`, `content.references`, `content.location`
- Preserve existing `locale` and `layouts` configuration unless the user explicitly asks to change them
- Keep reverse chronological order for `education`, `work`, and `projects`
- Use valid field names and schema-safe values for fields like `degree`, `fluency`, and profile `network`
- Prefer multiline `summary: |` blocks with `-` bullets when updating summary-style content

## Repo-Specific Resume Rules

Follow these authoring rules for this repo:

- Keep a cohesive frontend-engineer voice across the resume
- Present the candidate in the present tense as a frontend engineer
- Let finance and design background support the frontend story, not compete with it
- Keep `work` and `projects` intentionally separate:
  - `work` should describe employer-level scope, ownership, and responsibilities
  - `projects` should emphasize implementation details, product surfaces, and technical execution
- Use direct action verbs such as `Built`, `Developed`, `Implemented`, `Designed`, `Integrated`, `Improved`, `Automated`, and `Delivered`
- Favor recruiter-friendly frontend terms such as `admin dashboard`, `customer-facing flows`, `account management`, `auth/session handling`, `typed API integration`, `responsive layouts`, and `export/reporting workflows`
- Keep bullets concise, specific, and truthful
- Quantify results when the user has real numbers; never invent metrics

## How to Refresh Each Section

### `content.basics.summary`

- Keep it broad enough for a public profile, not tailored to one employer
- Lead with current frontend identity and role level
- Highlight 2 to 4 durable strengths that map to the target market
- Use summary bullets that reinforce architecture, UX reliability, delivery, and cross-functional value

### `content.skills`

- Group skills into clear recruiter-scan categories
- Put the most marketable and best-supported frontend skills first
- Use keywords that reflect real experience already evidenced elsewhere in the resume
- Avoid bloated lists of tools with no proof in `work` or `projects`

### `content.work`

- Emphasize ownership, scope, product domain, and business-facing impact
- Keep bullets broad enough for a public profile while still concrete
- Show systems thinking, maintainability, type safety, localization, auth/session handling, data flows, and operational tooling where relevant
- Reorder bullets so the strongest market-facing evidence appears first

### `content.projects`

- Use projects for implementation detail and technical differentiation
- Highlight stacks, product surfaces, workflows, and engineering depth
- Keep overlap with `work` low; projects should deepen the story rather than repeat it

### `content.education`, `content.languages`, `content.interests`

- Refresh only when they materially improve positioning or remove noise
- Keep these sections concise and supportive of the main frontend narrative

## What to Avoid

- Do not rewrite the resume around one job posting unless the user explicitly asks for that mode elsewhere
- Do not output Markdown resume bodies as the default deliverable
- Do not recommend functional or hybrid resume formats for this workflow
- Do not change `layouts` or section order unless the user requests it
- Do not fabricate achievements, metrics, tools, or responsibilities
- Do not duplicate the same point across `work` and `projects`
- Do not replace broad-market positioning with overly niche phrasing unless the user explicitly wants that niche

## Output Format

Default output should include:

1. Changed YAML sections or snippets only
2. A short note describing what was improved and why
3. Optional observations about missing metrics, weak bullets, or content that should move between `work` and `projects`

Do not emit a full resume unless the user explicitly asks for it.

## Example

**User Request:**

```text
Refresh my public resume for general frontend engineer roles.
Keep the overall structure, but improve the summary and skills sections.
Use my existing YAMLResume file as the base.
```

**Generated Output:**

```yaml
content:
  basics:
    summary: |
      - Frontend engineer with experience building admin dashboards and customer-facing product flows with modern React-based stacks
      - Develops maintainable interfaces with strong attention to type safety, responsive behavior, localization, and reliable UX
      - Brings cross-disciplinary strength in design systems, visual clarity, and delivery workflows to ship polished product experiences
  skills:
    - name: Front-end
      level: Intermediate
      keywords:
        - HTML/CSS/JavaScript
        - TypeScript
        - React
        - Next.js
        - SSR/SSG/ISR
        - shadcn/ui
        - Responsive Design
        - Three.js
    - name: State & Data
      level: Intermediate
      keywords:
        - TanStack Query
        - Zustand
        - Axios
        - Typed API Integration
        - Localization
    - name: Design & Creative Technology
      level: Expert
      keywords:
        - Figma
        - Blender
        - Unreal Engine 5
        - Motion Design
```

**Why these changes help:**

- Makes the summary broader and stronger for public-market frontend roles
- Improves recruiter scanning by grouping high-signal skills more clearly
- Keeps the output mergeable into an existing YAMLResume file

## Strategic Recommendations

After producing snippets, optionally include:

- **Positioning Notes**: What role family the resume currently signals most strongly
- **Weak Spots**: Bullets that are too vague, too long, duplicated, or insufficiently technical
- **Evidence Gaps**: Places where metrics or concrete outcomes would improve credibility
- **Section Hygiene**: Suggestions to move content from `work` to `projects` or the reverse when the distinction is blurry

## Best Practices

- Edit the smallest set of sections needed to improve the resume
- Prefer tightening and reframing over rewriting everything
- Preserve the user's established structure and voice where possible
- Use exact, credible wording over inflated claims
- Keep public-market language broad enough to support multiple relevant frontend opportunities
- If multiple languages exist, update the correct locale-specific file or clearly say which version the snippet targets

## Privacy Note

This skill works with personal and professional resume content. Always review generated snippets before merging them into the public resume to confirm accuracy, tone, and comfort with what is being disclosed.
