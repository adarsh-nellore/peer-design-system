/**
 * Templates gallery — index of all 9 ported page templates.
 * Each row links to the live route. Templates are the proof-of-system
 * for the composition contract: every one of them passes `npm run audit`.
 */

import Link from "next/link";
import { Stack } from "@/components/layout/Stack";
import { Cluster } from "@/components/layout/Cluster";
import { PageContainer } from "@/components/layout/PageContainer";
import { TopNav } from "@/components/layout/TopNav";
import { Badge } from "@/components/ui/Badge";
import { Glyph } from "@/components/ui/Glyph";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { MetaText } from "@/components/ui/MetaText";
import { PeerBrand } from "@/components/ui/PeerBrand";
import { Body } from "@/components/typography/Body";
import { Heading } from "@/components/typography/Heading";
import { PageHeader } from "@/components/patterns/PageHeader";

interface TemplateEntry {
  slug: string;
  paperNode: string;
  title: string;
  family: "App shell" | "Editorial" | "Form" | "Onboarding";
  description: string;
}

const TEMPLATES: TemplateEntry[] = [
  {
    slug: "dashboard",
    paperNode: "7GK-0",
    title: "Dashboard",
    family: "App shell",
    description: "AppShell + LeftNav + KPI stat row + drafts Table. The default landing for any document-workflow app.",
  },
  {
    slug: "agent-chat",
    paperNode: "7GL-0",
    title: "Agent chat",
    family: "App shell",
    description: "Centered chat thread with reasoning chips, citation popovers, and a PromptBar. Foreground agent surface.",
  },
  {
    slug: "doc-editor",
    paperNode: "7GJ-0",
    title: "Document editor",
    family: "App shell",
    description: "AppShell + DocFrame + TabBar with a Copilot RightRail (user turn, reasoned chip, draft variants).",
  },
  {
    slug: "longform-reader",
    paperNode: "7RR-0",
    title: "Longform reader",
    family: "Editorial",
    description: "Bespoke editorial layout — centered 720 article column + 280 marginalia with numbered citations.",
  },
  {
    slug: "settings",
    paperNode: "7GM-0",
    title: "Settings",
    family: "Form",
    description: "AppShell + LeftNav settings rail + bounded Prose form (Input · Select · Checkbox stack).",
  },
  {
    slug: "list-detail",
    paperNode: "7RQ-0",
    title: "List & detail",
    family: "App shell",
    description: "3-pane triage layout — LeftNav filters · 380-wide list column · detail Prose with floating action bar.",
  },
  {
    slug: "browse-library",
    paperNode: "7RS-0",
    title: "Browse library",
    family: "App shell",
    description: "Card grid (4 columns) of references — drafts, CSRs, data files, archived items, plus an upload dropzone.",
  },
  {
    slug: "onboarding-flow",
    paperNode: "7RT-0",
    title: "Onboarding flow",
    family: "Onboarding",
    description: "Centered card on soft bg with ProgressDots + radio options + back/continue footer. Step 2 of 4.",
  },
  {
    slug: "search-results",
    paperNode: "7RU-0",
    title: "Search results",
    family: "App shell",
    description: "Active SearchInput in the chrome + filter rail + mixed-result list (claims, docs, data, sections, flags).",
  },
];

const FAMILY_TONE: Record<TemplateEntry["family"], "neutral" | "success" | "warning" | "danger" | "info"> = {
  "App shell":  "neutral",
  "Editorial":  "info",
  "Form":       "success",
  "Onboarding": "warning",
};

export default function TemplatesGallery() {
  return (
    <div className="absolute inset-0 flex flex-col bg-paper text-ink antialiased overflow-y-auto scroll-tame">
      <TopNav
        brand={<PeerBrand size="md" />}
        breadcrumb={
          <Cluster gap="cozy" align="center" wrap={false}>
            <Link href="/" className="hover:underline">
              <MetaText size="md">peer-design-system</MetaText>
            </Link>
            <MetaText size="md" tone="faint">/</MetaText>
            <MetaText size="md" tone="ink" className="font-medium">templates</MetaText>
          </Cluster>
        }
      />

      <PageContainer size="lg">
        <Stack gap="hero">

          <PageHeader
            kicker="GALLERY"
            subtitle="9 ported page templates — every one audit-clean"
            title="Templates"
            titleSize="h1"
          />

          <Stack gap="comfortable">
            {TEMPLATES.map((t) => (
              <Link
                key={t.slug}
                href={`/templates/${t.slug}`}
                className="block rounded-card border border-hairline-strong p-5 transition-colors hover:bg-soft"
              >
                <Cluster gap="block" justify="between" align="start" wrap={false}>
                  <Stack gap="cozy" className="flex-1 min-w-0">
                    <Cluster gap="comfortable" align="baseline">
                      <Badge tone={FAMILY_TONE[t.family]}>{t.family}</Badge>
                      <Heading size="h4">{t.title}</Heading>
                      <MetaText size="sm">Paper {t.paperNode}</MetaText>
                    </Cluster>
                    <Body size="small" tone="muted">
                      {t.description}
                    </Body>
                  </Stack>
                  <Glyph name="chev" size={16} className="text-faint shrink-0 mt-2" />
                </Cluster>
              </Link>
            ))}
          </Stack>

          <Stack gap="cozy">
            <MetaLabel tone="muted">CONTRACT</MetaLabel>
            <Body size="small" tone="muted">
              Every template above is generated through the same composition layer:{" "}
              <code className="font-mono">Heading</code>, <code className="font-mono">Body</code>,{" "}
              <code className="font-mono">Stack</code>, <code className="font-mono">Cluster</code>,{" "}
              <code className="font-mono">PageHeader</code>, <code className="font-mono">Prose</code>,{" "}
              <code className="font-mono">PeerBrand</code>. No raw font sizes. No raw heading tags.
              No raw <code className="font-mono">flex flex-col gap-N</code>. The audit script fails the build otherwise.
            </Body>
          </Stack>

        </Stack>
      </PageContainer>
    </div>
  );
}
