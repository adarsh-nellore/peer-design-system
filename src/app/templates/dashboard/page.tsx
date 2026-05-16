"use client";

/**
 * Template · dashboard
 * Source: Paper sheet · page · dashboard (node 7GK-0).
 * Refactored onto the composition contract (docs/COMPOSITION.md):
 *   - brand wordmark via <PeerBrand>
 *   - page header via <PageHeader kicker="overview · this week" title="Aurora-IV submission" action={…}>
 *   - section heading via <Heading size="h4">
 *   - vertical rhythm via <Stack gap="section">
 *   - inline row groups via <Cluster>
 */

import { AppShell } from "@/components/layout/AppShell";
import { LeftNav } from "@/components/layout/LeftNav";
import { TopNav } from "@/components/layout/TopNav";
import { Stack } from "@/components/layout/Stack";
import { Cluster } from "@/components/layout/Cluster";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Glyph } from "@/components/ui/Glyph";
import { MetaText } from "@/components/ui/MetaText";
import { PeerBrand } from "@/components/ui/PeerBrand";
import { SearchInput } from "@/components/ui/SearchInput";
import { Stat } from "@/components/ui/Stat";
import { Table } from "@/components/ui/Table";
import { Tabs } from "@/components/ui/Tabs";
import { Heading } from "@/components/typography/Heading";
import { PageHeader } from "@/components/patterns/PageHeader";
import { Sparkline } from "@/components/charts/Sparkline";

type DraftRow = {
  document: { kind: "md" | "csv" | "pdf"; name: string };
  section: string;
  updated: string;
  claims: { count: number; status: string; tone: "success" | "warning" | "danger" };
};

const ROWS: DraftRow[] = [
  {
    document: { kind: "md", name: "CSR-014.md" },
    section: "§12.4 Hepatic AEs",
    updated: "8 min ago",
    claims: { count: 14, status: "all verified", tone: "success" },
  },
  {
    document: { kind: "md", name: "CSR-008.md" },
    section: "§8.2 Renal AEs",
    updated: "3 h ago",
    claims: { count: 9, status: "2 review", tone: "warning" },
  },
  {
    document: { kind: "md", name: "protocol-v3-summary.md" },
    section: "§4 Eligibility",
    updated: "yesterday",
    claims: { count: 22, status: "1 conflict", tone: "danger" },
  },
];

export default function DashboardTemplate() {
  return (
    <AppShell
      topBar={
        <TopNav
          brand={<PeerBrand size="md" />}
          breadcrumb={
            <div className="w-[320px]">
              <SearchInput placeholder="Search documents, claims…" shortcut={["⌘", "K"]} />
            </div>
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
                { label: "Dashboard",   icon: "menu",   active: true },
                { label: "Documents",   icon: "more",   badge: "42" },
                { label: "Claims",      icon: "check",  badge: "3 open" },
                { label: "References",  icon: "search" },
              ],
            },
          ]}
        />
      }
    >
      <div className="flex-1 min-h-0 overflow-y-auto">
        <Stack gap="section" className="px-10 py-8 max-w-[1240px]">

          <PageHeader
            kicker="OVERVIEW · THIS WEEK"
            title="Aurora-IV submission"
            titleSize="h2"
            action={
              <Button
                variant="primary"
                size="md"
                leadingIcon={<Glyph name="plus" size={12} strokeWidth={2.5} />}
              >
                New draft
              </Button>
            }
          />

          <Cluster gap="block" align="stretch" wrap={false}>
            <Stat
              className="flex-1"
              label="claims resolved"
              value="82%"
              delta={{ value: "+4 wk", tone: "success", direction: "up" }}
              sparkline={<Sparkline values={[34, 38, 42, 51, 60, 72, 82]} area />}
            />
            <Stat
              className="flex-1"
              label="draft turnaround"
              value="17"
              unit=" d"
              delta={{ value: "-23 d", tone: "success", direction: "down" }}
              sparkline={<Sparkline values={[40, 36, 30, 26, 22, 19, 17]} />}
            />
            <Stat
              className="flex-1"
              label="hallucination rate"
              value="2.1%"
              delta={{ value: "+0.4 wk", tone: "danger", direction: "up" }}
              sparkline={<Sparkline values={[1.2, 1.4, 1.5, 1.7, 1.9, 2.0, 2.1]} tone="danger" />}
            />
            <Stat
              className="flex-1"
              variant="soft"
              label="active drafts"
              value="12"
            />
          </Cluster>

          <Cluster gap="block" justify="between" align="baseline" wrap={false}>
            <Heading size="h4">Open drafts</Heading>
            <Tabs
              size="md"
              value="all"
              onChange={() => {}}
              options={[
                { value: "all",     label: "All" },
                { value: "mine",    label: "Mine" },
                { value: "review",  label: "Needs review" },
              ]}
            />
          </Cluster>

          <Table<DraftRow>
            zebra
            columns={[
              {
                key: "document",
                header: "Document",
                weight: 2,
                render: (row) => (
                  <Cluster gap="cozy" align="center" wrap={false}>
                    <Badge tone={row.document.kind === "md" ? "neutral" : row.document.kind === "csv" ? "success" : "danger"}>
                      {row.document.kind}
                    </Badge>
                    <span>{row.document.name}</span>
                  </Cluster>
                ),
              },
              { key: "section", header: "Section", weight: 1.5 },
              {
                key: "updated",
                header: "Updated",
                align: "right",
                render: (row) => <MetaText size="md">{row.updated}</MetaText>,
              },
              {
                key: "claims",
                header: "Claims",
                align: "right",
                render: (row) => (
                  <Cluster gap="cozy" align="center" justify="end" wrap={false} className="inline-flex">
                    <span>{row.claims.count}</span>
                    <MetaText
                      size="sm"
                      tone={
                        row.claims.tone === "success"
                          ? "default"
                          : row.claims.tone === "warning"
                          ? "default"
                          : "default"
                      }
                      className={
                        row.claims.tone === "success"
                          ? "text-green"
                          : row.claims.tone === "warning"
                          ? "text-gold"
                          : "text-coral"
                      }
                    >
                      {row.claims.status}
                    </MetaText>
                  </Cluster>
                ),
              },
            ]}
            rows={ROWS}
          />

        </Stack>
      </div>
    </AppShell>
  );
}
