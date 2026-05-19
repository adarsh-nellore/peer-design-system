"use client";

import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import type { ActivityItem, CsrDocument } from "@/lib/types";
import { activityForVersion, users } from "@/lib/mock-data";
import { Stack } from "@/components/layout/Stack";
import { Cluster } from "@/components/layout/Cluster";
import { Dot } from "@/components/ui/Dot";
import { Badge } from "@/components/ui/Badge";
import { MetaText } from "@/components/ui/MetaText";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { Glyph } from "@/components/ui/Glyph";

type WorkflowTreeProps = {
  doc: CsrDocument;
  qs: (params: Record<string, string | undefined>) => string;
  selectedActivityId?: string;
};

function activityTone(kind: ActivityItem["kind"], status?: ActivityItem["status"]) {
  if (status === "stale") return "warning" as const;
  if (status === "done") return "success" as const;
  if (kind === "drift") return "warning" as const;
  if (kind === "export") return "info" as const;
  return "neutral" as const;
}

export function WorkflowTree({ doc, qs, selectedActivityId }: WorkflowTreeProps) {
  const [docOpen, setDocOpen] = useState(true);
  const [versionOpen, setVersionOpen] = useState<Record<string, boolean>>({
    [doc.pinnedVersionId]: true,
    [doc.workingVersionId]: true,
  });

  return (
    <Stack gap="comfortable" className="anim-fade-in" data-wt="workflow-tree">
      <MetaLabel tone="muted">This document</MetaLabel>

      <button
        type="button"
        className="flex w-full items-center gap-2 py-1.5 text-left hover:bg-soft rounded-md px-2 -mx-2"
        onClick={() => setDocOpen(!docOpen)}
      >
        <Glyph name={docOpen ? "chev-up" : "chev"} size={12} className="text-faint shrink-0" />
        <span className="text-sm font-semibold text-ink truncate flex-1">{doc.studyId}</span>
        <Badge tone="info">Round 2</Badge>
      </button>

      {docOpen && (
        <Stack gap="tight" className="pl-3 border-l border-hairline ml-0.5">
          {doc.versions.map((v) => {
            const activities = activityForVersion(v.id);
            const isOpen = versionOpen[v.id] ?? false;
            const isPinned = v.id === doc.pinnedVersionId;
            const isWorking = v.id === doc.workingVersionId;

            return (
              <div key={v.id}>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 py-1.5 text-left hover:bg-soft rounded-md px-2 -mx-2"
                  onClick={() => setVersionOpen((p) => ({ ...p, [v.id]: !p[v.id] }))}
                >
                  <Glyph name={isOpen ? "chev-up" : "chev"} size={11} className="text-faint shrink-0" />
                  <Dot
                    color={isWorking ? "coral" : isPinned ? "info" : v.kind === "export" ? "gold" : "muted"}
                    size="sm"
                  />
                  <span className="text-xs font-medium text-muted truncate flex-1">{v.label}</span>
                  {isPinned && <Badge tone="info">pinned</Badge>}
                </button>

                {isOpen && activities.length > 0 && (
                  <Stack gap="tight" className="pl-5 mt-0.5">
                    {activities.map((a) => {
                      const u = users[a.actorId];
                      const selected = selectedActivityId === a.id;
                      const panel =
                        a.status === "stale" ? "quorum" : a.kind === "export" ? "launch" : undefined;

                      const row = (
                        <Cluster
                          gap="cozy"
                          align="center"
                          className={clsx(
                            "py-1.5 px-2 rounded-md w-full min-h-[2rem]",
                            selected ? "bg-coral-soft border border-coral/20" : "hover:bg-soft"
                          )}
                        >
                          <Dot
                            color={activityTone(a.kind, a.status) === "warning" ? "gold" : "green"}
                            size="sm"
                            className="shrink-0"
                          />
                          <Stack gap="tight" className="min-w-0 flex-1">
                            <span className="text-xs text-ink leading-snug">{a.label}</span>
                            <Cluster gap="tight" align="center" wrap={false}>
                              <MetaText tone="faintest" size="sm">
                                {u?.initials} · {a.timestamp}
                              </MetaText>
                              <Badge tone={activityTone(a.kind, a.status)}>{a.kind}</Badge>
                            </Cluster>
                          </Stack>
                        </Cluster>
                      );

                      if (panel) {
                        return (
                          <Link key={a.id} href={qs({ tab: "workflow", panel, activity: a.id })} className="block">
                            {row}
                          </Link>
                        );
                      }
                      return <div key={a.id}>{row}</div>;
                    })}
                  </Stack>
                )}
              </div>
            );
          })}
        </Stack>
      )}

      <Cluster gap="cozy" className="pt-3 border-t border-hairline" wrap>
        <Link href={qs({ tab: "workflow", panel: "quorum" })} className="text-coral text-xs font-medium underline">
          Review quorum
        </Link>
        <Link href={qs({ overlay: "launch-review" })} className="text-muted text-xs underline">
          Launch review
        </Link>
        <Link href={qs({ overlay: "collect" })} className="text-muted text-xs underline">
          Collect package
        </Link>
      </Cluster>
    </Stack>
  );
}
