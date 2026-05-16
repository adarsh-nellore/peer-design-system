"use client";

/**
 * Template · doc-editor
 * Source: Paper sheet · page · doc-editor (node 7GJ-0).
 * Refactored onto the composition contract (docs/COMPOSITION.md):
 *   - brand wordmark via <PeerBrand>
 *   - breadcrumb via <Cluster> of <MetaText>
 *   - prose centered via <Prose variant="article">, killing the right-side void
 *   - page header via <PageHeader kicker subtitle title>
 *   - continuation paragraph via <Body>, killing the bottom void
 *   - AE table via the canonical <Table total>
 *   - copilot rail via <Stack> rhythm
 */

import { AppShell } from "@/components/layout/AppShell";
import { TopNav } from "@/components/layout/TopNav";
import { RightRail } from "@/components/layout/RightRail";
import { DocFrame } from "@/components/layout/DocFrame";
import { Stack } from "@/components/layout/Stack";
import { Cluster } from "@/components/layout/Cluster";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Dot } from "@/components/ui/Dot";
import { MetaText } from "@/components/ui/MetaText";
import { PeerBrand } from "@/components/ui/PeerBrand";
import { Tab } from "@/components/ui/Tab";
import { Table } from "@/components/ui/Table";
import { Body } from "@/components/typography/Body";
import { Heading } from "@/components/typography/Heading";
import { PageHeader } from "@/components/patterns/PageHeader";
import { Prose } from "@/components/patterns/Prose";
import { AgentAvatar } from "@/components/agent/AgentAvatar";
import { CarouselCard } from "@/components/agent/CarouselCard";
import { CitationLink } from "@/components/agent/CitationLink";
import { MessageBubble } from "@/components/agent/MessageBubble";
import { PromptBar } from "@/components/agent/PromptBar";
import { ReasonedChip } from "@/components/agent/ReasonedChip";
import { SourceChip } from "@/components/agent/SourceChip";

type GradeRow = {
  grade: string;
  aurora: string;
  placebo: string;
};

const GRADE_ROWS: GradeRow[] = [
  { grade: "Grade 1 — transient",      aurora: "34 (5.7%)", placebo: "7 (2.4%)" },
  { grade: "Grade 2 — moderate ALT↑",  aurora: "13 (2.2%)", placebo: "4 (1.4%)" },
];

export default function DocEditorTemplate() {
  return (
    <AppShell
      rightRailWidth={360}
      topBar={
        <TopNav
          brand={<PeerBrand size="md" />}
          breadcrumb={
            <Cluster gap="cozy" align="center" wrap={false}>
              <MetaText size="md" tone="ink">Aurora-IV</MetaText>
              <MetaText size="md" tone="faint">/</MetaText>
              <MetaText size="md" tone="ink">Phase III CSR</MetaText>
              <MetaText size="md" tone="faint">/</MetaText>
              <MetaText size="md" tone="ink" className="font-medium">CSR-014.md</MetaText>
            </Cluster>
          }
          trailing={
            <>
              <Cluster gap="cozy" align="center">
                <Dot color="green" size="sm" />
                <MetaText size="md">auto-saved · 14:02</MetaText>
              </Cluster>
              <Button variant="primary" size="sm">Share</Button>
              <Avatar initials="AN" />
            </>
          }
        />
      }
      rightRail={
        <RightRail
          header={
            <Cluster gap="comfortable" justify="between" align="center" wrap={false} className="pb-3">
              <Cluster gap="cozy" align="center" wrap={false}>
                <span className="inline-flex items-center justify-center size-[18px] rounded-full bg-coral-soft shrink-0">
                  <span className="size-2 rounded-full bg-coral" />
                </span>
                <Heading size="h4">Copilot</Heading>
              </Cluster>
              <MetaText size="sm">peer-csr-v3</MetaText>
            </Cluster>
          }
          footer={
            <PromptBar
              placeholder="Ask Peer about §12.4…"
              showShortcut={false}
              showSlashHint={false}
            />
          }
        >
          <Stack gap="block">

            <MessageBubble role="user" author="you" timestamp="14:03">
              Draft the §12.4 hepatic AE narrative.
            </MessageBubble>

            <Stack gap="cozy">
              <Cluster gap="cozy" align="center">
                <AgentAvatar size="sm" name="peer" />
                <MetaText size="sm">· 14:03</MetaText>
              </Cluster>
              <ReasonedChip
                label="Reasoned · 6 steps · 12s"
                steps={[
                  "Loaded CSR-014 §12.4 + LFT-labs.csv",
                  "Counted hepatic AE incidence per arm + grade",
                  "Compared Grade 1–2 reversibility against Phase II",
                  "Confirmed no Grade 4 events in either arm",
                ]}
              />
              <CarouselCard
                variants={[
                  {
                    label: "conservative",
                    body: "Most events were Grade 1–2 transient ALT elevations, resolving without intervention.",
                    footer: "Pro · cautious framing  ·  Con · understates magnitude",
                  },
                  {
                    label: "balanced",
                    body: "Hepatic adverse events occurred in 8.2% of Aurora-IV recipients, predominantly Grade 1–2 transient elevations that resolved without intervention.",
                    footer: "Pro · matches table data  ·  Con · longer",
                  },
                  {
                    label: "comparative",
                    body: "While Aurora-IV showed elevated hepatic AE incidence vs placebo (8.2% vs 4.1%), all events were reversible and consistent with the Phase II profile.",
                    footer: "Pro · framing vs placebo  ·  Con · implies safety call",
                  },
                ]}
              />
            </Stack>

          </Stack>
        </RightRail>
      }
    >
      <DocFrame
        padding="none"
        tabBar={
          <Cluster gap="tight" align="end" wrap={false} className="h-11 px-4 shrink-0 border-b border-hairline">
            <Tab kind="md" label="CSR-014.md" active onClose={() => {}} />
            <Tab kind="csv" label="LFT-labs.csv" />
          </Cluster>
        }
      >
        <Prose variant="article" className="py-10">

          <PageHeader
            kicker="SECTION 12.4"
            subtitle="— Phase III · Aurora-IV · Hepatic AEs"
            title="Hepatic adverse events"
            titleSize="h2"
          />

          <Body size="lead">
            Aurora-IV is administered orally once daily and is metabolized primarily by CYP3A4.
            Hepatic adverse events occurred in 8.2% of Aurora-IV recipients
            <CitationLink number={1} preview={
              <SourceChip variant="bordered" kind="md" file="CSR-014.md" pointer="§12.4" />
            } /> versus 4.1% of placebo
            <CitationLink number={2} preview={
              <SourceChip variant="bordered" kind="csv" file="LFT-labs.csv" />
            } />. Most events were Grade 1–2 transient ALT elevations, resolving without intervention.
          </Body>

          <Table<GradeRow>
            zebra
            columns={[
              { key: "grade",   header: "grade",            weight: 2, align: "left"  },
              { key: "aurora",  header: "aurora-iv (n=598)", weight: 1, align: "right" },
              { key: "placebo", header: "placebo (n=293)",   weight: 1, align: "right" },
            ]}
            rows={GRADE_ROWS}
            total={{ label: "Total — any grade", values: ["49 (8.2%)", "12 (4.1%)"] }}
          />

          <Body size="body" tone="muted">
            A pre-specified subgroup analysis of participants with baseline LFT abnormalities (n=124)
            demonstrated comparable safety to the overall population. Hepatotoxicity was reversible in
            95% of cases with discontinuation of study drug, and no Grade 4 events were observed in
            either arm. The pattern is consistent with the Phase II profile.
          </Body>

        </Prose>
      </DocFrame>
    </AppShell>
  );
}
