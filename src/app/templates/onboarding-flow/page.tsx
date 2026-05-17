"use client";

/**
 * Template · onboarding-flow
 * Source: Paper sheet · page · onboarding-flow (node 7RT-0).
 * Step-2-of-4 onboarding card on a soft page background. No AppShell — this
 * is a no-chrome onboarding surface: TopNav (no border, page-color) + a
 * vertically + horizontally centered card.
 *
 * Composition notes (docs/COMPOSITION.md):
 *   - brand wordmark via <PeerBrand size="md">
 *   - kicker rendered with <Caption> directly (rather than going through
 *     <PageHeader subtitleVariant="editorial">) because the card layout is
 *     genuinely editorial-bespoke — same rationale as the longform-reader
 *     template, which also uses Caption-style typography outside the
 *     standard PageHeader molecule.
 *   - vertical rhythm via <Stack>; horizontal rhythm via <Cluster>
 *   - arrow glyphs via <Glyph name="arrow-left|arrow-right">
 *   - selected option uses bg-stripe + border-coral via inline className on
 *     a plain wrapper (no gap classes; flex+gap stays inside <Cluster>)
 */

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Caption } from "@/components/ui/Caption";
import { Glyph } from "@/components/ui/Glyph";
import { MetaText } from "@/components/ui/MetaText";
import { PeerBrand } from "@/components/ui/PeerBrand";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { Radio } from "@/components/ui/Radio";
import { TopNav } from "@/components/layout/TopNav";
import { Stack } from "@/components/layout/Stack";
import { Cluster } from "@/components/layout/Cluster";
import { Body } from "@/components/typography/Body";
import { Heading } from "@/components/typography/Heading";

type FramingOption = {
  id: "conservative" | "direct" | "comparative";
  title: string;
  description: string;
  recommended?: boolean;
};

const OPTIONS: FramingOption[] = [
  {
    id: "conservative",
    title: "Conservative",
    description:
      "Mirrors FDA template phrasings. Hedges when evidence is thin. Best for first submissions.",
    recommended: true,
  },
  {
    id: "direct",
    title: "Direct",
    description:
      "Plain, no hedging. Reads like a working memo to a knowledgeable reader.",
  },
  {
    id: "comparative",
    title: "Comparative",
    description:
      "Side-by-side framing of treatment vs control. Best for safety reviews and amendments.",
  },
];

export default function OnboardingFlowTemplate() {
  const selected: FramingOption["id"] = "conservative";

  return (
    <div className="absolute inset-0 flex flex-col bg-soft text-ink antialiased">

      <TopNav
        className="bg-soft border-0"
        brand={<PeerBrand size="md" />}
        trailing={
          <>
            <MetaText size="md">Step 2 of 4</MetaText>
            <Button variant="ghost" size="sm">Save &amp; exit</Button>
          </>
        }
      />

      <div className="flex-1 min-h-0 flex items-center justify-center py-16 px-6">
        <Stack
          as="section"
          gap="tight"
          className="w-[520px] rounded-card bg-paper border border-hairline-strong shadow-pop overflow-hidden"
        >
          {/* Header */}
          <Stack gap="section" align="center" className="pt-10 pb-6 px-10">
            <ProgressDots total={4} current={2} />
            <Stack gap="comfortable" align="center">
              <Caption size="md" tone="muted" className="text-center">
                How should Peer reference your work?
              </Caption>
              <Heading size="h3" className="text-center">
                Pick your default framing
              </Heading>
              <Body
                size="small"
                tone="muted"
                measured={false}
                className="text-center max-w-[380px] mx-auto"
              >
                This shapes how Peer writes section narratives. You can override per section later.
              </Body>
            </Stack>
          </Stack>

          {/* Options */}
          <Stack gap="comfortable" className="pt-4 pb-6 px-10">
            {OPTIONS.map((opt) => {
              const isSelected = opt.id === selected;
              return (
                <Cluster
                  key={opt.id}
                  as="label"
                  gap="comfortable"
                  align="start"
                  wrap={false}
                  className={
                    isSelected
                      ? "rounded-input py-3.5 px-4 bg-stripe border-[1.5px] border-coral cursor-pointer"
                      : "rounded-input py-3.5 px-4 border border-hairline-strong cursor-pointer hover:bg-stripe"
                  }
                >
                  <span className="mt-0.5 inline-flex shrink-0">
                    <Radio name="framing" value={opt.id} checked={isSelected} readOnly />
                  </span>
                  <Stack gap="tight">
                    <Cluster gap="cozy" align="center">
                      <Body
                        size="small"
                        measured={false}
                        className="font-semibold"
                      >
                        {opt.title}
                      </Body>
                      {opt.recommended && (
                        <Badge tone="accent">recommended</Badge>
                      )}
                    </Cluster>
                    <Body size="small" tone="muted" measured={false}>
                      {opt.description}
                    </Body>
                  </Stack>
                </Cluster>
              );
            })}
          </Stack>

          {/* Footer */}
          <Cluster
            justify="between"
            align="center"
            wrap={false}
            className="pt-4 pb-6 px-10 border-t border-hairline"
          >
            <Button
              variant="ghost"
              size="md"
              leadingIcon={<Glyph name="arrow-left" size={13} />}
            >
              Back
            </Button>
            <Cluster gap="comfortable" align="center" wrap={false}>
              <Button variant="ghost" size="md">Skip</Button>
              <Button
                variant="primary"
                size="md"
                trailingIcon={<Glyph name="arrow-right" size={13} />}
              >
                Continue
              </Button>
            </Cluster>
          </Cluster>
        </Stack>
      </div>
    </div>
  );
}
