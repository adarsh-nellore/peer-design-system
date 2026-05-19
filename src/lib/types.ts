export type WorkflowState =
  | "awaiting_lock"
  | "awaiting_files"
  | "ready_to_collect"
  | "collecting"
  | "drafting"
  | "review_open"
  | "incorporating"
  | "qc"
  | "pending_signoff"
  | "approved";

export type SpineKey =
  | "lock"
  | "files_generated"
  | "collect"
  | "draft"
  | "review"
  | "incorporate"
  | "qc"
  | "signoff";

export type TaskStatus =
  | "not_sent"
  | "sent"
  | "opened"
  | "in_progress"
  | "done"
  | "stale"
  | "blocked";

export interface User {
  id: string;
  name: string;
  initials: string;
  role: string;
}

export interface WorkTask {
  id: string;
  title: string;
  assigneeId: string;
  status: TaskStatus;
  versionLabel: string;
  sectionId?: string;
  seenVersion?: string;
}

export interface SpineStage {
  key: SpineKey;
  label: string;
  status: "pending" | "active" | "complete";
  owner: string;
}

export interface DocumentVersion {
  id: string;
  label: string;
  kind: "working" | "pinned" | "archived" | "export";
  sectionsEdited: string[];
}

export interface DriftMarker {
  id: string;
  sectionId: string;
  anchorText: string;
  summary: string;
  workflowPanel?: "quorum" | "launch" | "collect";
}

export interface SectionBlock {
  sectionId: string;
  heading: string;
  paragraphs: string[];
  sourceLine?: string;
  driftMarkerIds?: string[];
}

export interface ActivityItem {
  id: string;
  versionId: string;
  label: string;
  actorId: string;
  timestamp: string;
  kind: "edit" | "export" | "review" | "comment" | "approval" | "drift";
  status?: TaskStatus;
}

export interface CsrDocument {
  id: string;
  title: string;
  studyId: string;
  workflowState: WorkflowState;
  workingVersionId: string;
  pinnedVersionId: string;
  stages: SpineStage[];
  peopleOnReview: WorkTask[];
  driftLines: string[];
  versions: DocumentVersion[];
  approvals: { gate: string; label: string; versionLabel?: string }[];
  activity: ActivityItem[];
  // Additive pointer lists into the richer mock-data tables defined below.
  // Pages that do not consume these fields keep working unchanged.
  inlineDriftIds?: string[];
  activityIds?: string[];
  sourceArtifactIds?: string[];
  sectionIds?: string[];
}

// ── Richer inline-drift model ──
// Inline drift attaches a severity-tagged annotation to a specific paragraph
// anchor inside a section, with a pointer back to the activity that resolves it.
export type DriftSeverity = "info" | "warning" | "critical";

export interface InlineDrift {
  id: string;
  sectionId: string;
  paragraphAnchor: string;
  severity: DriftSeverity;
  title: string;
  detail: string;
  versionRef: string;
  resolveActivityId?: string;
}

// ── Version activity log ──
// Full audit timeline of edits, exports, imports, approvals, comments,
// review-round transitions, QC checks, sign-off, and drift flags per version.
export type ActivityKind =
  | "edit"
  | "export"
  | "import"
  | "approve"
  | "comment"
  | "review_round_open"
  | "review_round_close"
  | "qc_check"
  | "signoff"
  | "drift_flag";

export interface VersionActivity {
  id: string;
  versionId: string;
  kind: ActivityKind;
  actorId: string;
  timestamp: string;
  label: string;
  detail?: string;
  sectionId?: string;
  driftId?: string;
}

// ── Locked data-source artifacts that the CSR cites ──
export interface SourceArtifact {
  id: string;
  kind: "dataset" | "tlf" | "sap" | "protocol" | "manifest";
  label: string;
  lockedAt: string;
  citationCount: number;
}

// ── Section / paragraph model for richer document content ──
// Each paragraph has a stable anchor so inline drifts can point at it.
export interface DocSection {
  id: string;
  number: string;
  title: string;
  parentId?: string;
  paragraphs: DocParagraph[];
}

export interface DocParagraph {
  anchor: string;
  kind: "prose" | "table" | "list" | "source";
  text?: string;
  driftIds?: string[];
  table?: { columns: string[]; rows: string[][]; caption?: string };
  source?: string;
}
