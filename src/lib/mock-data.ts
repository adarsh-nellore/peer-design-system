import type {
  ActivityItem,
  CsrDocument,
  DocSection,
  DriftMarker,
  InlineDrift,
  SectionBlock,
  SourceArtifact,
  User,
  VersionActivity,
} from "./types";

export const DEMO_DOC_ID = "csr-abc23-391-401";
export const LEGACY_DOC_ID = "abc877-201";

export const users: Record<string, User> = {
  maya: { id: "maya", name: "Maya Chen", initials: "MC", role: "Lead Medical Writer" },
  jordan: { id: "jordan", name: "Jordan Lee", initials: "JL", role: "Biostatistics" },
  elena: { id: "elena", name: "Elena Vasquez", initials: "EV", role: "Regulatory Affairs" },
  sam: { id: "sam", name: "Sam Ortiz", initials: "SO", role: "QC" },
  james: { id: "james", name: "James Okonkwo", initials: "JO", role: "Director" },
};

export type CommentThread = {
  id: string;
  sectionId: string;
  sectionLabel: string;
  authorId: string;
  excerpt: string;
  status: "open" | "resolved";
  versionLabel: string;
  time: string;
};

export const commentThreads: CommentThread[] = [
  {
    id: "c1",
    sectionId: "sec-10-1",
    sectionLabel: "10.1 Disposition",
    authorId: "elena",
    excerpt: "Disposition numbers don't match table 14.1.1 footnote. Please verify withdrawals against ADSL.",
    status: "open",
    versionLabel: "v4",
    time: "May 17",
  },
  {
    id: "c2",
    sectionId: "sec-10-1",
    sectionLabel: "10.1 Disposition",
    authorId: "jordan",
    excerpt: "ADAE dataset updated post-lock; AE counts in paragraph 3 need refresh before round close.",
    status: "open",
    versionLabel: "v4",
    time: "May 18",
  },
  {
    id: "c3",
    sectionId: "sec-10",
    sectionLabel: "10. Study participants",
    authorId: "sam",
    excerpt: "Resolved: randomized set matches ADSL row count and protocol amendment 2 dates.",
    status: "resolved",
    versionLabel: "v4",
    time: "May 16",
  },
  {
    id: "c4",
    sectionId: "sec-11",
    sectionLabel: "11. Efficacy",
    authorId: "elena",
    excerpt: "Primary endpoint paragraph still references interim analysis cut; confirm SAP listing 8.1.",
    status: "open",
    versionLabel: "v4",
    time: "May 19",
  },
  {
    id: "c5",
    sectionId: "sec-10-1",
    sectionLabel: "10.1 Disposition",
    authorId: "maya",
    excerpt: "Please add protocol-deviation discontinuation row per ICH E3 before we close round 2.",
    status: "open",
    versionLabel: "v5",
    time: "May 19",
  },
  {
    id: "c6",
    sectionId: "sec-9",
    sectionLabel: "9. Investigation plan",
    authorId: "james",
    excerpt: "Amendment 2 PK substudy wording is clear. No changes requested for director preview.",
    status: "resolved",
    versionLabel: "v4",
    time: "May 15",
  },
  {
    id: "c7",
    sectionId: "sec-11-2",
    sectionLabel: "11.2 Primary efficacy",
    authorId: "jordan",
    excerpt: "Hazard ratio CI should use stratified model per SAP 8.1, not unstratified footnote.",
    status: "open",
    versionLabel: "v4",
    time: "May 18",
  },
  {
    id: "c8",
    sectionId: "sec-10",
    sectionLabel: "10. Study participants",
    authorId: "elena",
    excerpt: "Cross-check randomized N against CSR cover page before FDA package assembly.",
    status: "open",
    versionLabel: "v4",
    time: "May 17",
  },
  {
    id: "c9",
    sectionId: "sec-10-1",
    sectionLabel: "10.1 Disposition",
    authorId: "sam",
    excerpt: "QC: screen-failure table 14.1.2 footnote order differs from shell template.",
    status: "open",
    versionLabel: "v4",
    time: "May 16",
  },
  {
    id: "c10",
    sectionId: "sec-11",
    sectionLabel: "11. Efficacy",
    authorId: "maya",
    excerpt: "Secondary endpoint cross-ref to PRO section added in v5 working.",
    status: "open",
    versionLabel: "v5",
    time: "May 14",
  },
  {
    id: "c11",
    sectionId: "sec-10-1",
    sectionLabel: "10.1 Disposition",
    authorId: "jordan",
    excerpt: "Resolved: AE discontinuation counts match ADAE listing 16.2 after refresh.",
    status: "resolved",
    versionLabel: "v5",
    time: "May 12",
  },
  {
    id: "c12",
    sectionId: "sec-11-2",
    sectionLabel: "11.2 Primary efficacy",
    authorId: "elena",
    excerpt: "Kaplan-Meier figure caption should cite final cut date 2026-03-14 explicitly.",
    status: "open",
    versionLabel: "v4",
    time: "May 19",
  },
];

export type CopilotMessage = {
  id: string;
  mode: "suggest" | "trace" | "handoff" | "drift" | "qc" | "user";
  title?: string;
  body: string;
  sectionId?: string;
  href?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  badge?: string;
};

export const copilotMessages: CopilotMessage[] = [
  {
    id: "cp-1",
    mode: "suggest",
    title: "Suggest edits",
    body: "SEC 10.1 disposition table is missing the protocol-deviation discontinuation sub-category. Consider adding a row per ICH E3 section 11.4.",
    sectionId: "sec-10-1",
    ctaPrimary: { label: "Apply suggestion", href: "section:sec-10-1&applied=1" },
    ctaSecondary: { label: "Dismiss", href: "dismiss:cp-1" },
  },
  {
    id: "cp-2",
    mode: "trace",
    title: "Trace",
    body: "Sentence 2 traces to ADSL row 289, Table 14.1.1 cell C4, and listing 16.2 discontinuation flag. Source hash matches locked manifest 2026-03-14.",
    ctaPrimary: { label: "View source", href: "overlay:sources" },
    ctaSecondary: { label: "Open trace log", href: "tab:workflow&activity=act-7" },
  },
  {
    id: "cp-3",
    mode: "handoff",
    title: "Review handoff",
    body: "Round 2 is open on pinned v4. Elena Vasquez may still be reviewing the v3 Word export. Four of seven reviewers have responded.",
    badge: "4/7 on v4",
    ctaPrimary: { label: "Open workflow", href: "tab:workflow" },
    ctaSecondary: { label: "Review quorum", href: "overlay:quorum" },
  },
  {
    id: "cp-4",
    mode: "drift",
    title: "Version drift",
    body: "Word v4.2 export is outstanding while working v5 advanced. Aurora completion in SEC 10.1 dropped from 94.4% to 92.8% after ADSL refresh.",
    ctaPrimary: { label: "Review quorum", href: "tab:workflow&panel=quorum" },
    ctaSecondary: { label: "Reimport Word", href: "path:reimport" },
  },
  {
    id: "cp-5",
    mode: "qc",
    title: "QC pre-flight",
    body: "Sam Ortiz logged three abbreviation hits and one cross-reference issue on v5. Human QC gate is available after round close.",
    badge: "3 flags",
    ctaPrimary: { label: "Open QC tab", href: "tab:qc" },
    ctaSecondary: { label: "Request QC", href: "overlay:qc-gate" },
  },
  {
    id: "cp-6",
    mode: "suggest",
    title: "Suggest edits",
    body: "SEC 11.2 footnote still cites the 2025-10-08 interim cut. Update to SAP 2.1 listing 8.1 before director sign-off preview.",
    sectionId: "sec-11-2",
    ctaPrimary: { label: "Jump to section", href: "section:sec-11-2" },
    ctaSecondary: { label: "View comment", href: "tab:comments&filter=open" },
  },
];

export type QcCheckItem = {
  id: string;
  label: string;
  status: "pass" | "warn" | "fail" | "pending";
  detail: string;
  href?: string;
};

export const qcChecklist: QcCheckItem[] = [
  { id: "qc-1", label: "Trace gate (pinned v4)", status: "warn", detail: "2 untraced claims in SEC 11.2", href: "section:sec-11-2" },
  { id: "qc-2", label: "Abbreviation scan", status: "fail", detail: "CSR, ITT, BICR used before first definition", href: "tab:copilot" },
  { id: "qc-3", label: "Cross-reference integrity", status: "warn", detail: "Table 14.1.2 referenced before definition in SEC 10.1", href: "section:sec-10-1" },
  { id: "qc-4", label: "Version alignment", status: "fail", detail: "v4.2 Word export outstanding vs working v5", href: "overlay:version-history" },
  { id: "qc-5", label: "Style guide (Aurora CSR)", status: "pass", detail: "Headings and table captions match template", href: "tab:copilot" },
  { id: "qc-6", label: "Regulatory boilerplate", status: "pending", detail: "Awaiting Elena sign-off on SEC 9 amendments", href: "tab:comments&filter=open" },
];

export const reviewRoster = [
  { id: "r1", name: "Elena Vasquez", role: "Regulatory", status: "stale" as const, version: "v3 export", responded: false },
  { id: "r2", name: "Jordan Lee", role: "Biostatistics", status: "done" as const, version: "v4", responded: true },
  { id: "r3", name: "Sam Ortiz", role: "QC", status: "in_progress" as const, version: "v4", responded: false },
  { id: "r4", name: "Maya Chen", role: "Lead writer", status: "done" as const, version: "v4", responded: true },
  { id: "r5", name: "James Okonkwo", role: "Director", status: "opened" as const, version: "v4", responded: false },
  { id: "r6", name: "Priya Nair", role: "Clinical ops", status: "done" as const, version: "v4", responded: true },
  { id: "r7", name: "Alex Kim", role: "Safety", status: "done" as const, version: "v4", responded: true },
];

export const collectArtifacts = [
  { name: "ADSL.sas7bdat", status: "locked", size: "4.2 MB", owner: "Jordan Lee" },
  { name: "ADAE.sas7bdat", status: "locked", size: "12.1 MB", owner: "Jordan Lee" },
  { name: "Table 14.1.1 RTF", status: "processed", size: "186 KB", owner: "Biostats" },
  { name: "Table 14.1.2 RTF", status: "processed", size: "142 KB", owner: "Biostats" },
  { name: "Table 14.3.1 RTF", status: "processed", size: "210 KB", owner: "Biostats" },
  { name: "SAP v2.1 PDF", status: "locked", size: "2.8 MB", owner: "Jordan Lee" },
  { name: "Protocol AMD2 PDF", status: "locked", size: "1.1 MB", owner: "Elena Vasquez" },
  { name: "Listing 16.2 AE discontinuations", status: "refreshed", size: "88 KB", owner: "Jordan Lee" },
];

export const driftMarkers: DriftMarker[] = [
  {
    id: "drift-1",
    sectionId: "sec-10",
    anchorText: "612 subjects were randomized",
    summary: "Word v4.2 export outstanding while working v5 is active.",
    workflowPanel: "quorum",
  },
  {
    id: "drift-2",
    sectionId: "sec-10-1",
    anchorText: "Table 14.1.1",
    summary: "Elena Vasquez opened v3 export, not pinned v4.",
    workflowPanel: "quorum",
  },
];

export const sectionContent: Record<string, SectionBlock> = {
  "sec-10": {
    sectionId: "sec-10",
    heading: "10. Study participants",
    driftMarkerIds: ["drift-1"],
    paragraphs: [
      "A total of 612 subjects were randomized in Study ABC23-391-401 (Aurora 306, Placebo 306). This section summarizes disposition, demographics, and baseline characteristics for the safety population.",
      "All disposition counts trace to ADSL (locked 2026-03-14) and Table 14.1.1 in the CSR shell. Medical writing incorporated biostatistics footnotes from listing 16.2 where protocol deviations affect discontinuation coding.",
    ],
    sourceLine: "Source: ADSL.sas7bdat · Table 14.1.1 RTF · locked 2026-03-14",
  },
  "sec-10-1": {
    sectionId: "sec-10-1",
    heading: "10.1 Disposition of subjects",
    driftMarkerIds: ["drift-2"],
    paragraphs: [
      "Of 612 randomized subjects, 580 (94.8%) completed the treatment period per protocol. Seventeen subjects in the Aurora arm and fifteen in the Placebo arm discontinued early; primary reasons were adverse events (8), withdrawal of consent (6), and lost to follow-up (4).",
      "Screen failures and run-in failures are reported separately in Table 14.1.2 and are excluded from the randomized set shown in Table 14.1.1 below.",
    ],
    sourceLine: "Source: ADSL · Table 14.1.1 · ADAE listing 16.2",
  },
};

const DEMO_ACTIVITY: ActivityItem[] = [
  { id: "a1", versionId: "v5", label: "Maya edited SEC 10.3 baseline table", actorId: "maya", timestamp: "2h ago", kind: "edit" },
  { id: "a2", versionId: "v42", label: "Word export v4.2 generated", actorId: "maya", timestamp: "Yesterday", kind: "export" },
  { id: "a3", versionId: "v4", label: "Review round 2 opened (pinned v4)", actorId: "maya", timestamp: "May 18", kind: "review" },
  { id: "a4", versionId: "v4", label: "Elena opened v3 export (stale)", actorId: "elena", timestamp: "May 17", kind: "drift", status: "stale" },
  { id: "a5", versionId: "v4", label: "Jordan completed stats review tables", actorId: "jordan", timestamp: "May 17", kind: "review", status: "done" },
  { id: "a6", versionId: "v4", label: "Collect package accepted", actorId: "maya", timestamp: "Mar 14", kind: "approval", status: "done" },
  { id: "a7", versionId: "v3", label: "v3 archived after round 1", actorId: "maya", timestamp: "Feb 28", kind: "approval" },
];

const CSR_DOCUMENT_BASE: Omit<CsrDocument, "id"> = {
    studyId: "ABC23-391-401",
    title: "ABC23-391-401 Clinical Study Report",
    workflowState: "review_open",
    workingVersionId: "v5",
    pinnedVersionId: "v4",
    driftLines: ["Word v4.2 outstanding", "Elena opened v3 not v4"],
    activity: DEMO_ACTIVITY,
    approvals: [
      { gate: "collect", label: "Collect OK", versionLabel: "manifest-2026-03-14" },
      { gate: "review", label: "Round 2 open", versionLabel: "v4" },
    ],
    versions: [
      { id: "v3", label: "v3 archived", kind: "archived", sectionsEdited: ["9.1", "10.1"] },
      { id: "v4", label: "v4 pinned", kind: "pinned", sectionsEdited: ["10.1", "10.2", "11.2"] },
      { id: "v42", label: "v4.2 Word export", kind: "export", sectionsEdited: ["10.1"] },
      { id: "v5", label: "v5 working", kind: "working", sectionsEdited: ["10.1", "10.3"] },
    ],
    stages: [
      { key: "lock", label: "Data base lock", status: "complete", owner: "Jordan Lee" },
      { key: "files_generated", label: "Data files generated", status: "complete", owner: "Jordan Lee" },
      { key: "collect", label: "Collect data files", status: "complete", owner: "Maya Chen" },
      { key: "draft", label: "Draft shell and CSR", status: "complete", owner: "Maya Chen" },
      { key: "review", label: "Multi-team review", status: "active", owner: "Cross-functional" },
      { key: "incorporate", label: "Comment incorporation", status: "pending", owner: "Maya Chen" },
      { key: "qc", label: "Quality checks", status: "pending", owner: "Sam Ortiz" },
      { key: "signoff", label: "Final sign-off", status: "pending", owner: "Director" },
    ],
    peopleOnReview: [
      {
        id: "t1",
        title: "Regulatory review SEC 10.1",
        assigneeId: "elena",
        status: "stale",
        versionLabel: "v4",
        sectionId: "sec-10-1",
        seenVersion: "v3",
      },
      { id: "t2", title: "Clinical review", assigneeId: "maya", status: "done", versionLabel: "v4" },
      { id: "t3", title: "Stats review tables", assigneeId: "jordan", status: "opened", versionLabel: "v4" },
      { id: "t4", title: "Safety narrative", assigneeId: "sam", status: "in_progress", versionLabel: "v4" },
    ],
    inlineDriftIds: ["idr-1", "idr-2", "idr-3", "idr-4"],
    activityIds: [
      "act-1", "act-2", "act-3", "act-4", "act-5", "act-6", "act-7", "act-8",
      "act-9", "act-10", "act-11", "act-12", "act-13", "act-14", "act-15", "act-16",
      "act-17", "act-18",
    ],
    sourceArtifactIds: ["src-adsl", "src-adae", "src-tlf-1411", "src-tlf-1431", "src-sap-21", "src-protocol-amd2", "src-manifest"],
    sectionIds: ["sec-9", "sec-10", "sec-10-1", "sec-11", "sec-11-2"],
};

export const documents: Record<string, CsrDocument> = {
  [DEMO_DOC_ID]: { id: DEMO_DOC_ID, ...CSR_DOCUMENT_BASE },
  [LEGACY_DOC_ID]: { id: LEGACY_DOC_ID, ...CSR_DOCUMENT_BASE },
};

export function getDocument(docId: string): CsrDocument | undefined {
  return documents[docId];
}

export function getDocSection(sectionId: string): DocSection | undefined {
  return docSections.find((s) => s.id === sectionId);
}

export function inlineDriftById(id: string): InlineDrift | undefined {
  return inlineDrifts.find((d) => d.id === id);
}

export function activityById(id: string): VersionActivity | undefined {
  return versionActivity.find((a) => a.id === id);
}

export const tocSections = [
  { id: "sec-9", label: "9. Investigation plan" },
  { id: "sec-10", label: "10. Study participants" },
  { id: "sec-10-1", label: "10.1 Disposition", parent: "sec-10" },
  { id: "sec-11", label: "11. Efficacy" },
  { id: "sec-11-2", label: "11.2 Primary efficacy", parent: "sec-11" },
];

export function activityForVersion(versionId: string): ActivityItem[] {
  return DEMO_ACTIVITY.filter((a) => a.versionId === versionId);
}

// ─────────────────────────────────────────────────────────────────────────────
// Extended mock data — additive layer used by the richer canvas, version
// timeline, source-of-truth panel, and inline-drift annotations. Existing
// `commentThreads`, `driftMarkers`, `sectionContent`, `DEMO_ACTIVITY`,
// `tocSections`, and the `documents[...]` entries above remain authoritative
// for any page already consuming them.
// ─────────────────────────────────────────────────────────────────────────────

// Inline drifts: severity-tagged annotations attached to specific paragraph
// anchors. The critical one on the disposition table reflects Aurora export-
// vs-pinned numeric drift introduced when Maya exported v4.2 to Word and
// Jordan's ADAE refresh landed afterwards.
export const inlineDrifts: InlineDrift[] = [
  {
    id: "idr-1",
    sectionId: "sec-10-1",
    paragraphAnchor: "p-disposition-numbers",
    severity: "critical",
    title: "Disposition counts diverge from v4.2 export",
    detail:
      "Aurora completion drops from 94.4% (v4.2 Word export) to 92.8% in working v5 after ADSL refresh on 2026-04-18.",
    versionRef: "v4.2 Word export",
    resolveActivityId: "act-12",
  },
  {
    id: "idr-2",
    sectionId: "sec-10-1",
    paragraphAnchor: "p-disposition-ae-counts",
    severity: "warning",
    title: "AE counts stale after ADAE refresh",
    detail:
      "Adverse-event discontinuations in paragraph 3 reflect the pre-refresh ADAE listing 16.2. Jordan reloaded ADAE on 2026-05-15.",
    versionRef: "v5 working",
    resolveActivityId: "act-15",
  },
  {
    id: "idr-3",
    sectionId: "sec-11-2",
    paragraphAnchor: "p-pfs-hazard-footnote",
    severity: "warning",
    title: "Primary efficacy footnote cites interim cut",
    detail:
      "Hazard-ratio footnote still references the 2025-10-08 interim cut. Final database lock is 2026-03-14 per SAP version 2.1.",
    versionRef: "v4 pinned",
    resolveActivityId: "act-11",
  },
  {
    id: "idr-4",
    sectionId: "sec-9",
    paragraphAnchor: "p-9-amendments",
    severity: "info",
    title: "Investigation plan dates match amendment 2",
    detail:
      "Section 9.1 effective dates align with Protocol Amendment 2 (2025-07-22). No action required; flagged for trace gate visibility.",
    versionRef: "v4 pinned",
  },
];

// Version activity timeline: 18 events across v3 / v4 / v4.2 / v5, spanning
// roughly the past 10 weeks of the Aurora CSR build. Covers edits, exports,
// re-merge imports, approvals across collect/review/QC/signoff, comments,
// review-round open/close, QC checks, and drift flags.
export const versionActivity: VersionActivity[] = [
  {
    id: "act-1",
    versionId: "v3",
    kind: "edit",
    actorId: "maya",
    timestamp: "2026-03-09 10:12",
    label: "Drafted SEC 9 investigation plan shell",
    detail: "Seeded ICH E3 outline with Aurora study design summary.",
    sectionId: "sec-9",
  },
  {
    id: "act-2",
    versionId: "v3",
    kind: "approve",
    actorId: "maya",
    timestamp: "2026-03-14 09:42",
    label: "Collect package accepted",
    detail: "Manifest 2026-03-14 locked; ADSL and ADAE marked ready by Jordan Lee.",
  },
  {
    id: "act-3",
    versionId: "v3",
    kind: "review_round_open",
    actorId: "maya",
    timestamp: "2026-03-18 14:05",
    label: "Round 1 opened on v3",
    detail: "Reviewers: Elena Vasquez, Jordan Lee, Sam Ortiz on pinned v3.",
  },
  {
    id: "act-4",
    versionId: "v3",
    kind: "comment",
    actorId: "elena",
    timestamp: "2026-03-22 16:30",
    label: "Elena flagged SEC 10.1 screen-failure counts",
    detail: "Asked for reconciliation against TLF 14.1.1 footnote 2.",
    sectionId: "sec-10-1",
  },
  {
    id: "act-5",
    versionId: "v3",
    kind: "review_round_close",
    actorId: "maya",
    timestamp: "2026-04-01 11:20",
    label: "Round 1 closed; quorum met 5/5",
    detail: "All assignments on v3 complete; v3 archived after merge into v4.",
  },
  {
    id: "act-6",
    versionId: "v4",
    kind: "edit",
    actorId: "maya",
    timestamp: "2026-04-03 09:15",
    label: "Maya updated SEC 10.1 disposition narrative",
    detail: "Incorporated round 1 comments from Elena and Jordan.",
    sectionId: "sec-10-1",
  },
  {
    id: "act-7",
    versionId: "v4",
    kind: "qc_check",
    actorId: "sam",
    timestamp: "2026-04-08 13:48",
    label: "Sam ran trace gate on v4",
    detail: "Two untraced claims in SEC 11.2 efficacy footnote.",
    sectionId: "sec-11-2",
  },
  {
    id: "act-8",
    versionId: "v4",
    kind: "review_round_open",
    actorId: "maya",
    timestamp: "2026-04-12 10:00",
    label: "Round 2 opened on pinned v4",
    detail: "Reviewers expanded to 7 including James Okonkwo for director preview.",
  },
  {
    id: "act-9",
    versionId: "v42",
    kind: "export",
    actorId: "maya",
    timestamp: "2026-04-14 17:22",
    label: "v4.2 Word export generated",
    detail: "Outstanding export tracked for reimport; hash a9f3c2.",
  },
  {
    id: "act-10",
    versionId: "v42",
    kind: "drift_flag",
    actorId: "maya",
    timestamp: "2026-04-21 08:55",
    label: "Export drift flagged on v4.2",
    detail: "Working v5 advanced while v4.2 still circulating in Word.",
    driftId: "idr-1",
  },
  {
    id: "act-11",
    versionId: "v4",
    kind: "comment",
    actorId: "jordan",
    timestamp: "2026-04-23 14:10",
    label: "Jordan questioned PFS hazard footnote",
    detail: "Asked Maya to confirm cut date against SAP version 2.1 listing 8.1.",
    sectionId: "sec-11-2",
    driftId: "idr-3",
  },
  {
    id: "act-12",
    versionId: "v5",
    kind: "edit",
    actorId: "maya",
    timestamp: "2026-04-28 11:35",
    label: "Maya forked v5 working from v4",
    detail: "Started SEC 10.3 baseline edits ahead of round 2 close.",
    sectionId: "sec-10-1",
  },
  {
    id: "act-13",
    versionId: "v5",
    kind: "import",
    actorId: "maya",
    timestamp: "2026-05-04 15:48",
    label: "Re-merged v4.2 Word reimport into v5",
    detail: "Section 10.1 prose merged; two untraced blocks attested by Maya.",
    sectionId: "sec-10-1",
  },
  {
    id: "act-14",
    versionId: "v4",
    kind: "drift_flag",
    actorId: "maya",
    timestamp: "2026-05-08 09:02",
    label: "Wrong-version flag on Elena review",
    detail: "Elena Vasquez opened v3 export instead of pinned v4; review marked stale.",
    driftId: "idr-2",
  },
  {
    id: "act-15",
    versionId: "v5",
    kind: "edit",
    actorId: "jordan",
    timestamp: "2026-05-15 16:20",
    label: "Jordan reloaded ADAE listing 16.2",
    detail: "Post-lock ADAE refresh; AE counts in SEC 10.1 paragraph 3 require regeneration.",
    sectionId: "sec-10-1",
    driftId: "idr-2",
  },
  {
    id: "act-16",
    versionId: "v5",
    kind: "comment",
    actorId: "elena",
    timestamp: "2026-05-17 10:44",
    label: "Elena requested disposition reconciliation",
    detail: "Verify withdrawals against ADSL row 289 before round 2 close.",
    sectionId: "sec-10-1",
  },
  {
    id: "act-17",
    versionId: "v5",
    kind: "qc_check",
    actorId: "sam",
    timestamp: "2026-05-18 09:30",
    label: "Sam pre-flighted AI QC on v5",
    detail: "Three abbreviation hits and one cross-reference issue logged.",
  },
  {
    id: "act-18",
    versionId: "v4",
    kind: "signoff",
    actorId: "james",
    timestamp: "2026-05-19 08:00",
    label: "James staged sign-off preview on v4",
    detail: "Director preview only; sign-off blocked while v4.2 export outstanding.",
  },
];

// Source artifacts: locked TLFs, datasets, SAP, and protocol that the CSR
// cites. Citation counts approximate the number of in-document references
// surfaced by the trace gate.
export const sourceArtifacts: SourceArtifact[] = [
  {
    id: "src-adsl",
    kind: "dataset",
    label: "ADSL.sas7bdat (ADaM subject-level analysis)",
    lockedAt: "2026-03-14",
    citationCount: 43,
  },
  {
    id: "src-adae",
    kind: "dataset",
    label: "ADAE.sas7bdat (ADaM adverse-event analysis)",
    lockedAt: "2026-05-15",
    citationCount: 31,
  },
  {
    id: "src-tlf-1411",
    kind: "tlf",
    label: "Table 14.1.1 RTF (Disposition of Subjects)",
    lockedAt: "2026-03-15",
    citationCount: 18,
  },
  {
    id: "src-tlf-1431",
    kind: "tlf",
    label: "Table 14.3.1 RTF (Adverse Event Summary, Aurora vs Placebo)",
    lockedAt: "2026-05-15",
    citationCount: 22,
  },
  {
    id: "src-sap-21",
    kind: "sap",
    label: "SAP version 2.1 (final, pre-lock)",
    lockedAt: "2025-11-12",
    citationCount: 14,
  },
  {
    id: "src-protocol-amd2",
    kind: "protocol",
    label: "Protocol Amendment 2 (PK substudy, ABC23-391-401)",
    lockedAt: "2025-07-22",
    citationCount: 9,
  },
  {
    id: "src-manifest",
    kind: "manifest",
    label: "Collect manifest 2026-03-14 (Jordan Lee)",
    lockedAt: "2026-03-14",
    citationCount: 8,
  },
];

// Hierarchical document sections. Each paragraph has a stable anchor so an
// inline drift can point at it. Prose paragraphs are realistic-but-not-polished
// fragments of CSR copy; tables are structured for grid rendering. No em
// dashes are used inside any prose body.
export const docSections: DocSection[] = [
  {
    id: "sec-9",
    number: "9",
    title: "Investigation plan",
    paragraphs: [
      {
        anchor: "p-9-design",
        kind: "prose",
        text:
          "Study ABC23-391-401 was a Phase 3 randomized double-blind placebo-controlled trial of Aurora in adults with relapsed disease. Six hundred twelve participants were randomized 1:1 to Aurora 200 mg daily or matched placebo across 42 sites in three regions. The investigation plan follows ICH E3 structure and references SAP version 2.1 finalized on 2025-11-12. Stratification factors were prior therapy line, ECOG performance status, and region.",
      },
      {
        anchor: "p-9-amendments",
        kind: "prose",
        text:
          "Two protocol amendments were issued during enrollment for Aurora study ABC23-391-401. Amendment 1 corrected the screening window from 21 to 28 days after early-recruitment feedback from regulatory affairs. Amendment 2 added a pharmacokinetic substudy in 60 participants randomized to the 200 mg Aurora dose group. Effective dates by region are summarized in Section 9.1 against ADaM and SDTM derivations.",
        driftIds: ["idr-4"],
      },
    ],
  },
  {
    id: "sec-10",
    number: "10",
    title: "Study participants",
    paragraphs: [
      {
        anchor: "p-10-lead",
        kind: "prose",
        text:
          "A total of 612 participants were randomized in Study ABC23-391-401 with 306 assigned to Aurora 200 mg and 306 to placebo. Disposition counts reconcile against ADSL on lock date 2026-03-14 and Table 14.1.1 in the CSR shell. Discrepancies between the v4.2 Word export and the working v5 are tracked in the drift register and audited by Sam Ortiz.",
      },
      {
        anchor: "p-10-summary-table",
        kind: "table",
        table: {
          caption: "Summary disposition, Aurora vs Placebo (per ADSL 2026-03-14)",
          columns: ["Parameter", "Aurora (n=306)", "Placebo (n=306)"],
          rows: [
            ["Randomized", "306", "306"],
            ["Completed treatment", "289 (94.4%)", "291 (95.1%)"],
            ["Discontinued", "17 (5.6%)", "15 (4.9%)"],
          ],
        },
        source: "Source: ADSL.sas7bdat · Table 14.1.1 RTF · locked 2026-03-14",
      },
    ],
  },
  {
    id: "sec-10-1",
    number: "10.1",
    title: "Disposition",
    parentId: "sec-10",
    paragraphs: [
      {
        anchor: "p-disposition-numbers",
        kind: "table",
        driftIds: ["idr-1"],
        table: {
          caption: "Disposition of subjects per ADSL, Aurora vs Placebo",
          columns: ["Parameter", "Aurora (n=306)", "Placebo (n=306)"],
          rows: [
            ["Randomized", "306", "306"],
            ["Received study drug", "302 (98.7%)", "303 (99.0%)"],
            ["Completed treatment", "284 (92.8%)", "289 (94.4%)"],
            ["Discontinued treatment", "22 (7.2%)", "17 (5.6%)"],
            ["Lost to follow-up", "4 (1.3%)", "3 (1.0%)"],
          ],
        },
        source: "Source: ADSL.sas7bdat · Table 14.1.1 RTF · locked 2026-03-14",
      },
      {
        anchor: "p-disposition-screen-failures",
        kind: "prose",
        text:
          "Screen failures and run-in failures are reported separately in Table 14.1.2 and excluded from the randomized set shown above. Of 887 participants screened, 275 (31.0%) failed screening; the most frequent reasons were ECOG performance status above protocol threshold (98) and inadequate hematologic recovery from prior therapy (74). Screen-failure counts trace to ADSL flag SCRNFLG and to the eligibility worksheet listed under Protocol Amendment 2.",
      },
      {
        anchor: "p-disposition-ae-counts",
        kind: "prose",
        text:
          "Early discontinuations were driven by adverse events in both arms of Study ABC23-391-401. In the Aurora arm, 14 of 22 discontinuations were due to treatment-emergent adverse events versus 9 of 17 in the placebo arm. AE-driven discontinuations reconcile to ADAE listing 16.2 after the 2026-05-15 dataset refresh and require regeneration before round 2 close. Withdrawal of consent and physician decision account for the remaining cases per protocol section 5.3.",
        driftIds: ["idr-2"],
      },
    ],
  },
  {
    id: "sec-11",
    number: "11",
    title: "Efficacy",
    paragraphs: [
      {
        anchor: "p-11-lead",
        kind: "prose",
        text:
          "Efficacy analyses follow the intention-to-treat population defined in SAP version 2.1 for Aurora study ABC23-391-401. The primary endpoint was progression-free survival evaluated by blinded independent central review. Secondary endpoints included overall survival, objective response rate, and patient-reported outcomes summarized in subsequent subsections.",
      },
    ],
  },
  {
    id: "sec-11-2",
    number: "11.2",
    title: "Primary efficacy",
    parentId: "sec-11",
    paragraphs: [
      {
        anchor: "p-pfs-result",
        kind: "prose",
        text:
          "Aurora improved progression-free survival relative to placebo in Study ABC23-391-401. Median progression-free survival was 11.4 months (95% CI 9.8 to 13.2) in the Aurora arm and 7.9 months (95% CI 6.6 to 9.1) in the placebo arm. The Kaplan-Meier curves separated at the first scheduled tumor assessment and remained separated through the final analysis cut on 2026-03-14.",
      },
      {
        anchor: "p-pfs-hazard-footnote",
        kind: "prose",
        text:
          "The stratified Cox hazard ratio for progression or death was 0.62 (95% CI 0.51 to 0.76, p<0.001) favoring Aurora over placebo. Stratification factors matched randomization: prior therapy line, ECOG performance status, and region. The associated footnote still references the 2025-10-08 interim cut and requires update against SAP version 2.1 listing 8.1 before QC.",
        driftIds: ["idr-3"],
      },
    ],
  },
];

// Richer hierarchical TOC. Mirrors `tocSections` shape but adds per-section
// comment and drift counts and an explicit `parent` link for indentation.
// `sec-10-1` remains the active section, matching the existing prototype.
export const tocSectionsExpanded: {
  id: string;
  label: string;
  parent?: string;
  active?: boolean;
  commentCount: number;
  driftCount: number;
}[] = [
  { id: "sec-9", label: "9. Investigation plan", commentCount: 0, driftCount: 1 },
  { id: "sec-10", label: "10. Study participants", commentCount: 1, driftCount: 0 },
  {
    id: "sec-10-1",
    label: "10.1 Disposition",
    parent: "sec-10",
    commentCount: 2,
    driftCount: 2,
  },
  { id: "sec-11", label: "11. Efficacy", commentCount: 1, driftCount: 0 },
  {
    id: "sec-11-2",
    label: "11.2 Primary efficacy",
    parent: "sec-11",
    commentCount: 0,
    driftCount: 1,
  },
];
