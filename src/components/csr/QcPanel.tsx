"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { qcChecklist } from "@/lib/mock-data";
import { resolveActionHref } from "@/lib/csr-urls";
import { Stack } from "@/components/layout/Stack";
import { Cluster } from "@/components/layout/Cluster";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/layout/LinkButton";
import { MetaText } from "@/components/ui/MetaText";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { Alert } from "@/components/ui/Alert";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { stagger } from "@/lib/motion";

type QcPanelProps = {
  docId: string;
};

const statusTone = {
  pass: "success",
  warn: "warning",
  fail: "danger",
  pending: "neutral",
} as const;

export function QcPanel({ docId }: QcPanelProps) {
  const passCount = qcChecklist.filter((c) => c.status === "pass").length;
  const progress = Math.round((passCount / qcChecklist.length) * 100);

  return (
    <Stack gap="comfortable" className="py-1">
      <Alert
        tone="info"
        compact
        title="AI QC pre-flight"
        body="Sam Ortiz can run human QC on pinned v4 after review round closes. Working v5 stays editable."
      />

      <Card variant="soft" padding="sm">
        <Cluster gap="cozy" align="center" className="mb-2">
          <MetaLabel tone="muted">Readiness</MetaLabel>
          <MetaText tone="ink" className="ml-auto font-semibold">
            {progress}%
          </MetaText>
        </Cluster>
        <ProgressBar value={progress} />
      </Card>

      <MetaLabel tone="muted">Checks ({qcChecklist.length})</MetaLabel>

      <Stack gap="cozy">
        {qcChecklist.map((item, i) => (
          <motion.div key={item.id} {...stagger(i, 0.04)}>
            <Card variant="paper" padding="sm" className="hover:border-coral/30 transition-colors">
              <Cluster gap="cozy" align="start" className="mb-1">
                <Badge tone={statusTone[item.status]}>{item.status}</Badge>
                <MetaText tone="ink" size="sm" className="font-medium flex-1">
                  {item.label}
                </MetaText>
              </Cluster>
              <MetaText tone="default" size="sm" className="block mb-2 text-muted">
                {item.detail}
              </MetaText>
              {item.href && (
                <Link
                  href={resolveActionHref(docId, item.href)}
                  className="text-xs text-coral font-medium hover:underline"
                >
                  Investigate →
                </Link>
              )}
            </Card>
          </motion.div>
        ))}
      </Stack>

      <Cluster gap="cozy" className="pt-2 border-t border-hairline">
        <LinkButton href={resolveActionHref(docId, "overlay:qc-gate")} variant="primary" size="sm">
          Request human QC
        </LinkButton>
        <LinkButton href={resolveActionHref(docId, "tab:workflow")} variant="secondary" size="sm">
          View workflow
        </LinkButton>
      </Cluster>
    </Stack>
  );
}
