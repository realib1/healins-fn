# Memory

## Purpose

Reusable facts and patterns for this project.

## Entries

- [ ] Add stable references, conventions, and recurring rules.
- Frontend architecture baseline: src/app (composition), src/components (shared UI/layout), src/pages (screen-level views), src/features (domain modules), src/styles (tokens + global styles).
- Styling baseline: CSS tokens + global stylesheet first; keep visuals simple, neutral, and low-shadow.
- Navigation baseline: top-level role navigation kept straightforward and predictable.
- Auth is a required explicit phase in the roadmap before protected workflows expand beyond placeholder routes.
- Real-system auth rule: first screen is role-aware sign-in entry using Facility, Clinician, and Patient cards plus credential fields, then RBAC-protected module access.
- Role Hierarchy Context: Developer is the global Superadmin (manages facilities/tenants, APIs, system health). Admin is the Facility Admin (manages clinicians and operations within their isolated facility). Patient is a global user whose data crosses facility boundaries. Clinicians belong to a facility.
- Clinician and facility are treated as one combined experience, with user-based variations determining what each user sees and can do.
- App shell should feel operational and production-like: persistent sidebar, utility header, clear status cues, and denser dashboard sections without heavy decoration.
- UI inspiration source reviewed from guide/healins_ui: we will build original screens with similar clinical clarity and premium structure, not copy layouts/components verbatim.
- Preferred visual mix: utility-clinical structure + editorial hierarchy, while keeping low effects (minimal shadows, no heavy glassmorphism).
- Component behavior direction: clearer status chips, denser metric cards, timeline-first record presentation, and role-aware navigation states.
- Live prototype IA confirmed: role entry landing routes to three experiences (`/facility`, `/clinical`, `/patient`) with shared shell patterns (search, status chips, metrics, timeline/history blocks).
- Prototype behavior cues to adopt: action-oriented top cards, metrics row, narrative insight blocks, timeline/history as primary data spine, and explicit data sovereignty/access states.
- For our roadmap: keep one combined Clinician+Facility+Doctor module and gate views/actions by authenticated user context instead of fully separate code paths.
- RBAC baseline implemented: session provider, route guards, unauthorized fallback, role-based navigation visibility, and shared clinical module for facility+clinician+doctor.

## Execution Guardrails (User Defined)

- Stop immediately when uncertainty is high and assumptions would be required.
- Stop immediately when output risks hallucination or unverifiable claims.
- Stop immediately when work appears to deviate from agreed scope or phase.

## Frontend UX/UI Constraints (User Defined)

- Keep UI simple and modern; avoid over-designed visuals.
- Minimize shadows and decorative paint effects.
- Avoid heavy glassmorphism.
- Use simple, clean navigation with easy task flows.
- Prioritize healthcare-style UX best practices: clarity, legibility, predictable actions, low cognitive load.
