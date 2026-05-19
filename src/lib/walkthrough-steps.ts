export const WALKTHROUGH_STORAGE_KEY = "csr-workflow-rail-tour-v1";
export const WALKTHROUGH_SESSION_KEY = "csr-workflow-rail-tour-active";

export type TourStep = {
  id: string;
  title: string;
  body: string;
  href: string;
  target?: string;
};

export const WALKTHROUGH_STEPS: TourStep[] = [
  {
    id: "welcome",
    title: "Command Center",
    body: "Program KPIs and document progress at a glance.",
    href: "/dashboard",
    target: "dashboard-kpis",
  },
  {
    id: "editor",
    title: "CSR editor",
    body: "TOC, canvas, and Copilot stay visible while you orchestrate.",
    href: "/documents/abc877-201?tab=copilot",
    target: "doc-canvas",
  },
  {
    id: "drift",
    title: "Inline drift",
    body: "Hover highlighted text, then open workflow for quorum.",
    href: "/documents/abc877-201?tab=copilot",
    target: "doc-canvas",
  },
  {
    id: "workflow",
    title: "Activity tree",
    body: "Document, version, then every handoff in one tree.",
    href: "/documents/abc877-201?tab=workflow",
    target: "workflow-tree",
  },
  {
    id: "comments",
    title: "Comments",
    body: "Threads stay tied to sections and pinned version.",
    href: "/documents/abc877-201?tab=comments",
    target: "comments-tab",
  },
];

export function resolveTourStepIndex(pathname: string, tab?: string | null): number {
  if (pathname === "/dashboard") return 0;
  if (pathname.includes("/documents/")) {
    if (tab === "workflow") return 3;
    if (tab === "comments") return 4;
    return 1;
  }
  return 0;
}

export function readTourSession(): { active: boolean; index: number } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(WALKTHROUGH_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as { active: boolean; index: number };
  } catch {
    return null;
  }
}

export function writeTourSession(active: boolean, index: number) {
  sessionStorage.setItem(WALKTHROUGH_SESSION_KEY, JSON.stringify({ active, index }));
}

export function clearTourSession() {
  sessionStorage.removeItem(WALKTHROUGH_SESSION_KEY);
}
