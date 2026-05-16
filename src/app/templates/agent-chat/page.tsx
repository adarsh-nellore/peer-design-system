"use client";

/**
 * Template · agent-chat
 * Source: Paper sheet · page · agent-chat (node 7GL-0).
 * Refactored onto the composition contract (docs/COMPOSITION.md):
 *   - brand wordmark via <PeerBrand>
 *   - vertical/horizontal rhythm via <Stack> / <Cluster> named buckets
 *   - all body text via <Body> / <MetaText>
 */

import { AppShell } from "@/components/layout/AppShell";
import { TopNav } from "@/components/layout/TopNav";
import { Stack } from "@/components/layout/Stack";
import { Cluster } from "@/components/layout/Cluster";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Glyph } from "@/components/ui/Glyph";
import { MetaText } from "@/components/ui/MetaText";
import { PeerBrand } from "@/components/ui/PeerBrand";
import { Pill } from "@/components/ui/Pill";
import { Body } from "@/components/typography/Body";
import { AgentAvatar } from "@/components/agent/AgentAvatar";
import { CitationLink } from "@/components/agent/CitationLink";
import { MessageBubble } from "@/components/agent/MessageBubble";
import { PromptBar } from "@/components/agent/PromptBar";
import { ReasonedChip } from "@/components/agent/ReasonedChip";
import { SourceChip } from "@/components/agent/SourceChip";

export default function AgentChatTemplate() {
  return (
    <AppShell
      topBar={
        <TopNav
          brand={
            <Cluster gap="comfortable" align="center" wrap={false}>
              <PeerBrand size="md" />
              <Button
                variant="secondary"
                size="sm"
                leadingIcon={<Glyph name="plus" size={12} strokeWidth={2.5} />}
              >
                New chat
              </Button>
            </Cluster>
          }
          trailing={
            <>
              <MetaText size="md">Aurora-IV briefing · 14:02</MetaText>
              <Avatar initials="AN" />
            </>
          }
        />
      }
    >
      <div className="flex-1 min-h-0 flex flex-col items-center pb-6">

        <div className="flex-1 min-h-0 overflow-y-auto w-full max-w-[720px] px-6 pt-8 pb-4">
          <Stack gap="section">

            <MessageBubble role="user" timestamp="14:01">
              Brief me on Aurora-IV Phase III hepatic safety, with the subgroup analysis.
            </MessageBubble>

            <Stack gap="cozy" className="max-w-[640px]">
              <Cluster gap="cozy" align="center">
                <AgentAvatar size="sm" />
                <MetaText size="sm">· 14:01</MetaText>
              </Cluster>
              <ReasonedChip
                label="Reasoned · 8 steps · 14s"
                steps={[
                  "Loaded CSR-014, LFT-labs, protocol-v3",
                  "Counted hepatic AE incidence per arm",
                  "Identified subgroup with baseline LFT abnormality",
                  "Compared to Phase II hepatic safety profile",
                ]}
                sources={
                  <Stack gap="tight">
                    <SourceChip kind="md"  file="CSR-014.md" pointer="§12.4" />
                    <SourceChip kind="csv" file="LFT-labs.csv" />
                  </Stack>
                }
              />
              <Body size="body">
                Hepatic adverse events occurred in 8.2% of Aurora-IV recipients
                <CitationLink number={1} preview={
                  <SourceChip variant="bordered" kind="md" file="CSR-014.md" pointer="§12.4" />
                } /> vs 4.1% in the placebo arm
                <CitationLink number={2} preview={
                  <SourceChip variant="bordered" kind="csv" file="LFT-labs.csv" />
                } />. Most were Grade 1-2 transient ALT elevations, resolving without intervention. A pre-specified subgroup of participants with baseline LFT abnormalities (n=124) showed no meaningfully elevated risk.
              </Body>
              <Cluster gap="cozy" align="center">
                <Pill
                  variant="outlined"
                  leadingIcon={<Glyph name="check" size={11} strokeWidth={2.5} className="text-green" />}
                >
                  Magnitude · Subgroup table · Phase 2
                </Pill>
                <Pill variant="ghost">
                  <Glyph name="more" size={11} className="text-faint" />
                </Pill>
              </Cluster>
            </Stack>

            <MessageBubble role="user" timestamp="14:03">
              Draft a one-paragraph summary suitable for §12.4 of the CSR.
            </MessageBubble>

            <Stack gap="cozy" className="max-w-[640px]">
              <Cluster gap="cozy" align="center">
                <AgentAvatar size="sm" state="thinking" />
                <MetaText size="md" tone="default" className="italic">drafting…</MetaText>
              </Cluster>
            </Stack>

          </Stack>
        </div>

        <div className="w-full max-w-[720px] px-6">
          <PromptBar
            placeholder="Ask a follow-up, or attach a reference…"
            attachments={[
              { id: "1", label: "CSR-014.md", kindBadge: <Badge>md</Badge> },
            ]}
            onSubmit={() => {}}
            onAttach={() => {}}
          />
        </div>

      </div>
    </AppShell>
  );
}
