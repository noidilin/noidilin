---
name: tailored-cover-letter-generator
description: Generates concise job-specific cover letters from a target job description and an existing resume. Routes supported role families and locales through deterministic reference templates, with generic fallback behavior for role families that do not yet have templates.
---

# Tailored Cover Letter Generator

## When to Use This Skill

- Applying to a specific job and needing a tailored cover letter
- Turning an existing public resume into a role-specific application narrative
- Highlighting the strongest matching experience for one company or position
- Adapting tone and emphasis for different employers without rewriting the resume itself
- Preparing a concise, credible motivation letter for frontend, cloud, SRE, DevOps, or adjacent engineering roles
- Updating an application tracking markdown file, such as `@cover-letters/company-role.md`, by reading its job requirements and filling its cover letter section

## What This Skill Does

1. **Analyzes The Job Description**: Extracts required skills, responsibilities, product context, and likely hiring priorities
2. **Uses The Resume As Evidence**: Pulls only supported experience from the user's existing resume or YAMLResume sections
3. **Builds A Focused Narrative**: Uses two role-family proof sources in a fixed order and adapts their approved facts to the JD
4. **Optimizes Relevance**: Uses role-relevant language and keywords naturally within a deterministic scaffold
5. **Handles Gaps Honestly**: Reframes adjacent or transferable experience when direct matches are limited
6. **Produces Application-Ready Copy**: Returns a polished, concise cover letter, with optional variants only when requested
7. **Updates Application Files When Requested**: If the user provides a file path and asks to write into it, reads the job requirements from that file and edits only the cover letter section

## Default Workflow

When a user requests a job-specific cover letter:

1. Read the job description and identify the company, role, locale, and hiring priorities.
2. Read the matching locale resume or relevant YAMLResume sections as the factual source of truth.
3. Classify the role family using the routing table below.
4. If matching family references exist, read the family's proof file and exactly one locale scaffold before drafting. Loading both references is mandatory for a supported family and locale.
5. Internally populate the complete common slot contract from the locked proofs before writing prose. Do not expose the slot map unless requested.
6. Compose against the loaded scaffold, preserving its sentence purposes and mostly fixed connective wording.
7. Run the factuality, structure, language, and length checks in this skill.
8. Return only the polished letter unless extras were explicitly requested.

When a user provides an application file path, such as `@cover-letters/hong-yac.md`, and asks to write the letter into that file:

1. Resolve the path and extract the company, role, locale, and requirements from the application file. Treat `## Source` as provenance, not as a substitute for the JD.
2. Follow the normal classify → load family references → populate slots → compose → validate workflow.
3. Locate `## Cover Letter`, `## Motivation Letter`, or a clearly equivalent section.
4. Replace only that section's body and preserve all other content.
5. If the target section is missing or ambiguous, ask before adding or editing a different section.

## Template Routing

Map the dominant JD responsibilities to one family slug, then resolve both:

```text
references/templates/{family}.proofs.md
references/templates/{family}.{locale}.md
```

| Family | Dominant signals | Slug |
| --- | --- | --- |
| Frontend | Browser product interfaces, React/Vue, UI systems, frontend architecture, web visualization | `frontend` |
| Cloud | Cloud application/service development, cloud architecture, AWS service integration, full-cycle cloud feature delivery | `cloud` |
| SRE/DevOps | CI/CD, infrastructure as code, platform provisioning, reliability, observability, service operations, incidents, on-call | `sre-devops` |

Locale slugs currently supported are `en` and `zh-TW`.

Routing rules:

- Honor an explicit user choice of family or locale.
- Otherwise choose the family represented by the largest share of core responsibilities, not title alone.
- For a close Cloud versus SRE/DevOps tie, apply the operational-duty test: route to SRE/DevOps when on-call, incidents, SLI/SLO ownership, service operations, reliability operations, or infrastructure ownership are core duties; otherwise route cloud service building and architecture to Cloud.
- For bilingual application files, use explicit language metadata when it selects one language. If metadata says bilingual, default Taiwan 104 postings to `zh-TW` and English-only career sites to `en`.
- Load one shared role-family proof file plus exactly one locale scaffold for each requested output locale. When the user requests both locales, reuse the proof file and run a separate render pass against each scaffold.
- A family is template-supported only when both its proof file and requested locale scaffold exist. Otherwise use the generic rules in this skill.
- Never substitute one family's references for another missing family.

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

- Present the candidate in the role identity selected for the target family; for frontend templates, use a cohesive frontend-engineer identity in the present tense.
- Use direct action language rooted in engineering impact, product delivery, and user-facing value.
- For frontend roles, favor supported recruiter-friendly terms such as `admin dashboard`, `customer-facing flows`, `typed API integration`, `responsive layouts`, and `export/reporting workflows` when they match the JD.
- Treat finance, design, creative technology, platform, and AI-agent experience as supporting differentiators rather than competing identities.
- Keep language concise, specific, and credible.
- Reuse a small number of high-priority JD terms exactly when the resume supports them. Do not produce a stack list.
- Avoid filler such as `I am passionate`, `I am excited to apply`, or unsupported company praise.

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

For a template-supported role family:

- Use the two sources declared by `{family}.proofs.md`; both are mandatory and their order is fixed.
- Select one or two approved facts per source according to the JD. Never use facts outside the proof file, even if another resume entry appears more relevant.
- Keep each proof to one sentence in paragraph two.
- Obey each source's purpose and exclusions. A supporting differentiator must not be presented as direct evidence for an unsupported capability.
- When the proof file contains a translation guide matching the output locale, apply its project naming, preferred terminology, and natural-framing rules.
- Treat translation guides as wording constraints, not additional evidence. They may not expand or alter the approved facts.
- When no metric exists in the approved facts, use workflow, surface, technical scope, or practical outcome. Never invent a number.
- Bridge adjacent experience only for a central unsupported requirement. Silently omit unsupported nice-to-haves.
- Avoid stuffing every keyword into the letter.

For a family without template references, select two strong resume-backed proof points using the generic source-of-truth rules.

## Frontend Classification

For a frontend-dominant JD, select one primary and at most one secondary subtype:

1. **Product/workflow UI** — customer flows, dashboards, forms, commerce, reporting, operational tooling
2. **Data/visualization** — dense tables, charts, maps, streaming or real-time state, scientific/IoT data
3. **Design-system/UI craft** — reusable components, Figma fidelity, responsive design, accessibility, visual consistency
4. **Frontend platform/architecture** — state/data patterns, testing, standards, modularity, build systems, cross-team frontend foundations

Treat performance as a cross-cutting concern rather than a subtype. When no subtype clearly dominates, default to product frontend plus systems depth. Subtypes determine which approved facts receive emphasis; they never change the locked proof sources or order.

## Cloud Classification

For a Cloud-dominant JD, select one primary and at most one secondary subtype:

1. **Cloud application/services** — backend or cloud features, APIs, microservices, testing, full-cycle delivery
2. **Platform/architecture** — cloud-native design, containers, service boundaries, infrastructure design, scalability
3. **Cloud integration/security** — AWS service integration, networking, IAM/security expectations, data and payment integrations
4. **AI-assisted cloud engineering** — AI-native development, context engineering, AI review, agentic delivery workflows

Subtypes determine which approved Hiraya and Misegoto facts receive emphasis; they never change the locked proof sources or order.

## SRE/DevOps Classification

For an SRE/DevOps-dominant JD, select one primary and at most one secondary subtype:

1. **Delivery automation** — CI/CD, release engineering, deployment workflows, toil reduction
2. **IaC/platform** — Terraform, Kubernetes, GitOps, provisioning, platform lifecycle
3. **Reliability/observability** — monitoring, alerting, service health, diagnosis, SLI/SLO concerns
4. **Operations/security** — service operations, incidents, on-call, Linux/networking, cloud security and compliance

Subtypes determine which approved Hiraya and pi-noid facts receive emphasis; they never change the locked proof sources or order. Unsupported production operations must remain adjacent evidence and must not be stated as direct experience.

## Common Slot Contract

The skill owns this contract. Templates arrange these Mustache-style slots into locale- and role-specific sentence patterns.

| Slot | Contract |
| --- | --- |
| `{{ addressee }}` | Named recipient when known; otherwise the locale's neutral hiring-team addressee |
| `{{ company }}` / `{{ role }}` | Exact company and role names from the input |
| `{{ candidate_identity }}` | Concise present-tense role identity aligned to the family |
| `{{ primary_need }}` / `{{ secondary_need }}` | Highest-priority and complementary JD needs, phrased naturally for the loaded scaffold |
| `{{ role_interest? }}` | Optional role-grounded reason; omit its complete sentence when unsupported |
| `{{ proof_1_context }}` / `{{ proof_2_context }}` | Ordered source names from the loaded family proof file |
| `{{ proof_n_action }}` | Candidate-owned action composed only from that source's approved facts |
| `{{ proof_n_scope }}` | One or two approved workflow, surface, or technical-scope facts |
| `{{ proof_n_outcome? }}` | Optional approved metric or practical result; omit its complete clause when unsupported |
| `{{ contribution }}` | Specific combination of capabilities the candidate would bring |
| `{{ candidate_name }}` | Name from the matching locale resume |

Required slots must be resolved before rendering. Only `role_interest` and each `proof_n_outcome` are optional. For supported families, validate every proof slot against the loaded proof file before rendering. For sparse JDs, populate needs conservatively from explicit role cues instead of inventing company context.

## Rendering Contract

Use a required two-pass process:

1. **Populate:** resolve every required slot internally from the JD, locked proof file, and resume. Verify proof sources, order, selected facts, exclusions, and locale-specific translation guidance before prose generation.
2. **Render:** follow the loaded locale scaffold's sentence sequence and mostly fixed connective wording. Small grammatical changes are allowed; changing paragraph purpose, replacing a locked proof, or adding unsupported claims is not.

The final artifact contains a neutral greeting, three short paragraphs, and a sign-off:

1. Role/company → primary need and candidate identity → optional role-grounded interest
2. Proof 1 → proof 2 → synthesis against the secondary need
3. Contribution → invitation to discuss

Do not output unresolved Mustache tokens or the internal slot map.

## Tone And Length

- Optimize for recruiter scanning while retaining enough technical proof for an engineering manager.
- Use a direct, credible, confident-but-restrained voice.
- English: 150–220 words by default.
- Traditional Chinese: 250–400 Chinese characters by default.
- Write each locale as native prose from the same evidence logic; do not translate sentence by sentence.
- Add a fourth paragraph only when the user explicitly asks for a longer version.

## What To Avoid

- Do not copy resume bullets verbatim into paragraph form
- Do not list every skill or project just because it appears in the resume
- Do not flatter the company generically without linking it to role fit
- Do not overemphasize unrelated experience that weakens the selected role-family narrative
- Do not overclaim seniority, leadership scope, or domain expertise
- Do not write a vague letter that could be sent to any employer
- Do not exceed the selected locale's default length range
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

## Reference Files

Current deterministic references:

| Family | Proofs and translation guides | English scaffold | Traditional Chinese scaffold |
| --- | --- | --- | --- |
| Frontend | `references/templates/frontend.proofs.md` | `references/templates/frontend.en.md` | `references/templates/frontend.zh-TW.md` |
| Cloud | `references/templates/cloud.proofs.md` | `references/templates/cloud.en.md` | `references/templates/cloud.zh-TW.md` |
| SRE/DevOps | `references/templates/sre-devops.proofs.md` | `references/templates/sre-devops.en.md` | `references/templates/sre-devops.zh-TW.md` |

Validation fixtures are under `references/examples/{family}/`. Each fixture records its source JD, selected primary/secondary subtype, both locale outputs, and a compact pass checklist. Fixtures are maintenance examples, not extra content to return during normal generation.

## Strategic Recommendations

After producing the letter, optionally include these only when requested:

- **Strongest Proof Points**: The two pieces of evidence carrying the application
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
