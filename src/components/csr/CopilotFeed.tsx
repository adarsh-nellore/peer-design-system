"use client";

import { copilotMessages } from "@/lib/mock-data";
import { resolveActionHref } from "@/lib/csr-urls";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/layout/LinkButton";
import { Cluster } from "@/components/layout/Cluster";
import { Stack } from "@/components/layout/Stack";
import { MetaText } from "@/components/ui/MetaText";
import { TextLink } from "@/components/ui/TextLink";

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

function MessageActions({
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
    <div className="mt-3 border-t border-hairline pt-2.5">
      <div className="grid grid-cols-2 gap-2">
        {primary && (
          <LinkButton
            href={resolveActionHref(docId, primary.href)}
            variant="primary"
            size="sm"
            className="w-full justify-center"
          >
            {primary.label}
          </LinkButton>
        )}
        {secondary && (
          <LinkButton
            href={resolveActionHref(docId, secondary.href)}
            variant="secondary"
            size="sm"
            className="w-full justify-center"
          >
            {secondary.label}
          </LinkButton>
        )}
      </div>
    </div>
  );
}

function PeerHeader({ label }: { label: string }) {
  return (
    <Cluster gap="cozy" align="center" className="mb-2">
      <span
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-coral text-[10px] font-semibold text-white"
        aria-hidden
      >
        P
      </span>
      <MetaText tone="faint" size="sm">
        Peer · <span className="font-medium text-ink">{label}</span>
      </MetaText>
    </Cluster>
  );
}

export function CopilotFeed({ docId }: CopilotFeedProps) {
  return (
    <div className="flex h-full min-h-0 min-w-0 w-full flex-col" data-copilot-feed="v2">
      <div className="flex-1 min-h-0 min-w-0 overflow-y-auto scroll-tame">
        <Stack gap="comfortable" className="p-3">
          {copilotMessages.map((msg) => {
            if (msg.mode === "handoff") {
              return (
                <Card
                  key={msg.id}
                  variant="soft"
                  padding="sm"
                  className="border-l-2 border-l-info"
                >
                  <Cluster justify="between" align="center" className="mb-2">
                    <MetaText tone="ink" size="sm" className="font-semibold">
                      {msg.title ?? "Review handoff"}
                    </MetaText>
                    {msg.badge && <Badge tone="info">{msg.badge}</Badge>}
                  </Cluster>
                  <MetaText tone="default" size="sm" className="mb-3 block leading-relaxed">
                    {msg.body}
                  </MetaText>
                  <Cluster gap="cozy" wrap>
                    {msg.ctaPrimary && (
                      <LinkButton
                        href={resolveActionHref(docId, msg.ctaPrimary.href)}
                        variant="primary"
                        size="sm"
                      >
                        {msg.ctaPrimary.label}
                      </LinkButton>
                    )}
                    {msg.ctaSecondary && (
                      <LinkButton
                        href={resolveActionHref(docId, msg.ctaSecondary.href)}
                        variant="secondary"
                        size="sm"
                      >
                        {msg.ctaSecondary.label}
                      </LinkButton>
                    )}
                  </Cluster>
                </Card>
              );
            }

            if (msg.mode === "drift") {
              return (
                <Card
                  key={msg.id}
                  variant="paper"
                  padding="sm"
                  className="border-l-2 border-l-gold bg-gold-soft/30"
                >
                  <MetaText tone="ink" size="sm" className="mb-1.5 block font-semibold">
                    {msg.title ?? "Version drift"}
                  </MetaText>
                  <MetaText tone="default" size="sm" className="mb-2 block leading-relaxed">
                    {msg.body}
                  </MetaText>
                  <Stack gap="tight">
                    {msg.ctaPrimary && (
                      <TextLink
                        href={resolveActionHref(docId, msg.ctaPrimary.href)}
                        tone="coral"
                        size="sm"
                        trailingArrow
                      >
                        {msg.ctaPrimary.label}
                      </TextLink>
                    )}
                    {msg.ctaSecondary && (
                      <TextLink
                        href={resolveActionHref(docId, msg.ctaSecondary.href)}
                        tone="muted"
                        size="sm"
                      >
                        {msg.ctaSecondary.label}
                      </TextLink>
                    )}
                  </Stack>
                </Card>
              );
            }

            return (
              <Card key={msg.id} variant="paper" padding="sm">
                <PeerHeader label={modeLabel[msg.mode] ?? msg.title ?? "Copilot"} />
                <MetaText tone="ink" size="sm" className="block leading-relaxed">
                  {msg.body}
                </MetaText>
                <MessageActions
                  docId={docId}
                  primary={msg.ctaPrimary}
                  secondary={msg.ctaSecondary}
                />
              </Card>
            );
          })}
        </Stack>
      </div>

      <div className="shrink-0 border-t border-hairline-strong bg-paper p-3">
        <Cluster
          gap="cozy"
          align="center"
          className="rounded-md border border-hairline-strong bg-soft px-3 py-2"
        >
          <span className="min-w-0 flex-1 truncate text-[13px] text-faint">
            Ask Peer about this section…
          </span>
          <LinkButton href={resolveActionHref(docId, "tab:qc")} variant="primary" size="sm">
            Send
          </LinkButton>
        </Cluster>
      </div>
    </div>
  );
}
