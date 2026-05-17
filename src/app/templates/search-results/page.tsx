"use client";

/**
 * Template · search-results
 * Source: Paper sheet · page · search-results (node 7RU-0).
 * Composed onto the composition contract (docs/COMPOSITION.md):
 *   - brand wordmark via <PeerBrand>
 *   - active search input as <SearchInput> wrapped at w-[520px] (Paper w-130)
 *   - left FilterRail uses <Stack> + <Cluster> with <Checkbox> / <Radio>
 *   - results header via <PageHeader> with action slot
 *   - tab strip via <Tabs> with counts (size sm)
 *   - result cards are <Stack> of bordered surfaces; type-icon column is a
 *     <Stack align="center"> with <IconButton> + <MetaLabel>
 *   - claim/flag hits use bg-coral-soft + border-coral; flag hit's offending
 *     text uses the same dashed-coral inline pattern as longform-reader.
 */

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Glyph } from "@/components/ui/Glyph";
import { Hairline } from "@/components/ui/Hairline";
import { IconButton } from "@/components/ui/IconButton";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { MetaText } from "@/components/ui/MetaText";
import { PeerBrand } from "@/components/ui/PeerBrand";
import { Radio } from "@/components/ui/Radio";
import { SearchInput } from "@/components/ui/SearchInput";
import { Tabs } from "@/components/ui/Tabs";
import { TopNav } from "@/components/layout/TopNav";
import { Stack } from "@/components/layout/Stack";
import { Cluster } from "@/components/layout/Cluster";
import { Body } from "@/components/typography/Body";
import { PageHeader } from "@/components/patterns/PageHeader";
import { ConfidenceBadge } from "@/components/agent/ConfidenceBadge";
import { SourceChip } from "@/components/agent/SourceChip";

type TypeKind = "claim" | "doc" | "data" | "sec" | "flag";

interface TypeIconProps {
  kind: TypeKind;
}

function TypeIcon({ kind }: TypeIconProps) {
  const meta = {
    claim: { tone: "text-coral", bg: "bg-paper", label: "claim", glyph: <Glyph name="sparkle" size={12} /> },
    doc:   { tone: "text-faint", bg: "bg-soft",  label: "doc",   glyph: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ) },
    data:  { tone: "text-green", bg: "bg-green-soft", label: "data", glyph: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
      </svg>
    ) },
    sec:   { tone: "text-faint", bg: "bg-soft", label: "sec", glyph: <Glyph name="menu" size={12} /> },
    flag:  { tone: "text-coral", bg: "bg-paper", label: "flag", glyph: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="8" x2="12" y2="13" />
        <line x1="12" y1="16" x2="12" y2="16.5" />
      </svg>
    ) },
  }[kind];

  return (
    <Stack gap="tight" align="center" className="shrink-0">
      <span className={`inline-flex items-center justify-center size-[22px] rounded-md ${meta.bg} ${meta.tone}`}>
        {meta.glyph}
      </span>
      <MetaLabel tone={kind === "claim" || kind === "flag" ? "default" : "muted"} className={kind === "claim" || kind === "flag" ? "text-coral" : kind === "data" ? "text-green" : undefined}>
        {meta.label}
      </MetaLabel>
    </Stack>
  );
}

interface FilterRowProps {
  control: "checkbox" | "radio";
  checked?: boolean;
  label: string;
  count?: number;
  dim?: boolean;
}

function FilterRow({ control, checked, label, count, dim }: FilterRowProps) {
  return (
    <Cluster gap="cozy" align="center" wrap={false} className="py-1">
      {control === "checkbox" ? (
        <Checkbox checked={checked} readOnly />
      ) : (
        <Radio checked={checked} readOnly />
      )}
      <Body size="small" tone={dim ? "muted" : "ink"} measured={false} className="flex-1 min-w-0">
        {label}
      </Body>
      {typeof count === "number" && (
        <MetaText size="sm" tone={dim ? "faintest" : "faint"}>{count}</MetaText>
      )}
    </Cluster>
  );
}

export default function SearchResultsTemplate() {
  return (
    <div className="absolute inset-0 flex flex-col bg-paper text-ink antialiased">

      <TopNav
        brand={
          <Cluster gap="block" align="center" wrap={false}>
            <IconButton variant="ghost" size="md" aria-label="Back" className="-ml-2">
              <Glyph name="arrow-left" size={15} strokeWidth={2} />
            </IconButton>
            <PeerBrand size="md" />
          </Cluster>
        }
        breadcrumb={
          <div className="w-[520px] [&_>div]:border-coral [&_>div]:border-[1.5px]">
            <SearchInput
              value="hepatic adverse events"
              onChange={() => {}}
              onClear={() => {}}
              aria-label="Search"
            />
          </div>
        }
        trailing={<Avatar initials="AN" />}
      />

      <div className="flex flex-1 min-h-0">

        {/* FilterRail */}
        <aside className="w-[260px] shrink-0 bg-stripe border-r border-hairline p-6 overflow-y-auto">
          <Stack gap="section">

            <Cluster justify="between" align="baseline" wrap={false}>
              <MetaLabel>filters</MetaLabel>
              <button type="button" className="text-coral hover:text-ink transition-colors">
                <MetaText size="sm" className="text-coral">clear all</MetaText>
              </button>
            </Cluster>

            <Stack gap="cozy">
              <MetaLabel tone="muted">file type</MetaLabel>
              <Stack gap="tight">
                <FilterRow control="checkbox" checked label="CSR (md)" count={14} />
                <FilterRow control="checkbox" checked label="Data (csv)" count={8} />
                <FilterRow control="checkbox" label="Protocol (pdf)" count={3} dim />
              </Stack>
            </Stack>

            <Hairline />

            <Stack gap="cozy">
              <MetaLabel tone="muted">status</MetaLabel>
              <Stack gap="tight">
                <FilterRow control="checkbox" checked label="Verified claims" />
                <FilterRow control="checkbox" label="Open claims" dim />
                <FilterRow control="checkbox" label="Hallucination flagged" dim />
              </Stack>
            </Stack>

            <Hairline />

            <Stack gap="cozy">
              <MetaLabel tone="muted">date</MetaLabel>
              <Stack gap="tight">
                <FilterRow control="radio" checked label="Last 7 days" />
                <FilterRow control="radio" label="Last 30 days" dim />
                <FilterRow control="radio" label="All time" dim />
              </Stack>
            </Stack>

          </Stack>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0 overflow-y-auto">

          <div className="pt-7 pb-4 px-10">
            <Cluster justify="between" align="baseline" wrap={false}>
              <PageHeader
                kicker="search results"
                title={'24 results for "hepatic adverse events"'}
                titleSize="h3"
              />
              <Button
                variant="secondary"
                size="sm"
                trailingIcon={<Glyph name="chev" size={11} strokeWidth={2} />}
              >
                Relevance
              </Button>
            </Cluster>
          </div>

          <div className="px-10 border-b border-hairline">
            <Tabs
              size="sm"
              value="all"
              onChange={() => {}}
              options={[
                { value: "all",  label: "All",       count: 24 },
                { value: "clm",  label: "Claims",    count: 8  },
                { value: "doc",  label: "Documents", count: 9  },
                { value: "sec",  label: "Sections",  count: 7  },
              ]}
              className="!bg-transparent !p-0 !rounded-none"
            />
          </div>

          <Stack gap="block" className="py-4 px-10">

            {/* 1 · claim hit */}
            <div className="rounded-input py-3.5 px-4 bg-coral-soft border border-coral">
              <Cluster gap="comfortable" align="start" wrap={false}>
                <TypeIcon kind="claim" />
                <Stack gap="cozy" className="flex-1 min-w-0">
                  <Body size="body" className="font-medium text-ink">
                    Hepatic adverse events occurred in 8.2% of Aurora-IV recipients vs 4.1% of placebo.
                  </Body>
                  <Cluster gap="comfortable" align="center">
                    <SourceChip kind="md" file="CSR-014.md" pointer="§12.4" />
                    <MetaText size="sm" tone="faint">·</MetaText>
                    <ConfidenceBadge value={94} />
                  </Cluster>
                </Stack>
              </Cluster>
            </div>

            {/* 2 · doc hit */}
            <div className="rounded-input py-3.5 px-4 bg-paper border border-hairline-strong">
              <Cluster gap="comfortable" align="start" wrap={false}>
                <TypeIcon kind="doc" />
                <Stack gap="cozy" className="flex-1 min-w-0">
                  <Cluster gap="cozy" align="center">
                    <Badge tone="neutral">md</Badge>
                    <Body size="small" measured={false} className="font-semibold">
                      CSR-014.md · §12.4 Hepatic Adverse Events
                    </Body>
                    <MetaText size="sm" tone="faint">8 min ago</MetaText>
                  </Cluster>
                  <Body size="small" tone="muted">
                    Most events were Grade 1–2 transient ALT elevations, resolving without intervention. A pre-specified subgroup of participants with baseline LFT abnormalities (n=124)…
                  </Body>
                  <MetaText size="sm" tone="faint">14 claims · 3 referenced tables</MetaText>
                </Stack>
              </Cluster>
            </div>

            {/* 3 · data hit */}
            <div className="rounded-input py-3.5 px-4 bg-paper border border-hairline-strong">
              <Cluster gap="comfortable" align="start" wrap={false}>
                <TypeIcon kind="data" />
                <Stack gap="cozy" className="flex-1 min-w-0">
                  <Cluster gap="cozy" align="center">
                    <Badge tone="success">csv</Badge>
                    <Body size="small" measured={false} className="font-semibold">
                      LFT-labs.csv
                    </Body>
                    <MetaText size="sm" tone="faint">attached 2 weeks ago</MetaText>
                  </Cluster>
                  <Body size="small" tone="muted">
                    142 of 891 rows matched. Hepatic ALT values across both arms; subgroup tag hepatic abnormality at baseline applied to 124 rows.
                  </Body>
                </Stack>
              </Cluster>
            </div>

            {/* 4 · section hit */}
            <div className="rounded-input py-3.5 px-4 bg-paper border border-hairline-strong">
              <Cluster gap="comfortable" align="start" wrap={false}>
                <TypeIcon kind="sec" />
                <Stack gap="cozy" className="flex-1 min-w-0">
                  <Cluster gap="cozy" align="center">
                    <MetaLabel tone="default">§5.3</MetaLabel>
                    <Body size="small" measured={false} className="font-semibold">
                      Phase II hepatic safety review
                    </Body>
                    <MetaText size="sm" tone="faint">CSR-008.md</MetaText>
                  </Cluster>
                  <Body size="small" tone="muted">
                    Earlier hepatic adverse events in Phase II were consistent with Aurora-IV&apos;s mechanism. Section provides baseline for the Phase III comparison.
                  </Body>
                  <Button variant="ghost" size="sm" className="self-start !px-0 !text-coral hover:!bg-transparent">
                    View section →
                  </Button>
                </Stack>
              </Cluster>
            </div>

            {/* 5 · flag hit */}
            <div className="rounded-input py-3.5 px-4 bg-coral-soft border border-coral">
              <Cluster gap="comfortable" align="start" wrap={false}>
                <TypeIcon kind="flag" />
                <Stack gap="cozy" className="flex-1 min-w-0">
                  <Body size="body" className="font-medium text-ink">
                    <span className="bg-coral-soft underline decoration-coral decoration-dashed underline-offset-4 px-1 rounded-sm">
                      Hepatotoxicity was reversible in 95% of cases
                    </span>
                  </Body>
                  <Body size="small" tone="muted">
                    Excludes 22 LTFU subjects. Review before final lock.
                  </Body>
                  <Cluster gap="comfortable" align="center">
                    <SourceChip kind="md" file="CSR-014.md" pointer="§12.4" />
                    <MetaText size="sm" tone="faint">·</MetaText>
                    <ConfidenceBadge value={62} />
                  </Cluster>
                </Stack>
              </Cluster>
            </div>

          </Stack>

        </main>

      </div>
    </div>
  );
}
