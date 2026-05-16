# adarsh-design-system

Portable component library. Tokens, primitives, layouts, agent UI.

Clone per design exercise; do not import as npm.

## What this is

A typed React + Tailwind v4 set of multi-purpose primitives plus the token CSS that powers them. Designed in Paper, ported to React. Seeded from the PeerAIDesign Paper file; values verified node-by-node.

Not a Figma-style design-system artifact. Not a published package.

## Quick start

```bash
npm install
npm run dev          # port 3000
npm run build
```

The dev server renders the full component sheet at `/` — sections per group.

## Library at a glance

- **50 React components** across `src/components/{ui,layout,agent,charts}/`
- **59 Paper sheets** in `PeerAIDesign_DesignSystem+Components` Paper file
- **4 page templates** for `/build-hifi` to model from
- Every component's JSDoc cites its Paper sheet node ID

## Tokens (`src/app/globals.css`)

Hex values exact from Paper. OKLCH listed in comments. Tokens auto-generate Tailwind v4 utility classes.

| Color | Value | Use |
|---|---|---|
| `--color-ink` | `#1A1B1F` | Primary text |
| `--color-muted` | `#525252` | Body copy, captions |
| `--color-faint` | `#858585` | Tertiary text, table headers |
| `--color-faintest` | `#A6A6A6` | Quaternary text |
| `--color-hairline` | `#E9E9E9` | Inner dividers |
| `--color-hairline-strong` | `#D5DDE3` | Card/pill borders |
| `--color-soft` | `#F6F6F6` | Filled-badge bg |
| `--color-stripe` | `#FAFBFC` | Filled-chip bg, table zebra |
| `--color-paper` | `#FFFFFF` | Surface |
| `--color-coral` | `#FF4E49` | Primary accent |
| `--color-coral-soft` | `#FFF5F4` | Coral fill on small bg |
| `--color-green` | `#43DD9C` | Success |
| `--color-green-soft` | `#E4F6EC` | Success bg |
| `--color-gold` | `#F6A600` | Warning |
| `--color-gold-soft` | `#FFF6E0` | Warning bg |
| `--color-info` | `#4FA8E4` | Informational |
| `--color-accent-indigo` | `#3935FF` | Tab active edge |

**Semantic aliases** (preferred for `/build-hifi`): `--color-text`, `--color-text-muted`, `--color-text-faint`, `--color-surface`, `--color-border`, `--color-border-strong`, `--color-accent`, `--color-success`, `--color-danger`, `--color-warning`.

**Fonts:** Inter (sans), Inconsolata (mono), Fraunces (display).

**Tracking:** `--tracking-label` (0.06em), `--tracking-caps` (0.04em).

**Radii:** `--radius-xs` 3, `-sm` 5, `-md` 6, `-lg` 8, `-input` 10, `-card` 12.

**Utilities:** `.walkthrough-spotlight`, `.scroll-tame`, `.hairline-fade`, `.glass-card`, `.anim-fade-in` through `.anim-fade-in-5`.

**Spacing:** inherits Tailwind v4 default 4px scale. Paper values all fall on this grid.

## Components

### Group A · Atoms (10)

`src/components/ui/`

- **Glyph** — 14 hand-coded SVG icons, per-glyph stroke defaults
- **Badge** — tone × size, uppercase optional
- **Dot** — color × size × pulse
- **ProgressDots** — step indicator with done/current/upcoming
- **Avatar** — initials/image · ring · size
- **MetaLabel** — uppercase mono section labels
- **MetaText** — mono captions, four tones × two sizes
- **Caption** — Fraunces italic display serif
- **Hairline** — horizontal/vertical · solid/fade · with-label
- **KeyChip** — keyboard shortcut, solo + paired

### Group B · Action (3)

- **Pill** — outlined / filled / accent / ghost
- **Button** — primary / secondary / ghost / destructive × sm/md/lg
- **IconButton** — square icon-only Button

### Group C · Surface (6)

- **Card** — paper / soft / outline / elevated · header + footer slots
- **Tile** — feature square card with hero glyph + value
- **Toast** — transient notification, four tones
- **Alert** — inline persistent banner with action
- **EmptyState** — centered empty-container guidance
- **Modal** — overlay dialog, three sizes

### Group D · Form (11)

- **Input** — single-line with leading/trailing slots
- **SearchInput** — Input + leading search + ⌘K hint
- **Textarea** — multi-line, resize-y
- **Tab + TabBar** — document tab strip with indigo active edge
- **Tabs** (segmented) — inline filter control
- **Select** — dropdown wrapping native `<select>`
- **Checkbox** — checked/indeterminate
- **Radio** — single-select group
- **Tooltip** — hover popover (dark + glass variants)
- **DropdownMenu** — composable action menu

### Group E · Data (4)

- **Row** — multi-column data row, zebra/muted/total variants
- **Table** — typed columns + rows + total
- **Sparkline** — inline monotone-cubic line chart
- **Stat** — KPI tile with label + value + delta + Sparkline

### Group F · Layout (7)

`src/components/layout/`

- **AppShell** — top-level shell with topBar/leftNav/rightRail/main slots
- **TopNav** — chrome bar with brand + breadcrumb + trailing
- **LeftNav** — collapsible sidebar with section headers
- **RightRail** — header + scrollable body + footer slots
- **DocFrame** — tab bar + scrollable content
- **SplitFrame** — two-column with hairline divider
- **PageContainer** — bounded centered column, three max-widths

### Group G · Agent atoms (9)

`src/components/agent/`

- **AgentAvatar** — branded coral identity, four states (idle / thinking / awaiting / offline)
- **ThinkingIndicator** — three pulsing dots
- **StreamingCursor** — blinking caret at end of streaming text
- **CitationLink** — inline numbered citation with hover popover
- **SourceChip** — KindBadge + filename + section pointer
- **SuggestionPill** — Sparkle-prefixed AI suggestion
- **ReasonedChip** — accepted-with-reason badge, expands to trace + sources
- **ConfidenceBadge** — percentage with badge/bar variants
- **HallucinationFlag** — review-needed marker (inline + block)

### Group H · Agent molecules (9)

- **MessageBubble** — chat turn, user/assistant × default/thinking/streaming
- **ToolCallCard** — running / completed / failed states
- **ReasoningTrace** — collapsible step-by-step display
- **DiffView** — before/after AI edit (token + block layouts)
- **CarouselCard** — multi-variant pick-one pattern
- **MultiStepFlow** — clarifying-question card with progress dots
- **AcceptRejectBar** — sticky bottom action bar (default + dark inverted)
- **AgentErrorCard** — error / rate-limited / refusal tones
- **PromptBar** — chat input with attachments, slash hint, ⌘↵

### Group I · Page templates (4, Paper-only)

Visual references in the Paper file:

- `page · doc-editor` — TopNav + DocFrame + RightRail
- `page · dashboard` — TopNav + LeftNav + Stat row + Table
- `page · agent-chat` — TopNav + centered ChatThread + PromptBar
- `page · settings` — TopNav + LeftNav + PageContainer form

## Speculative variants (no Paper precedent)

- `Pill.ghost` — transparent, hover bg-soft
- `Badge.info` — bg-soft text-info
- `Card.elevated` — shadow-pop (Paper cards are flat)
- Button hover states across all variants
- `IconButton` hover semantics

## Library files (`src/lib/`)

- `cn.ts` — clsx wrapper
- `motion.ts` — `fadeIn`, `slideUp`, `stagger`, `pulse` framer-motion config
- `types.ts` — `Tone`, `Size`, `AgentState` (13 values) unions
- `mock-data.ts` — empty seed; `/build-hifi` populates per exercise
- `chart-utils.ts` — `monotoneCubicPath(points)` for SVG charts

## Composition contract & spacing

Two docs:

- [`docs/COMPOSITION.md`](./docs/COMPOSITION.md) — **the contract that pages must follow.** Closed-enum typography (`<Heading>` / `<Body>` / `MetaLabel` / `MetaText` / `Caption`), closed-enum layout (`<Stack>` / `<Cluster>`), canonical patterns (`<PageHeader>` / `<Prose>`), and the audit script (`npm run audit`) that fails the build when raw `text-[Npx]` / raw `<h1>` / raw `<p>` / `flex flex-col gap-N` appear in `src/app/templates/`. This is the mechanical enforcement layer.
- [`docs/SPACING.md`](./docs/SPACING.md) — the underlying 4px named-bucket scale (Tight 4 / Cozy 8 / Comfortable 12 / Block 16 / Section 24 / Page 40 / Hero 56–64), the three alignment rules, and the pitfalls table.

Read COMPOSITION.md before authoring any new template or page.

## Source of truth

Every component's visual treatment was extracted from a `sheet · <Component>` artboard in the Paper file `PeerAIDesign_DesignSystem+Components`. Each React component's JSDoc cites its specific Paper node ID so future updates can re-extract precisely. Page templates (Group I) live as Paper artboards only — they're visual references, not React.

Reference walkthrough nodes (the originating Peer prototype) are also cited where the component had a pre-existing instance to compare against.
