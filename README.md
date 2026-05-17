# peer-design-system

A portable, contract-enforced React component library starter for AI-driven design exercises. Closed-enum typography, layout-rhythm primitives, page-pattern molecules, and an audit gate that fails the build on raw `text-[Npx]`, raw `<h1>`, or `flex flex-col gap-N`.

Cloned per exercise via the "Use this template" button on GitHub or local `cp -r`. Never imported as npm.

---

## Quick start

**From GitHub (recommended):**

```bash
gh repo create my-app --template adarsh-nellore/peer-design-system --clone --private
cd my-app
./setup.sh        # prompts for name, clears mock data, npm install
npm run dev       # port 3000
```

**Or local `cp -r`:**

```bash
cp -r ~/Projects/adarsh-design-system ~/Projects/my-app
cd ~/Projects/my-app
rm -rf .git node_modules .next
./setup.sh
npm run dev
```

---

## What's inside

- **Design tokens** (`src/app/globals.css`) — OKLCH colors, semantic aliases, radii, type tokens.
- **50+ typed primitives** across `src/components/{ui,layout,agent,charts}/`.
- **Typography layer** (`src/components/typography/`) — `<Heading size>`, `<Body size>`. Closed enums.
- **Layout-rhythm layer** (`src/components/layout/`) — `<Stack gap>`, `<Cluster gap>`. Named buckets.
- **Page-pattern layer** (`src/components/patterns/`) — `<PageHeader>`, `<Prose>`. Canonical compositions.
- **Brand primitive** (`src/components/ui/PeerBrand.tsx`) — one source of the wordmark.
- **9 ported page templates** under `src/app/templates/` — all audit-clean.
- **Composition contract** (`docs/COMPOSITION.md`, `docs/SPACING.md`, `docs/LAYOUT.md`, `docs/NAVIGATION.md`, `docs/COMPONENTS.md`) + the audit script that gives it teeth.

---

## The composition contract

Every page in `src/app/` (excluding `src/app/components/`, the legacy primitive showcase) must satisfy five rules:

| Rule | Mechanism |
|---|---|
| Text uses closed-enum components | `<Heading>`, `<Body>`, `<MetaLabel>`, `<MetaText>`, `<Caption>` |
| Spacing uses named-bucket primitives | `<Stack gap="tight\|cozy\|comfortable\|block\|section\|page\|hero">`, `<Cluster gap="…">` |
| Colors use semantic tokens | `text-ink`, `bg-coral`, `border-hairline-strong`, etc. — no hex |
| Recurring patterns live in `patterns/` | `<PageHeader>`, `<Prose>` |
| Structural layout uses primitives | `<AppShell>`, `<DocFrame>`, etc. — no freestyle |

Enforced by `scripts/audit-composition.mjs`, wired into `npm run audit` and the `prebuild` hook. Violations fail the build.

**Docs:**

- [`docs/COMPOSITION.md`](./docs/COMPOSITION.md) — the seven rules (text, spacing, color, pattern, structural-layout, navigation, heading-vs-body) + the audit script that enforces them.
- [`docs/SPACING.md`](./docs/SPACING.md) — the underlying 4px scale + named buckets + alignment rules.
- [`docs/LAYOUT.md`](./docs/LAYOUT.md) — five named structural shells (full-shell / doc-shell / split-shell / prose-shell / narrow-shell) and when to use each.
- [`docs/NAVIGATION.md`](./docs/NAVIGATION.md) — Button vs LinkButton vs Link wiring rules.
- [`docs/COMPONENTS.md`](./docs/COMPONENTS.md) — full inventory of every primitive with Paper sheet IDs.

---

## Routes

| Route | What it is |
|---|---|
| `/` | Landing |
| `/components` | Primitive showcase (every component rendered in isolation) |
| `/templates` | Gallery index of all 9 page templates |
| `/templates/dashboard` | KPI dashboard with stats + drafts Table |
| `/templates/agent-chat` | Centered chat thread with reasoning + citations |
| `/templates/doc-editor` | Document editor with DocFrame + Copilot RightRail |
| `/templates/longform-reader` | Editorial article + marginalia (citations + flags) |
| `/templates/settings` | LeftNav + bounded form (Input · Select · Checkbox) |
| `/templates/list-detail` | 3-pane triage with floating action bar |
| `/templates/browse-library` | 4-column tile grid with upload dropzone |
| `/templates/onboarding-flow` | Centered card with ProgressDots + radio options |
| `/templates/search-results` | Active search + filter rail + mixed result list |

---

## Working with `/build-hifi`

The `/build-hifi` skill (`~/.claude/skills/build-hifi/SKILL.md`) reads `docs/COMPOSITION.md` automatically when it generates screens against a clone. Every per-screen subagent must:

- Use `<Heading>` / `<Body>` / `<MetaLabel>` / `<MetaText>` / `<Caption>` — no raw heading tags or `text-[Npx]`.
- Use `<Stack>` / `<Cluster>` — no raw `flex flex-col gap-N`.
- Use `<PageHeader>` / `<Prose>` for recurring shapes — no inlined freestyle.
- Pass `npm run audit` after writing. The `prebuild` hook re-runs the audit during build.

When the audit fails, the build fails. The agent does not retry blindly — it surfaces the violations to the user.

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Next.js dev server (port 3000) |
| `npm run audit` | Runs the composition audit only |
| `npm run build` | `prebuild` audit + Next.js production build |
| `./setup.sh` | One-time bootstrap after cloning (rename package, clear mock data, install deps) |

---

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4 (`@theme` block) · `framer-motion` · `clsx`. No external UI kits (no shadcn, no radix, no headlessui).

---

## Conventions

- **Cloning, not importing.** Each exercise gets its own copy; tweak freely.
- **Mock data is exercise-specific.** `src/lib/mock-data.ts` is cleared on `./setup.sh` and regenerated per project.
- **Paper is the visual source of truth.** Component sheets and page templates live in `PeerAIDesign_DesignSystem+Components` (Paper file). Every primitive's JSDoc cites its Paper node ID.
- **Audit before commit.** If `npm run audit` fails, fix the violation by reaching for the right primitive — don't suppress.

---

## License

This starter is unlicensed for now (private template). If you fork it, you take responsibility for whatever you publish from your clone.
