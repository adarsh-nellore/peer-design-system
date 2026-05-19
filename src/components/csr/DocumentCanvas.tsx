"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { DocParagraph, DocSection } from "@/lib/types";
import { driftMarkers, inlineDriftById } from "@/lib/mock-data";
import { docPath } from "@/lib/csr-urls";
import { DriftInlineMarker } from "@/components/csr/DriftInlineMarker";
import { InlineDriftCallout } from "@/components/csr/InlineDriftCallout";
import { Heading } from "@/components/typography/Heading";
import { Body } from "@/components/typography/Body";
import { MetaText } from "@/components/ui/MetaText";
import { Stack } from "@/components/layout/Stack";
import { stagger } from "@/lib/motion";

type DocumentCanvasProps = {
  docId: string;
  section: DocSection;
  tab: string;
};

function ProseWithDrift({
  text,
  docId,
}: {
  text: string;
  docId: string;
}) {
  const drift1 = driftMarkers.find((d) => d.sectionId === "sec-10" && text.includes("612"));
  if (drift1 && text.includes("612")) {
    const parts = text.split("612");
    return (
      <>
        {parts[0]}
        <DriftInlineMarker
          marker={{ ...drift1, anchorText: "612 participants" }}
          docId={docId}
          href={docPath(docId, { tab: "workflow", panel: "quorum" })}
        />
        {parts.slice(1).join("612")}
      </>
    );
  }
  return <>{text}</>;
}

function DataTable({ paragraph }: { paragraph: DocParagraph }) {
  const t = paragraph.table;
  if (!t) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border border-hairline-strong rounded-lg overflow-hidden text-sm mb-4"
    >
      {t.caption && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-3 py-2 bg-soft border-b border-hairline-strong text-ink font-medium text-xs"
        >
          {t.caption}
        </motion.div>
      )}
      <motion.div
        className="grid bg-soft border-b border-hairline-strong px-3 py-2 font-medium text-ink"
        style={{ gridTemplateColumns: `repeat(${t.columns.length}, minmax(0, 1fr))` }}
      >
        {t.columns.map((col) => (
          <span key={col}>{col}</span>
        ))}
      </motion.div>
      {t.rows.map((row, ri) => (
        <motion.div
          key={ri}
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: ri * 0.05 }}
          className="grid px-3 py-2 border-b border-hairline text-ink last:border-b-0 hover:bg-soft/50 transition-colors"
          style={{ gridTemplateColumns: `repeat(${t.columns.length}, minmax(0, 1fr))` }}
        >
          {row.map((cell, ci) => (
            <span key={ci}>{cell}</span>
          ))}
        </motion.div>
      ))}
    </motion.div>
  );
}

export function DocumentCanvas({ docId, section, tab }: DocumentCanvasProps) {
  return (
    <motion.div
      key={section.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
      className="flex-1 min-h-0 overflow-y-auto scroll-tame bg-paper px-4 py-6 md:px-8 md:py-8 lg:px-10"
      data-wt="doc-canvas"
    >
      <Heading size="h2" className="mb-1">
        {section.number}. {section.title}
      </Heading>
      <MetaText tone="faint" size="sm" className="mb-6 block">
        Section {section.id} · Working v5 · Pinned v4 for review
      </MetaText>

      <Stack gap="block" className="max-w-[72ch]">
        {section.paragraphs.map((para, i) => {
          const drifts = (para.driftIds ?? [])
            .map((id) => inlineDriftById(id))
            .filter(Boolean);

          const driftTags = drifts.map(
            (d) =>
              d && (
                <InlineDriftCallout
                  key={d.id}
                  drift={d}
                  workflowHref={docPath(docId, {
                    tab: "workflow",
                    panel: "quorum",
                    activity: d.resolveActivityId,
                  })}
                  activityHref={
                    d.resolveActivityId
                      ? docPath(docId, { tab: "workflow", activity: d.resolveActivityId })
                      : undefined
                  }
                />
              )
          );

          return (
            <motion.div
              key={para.anchor}
              {...stagger(i)}
              className="anim-fade-in"
            >
              {para.kind === "prose" && para.text && (
                <Body size="small" measured={false} tone="ink" className="leading-relaxed">
                  <ProseWithDrift text={para.text} docId={docId} />
                  {driftTags.length > 0 && (
                    <span className="inline-flex flex-wrap items-center gap-1.5 ml-1.5 align-middle">
                      {driftTags}
                    </span>
                  )}
                </Body>
              )}

              {para.kind === "table" && (
                <>
                  <DataTable paragraph={para} />
                  {driftTags.length > 0 && (
                    <p className="mt-2 mb-4 flex flex-wrap items-center gap-1.5">
                      {driftTags}
                    </p>
                  )}
                </>
              )}

              {para.source && (
                <Link
                  href={docPath(docId, { tab, overlay: "sources", highlight: para.anchor })}
                  className="block mt-2 mb-6 group"
                >
                  <MetaText
                    tone="faint"
                    size="sm"
                    className="group-hover:text-coral transition-colors underline-offset-2 group-hover:underline"
                  >
                    {para.source} · View in source panel →
                  </MetaText>
                </Link>
              )}
            </motion.div>
          );
        })}
      </Stack>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mt-8 pt-6 border-t border-hairline flex flex-wrap gap-3"
      >
        <Link
          href={docPath(docId, { tab: "comments", filter: "open", section: section.id })}
          className="text-xs text-coral font-medium hover:underline"
        >
          Comments on this section →
        </Link>
        <Link
          href={docPath(docId, { tab: "copilot", section: section.id })}
          className="text-xs text-muted hover:text-ink hover:underline"
        >
          Ask Peer about {section.number}
        </Link>
        <Link
          href={docPath(docId, { tab: "qc" })}
          className="text-xs text-muted hover:text-ink hover:underline"
        >
          Run QC checks →
        </Link>
      </motion.div>
    </motion.div>
  );
}
