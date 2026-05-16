export type Tone =
  | "neutral"
  | "muted"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "info";

export type Size = "sm" | "md" | "lg";

/**
 * The 13 agent states the design system has UX patterns for.
 * Used by components in src/components/agent/ to brand stateful UI consistently.
 */
export type AgentState =
  | "idle"
  | "thinking"
  | "streaming"
  | "tool_running"
  | "awaiting_user"
  | "clarifying"
  | "suggestion_ready"
  | "low_confidence"
  | "hallucination_flagged"
  | "error"
  | "rate_limited"
  | "accepted"
  | "rejected";
