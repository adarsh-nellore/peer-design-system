/**
 * Landing — the canonical entry for the cloned starter.
 * Composes: Stack · Cluster · PageHeader · Body · MetaText · Card.
 *
 * The landing exists so a designer who just ran `setup.sh` lands on a real
 * page, not the 800-line component showcase (which now lives at /components).
 */

import Link from "next/link";
import { Stack } from "@/components/layout/Stack";
import { Cluster } from "@/components/layout/Cluster";
import { PageContainer } from "@/components/layout/PageContainer";
import { TopNav } from "@/components/layout/TopNav";
import { Card } from "@/components/ui/Card";
import { Glyph } from "@/components/ui/Glyph";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { MetaText } from "@/components/ui/MetaText";
import { PeerBrand } from "@/components/ui/PeerBrand";
import { Body } from "@/components/typography/Body";
import { PageHeader } from "@/components/patterns/PageHeader";

const ENTRIES = [
  {
    href: "/components",
    kicker: "PRIMITIVES",
    title: "Components",
    body: "50+ typed React primitives — buttons, inputs, charts, agent atoms, layout shells, page patterns.",
  },
  {
    href: "/templates",
    kicker: "PAGE TEMPLATES",
    title: "Templates",
    body: "9 ported page templates demonstrating how primitives compose into real, audit-clean pages.",
  },
  {
    href: "https://github.com/adarsh-nellore/peer-design-system",
    kicker: "REPOSITORY",
    title: "GitHub",
    body: "Public template repo. Use the GitHub template button or cp -r the local checkout per exercise.",
    external: true,
  },
];

export default function Landing() {
  return (
    <div className="absolute inset-0 flex flex-col bg-paper text-ink antialiased overflow-y-auto scroll-tame">
      <TopNav
        brand={<PeerBrand size="md" />}
        trailing={<MetaText size="sm" tone="faint">peer-design-system</MetaText>}
      />

      <PageContainer size="lg">
        <Stack gap="hero">

          <PageHeader
            kicker="DESIGN SYSTEM"
            subtitle="peer-design-system · contract-enforced React component library"
            title="Clone, audit, build."
            titleSize="display"
          />

          <Body size="lead">
            A portable React component library starter for AI-driven design exercises.
            Cloned per exercise via &quot;Use this template&quot; on GitHub or local <code className="font-mono text-coral">cp -r</code>,
            never imported as npm. Designed in Paper, ported to React, audited mechanically — the
            composition contract fails the build on raw font sizes, hand-rolled headings, or freestyle
            gap utilities so consistency holds across pages without depending on the page author to remember the rules.
          </Body>

          <Cluster gap="block" align="stretch" wrap>
            {ENTRIES.map((entry) => {
              const inner = (
                <Card variant="outline" className="h-full transition-colors hover:bg-soft">
                  <Stack gap="comfortable" className="p-5">
                    <Cluster gap="cozy" justify="between" align="start" wrap={false}>
                      <MetaLabel tone="muted">{entry.kicker}</MetaLabel>
                      <Glyph name={entry.external ? "arrow-right" : "chev"} size={14} className="text-faint" />
                    </Cluster>
                    <Body size="lead" tone="ink" measured={false} className="font-medium">
                      {entry.title}
                    </Body>
                    <Body size="small" tone="muted" measured={false}>
                      {entry.body}
                    </Body>
                  </Stack>
                </Card>
              );
              return entry.external ? (
                <a key={entry.href} href={entry.href} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[260px]">
                  {inner}
                </a>
              ) : (
                <Link key={entry.href} href={entry.href} className="flex-1 min-w-[260px]">
                  {inner}
                </Link>
              );
            })}
          </Cluster>

          <Stack gap="comfortable">
            <MetaLabel tone="muted">CONTRACT</MetaLabel>
            <Cluster gap="comfortable" align="center">
              <MetaText size="md" tone="ink">
                <Link className="hover:underline" href="https://github.com/adarsh-nellore/peer-design-system/blob/main/docs/COMPOSITION.md">docs/COMPOSITION.md</Link>
              </MetaText>
              <MetaText size="md" tone="faint">·</MetaText>
              <MetaText size="md" tone="ink">
                <Link className="hover:underline" href="https://github.com/adarsh-nellore/peer-design-system/blob/main/docs/SPACING.md">docs/SPACING.md</Link>
              </MetaText>
              <MetaText size="md" tone="faint">·</MetaText>
              <MetaText size="md" tone="ink">
                <code className="font-mono">npm run audit</code> fails the build on contract violations
              </MetaText>
            </Cluster>
          </Stack>

        </Stack>
      </PageContainer>
    </div>
  );
}
