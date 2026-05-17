"use client";

/**
 * Template · browse-library
 * Source: Paper sheet · page · browse-library (node 7RS-0).
 * Composed onto the contract (docs/COMPOSITION.md):
 *   - AppShell + TopNav + LeftNav for chrome
 *   - PageHeader for kicker + title + action cluster
 *   - Stack / Cluster for vertical + horizontal rhythm
 *   - Card + Stack + Cluster for the 4×2 library tile grid
 *   - Heading / Body / MetaLabel / MetaText / Badge for closed-enum text
 *
 * Note on Tile vs Card: Tile's fixed w-40/h-40 doesn't fit a 4-column
 * stretch grid, and its className merge isn't tailwind-merge-aware, so the
 * tile shape here is composed from Card + Stack/Cluster directly. Same
 * primitives, looser layout.
 */

import { AppShell } from "@/components/layout/AppShell";
import { LeftNav } from "@/components/layout/LeftNav";
import { TopNav } from "@/components/layout/TopNav";
import { Stack } from "@/components/layout/Stack";
import { Cluster } from "@/components/layout/Cluster";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Dot } from "@/components/ui/Dot";
import { Glyph } from "@/components/ui/Glyph";
import { IconButton } from "@/components/ui/IconButton";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { MetaText } from "@/components/ui/MetaText";
import { PeerBrand } from "@/components/ui/PeerBrand";
import { SearchInput } from "@/components/ui/SearchInput";
import { Tabs } from "@/components/ui/Tabs";
import { Heading } from "@/components/typography/Heading";
import { Body } from "@/components/typography/Body";
import { PageHeader } from "@/components/patterns/PageHeader";

type TileKind = "md" | "csv" | "pdf";

interface LibraryTile {
  variant: "default" | "accent" | "muted";
  kind?: TileKind;
  kindTone?: "neutral" | "success" | "danger" | "accent";
  badgeOverride?: { label: string; tone: "accent" };
  heroBg: string;
  heroColor: string;
  heroGlyph: "sparkle" | "more";
  kicker: string;
  kickerTone?: "accent";
  title: string;
  body: string;
}

const TILES: LibraryTile[] = [
  {
    variant: "accent",
    badgeOverride: { label: "new", tone: "accent" },
    heroBg: "bg-paper",
    heroColor: "text-coral",
    heroGlyph: "sparkle",
    kicker: "DRAFT STARTED · 14:02",
    kickerTone: "accent",
    title: "§12.4 Hepatic AEs",
    body: "3 framings drafted, awaiting your pick",
  },
  {
    variant: "default",
    kind: "md",
    kindTone: "neutral",
    heroBg: "bg-soft",
    heroColor: "text-muted",
    heroGlyph: "more",
    kicker: "LAST EDIT · 8 MIN AGO",
    title: "CSR-014.md",
    body: "22 sections · 14 claims verified",
  },
  {
    variant: "default",
    kind: "csv",
    kindTone: "success",
    heroBg: "bg-green-soft",
    heroColor: "text-green",
    heroGlyph: "more",
    kicker: "ATTACHED · 2 WEEKS AGO",
    title: "LFT-labs.csv",
    body: "891 rows · 12 columns · ALT focus",
  },
  {
    variant: "default",
    kind: "pdf",
    kindTone: "danger",
    heroBg: "bg-coral-soft",
    heroColor: "text-coral",
    heroGlyph: "more",
    kicker: "ATTACHED · 3 WEEKS AGO",
    title: "protocol-v3.pdf",
    body: "98 pages · 6 amendments",
  },
  {
    variant: "default",
    kind: "md",
    kindTone: "neutral",
    heroBg: "bg-soft",
    heroColor: "text-muted",
    heroGlyph: "more",
    kicker: "LAST EDIT · 3 HOURS AGO",
    title: "CSR-008.md",
    body: "§8.2 has 2 unresolved claims",
  },
  {
    variant: "muted",
    heroBg: "bg-paper",
    heroColor: "text-muted",
    heroGlyph: "more",
    kicker: "ARCHIVED · LAST MONTH",
    title: "CSR-007.md",
    body: "Predecessor protocol revision",
  },
  {
    variant: "default",
    kind: "csv",
    kindTone: "success",
    heroBg: "bg-green-soft",
    heroColor: "text-green",
    heroGlyph: "more",
    kicker: "ATTACHED · LAST WEEK",
    title: "subgroup-LFT.csv",
    body: "124 rows · baseline abnormality cohort",
  },
];

const VARIANT_CARD: Record<LibraryTile["variant"], "paper" | "soft" | "outline"> = {
  default: "paper",
  accent: "paper",
  muted: "soft",
};

export default function BrowseLibraryTemplate() {
  return (
    <AppShell
      leftNavWidth={220}
      topBar={
        <TopNav
          brand={<PeerBrand size="md" />}
          breadcrumb={<MetaText size="md" tone="ink">Library</MetaText>}
          trailing={
            <>
              <div className="w-[320px]">
                <SearchInput
                  placeholder="Search the library…"
                  shortcut={["⌘", "K"]}
                />
              </div>
              <Avatar initials="AN" />
            </>
          }
        />
      }
      leftNav={
        <LeftNav
          sections={[
            {
              header: "workspace",
              items: [
                { label: "Dashboard", icon: "menu" },
                { label: "Library",   icon: "more",  badge: "42", active: true },
                { label: "Claims",    icon: "check", badge: "3 open" },
              ],
            },
          ]}
          footer={
            <Stack gap="tight" as="nav">
              <div className="px-2 pt-2 pb-1">
                <MetaLabel tone="muted">trials</MetaLabel>
              </div>
              <Cluster gap="comfortable" align="center" wrap={false} className="px-2 py-1.5">
                <Dot color="coral" size="sm" />
                <span className="flex-1 truncate font-sans text-sm text-ink">Aurora-IV</span>
                <MetaText size="sm" tone="faint">12</MetaText>
              </Cluster>
              <Cluster gap="comfortable" align="center" wrap={false} className="px-2 py-1.5">
                <Dot color="green" size="sm" />
                <span className="flex-1 truncate font-sans text-sm text-muted">Borealis-II</span>
                <MetaText size="sm" tone="faint">18</MetaText>
              </Cluster>
              <Cluster gap="comfortable" align="center" wrap={false} className="px-2 py-1.5">
                <Dot color="info" size="sm" />
                <span className="flex-1 truncate font-sans text-sm text-muted">Comet-I</span>
                <MetaText size="sm" tone="faint">12</MetaText>
              </Cluster>
            </Stack>
          }
        />
      }
    >
      <div className="flex-1 min-h-0 overflow-y-auto">
        <Stack gap="section" className="px-10 py-10 max-w-[1240px]">

          <PageHeader
            kicker="AURORA-IV · PHASE III"
            title="Library"
            titleSize="h2"
            action={
              <Cluster gap="cozy" wrap={false}>
                <Button
                  variant="secondary"
                  size="md"
                  leadingIcon={<Glyph name="arrow-right" size={13} className="-rotate-90" />}
                >
                  Upload
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  leadingIcon={<Glyph name="plus" size={13} strokeWidth={2.5} />}
                >
                  New draft
                </Button>
              </Cluster>
            }
          />

          <Cluster justify="between" align="center" wrap={false}>
            <Tabs
              size="md"
              value="all"
              onChange={() => {}}
              options={[
                { value: "all",       label: "All",       count: 42 },
                { value: "csrs",      label: "CSRs",      count: 14 },
                { value: "protocols", label: "Protocols", count: 6 },
                { value: "data",      label: "Data",      count: 22 },
              ]}
            />
            <Cluster gap="cozy" wrap={false}>
              <Button
                variant="secondary"
                size="sm"
                trailingIcon={<Glyph name="chev" size={11} />}
              >
                Recent
              </Button>
              <IconButton variant="secondary" size="md" aria-label="Grid view">
                <Glyph name="more" size={13} />
              </IconButton>
              <IconButton variant="ghost" size="md" aria-label="List view">
                <Glyph name="menu" size={13} />
              </IconButton>
            </Cluster>
          </Cluster>

          <div className="grid grid-cols-4 gap-5">
            {TILES.map((tile) => (
              <Card
                key={tile.title}
                variant={VARIANT_CARD[tile.variant]}
                padding="lg"
                className={tile.variant === "accent" ? "border-coral bg-coral-soft" : undefined}
              >
                <Stack gap="comfortable">
                  <Cluster justify="between" align="center" wrap={false}>
                    <div className={`inline-flex items-center justify-center size-9 rounded-lg ${tile.heroBg} ${tile.heroColor}`}>
                      <Glyph name={tile.heroGlyph} size={18} />
                    </div>
                    {tile.badgeOverride && (
                      <Badge tone={tile.badgeOverride.tone}>{tile.badgeOverride.label}</Badge>
                    )}
                    {tile.kind && (
                      <Badge tone={tile.kindTone ?? "neutral"}>{tile.kind}</Badge>
                    )}
                  </Cluster>
                  <Stack gap="tight">
                    <MetaLabel tone={tile.kickerTone === "accent" ? "default" : "muted"} className={tile.kickerTone === "accent" ? "text-coral" : undefined}>
                      {tile.kicker}
                    </MetaLabel>
                    <Heading size="h4">{tile.title}</Heading>
                    <Body size="small" tone="muted" measured={false}>{tile.body}</Body>
                  </Stack>
                </Stack>
              </Card>
            ))}

            <Card variant="soft" padding="lg" className="border-dashed bg-stripe">
              <Stack gap="cozy" align="center" justify="center" className="h-full">
                <div className="inline-flex items-center justify-center size-9 rounded-lg bg-paper border border-hairline-strong text-faint">
                  <Glyph name="plus" size={18} />
                </div>
                <Body size="small" tone="muted" measured={false} className="font-medium">
                  Upload reference
                </Body>
                <Body size="small" tone="faint" measured={false} className="text-center">
                  Drop a CSR, protocol, or data file
                </Body>
              </Stack>
            </Card>
          </div>

        </Stack>
      </div>
    </AppShell>
  );
}
