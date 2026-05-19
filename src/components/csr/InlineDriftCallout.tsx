"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { InlineDrift } from "@/lib/types";
import { MetaText } from "@/components/ui/MetaText";
import { Badge } from "@/components/ui/Badge";
import { Cluster } from "@/components/layout/Cluster";

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

export function InlineDriftCallout({ drift, workflowHref, activityHref }: InlineDriftCalloutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.25 }}
      className="my-3 rounded-lg border border-hairline-strong bg-gold-soft/30 px-3 py-2"
    >
      <Cluster gap="cozy" align="center" className="mb-1">
        <Badge tone={severityTone[drift.severity]}>{drift.severity}</Badge>
        <MetaText tone="ink" size="sm" className="font-medium">
          {drift.title}
        </MetaText>
      </Cluster>
      <MetaText tone="default" size="sm" className="block mb-2 text-muted">
        {drift.detail}
      </MetaText>
      <Cluster gap="cozy">
        <Link href={workflowHref} className="text-coral text-xs font-medium underline">
          Open in workflow
        </Link>
        {activityHref && (
          <Link href={activityHref} className="text-muted text-xs underline">
            View activity
          </Link>
        )}
        <MetaText tone="faintest" size="sm" className="ml-auto">
          {drift.versionRef}
        </MetaText>
      </Cluster>
    </motion.div>
  );
}
