# Refinement pass — complete

**App:** `peer-csr-workflow-rail-dressup-2026-05-19` · **URL:** http://localhost:3072

## Done
- **Inline drift** in doc canvas (`DriftInlineMarker`) — hover → workflow; top drift banner removed
- **Workflow tree** (doc → version → activity) in Workflow tab
- **Overlays** via `?overlay=` — collect, launch-review, quorum, qc-gate, signoff (+ blocked variants); modal dismiss routes back
- **Header CTAs** — Collect, Launch review, Quorum, QC, Sign-off
- **Expanded mock** — sections, drift markers, comments (`commentThreads`), activity log
- **Product tour** — `TourPanel` + `?tour=1` (5 steps, `data-wt` anchors on canvas, workflow tree, comments, dashboard KPIs)
- **Build:** `npm run build` passes

## Demo spine (~2 min)
1. `/dashboard` — KPIs, open CSR row
2. `/documents/csr-abc23-391-401?tab=copilot` — hover dotted **612 subjects** → Open in workflow
3. Workflow tab — expand tree, click stale activity → quorum panel
4. Header **Collect** / **Quorum** / **QC** — modals open & close
5. `?tour=1` — Take the tour (bottom-right)

## Not done (defer)
- Full Playwright persona walkthrough
- Dashboard row secondary actions (row link covers editor)
- `npm run audit` if repo defines it
