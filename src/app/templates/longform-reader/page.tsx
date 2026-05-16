"use client";

/**
 * Template · longform-reader
 * Source: Paper sheet · page · longform-reader (node 7RR-0).
 * Refactored onto the composition contract (docs/COMPOSITION.md):
 *   - brand wordmark via <PeerBrand>
 *   - page header via <PageHeader kicker subtitle title meta titleSize="h1">
 *   - prose centered via <Prose variant="reader"> for the article column
 *   - all body paragraphs via <Body size="lead|body">
 *   - vertical rhythm via <Stack>, row groups via <Cluster>
 *   - kicker subtitle now matches doc-editor (mono MetaText) — same molecule
 *     guarantees same render. Editorial Fraunces remains available via
 *     <PageHeader subtitleVariant="editorial"> when an editorial flourish is
 *     genuinely intended.
 */

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Dot } from "@/components/ui/Dot";
import { Hairline } from "@/components/ui/Hairline";
import { IconButton } from "@/components/ui/IconButton";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { MetaText } from "@/components/ui/MetaText";
import { PeerBrand } from "@/components/ui/PeerBrand";
import { Table } from "@/components/ui/Table";
import { TopNav } from "@/components/layout/TopNav";
import { Stack } from "@/components/layout/Stack";
import { Cluster } from "@/components/layout/Cluster";
import { Body } from "@/components/typography/Body";
import { PageHeader } from "@/components/patterns/PageHeader";
import { Prose } from "@/components/patterns/Prose";
import { CitationLink } from "@/components/agent/CitationLink";
import { HallucinationFlag } from "@/components/agent/HallucinationFlag";
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

export default function LongformReaderTemplate() {
  return (
    <div className="absolute inset-0 flex flex-col bg-paper text-ink antialiased overflow-y-auto scroll-tame">

      <TopNav
        className="sticky top-0 z-20 bg-paper/85 backdrop-blur-md px-10"
        brand={
          <Cluster gap="cozy" align="center" wrap={false}>
            <IconButton variant="ghost" size="md" aria-label="Back" className="-ml-2">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="11,6 5,12 11,18" />
              </svg>
            </IconButton>
            <PeerBrand size="md" />
          </Cluster>
        }
        breadcrumb={
          <Cluster gap="cozy" align="center" wrap={false}>
            <MetaText size="md" tone="ink">Aurora-IV</MetaText>
            <MetaText size="md" tone="faint">/</MetaText>
            <MetaText size="md" tone="ink" className="font-medium">CSR-014.md</MetaText>
          </Cluster>
        }
        trailing={
          <>
            <Cluster gap="cozy" align="center" className="py-1 px-2.5 bg-green-soft rounded-full">
              <Dot color="green" size="sm" />
              <MetaText size="sm" className="font-bold text-green">94% verified</MetaText>
            </Cluster>
            <Button variant="primary" size="sm">Accept all</Button>
            <Avatar initials="AN" />
          </>
        }
      />

      <Cluster gap="hero" align="start" justify="center" wrap={false} className="py-16 px-20">

        {/* Article column */}
        <Prose variant="reader">

          <PageHeader
            kicker="SECTION 12.4"
            subtitle="— Phase III · Aurora-IV · Hepatic Adverse Events"
            title="Hepatic adverse events"
            titleSize="h1"
            meta={
              <>
                <Avatar initials="AN" size="sm" />
                <MetaText size="md">Adarsh · last edited 14:02 · 1,284 words</MetaText>
              </>
            }
          />

          <Hairline />

          <Body size="lead">
            Aurora-IV is administered orally once daily and is metabolized primarily by CYP3A4.
            Hepatic adverse events occurred in 8.2% of Aurora-IV recipients
            <CitationLink
              number={1}
              preview={<SourceChip variant="bordered" kind="md" file="CSR-014.md" pointer="§12.4" />}
            />
            versus 4.1% in the placebo arm
            <CitationLink
              number={2}
              preview={<SourceChip variant="bordered" kind="csv" file="LFT-labs.csv" />}
            />
            . Most events were Grade 1–2 transient ALT elevations, resolving without intervention.
          </Body>

          <Body size="body">
            A pre-specified subgroup analysis of participants with baseline LFT abnormalities
            <CitationLink
              number={3}
              preview={<SourceChip variant="bordered" kind="pdf" file="protocol-v3.pdf" pointer="p. 47" />}
            />
            (n=124) demonstrated comparable safety to the overall population.{" "}
            <span className="bg-coral-soft underline decoration-coral decoration-dashed underline-offset-4 px-1 rounded-sm">
              Hepatotoxicity was reversible in 95% of cases
            </span>{" "}
            with discontinuation of study drug. No Grade 4 events were observed in either arm,
            and the Grade 3 incidence (0.3% vs 0.3%) was identical between Aurora-IV and placebo.
          </Body>

          <Stack as="figure" gap="comfortable" className="m-0">
            <Cluster gap="comfortable" align="baseline">
              <Badge tone="neutral">table 12.4-1</Badge>
              <MetaText size="md">Hepatic adverse events by grade and treatment arm</MetaText>
            </Cluster>
            <Table<GradeRow>
              zebra
              columns={[
                { key: "grade",   header: "grade",     weight: 2, align: "left"  },
                { key: "aurora",  header: "aurora-iv", weight: 1, align: "right" },
                { key: "placebo", header: "placebo",   weight: 1, align: "right" },
              ]}
              rows={GRADE_ROWS}
              total={{ label: "Total — any grade", values: ["49 (8.2%)", "12 (4.1%)"] }}
            />
          </Stack>

          <Body size="body">
            The pattern is consistent with the Phase II profile, where transient ALT elevations
            were also dominant. Across both trials, Aurora-IV's hepatic safety signal appears
            confined to grade 1–2 reversible elevations with no evidence of cumulative liver
            injury after 12-month exposure.
          </Body>
        </Prose>

        {/* Marginalia column */}
        <Stack as="aside" gap="section" className="w-[280px] pt-[88px] shrink-0">
          <MetaLabel tone="muted">cited sources</MetaLabel>

          <Stack gap="comfortable">
            <MarginaliaSource
              n={1}
              kind="md"
              file="CSR-014.md"
              pointer="§12.4"
              note="Table 12.4-1 hepatic AE incidence by grade"
            />
            <MarginaliaSource
              n={2}
              kind="csv"
              file="LFT-labs.csv"
              note="Placebo arm ALT values · n=293"
            />
            <MarginaliaSource
              n={3}
              kind="pdf"
              file="protocol-v3.pdf"
              pointer="p. 47"
              note="Pre-specified subgroup criteria for baseline LFT abnormality"
            />
          </Stack>

          <Hairline />

          <MetaLabel tone="muted">flagged for review</MetaLabel>

          <HallucinationFlag
            variant="block"
            tone="danger"
            title="95% reversibility claim"
            body="Excludes 22 LTFU subjects. Decide before final lock."
          />
        </Stack>

      </Cluster>
    </div>
  );
}

interface MarginaliaSourceProps {
  n: number;
  kind: "md" | "csv" | "pdf";
  file: string;
  pointer?: string;
  note: string;
}

function MarginaliaSource({ n, kind, file, pointer, note }: MarginaliaSourceProps) {
  return (
    <Cluster gap="cozy" align="start" wrap={false}>
      <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 shrink-0 rounded-sm bg-coral-soft">
        <MetaText size="sm" className="font-bold text-coral">{n}</MetaText>
      </span>
      <Stack gap="tight">
        <SourceChip kind={kind} file={file} pointer={pointer} />
        <MetaText size="md">{note}</MetaText>
      </Stack>
    </Cluster>
  );
}
