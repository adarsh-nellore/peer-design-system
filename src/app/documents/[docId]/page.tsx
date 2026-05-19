"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

import { AnimatedPresencePanel } from "@/components/csr/AnimatedPresencePanel";
import { CopilotFeed } from "@/components/csr/CopilotFeed";
import { DocumentCanvas } from "@/components/csr/DocumentCanvas";
import { EditorDrawer } from "@/components/csr/EditorDrawer";
import { InlinePanel } from "@/components/csr/InlinePanel";
import { QcPanel } from "@/components/csr/QcPanel";
import { SectionNav } from "@/components/csr/SectionNav";
import { SourceArtifactsPanel } from "@/components/csr/SourceArtifactsPanel";
import { WorkflowOverlays } from "@/components/csr/WorkflowOverlays";
import { WorkflowTree } from "@/components/csr/WorkflowTree";
import {
  commentThreads,
  getDocSection,
  getDocument,
  users,
  versionActivity,
} from "@/lib/mock-data";
import { docPath } from "@/lib/csr-urls";

import { AppShell } from "@/components/layout/AppShell";
import { TopNav, Breadcrumb } from "@/components/layout/TopNav";
import { LinkButton } from "@/components/layout/LinkButton";
import { Stack } from "@/components/layout/Stack";
import { Cluster } from "@/components/layout/Cluster";

import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Dot } from "@/components/ui/Dot";
import { MetaText } from "@/components/ui/MetaText";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { Pill } from "@/components/ui/Pill";

const TABS = ["copilot", "workflow", "comments", "qc"] as const;
const DEFAULT_SECTION = "sec-10-1";

function CsrEditorInner() {
  const { docId } = useParams<{ docId: string }>();
  const search = useSearchParams();
  const tab = (search.get("tab") || "copilot") as (typeof TABS)[number];
  const panel = search.get("panel") || "";
  const overlay = search.get("overlay") || "";
  const commentFilter = search.get("filter") || "all";
  const activity = search.get("activity") || "";
  const sectionId = search.get("section") || DEFAULT_SECTION;
  const threadId = search.get("thread") || "";

  const id = docId ?? "";
  const makeQs = (params: Record<string, string | undefined>) => docPath(id, params);

  const doc = getDocument(id);
  if (!doc) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex h-dvh items-center justify-center bg-paper text-ink text-sm"
      >
        Document not found.{" "}
        <Link href="/dashboard" className="ml-1 text-coral underline">
          Back to dashboard
        </Link>
      </motion.div>
    );
  }

  const closeHref = makeQs({ tab, section: sectionId });
  const activeSection = getDocSection(sectionId) ?? getDocSection(DEFAULT_SECTION)!;

  const openCount = commentThreads.filter((t) => t.status === "open").length;
  const resolvedCount = commentThreads.filter((t) => t.status === "resolved").length;

  const visibleThreads =
    commentFilter === "open"
      ? commentThreads.filter((t) => t.status === "open")
      : commentFilter === "resolved"
        ? commentThreads.filter((t) => t.status === "resolved")
        : commentThreads;

  const filteredBySection = search.get("section")
    ? visibleThreads.filter((t) => t.sectionId === sectionId)
  : visibleThreads;

  const displayThreads = threadId
    ? filteredBySection.filter((t) => t.id === threadId)
    : filteredBySection;

  return (
    <AppShell
      leftNavWidth={208}
      rightRailWidth={340}
      topBar={
        <TopNav
          breadcrumb={
            <Breadcrumb
              items={[
                {
                  label: (
                    <Link href="/dashboard" className="hover:text-coral transition-colors">
                      Command Center
                    </Link>
                  ),
                },
                { label: doc.title, current: true },
              ]}
            />
          }
          trailing={
            <Cluster gap="cozy" align="center" wrap={false}>
              <LinkButton
                href={makeQs({ tab, section: sectionId, overlay: "version-history" })}
                variant="secondary"
                size="sm"
                leadingIcon={<Dot color="coral" size="sm" />}
              >
                Working v5 · Pinned v4
              </LinkButton>
              <MetaText tone="faint" size="sm" className="whitespace-nowrap hidden lg:block">
                Round 2 open · QC pending
              </MetaText>
              <LinkButton href={makeQs({ tab: "workflow", section: sectionId })} variant="primary" size="sm">
                Open workflow
              </LinkButton>
            </Cluster>
          }
        />
      }
      leftNav={<SectionNav docId={id} activeSectionId={sectionId} tab={tab} />}
      rightRail={
        <motion.div
          layout
          className="flex flex-col h-full bg-paper border-l border-hairline"
        >
          <motion.div
            className="flex shrink-0 border-b border-hairline-strong"
            layout
          >
            {TABS.map((t) => (
              <Link
                key={t}
                href={makeQs({ tab: t, section: sectionId })}
                className={clsx(
                  "flex-1 py-3 text-center text-xs font-medium capitalize border-b-2 transition-colors",
                  tab === t
                    ? "border-coral text-ink"
                    : "border-transparent text-muted hover:text-ink"
                )}
              >
                {t === "copilot" ? "Copilot" : t === "qc" ? "QC" : t}
                {t === "comments" && (
                  <span className="ml-1 text-faint tabular-nums">({openCount})</span>
                )}
              </Link>
            ))}
          </motion.div>

          <div className="flex-1 min-h-0 overflow-hidden">
            <AnimatedPresencePanel panelKey={tab}>
              {tab === "copilot" && <CopilotFeed docId={id} />}

              {tab === "workflow" && (
                <motion.div
                  className="flex-1 min-h-0 overflow-y-auto scroll-tame px-4 py-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Stack gap="comfortable">
                    <WorkflowTree doc={doc} qs={makeQs} selectedActivityId={activity} />

                    {panel === "quorum" && (
                      <InlinePanel
                        title="Review quorum"
                        footer={
                          <Cluster gap="cozy">
                            <LinkButton
                              href={makeQs({ overlay: "quorum" })}
                              variant="secondary"
                              size="sm"
                            >
                              Full quorum view
                            </LinkButton>
                            <LinkButton
                              href={makeQs({ tab: "workflow", section: sectionId })}
                              variant="primary"
                              size="sm"
                            >
                              Close panel
                            </LinkButton>
                          </Cluster>
                        }
                      >
                        <Alert
                          tone="warning"
                          compact
                          body="Elena Vasquez opened v3 export, not pinned v4."
                          className="mb-2"
                        />
                        <Cluster gap="cozy" className="mb-2">
                          <Card variant="soft" padding="sm">
                            <p className="text-ink font-semibold text-sm text-center">4/7</p>
                            <MetaText tone="default">responded</MetaText>
                          </Card>
                          <Card variant="soft" padding="sm">
                            <p className="text-ink font-semibold text-sm text-center">v4</p>
                            <MetaText tone="default">pinned</MetaText>
                          </Card>
                        </Cluster>
                        <Link
                          href={makeQs({ tab: "comments", filter: "open" })}
                          className="text-xs text-coral underline"
                        >
                          View open comments →
                        </Link>
                      </InlinePanel>
                    )}

                    {panel === "launch" && (
                      <InlinePanel
                        title="Launch review round"
                        footer={
                          <LinkButton
                            href={makeQs({ overlay: "launch-review" })}
                            variant="primary"
                            size="sm"
                          >
                            Launch in modal
                          </LinkButton>
                        }
                      >
                        <MetaText tone="faint" size="sm">
                          Pin v4 for reviewers. Working v5 stays with you.
                        </MetaText>
                      </InlinePanel>
                    )}
                  </Stack>
                </motion.div>
              )}

              {tab === "comments" && (
                <motion.div
                  className="flex-1 min-h-0 overflow-y-auto scroll-tame px-4 py-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Stack gap="comfortable" data-wt="comments-tab">
                    {doc.workflowState === "review_open" && (
                      <Alert
                        tone="warning"
                        body="Review round 2 is open. Incorporation starts after quorum is met and round is closed."
                        action={
                          <Link
                            href={makeQs({ overlay: "quorum" })}
                            className="text-xs text-coral underline font-medium"
                          >
                            Check quorum →
                          </Link>
                        }
                      />
                    )}

                    <Cluster gap="tight" wrap>
                      {(["all", "open", "resolved"] as const).map((f) => (
                        <Link
                          key={f}
                          href={makeQs({ tab: "comments", filter: f, section: sectionId })}
                          className={clsx(
                            "rounded-full px-2.5 py-1 text-xs capitalize transition-colors",
                            commentFilter === f
                              ? "bg-ink text-paper"
                              : "bg-soft text-muted hover:bg-stripe"
                          )}
                        >
                          {f === "all"
                            ? `All (${commentThreads.length})`
                            : f === "open"
                              ? `Open (${openCount})`
                              : `Resolved (${resolvedCount})`}
                        </Link>
                      ))}
                    </Cluster>

                    <Stack gap="cozy">
                      {displayThreads.map((thread, i) => {
                        const u = users[thread.authorId];
                        return (
                          <motion.div
                            key={thread.id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.04 }}
                          >
                            <Card variant="paper" padding="sm">
                              <Cluster gap="cozy" align="center" className="mb-1.5">
                                <span className="h-5 w-5 rounded-full bg-stripe text-muted text-xs flex items-center justify-center font-medium shrink-0">
                                  {u?.initials}
                                </span>
                                <span className="text-ink text-xs font-medium">{u?.name}</span>
                                <MetaText tone="faint" className="ml-auto">
                                  {thread.time}
                                </MetaText>
                              </Cluster>
                              <Cluster gap="tight" className="mb-1.5">
                                <Link href={makeQs({ tab: "copilot", section: thread.sectionId })}>
                                  <Pill variant="outlined" size="sm" asStatic>
                                    {thread.sectionLabel}
                                  </Pill>
                                </Link>
                                <Badge tone={thread.status === "open" ? "danger" : "success"}>
                                  {thread.status}
                                </Badge>
                                <MetaText tone="faintest" size="sm">
                                  {thread.versionLabel}
                                </MetaText>
                              </Cluster>
                              <p className="text-ink text-xs leading-relaxed mb-1.5">
                                {thread.excerpt}
                              </p>
                              <Cluster gap="cozy" className="pt-0.5">
                                <Link
                                  href={makeQs({
                                    tab: "comments",
                                    thread: thread.id,
                                    filter: commentFilter,
                                  })}
                                  className="text-xs text-coral hover:underline"
                                >
                                  Reply
                                </Link>
                                {thread.status === "open" && (
                                  <Link
                                    href={makeQs({
                                      tab: "comments",
                                      filter: "resolved",
                                      section: thread.sectionId,
                                    })}
                                    className="text-xs text-muted hover:underline"
                                  >
                                    Resolve
                                  </Link>
                                )}
                                <Link
                                  href={makeQs({ tab: "workflow", activity: "act-16" })}
                                  className="text-xs text-muted hover:underline ml-auto"
                                >
                                  In workflow →
                                </Link>
                              </Cluster>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </Stack>
                  </Stack>
                </motion.div>
              )}

              {tab === "qc" && (
                <motion.div className="flex-1 min-h-0 overflow-y-auto scroll-tame px-4 py-4">
                  <QcPanel docId={id} />
                </motion.div>
              )}
            </AnimatedPresencePanel>
          </div>
        </motion.div>
      }
    >
      <div className="flex flex-col flex-1 min-h-0">
        <DocumentCanvas docId={id} section={activeSection} tab={tab} />
      </div>

      <WorkflowOverlays
        overlay={overlay}
        docId={id}
        closeHref={closeHref}
        quorumHref={makeQs({ tab: "workflow", panel: "quorum" })}
        launchHref={makeQs({ tab: "workflow", panel: "launch" })}
        sectionId={sectionId}
      />

      <EditorDrawer
        open={overlay === "version-history"}
        title="Version history"
        onCloseHref={makeQs({ tab, section: sectionId })}
      >
        <div className="space-y-1 mb-4 max-h-48 overflow-y-auto scroll-tame">
          {doc.versions.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-2"
            >
              <motion.div
                className="flex flex-col items-center pt-0.5"
                whileHover={{ scale: 1.1 }}
              >
                <Dot
                  color={
                    v.kind === "working"
                      ? "coral"
                      : v.kind === "pinned"
                        ? "info"
                        : v.kind === "export"
                          ? "gold"
                          : "muted"
                  }
                  size="sm"
                />
                {i < doc.versions.length - 1 && (
                  <motion.div
                    className="w-px h-6 bg-stripe mt-0.5"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  />
                )}
              </motion.div>
              <div className="pb-3 flex-1">
                <Link
                  href={makeQs({ tab: "workflow", activity: `act-${i + 1}` })}
                  className="text-ink text-sm font-medium hover:text-coral"
                >
                  {v.label}
                </Link>
                <MetaText tone="faint" className="capitalize block">
                  {v.kind} · edited {v.sectionsEdited.join(", ")}
                </MetaText>
              </div>
            </motion.div>
          ))}
        </div>

        <MetaLabel tone="muted" className="block mb-2">
          Recent activity
        </MetaLabel>
        <div className="max-h-40 overflow-y-auto scroll-tame space-y-2 mb-4">
          {versionActivity.slice(0, 8).map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
            >
              <Link
                href={makeQs({ tab: "workflow", activity: a.id })}
                className="block text-xs hover:bg-soft rounded p-1.5 -mx-1.5"
              >
                <MetaText tone="ink" className="font-medium">
                  {a.label}
                </MetaText>
                <MetaText tone="faintest">{a.timestamp}</MetaText>
              </Link>
            </motion.div>
          ))}
        </div>

        <MetaLabel tone="muted" className="block mb-2">
          Edits on v4 (pinned)
        </MetaLabel>
        <motion.div
          className="border border-hairline-strong rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div className="grid grid-cols-3 bg-soft border-b border-hairline-strong px-3 py-1.5">
            <MetaLabel tone="muted">Section</MetaLabel>
            <MetaLabel tone="muted">Edits</MetaLabel>
            <MetaLabel tone="muted">Task</MetaLabel>
          </motion.div>
          {[
            { sec: "10.1 Disposition", edits: 4, task: "stale", sid: "sec-10-1" },
            { sec: "10.2 Baseline", edits: 2, task: "done", sid: "sec-10" },
            { sec: "11.2 Efficacy", edits: 1, task: "—", sid: "sec-11-2" },
          ].map((row) => (
            <motion.div
              key={row.sec}
              whileHover={{ backgroundColor: "var(--color-soft)" }}
              className="grid grid-cols-3 px-3 py-2 border-t border-hairline items-center"
            >
              <Link
                href={makeQs({ tab: "copilot", section: row.sid })}
                className="text-ink text-xs hover:underline"
              >
                {row.sec}
              </Link>
              <MetaText tone="faint">{row.edits}</MetaText>
              <Badge
                tone={
                  row.task === "stale" ? "warning" : row.task === "done" ? "success" : "neutral"
                }
              >
                {row.task}
              </Badge>
            </motion.div>
          ))}
        </motion.div>

        <LinkButton
          href={`/documents/${id}/reimport`}
          variant="ghost"
          size="sm"
          className="mt-4 text-coral"
        >
          Reimport from Word
        </LinkButton>
      </EditorDrawer>

      <EditorDrawer
        open={overlay === "sources"}
        title="Source artifacts"
        onCloseHref={makeQs({ tab, section: sectionId })}
      >
        <SourceArtifactsPanel docId={id} highlight={search.get("highlight") ?? undefined} />
      </EditorDrawer>
    </AppShell>
  );
}

export default function CsrDocumentPage() {
  return (
    <Suspense fallback={null}>
      <CsrEditorInner />
    </Suspense>
  );
}
