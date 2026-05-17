"use client";

/**
 * Template · list-detail
 * Source: Paper sheet · page · list-detail (node 7RQ-0).
 * Three-pane claim-triage page composed on the contract (docs/COMPOSITION.md):
 *   - brand wordmark via <PeerBrand>
 *   - app frame via <AppShell> + <LeftNav> + <TopNav>
 *   - inner detail header via <PageHeader>
 *   - detail body via <Prose variant="reader">
 *   - vertical rhythm via <Stack>, horizontal via <Cluster>
 *   - metadata strip dividers via <Hairline orientation="vertical">
 *   - claim review banner via <HallucinationFlag variant="block">
 */

import { AppShell } from "@/components/layout/AppShell";
import { LeftNav } from "@/components/layout/LeftNav";
import { TopNav } from "@/components/layout/TopNav";
import { Stack } from "@/components/layout/Stack";
import { Cluster } from "@/components/layout/Cluster";
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
import { Pill } from "@/components/ui/Pill";
import { SearchInput } from "@/components/ui/SearchInput";
import { Tabs } from "@/components/ui/Tabs";
import { Body } from "@/components/typography/Body";
import { Heading } from "@/components/typography/Heading";
import { PageHeader } from "@/components/patterns/PageHeader";
import { Prose } from "@/components/patterns/Prose";
import { ConfidenceBadge } from "@/components/agent/ConfidenceBadge";
import { HallucinationFlag } from "@/components/agent/HallucinationFlag";
import { SourceChip } from "@/components/agent/SourceChip";

type ClaimRow = {
  id: string;
  kind: "md" | "csv" | "pdf";
  title: string;
  snippet: string;
  timestamp: string;
  selected?: boolean;
  review?: boolean;
};

const RECENT_ROWS: ClaimRow[] = [
  {
    id: "csr-014-12-4",
    kind: "md",
    title: "CSR-014.md · §12.4",
    snippet: "Hepatotoxicity was reversible in 95% of cases…",
    timestamp: "14:02",
    selected: true,
    review: true,
  },
  {
    id: "csr-008-8-2",
    kind: "md",
    title: "CSR-008.md · §8.2",
    snippet: "Response rate 60% vs 62% in §5.3 — conflict",
    timestamp: "13:48",
  },
  {
    id: "protocol-v3-4",
    kind: "md",
    title: "protocol-v3.md · §4",
    snippet: "Eligibility criterion 4.1.2 lacks LFT baseline citation",
    timestamp: "yesterday",
  },
];

const EARLIER_ROWS: ClaimRow[] = [
  {
    id: "lft-labs-142",
    kind: "csv",
    title: "LFT-labs.csv · row 142",
    snippet: "ALT value 132 U/L outside CRF range",
    timestamp: "Mon",
  },
];

function ClaimListRow({ row }: { row: ClaimRow }) {
  return (
    <div className={`relative border-b border-hairline ${row.selected ? "bg-coral-soft" : ""}`}>
      {row.selected && (
        <span className="absolute left-0 top-2 bottom-2 w-0.5 bg-coral" aria-hidden="true" />
      )}
      <Cluster gap="comfortable" align="start" wrap={false} className="py-3 px-4">
        <Badge tone={row.kind === "csv" ? "success" : row.kind === "pdf" ? "danger" : "neutral"}>
          {row.kind}
        </Badge>
        <Stack gap="tight" className="flex-1 min-w-0">
          <Cluster gap="cozy" align="center" wrap={false}>
            <Body size="small" className="font-semibold truncate" measured={false}>
              {row.title}
            </Body>
            {row.review && (
              <Badge tone="accent" uppercase className="border border-coral">
                review
              </Badge>
            )}
          </Cluster>
          <Body size="small" tone="muted" className="truncate" measured={false}>
            {row.snippet}
          </Body>
        </Stack>
        <MetaText size="sm" tone="faint" className="shrink-0">
          {row.timestamp}
        </MetaText>
      </Cluster>
    </div>
  );
}

export default function ListDetailTemplate() {
  return (
    <AppShell
      leftNavWidth={220}
      topBar={
        <TopNav
          brand={<PeerBrand size="md" />}
          breadcrumb={
            <Cluster gap="cozy" align="center" wrap={false}>
              <MetaText size="md" tone="ink">Aurora-IV</MetaText>
              <MetaText size="md" tone="faint">/</MetaText>
              <MetaText size="md" tone="ink" className="font-medium">Claims · open</MetaText>
            </Cluster>
          }
          trailing={<Avatar initials="AN" />}
        />
      }
      leftNav={
        <LeftNav
          sections={[
            {
              header: "workspace",
              items: [
                { label: "Dashboard", icon: "menu" },
                { label: "Documents", icon: "more", badge: "42" },
                { label: "Claims", icon: "check", badge: "3 open", active: true },
              ],
            },
            {
              header: "filters",
              items: [
                {
                  label: (
                    <Cluster gap="cozy" align="center" wrap={false}>
                      <Checkbox checked readOnly />
                      <span>Hepatic</span>
                    </Cluster>
                  ),
                },
                {
                  label: (
                    <Cluster gap="cozy" align="center" wrap={false}>
                      <Checkbox readOnly />
                      <span>Renal</span>
                    </Cluster>
                  ),
                },
                {
                  label: (
                    <Cluster gap="cozy" align="center" wrap={false}>
                      <Checkbox readOnly />
                      <span>Cardiac</span>
                    </Cluster>
                  ),
                },
              ],
            },
          ]}
        />
      }
    >
      <div className="flex flex-1 min-h-0">
        {/* List panel */}
        <aside className="w-[380px] shrink-0 border-r border-hairline-strong bg-paper flex flex-col min-h-0">
          <Stack gap="comfortable" className="pt-5 pb-4 px-4 shrink-0">
            <Cluster justify="between" align="baseline" wrap={false}>
              <Heading size="h4">Open claims</Heading>
              <MetaText size="sm" tone="faint">3 of 45</MetaText>
            </Cluster>
            <SearchInput placeholder="Search claims…" />
            <Tabs
              size="sm"
              value="open"
              onChange={() => {}}
              options={[
                { value: "open",     label: "Open",     count: 3 },
                { value: "resolved", label: "Resolved", count: 42 },
              ]}
            />
          </Stack>
          <div className="flex-1 min-h-0 overflow-y-auto">
            {RECENT_ROWS.map((row) => (
              <ClaimListRow key={row.id} row={row} />
            ))}
            <div className="py-3 px-4">
              <Hairline label="earlier this week" />
            </div>
            {EARLIER_ROWS.map((row) => (
              <ClaimListRow key={row.id} row={row} />
            ))}
          </div>
        </aside>

        {/* Detail panel */}
        <section className="relative flex-1 min-w-0 overflow-y-auto py-8 px-12">
          <Prose variant="reader">
            <PageHeader
              kicker="CLAIM · OPEN"
              subtitle={
                <Cluster gap="comfortable" align="baseline" wrap={false}>
                  <HallucinationFlag tone="danger" variant="badge" label="review" />
                  <MetaText size="sm" tone="faint">filed 22 min ago by Peer</MetaText>
                </Cluster>
              }
              title="Hepatotoxicity was reversible in 95% of cases"
              titleSize="h3"
              action={
                <Cluster gap="tight" wrap={false}>
                  <IconButton variant="secondary" size="lg" aria-label="Next claim">
                    <Glyph name="chev-right" size={14} />
                  </IconButton>
                  <IconButton variant="secondary" size="lg" aria-label="More actions">
                    <Glyph name="more" size={14} />
                  </IconButton>
                </Cluster>
              }
            />

            <Cluster gap="block" align="stretch" wrap={false} className="py-3 border-t border-b border-hairline">
              <Stack gap="tight">
                <MetaLabel tone="muted">source</MetaLabel>
                <SourceChip kind="md" file="CSR-014.md" pointer="§12.4" />
              </Stack>
              <Hairline orientation="vertical" />
              <Stack gap="tight">
                <MetaLabel tone="muted">confidence</MetaLabel>
                <ConfidenceBadge value={62} variant="badge" />
              </Stack>
              <Hairline orientation="vertical" />
              <Stack gap="tight">
                <MetaLabel tone="muted">cited tables</MetaLabel>
                <MetaText size="md" tone="ink">3 referenced · 1 supports</MetaText>
              </Stack>
            </Cluster>

            <Body size="body">
              Peer drafted this claim from a Phase II summary table in CSR-014 §12.4. The cited
              evidence shows reversal in 95% of monitored cases, but the broader trial population
              includes 22 cases lost to follow-up. Including those in the denominator drops the
              rate to 87%, closer to the Phase II reference.
            </Body>

            <HallucinationFlag
              variant="block"
              tone="danger"
              title="Why this needs review"
              body="The 95% figure excludes 22 LTFU subjects from the denominator. Decide whether to rephrase (of monitored cases), recalculate (87%), or escalate to the medical writer."
            />

            <Stack gap="comfortable">
              <MetaLabel>supporting sources</MetaLabel>
              <Stack gap="cozy">
                <Cluster gap="cozy" align="center" wrap={false} className="rounded-lg py-2 px-3 bg-stripe border border-hairline-strong">
                  <SourceChip kind="md" file="CSR-014.md" pointer="§12.4 · table 12.4-1" />
                  <span className="flex-1" />
                  <Glyph name="check" size={11} strokeWidth={2.5} className="text-green" />
                  <MetaText size="sm" tone="default" className="text-green">supports</MetaText>
                </Cluster>
                <Cluster gap="cozy" align="center" wrap={false} className="rounded-lg py-2 px-3 bg-stripe border border-hairline-strong">
                  <SourceChip kind="pdf" file="protocol-v3.pdf" pointer="p. 18" />
                  <span className="flex-1" />
                  <Glyph name="more" size={11} strokeWidth={2.5} className="text-gold rotate-90" />
                  <MetaText size="sm" tone="default" className="text-gold">qualifies</MetaText>
                </Cluster>
                <Cluster gap="cozy" align="center" wrap={false} className="rounded-lg py-2 px-3 bg-stripe border border-hairline-strong">
                  <SourceChip kind="csv" file="LTFU-log.csv" pointer="22 rows" />
                  <span className="flex-1" />
                  <Glyph name="x" size={11} strokeWidth={2.5} className="text-coral" />
                  <MetaText size="sm" tone="default" className="text-coral">contradicts</MetaText>
                </Cluster>
              </Stack>
            </Stack>
          </Prose>

          {/* Floating action bar */}
          <div className="absolute bottom-6 right-6 shadow-card">
            <Cluster gap="cozy" align="center" wrap={false} className="rounded-xl py-2.5 px-3 bg-paper border border-hairline-strong backdrop-blur-md">
              <Pill variant="outlined" size="md">Rephrase</Pill>
              <IconButton variant="secondary" size="lg" aria-label="Dismiss claim">
                <Glyph name="x" size={14} strokeWidth={2.5} />
              </IconButton>
              <Button
                variant="primary"
                size="md"
                leadingIcon={<Glyph name="check" size={14} strokeWidth={2.5} />}
              >
                Accept claim
              </Button>
            </Cluster>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
