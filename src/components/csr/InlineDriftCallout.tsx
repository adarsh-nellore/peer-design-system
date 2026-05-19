"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";
import { cn } from "@/lib/cn";
import type { InlineDrift } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { MetaText } from "@/components/ui/MetaText";
import { Cluster } from "@/components/layout/Cluster";
import { Stack } from "@/components/layout/Stack";

type InlineDriftCalloutProps = {
  drift: InlineDrift;
  workflowHref: string;
  activityHref?: string;
};

const severityTone = {
  critical: "danger",
  warning: "warning",
  info: "info",
} as const;

const severityShell = {
  critical: "border-coral/35 bg-coral-soft/35 hover:bg-coral-soft/55",
  warning: "border-gold/45 bg-gold-soft/45 hover:bg-gold-soft/65",
  info: "border-hairline-strong bg-soft hover:bg-stripe",
} as const;

export function InlineDriftCallout({
  drift,
  workflowHref,
  activityHref,
}: InlineDriftCalloutProps) {
  const [open, setOpen] = useState(false);
  const tipId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <span
      className="relative inline-flex max-w-full align-middle"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={cn(
          "inline-flex max-w-[min(100%,15rem)] items-center gap-1 rounded-sm border px-1.5 py-0.5",
          "text-left text-[11px] leading-tight font-medium text-ink transition-colors",
          "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/50",
          severityShell[drift.severity]
        )}
        onFocus={() => setOpen(true)}
        onBlur={(e) => {
          if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node | null)) {
            setOpen(false);
          }
        }}
        aria-expanded={open}
        aria-describedby={open ? tipId : undefined}
      >
        <Badge tone={severityTone[drift.severity]} size="sm" uppercase={false} className="shrink-0">
          {drift.severity}
        </Badge>
        <span className="truncate">{drift.title}</span>
      </button>

      {open && (
        <span
          id={tipId}
          role="tooltip"
          className={cn(
            "absolute left-0 top-full z-30 mt-1.5 w-[min(19rem,calc(100vw-2.5rem))]",
            "glass-card rounded-md p-3 shadow-pop anim-fade-in pointer-events-auto"
          )}
        >
          <Cluster gap="cozy" align="center" className="mb-2">
            <Badge tone={severityTone[drift.severity]} size="sm">
              {drift.severity}
            </Badge>
            <MetaText tone="ink" size="sm" className="font-semibold leading-snug">
              {drift.title}
            </MetaText>
          </Cluster>
          <MetaText tone="default" size="sm" className="block leading-relaxed mb-2.5 text-muted">
            {drift.detail}
          </MetaText>
          <Stack gap="tight">
            <Link href={workflowHref} className="text-coral text-xs font-medium hover:underline">
              Open in workflow →
            </Link>
            {activityHref && (
              <Link href={activityHref} className="text-muted text-xs hover:text-ink hover:underline">
                View activity
              </Link>
            )}
          </Stack>
          <MetaText tone="faintest" size="sm" className="block mt-2 pt-2 border-t border-hairline">
            {drift.versionRef}
          </MetaText>
        </span>
      )}
    </span>
  );
}
