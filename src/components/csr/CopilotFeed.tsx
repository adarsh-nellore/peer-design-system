"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { copilotMessages } from "@/lib/mock-data";
import { resolveActionHref } from "@/lib/csr-urls";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/layout/LinkButton";
import { Cluster } from "@/components/layout/Cluster";
import { MetaText } from "@/components/ui/MetaText";
import { stagger } from "@/lib/motion";

type CopilotFeedProps = {
  docId: string;
};

const modeLabel: Record<string, string> = {
  suggest: "Suggest edits",
  trace: "Trace",
  handoff: "Handoff",
  drift: "Drift",
  qc: "QC",
  user: "You",
};

function CopilotActions({
  docId,
  primary,
  secondary,
}: {
  docId: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  if (!primary && !secondary) return null;
  return (
    <motion.div
      className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1"
      layout
    >
      {primary && (
        <Link
          href={resolveActionHref(docId, primary.href)}
          className="text-[11px] leading-none font-medium text-coral hover:underline shrink-0"
        >
          {primary.label}
        </Link>
      )}
      {secondary && (
        <Link
          href={resolveActionHref(docId, secondary.href)}
          className="text-[11px] leading-none text-muted hover:text-ink hover:underline shrink-0"
        >
          {secondary.label}
        </Link>
      )}
    </motion.div>
  );
}

export function CopilotFeed({ docId }: CopilotFeedProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col flex-1 min-h-0 min-w-0"
    >
      <div className="flex flex-col gap-2 flex-1 min-h-0 min-w-0 overflow-y-auto scroll-tame px-3 py-3 pb-16">
        {copilotMessages.map((msg, i) => {
          const isDrift = msg.mode === "drift";
          const isHandoff = msg.mode === "handoff";

          return (
            <motion.article
              key={msg.id}
              {...stagger(i, 0.04)}
              className="min-w-0 rounded-md border border-hairline bg-paper px-2.5 py-2 shadow-sm"
            >
              {isDrift ? (
                <>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-0.5 h-3 rounded-full bg-gold shrink-0" aria-hidden />
                    <MetaText tone="ink" size="sm" className="font-medium text-xs">
                      {msg.title ?? "Version drift"}
                    </MetaText>
                  </div>
                  <p className="text-[11px] leading-snug text-muted">{msg.body}</p>
                  <CopilotActions docId={docId} primary={msg.ctaPrimary} secondary={msg.ctaSecondary} />
                </>
              ) : isHandoff ? (
                <>
                  <Cluster gap="tight" align="center" justify="between" className="mb-1 min-w-0">
                    <MetaText tone="ink" size="sm" className="font-medium text-xs truncate">
                      {msg.title ?? "Handoff"}
                    </MetaText>
                    {msg.badge && (
                      <Badge tone="info" className="shrink-0 text-[10px]">
                        {msg.badge}
                      </Badge>
                    )}
                  </Cluster>
                  <p className="text-[11px] leading-snug text-muted mb-2">{msg.body}</p>
                  <Cluster gap="tight" wrap className="min-w-0">
                    {msg.ctaPrimary && (
                      <LinkButton
                        href={resolveActionHref(docId, msg.ctaPrimary.href)}
                        variant="primary"
                        size="sm"
                        className="!text-[11px] !px-2 !py-1 !min-h-0"
                      >
                        {msg.ctaPrimary.label}
                      </LinkButton>
                    )}
                    {msg.ctaSecondary && (
                      <LinkButton
                        href={resolveActionHref(docId, msg.ctaSecondary.href)}
                        variant="secondary"
                        size="sm"
                        className="!text-[11px] !px-2 !py-1 !min-h-0"
                      >
                        {msg.ctaSecondary.label}
                      </LinkButton>
                    )}
                  </Cluster>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-1.5 mb-1 min-w-0">
                    <span className="h-4 w-4 rounded-full bg-coral text-white text-[9px] flex items-center justify-center font-medium shrink-0">
                      P
                    </span>
                    <MetaText tone="faint" size="sm" className="text-[10px] truncate">
                      Peer · <span className="text-muted">{modeLabel[msg.mode] ?? msg.title}</span>
                    </MetaText>
                  </div>
                  <p className="text-[11px] leading-snug text-ink">{msg.body}</p>
                  <CopilotActions
                    docId={docId}
                    primary={msg.ctaPrimary}
                    secondary={msg.ctaSecondary}
                  />
                </>
              )}
            </motion.article>
          );
        })}
      </div>

      <div className="shrink-0 border-t border-hairline-strong px-3 py-2 bg-paper">
        <div className="flex items-center gap-2 min-w-0 rounded-md border border-hairline bg-soft px-2.5 py-1.5">
          <span className="text-[11px] text-faint flex-1 min-w-0 truncate">
            Ask Peer about this section…
          </span>
          <LinkButton
            href={resolveActionHref(docId, "tab:qc")}
            variant="primary"
            size="sm"
            className="!text-[11px] !px-2 !py-1 !min-h-0 shrink-0"
          >
            Send
          </LinkButton>
        </div>
      </div>
    </motion.div>
  );
}
