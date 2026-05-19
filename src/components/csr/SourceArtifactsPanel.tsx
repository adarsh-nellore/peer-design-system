"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { sourceArtifacts } from "@/lib/mock-data";
import { docPath } from "@/lib/csr-urls";
import { Stack } from "@/components/layout/Stack";
import { MetaText } from "@/components/ui/MetaText";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { Badge } from "@/components/ui/Badge";
import { Pill } from "@/components/ui/Pill";
import { stagger } from "@/lib/motion";

type SourceArtifactsPanelProps = {
  docId: string;
  highlight?: string;
};

export function SourceArtifactsPanel({ docId, highlight }: SourceArtifactsPanelProps) {
  return (
    <Stack gap="cozy">
      <MetaText tone="faint" size="sm">
        Locked artifacts cited in this CSR. Trace gate links prose to these sources.
      </MetaText>
      {sourceArtifacts.map((src, i) => (
        <motion.div
          key={src.id}
          {...stagger(i, 0.05)}
          className="rounded-lg border border-hairline-strong p-3 hover:bg-soft transition-colors"
        >
          <MetaText tone="ink" size="sm" className="font-medium block mb-1">
            {src.label}
          </MetaText>
          <Stack gap="tight">
            <MetaText tone="faint" size="sm">
              Locked {src.lockedAt} · {src.citationCount} in-document citations
            </MetaText>
            <Pill variant="outlined" size="sm" asStatic>
              {src.kind}
            </Pill>
          </Stack>
          <Link
            href={docPath(docId, { tab: "copilot", section: "sec-10-1", trace: src.id })}
            className="text-xs text-coral mt-2 inline-block hover:underline"
          >
            Trace citations →
          </Link>
        </motion.div>
      ))}
      {highlight && (
        <Badge tone="info">Highlighted anchor: {highlight}</Badge>
      )}
    </Stack>
  );
}
