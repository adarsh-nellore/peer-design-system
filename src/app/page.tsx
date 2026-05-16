"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Caption } from "@/components/ui/Caption";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Dot } from "@/components/ui/Dot";
import { DropdownMenu } from "@/components/ui/DropdownMenu";
import { EmptyState } from "@/components/ui/EmptyState";
import { Alert } from "@/components/ui/Alert";
import { Glyph, type GlyphName } from "@/components/ui/Glyph";
import { Hairline } from "@/components/ui/Hairline";
import { IconButton } from "@/components/ui/IconButton";
import { Input } from "@/components/ui/Input";
import { KeyChip } from "@/components/ui/KeyChip";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { MetaText } from "@/components/ui/MetaText";
import { Modal } from "@/components/ui/Modal";
import { Pill } from "@/components/ui/Pill";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { Radio } from "@/components/ui/Radio";
import { Row } from "@/components/ui/Row";
import { SearchInput } from "@/components/ui/SearchInput";
import { Select } from "@/components/ui/Select";
import { Stat } from "@/components/ui/Stat";
import { Table } from "@/components/ui/Table";
import { Tabs } from "@/components/ui/Tabs";
import { Tab } from "@/components/ui/Tab";
import { TabBar } from "@/components/ui/TabBar";
import { Textarea } from "@/components/ui/Textarea";
import { Tile } from "@/components/ui/Tile";
import { Toast } from "@/components/ui/Toast";
import { Tooltip } from "@/components/ui/Tooltip";
import { Sparkline } from "@/components/charts/Sparkline";
import { AgentAvatar } from "@/components/agent/AgentAvatar";
import { AgentErrorCard } from "@/components/agent/AgentErrorCard";
import { CarouselCard } from "@/components/agent/CarouselCard";
import { CitationLink } from "@/components/agent/CitationLink";
import { ConfidenceBadge } from "@/components/agent/ConfidenceBadge";
import { DiffViewSideBySide, DiffAdded, DiffRemoved } from "@/components/agent/DiffView";
import { HallucinationFlag } from "@/components/agent/HallucinationFlag";
import { MessageBubble } from "@/components/agent/MessageBubble";
import { MultiStepFlow } from "@/components/agent/MultiStepFlow";
import { PromptBar } from "@/components/agent/PromptBar";
import { ReasonedChip } from "@/components/agent/ReasonedChip";
import { ReasoningTrace } from "@/components/agent/ReasoningTrace";
import { SourceChip } from "@/components/agent/SourceChip";
import { StreamingCursor } from "@/components/agent/StreamingCursor";
import { SuggestionPill } from "@/components/agent/SuggestionPill";
import { ThinkingIndicator } from "@/components/agent/ThinkingIndicator";
import { ToolCallCard } from "@/components/agent/ToolCallCard";
import { AcceptRejectBar } from "@/components/agent/AcceptRejectBar";

/* -------------------------------------------------------------------------- */
/*  Showcase scaffolding                                                       */
/* -------------------------------------------------------------------------- */

function Section({
  title,
  group,
  children,
}: {
  title: string;
  group?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <div className="flex items-baseline gap-3 mb-4">
        {group && (
          <span className="font-mono font-bold uppercase tracking-label text-[10px] text-coral">
            {group}
          </span>
        )}
        <MetaLabel>{title}</MetaLabel>
      </div>
      {children}
    </section>
  );
}

function FlexRow({ children, gap = 3 }: { children: React.ReactNode; gap?: number }) {
  return <div className={`flex flex-wrap items-center gap-${gap}`}>{children}</div>;
}

function GroupHeader({ id, title, body }: { id: string; title: string; body: string }) {
  return (
    <div className="flex items-baseline gap-4 mt-16 mb-6 pb-4 border-b border-hairline-strong">
      <span className="font-mono font-bold uppercase tracking-label text-[11px] text-coral">{id}</span>
      <div>
        <div className="font-sans font-semibold text-[24px] leading-[30px] text-ink">{title}</div>
        <div className="font-sans text-[13px] text-muted">{body}</div>
      </div>
    </div>
  );
}

function ShowcaseTopBar() {
  return (
    <div className="flex items-center h-14 w-full px-6 gap-4 bg-paper border-b border-hairline-strong">
      <div className="flex items-center gap-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" className="text-coral">
          <circle cx="9"  cy="12" r="4.5" />
          <circle cx="15" cy="12" r="4.5" />
        </svg>
        <span className="font-sans font-semibold text-coral text-[18px] leading-[22px]">
          adarsh-design-system
        </span>
      </div>
      <div className="flex items-center ml-6 gap-2">
        <MetaText size="md" tone="ink">Phase 2</MetaText>
        <MetaText size="md" tone="faint">/</MetaText>
        <MetaText size="md" tone="ink">Full library</MetaText>
      </div>
      <div className="grow" />
      <div className="flex items-center gap-1.5">
        <Dot color="green" />
        <MetaText size="md" tone="default">59 sheets · 50 components</MetaText>
      </div>
      <Avatar initials="AN" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

const GLYPH_NAMES: GlyphName[] = [
  "check","chev","chev-up","chev-right","chev-left",
  "arrow-right","arrow-left","x","plus","search","menu","more","sparkle","dot",
];

const TABLE_COLUMNS = [
  { key: "grade",   header: "Grade",    weight: 2 },
  { key: "aurora",  header: "Aurora-IV (n=598)", align: "right" as const },
  { key: "placebo", header: "Placebo (n=293)",   align: "right" as const },
];
const TABLE_ROWS = [
  { grade: "Grade 1 — transient",     aurora: "34 (5.7%)", placebo: "7 (2.4%)" },
  { grade: "Grade 2 — moderate ALT↑", aurora: "13 (2.2%)", placebo: "4 (1.4%)" },
  { grade: "Grade 3 — DILI",           aurora: "2 (0.3%)",  placebo: "1 (0.3%)" },
  { grade: "Grade 4",                  aurora: "0 (0.0%)",  placebo: "0 (0.0%)" },
];

export default function ShowcasePage() {
  return (
    <AppShell topBar={<ShowcaseTopBar />}>
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="px-12 py-10 max-w-[1180px]">

          <div className="mb-10">
            <div className="font-sans font-semibold text-[32px] leading-[40px] text-ink mb-2">Component library</div>
            <div className="font-sans text-[15px] text-muted max-w-[640px]">
              Tokens, atoms, surfaces, forms, data, layouts, agent primitives. Each component
              ships with a Paper sheet for visual reference; sheet IDs are noted in each JSDoc.
            </div>
          </div>

          {/* ============================================================ */}
          <GroupHeader id="group a" title="Atoms" body="Glyph, Badge, Dot, ProgressDots, Avatar, MetaLabel, MetaText, Caption, Hairline, KeyChip" />

          <Section title="Glyph" group="atom">
            <div className="grid grid-cols-7 gap-y-5 gap-x-4">
              {GLYPH_NAMES.map((n) => (
                <div key={n} className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-3 text-ink">
                    <Glyph name={n} size={14} />
                    <Glyph name={n} size={18} />
                    <Glyph name={n} size={22} />
                  </div>
                  <MetaText size="sm" tone="faint">{n}</MetaText>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Badge · Dot · ProgressDots · Avatar" group="atom">
            <div className="flex flex-col gap-5">
              <FlexRow>
                <Badge>md</Badge>
                <Badge tone="success">csv</Badge>
                <Badge tone="danger">pdf</Badge>
                <Badge tone="accent">new</Badge>
                <Badge tone="warning">draft</Badge>
                <Badge tone="info">review</Badge>
                <Badge tone="muted">archived</Badge>
                <Badge size="md" tone="accent" uppercase>section 8.2</Badge>
              </FlexRow>
              <FlexRow>
                <Dot color="coral" /><Dot color="green" /><Dot color="gold" /><Dot color="info" /><Dot color="muted" />
                <span className="w-2" />
                <Dot color="coral" size="sm" /><Dot color="coral" size="md" /><Dot color="coral" size="lg" />
                <span className="w-2" />
                <Avatar initials="AN" size="sm" />
                <Avatar initials="AN" />
                <Avatar initials="AN" size="lg" />
                <Avatar initials="AN" ring />
                <Avatar initials="PR" variant="coral-soft" />
                <Avatar initials="JM" variant="success" />
              </FlexRow>
              <FlexRow gap={6}>
                <ProgressDots total={3} current={2} />
                <ProgressDots total={4} current={3} />
                <ProgressDots total={5} current={1} />
              </FlexRow>
            </div>
          </Section>

          <Section title="Typography · MetaLabel · MetaText · Caption · Hairline · KeyChip" group="atom">
            <div className="flex flex-col gap-5">
              <div className="flex items-baseline gap-4">
                <MetaLabel>section 12.4</MetaLabel>
                <MetaText size="md" tone="faint">—</MetaText>
                <MetaText size="md">Phase III</MetaText>
                <MetaText size="md" tone="faint">·</MetaText>
                <MetaText size="md">Aurora-IV</MetaText>
              </div>
              <div className="flex items-baseline gap-6">
                <Caption size="lg">Hepatic adverse events by grade</Caption>
                <Caption size="md">A pre-specified subgroup analysis</Caption>
                <Caption size="sm" tone="muted">Source: Table 4.2</Caption>
              </div>
              <div className="max-w-[640px]"><Hairline label="earlier today" /></div>
              <FlexRow>
                <KeyChip size="sm">⌘</KeyChip>
                <KeyChip>⌘</KeyChip>
                <KeyChip>↵</KeyChip>
                <KeyChip>Esc</KeyChip>
                <KeyChip keys={["⌘", "K"]} />
                <KeyChip keys={["⌘", "⇧", "P"]} />
              </FlexRow>
            </div>
          </Section>

          {/* ============================================================ */}
          <GroupHeader id="group b" title="Action" body="Pill, Button, IconButton" />

          <Section title="Pill" group="action">
            <FlexRow>
              <Pill variant="outlined"
                leadingIcon={<Glyph name="check" size={11} strokeWidth={2.5} className="text-green" />}
                trailingIcon={<Glyph name="chev" size={11} className="text-faint" />}
              >
                Reasoned · 6 steps · 12s
              </Pill>
              <Pill variant="filled"
                leadingIcon={<Glyph name="check" size={11} strokeWidth={2.5} className="text-green" />}
              >
                Magnitude · Subgroup table
              </Pill>
              <Pill variant="accent" leadingIcon={<Glyph name="sparkle" size={10} />}>
                Suggest framing
              </Pill>
              <Pill variant="ghost">Skip</Pill>
            </FlexRow>
          </Section>

          <Section title="Button · IconButton" group="action">
            <div className="flex flex-col gap-3">
              <FlexRow>
                <Button variant="primary" leadingIcon={<Glyph name="check" size={12} strokeWidth={3} />}>Accept draft</Button>
                <Button variant="secondary" leadingIcon={<Glyph name="x" size={12} />}>Discard</Button>
                <Button variant="ghost">View history</Button>
                <Button variant="destructive" leadingIcon={<Glyph name="x" size={12} />}>Reject</Button>
              </FlexRow>
              <FlexRow>
                <Button variant="primary" size="sm">Send</Button>
                <Button variant="primary" size="md">Send</Button>
                <Button variant="primary" size="lg">Send</Button>
              </FlexRow>
              <FlexRow>
                <IconButton variant="primary"     size="sm" aria-label="send"><Glyph name="arrow-right" size={12} /></IconButton>
                <IconButton variant="primary"     size="md" aria-label="send"><Glyph name="arrow-right" size={14} /></IconButton>
                <IconButton variant="primary"     size="lg" aria-label="send"><Glyph name="arrow-right" size={16} /></IconButton>
                <IconButton variant="secondary"   size="md" aria-label="add"><Glyph name="plus" size={14} /></IconButton>
                <IconButton variant="ghost"       size="md" aria-label="more"><Glyph name="more" size={14} /></IconButton>
                <IconButton variant="destructive" size="md" aria-label="close"><Glyph name="x" size={14} /></IconButton>
              </FlexRow>
            </div>
          </Section>

          {/* ============================================================ */}
          <GroupHeader id="group c" title="Surface" body="Card, Tile, Toast, Alert, EmptyState, Modal" />

          <Section title="Card · variants × padding" group="surface">
            <div className="grid grid-cols-4 gap-4">
              {(["paper", "soft", "outline", "elevated"] as const).map((v) => (
                <Card key={v} variant={v}>
                  <div className="flex flex-col gap-1">
                    <MetaLabel>section 12.4</MetaLabel>
                    <div className="text-[15px] text-ink font-medium">Hepatic AEs</div>
                    <div className="text-[12px] text-muted">{v} variant.</div>
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          <Section title="Tile" group="surface">
            <div className="flex flex-wrap gap-4">
              <Tile
                hero={<Glyph name="search" size={16} className="text-muted" />}
                label="claims searched"
                value="1,284"
                body="across 12 documents"
                trailing={<Badge tone="success">+12</Badge>}
              />
              <Tile
                variant="accent"
                hero={<Glyph name="sparkle" size={16} className="text-coral" />}
                label="suggestions waiting"
                value="3"
                body="review & accept"
              />
              <Tile
                variant="muted"
                hero={<Glyph name="menu" size={16} className="text-muted" />}
                label="documents"
                value="42"
                body="last opened CSR-014"
              />
            </div>
          </Section>

          <Section title="Toast · Alert" group="surface">
            <div className="flex flex-col gap-4">
              <FlexRow gap={4}>
                <Toast tone="success" title="Section 12.4 saved" body="Auto-saved 4s ago." />
                <Toast tone="warning" title="3 claims need review" body="Open the Claims panel." />
              </FlexRow>
              <Alert tone="warning" title="Section 8.2 has 2 unresolved claims" body='"Response rate 60%" appears in §3.1 and §5.3 with different values. Reconcile before locking the draft.' />
              <Alert tone="info" compact body="Peer guidance updated · FDA released new Phase III templates." />
            </div>
          </Section>

          <Section title="EmptyState" group="surface">
            <div className="flex flex-wrap gap-4">
              <EmptyState
                icon={<Glyph name="search" size={22} className="text-faint" />}
                title="No claims yet"
                body="Peer will extract claims as you draft."
                action={<Button variant="secondary">Browse sections</Button>}
              />
              <EmptyState
                variant="paper"
                iconTint="coral"
                icon={<Glyph name="sparkle" size={22} className="text-coral" />}
                title="Ready to draft"
                body="Choose a section to begin. Peer drafts three framings."
                action={<Button>Start drafting</Button>}
              />
              <EmptyState
                variant="bare"
                icon={<Glyph name="menu" size={22} className="text-faint" />}
                title="No matches"
                body='No claims matched "hepatic". Try a related term.'
              />
            </div>
          </Section>

          <Section title="Modal" group="surface">
            <Card variant="outline" padding="lg">
              <MetaText size="sm" tone="faint">Modal preview (not actually opened)</MetaText>
              <div className="mt-3 inline-flex flex-col w-[480px] bg-paper border border-hairline-strong rounded-card shadow-pop overflow-hidden">
                <div className="flex items-center justify-between py-3.5 px-5 border-b border-hairline">
                  <div className="font-sans font-semibold text-[15px] text-ink">Discard this draft?</div>
                  <IconButton variant="ghost" size="md" aria-label="Close"><Glyph name="x" size={14} /></IconButton>
                </div>
                <div className="py-4 px-5 text-[14px] leading-[22px] text-muted">
                  Your draft of §12.4 will be removed. The cited tables stay attached to the section.
                </div>
                <div className="flex justify-end gap-2 py-3 px-5 border-t border-hairline bg-stripe">
                  <Button variant="ghost">Keep editing</Button>
                  <Button variant="destructive">Discard draft</Button>
                </div>
              </div>
            </Card>
            {/* Inline ref to avoid unused-import lint */}
            <div className="hidden"><Modal open={false}>{null}</Modal></div>
          </Section>

          {/* ============================================================ */}
          <GroupHeader id="group d" title="Form" body="Input, SearchInput, Textarea, Tab + TabBar, Tabs, Select, Checkbox, Radio, Tooltip, DropdownMenu" />

          <Section title="Input · SearchInput · Textarea · Select" group="form">
            <div className="grid grid-cols-2 gap-5 max-w-[860px]">
              <Input inputSize="md" placeholder="Section title" />
              <SearchInput placeholder="Search…" shortcut={["⌘", "K"]} />
              <Textarea placeholder="Tell Peer what changed in the protocol…" rows={3} />
              <Select
                placeholder="Select section…"
                options={[
                  { value: "12_1", label: "§12.1 · Overview" },
                  { value: "12_4", label: "§12.4 · Hepatic AEs" },
                  { value: "12_7", label: "§12.7 · Renal AEs" },
                ]}
              />
            </div>
          </Section>

          <Section title="Tab + TabBar · Tabs (segmented)" group="form">
            <div className="flex flex-col gap-5">
              <div className="max-w-[800px] border border-hairline-strong rounded-card overflow-hidden">
                <TabBar
                  trailing={<Button variant="ghost" size="sm" leadingIcon={<Glyph name="plus" size={12} />}>Open</Button>}
                >
                  <Tab kind="md"  label="CSR-014.md"      active onClose={() => {}} />
                  <Tab kind="csv" label="LFT-labs.csv" />
                  <Tab kind="pdf" label="protocol-v3.pdf" dirty />
                </TabBar>
                <div className="py-6 px-6 text-[13px] text-muted">Doc canvas…</div>
              </div>
              <FlexRow>
                <Tabs
                  size="sm"
                  value="all"
                  onChange={() => {}}
                  options={[
                    { value: "all", label: "All" },
                    { value: "open", label: "Open" },
                    { value: "resolved", label: "Resolved" },
                  ]}
                />
                <Tabs
                  size="md"
                  value="open"
                  onChange={() => {}}
                  options={[
                    { value: "open", label: "Open", count: 3 },
                    { value: "resolved", label: "Resolved", count: 42 },
                    { value: "all", label: "All", count: 45 },
                  ]}
                />
              </FlexRow>
            </div>
          </Section>

          <Section title="Checkbox · Radio · Tooltip · DropdownMenu" group="form">
            <div className="flex flex-col gap-5">
              <FlexRow gap={6}>
                <label className="inline-flex items-center gap-2">
                  <Checkbox checked /> <span className="text-[13px] text-ink">Include resolved</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <Checkbox indeterminate /> <span className="text-[13px] text-ink">Indeterminate</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <Checkbox /> <span className="text-[13px] text-ink">Unchecked</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <Radio checked name="x" /> <span className="text-[13px] text-ink">Conservative</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <Radio name="x" /> <span className="text-[13px] text-ink">Direct</span>
                </label>
              </FlexRow>
              <FlexRow>
                <Tooltip content="Open command palette" shortcut={["⌘", "K"]}>
                  <Button variant="secondary" size="sm">Hover me</Button>
                </Tooltip>
                <Tooltip
                  variant="glass"
                  content="Pulled from §5.3 subgroup analysis (n=124 baseline LFT abnormalities)."
                >
                  <Pill variant="outlined">Why this suggestion</Pill>
                </Tooltip>
                <DropdownMenu
                  trigger={
                    <Button variant="secondary" size="md" trailingIcon={<Glyph name="chev" size={12} />}>
                      Actions
                    </Button>
                  }
                  sections={[
                    {
                      header: "draft",
                      items: [
                        { label: "New draft",         icon: "plus",   shortcut: ["⌘", "N"] },
                        { label: "Open recent",       icon: "chev-right" },
                        { label: "Search references", icon: "search", shortcut: ["⌘", "K"] },
                      ],
                    },
                    {
                      header: "manage",
                      items: [
                        { label: "Settings",       icon: "menu" },
                        { label: "Discard draft",  icon: "x", danger: true },
                      ],
                    },
                  ]}
                />
              </FlexRow>
            </div>
          </Section>

          {/* ============================================================ */}
          <GroupHeader id="group e" title="Data display" body="Row, Table, Sparkline, Stat" />

          <Section title="Row" group="data">
            <div className="max-w-[720px] border border-hairline-strong rounded-card overflow-hidden">
              <Row variant="default">
                <span className="flex-1 basis-0 grow-[2]">Grade 1 — transient</span>
                <span className="flex-1 text-right">34 <span className="text-faint">(5.7%)</span></span>
                <span className="flex-1 text-right">7 <span className="text-faint">(2.4%)</span></span>
              </Row>
              <Row variant="zebra">
                <span className="flex-1 basis-0 grow-[2]">Grade 2 — moderate ALT↑</span>
                <span className="flex-1 text-right">13 <span className="text-faint">(2.2%)</span></span>
                <span className="flex-1 text-right">4 <span className="text-faint">(1.4%)</span></span>
              </Row>
              <Row variant="muted">
                <span className="flex-1 basis-0 grow-[2]">Grade 4</span>
                <span className="flex-1 text-right">0 (0.0%)</span>
                <span className="flex-1 text-right">0 (0.0%)</span>
              </Row>
              <Row variant="total">
                <span className="flex-1 basis-0 grow-[2]">Total — any grade</span>
                <span className="flex-1 text-right">49 <span className="text-faint font-normal">(8.2%)</span></span>
                <span className="flex-1 text-right">12 <span className="text-faint font-normal">(4.1%)</span></span>
              </Row>
            </div>
          </Section>

          <Section title="Table" group="data">
            <div className="max-w-[720px]">
              <Table
                columns={TABLE_COLUMNS}
                rows={TABLE_ROWS}
                total={{ label: "Total — any grade", values: ["49 (8.2%)", "12 (4.1%)"] }}
              />
            </div>
          </Section>

          <Section title="Sparkline · Stat" group="data">
            <div className="flex flex-wrap gap-5">
              <Stat
                label="claims resolved"
                value="82%"
                delta={{ value: "+4 wk", tone: "success", direction: "up" }}
                sparkline={<Sparkline values={[34, 38, 42, 51, 60, 72, 82]} area />}
              />
              <Stat
                label="draft turnaround"
                value="17"
                unit=" d"
                delta={{ value: "-23 d", tone: "success", direction: "down" }}
                sparkline={<Sparkline values={[40, 36, 30, 26, 22, 19, 17]} />}
              />
              <Stat
                label="hallucination rate"
                value="2.1%"
                delta={{ value: "+0.4 wk", tone: "danger", direction: "up" }}
                sparkline={<Sparkline values={[1.2, 1.4, 1.5, 1.7, 1.9, 2.0, 2.1]} tone="danger" />}
              />
              <Stat variant="soft" label="active drafts" value="12" />
            </div>
          </Section>

          {/* ============================================================ */}
          <GroupHeader id="group f" title="Layout" body="TopNav, LeftNav, RightRail, DocFrame, SplitFrame, PageContainer (referenced by sheets · 6OU-0 through 6OZ-0)" />

          <Section title="Layout components" group="layout">
            <MetaText size="md" tone="default">
              Layout shells are best viewed in their composed form. See the page templates
              (Group I sheets · 7GJ-0 through 7GM-0) for full doc-editor, dashboard, agent-chat,
              and settings examples.
            </MetaText>
          </Section>

          {/* ============================================================ */}
          <GroupHeader id="group g" title="Agent atoms" body="AgentAvatar, ThinkingIndicator, StreamingCursor, CitationLink, SourceChip, SuggestionPill, ReasonedChip, ConfidenceBadge, HallucinationFlag" />

          <Section title="Agent identity · status · streaming" group="agent">
            <div className="flex flex-col gap-4">
              <FlexRow gap={6}>
                <AgentAvatar />
                <AgentAvatar state="thinking" trailingNote="thinking…" />
                <AgentAvatar state="awaiting" trailingNote="needs your input" />
                <AgentAvatar state="offline"  trailingNote="offline" />
              </FlexRow>
              <FlexRow gap={6}>
                <ThinkingIndicator />
                <ThinkingIndicator tone="accent" />
                <ThinkingIndicator label="Working through Aurora-IV subgroups" />
              </FlexRow>
              <div className="font-sans text-[14px] text-ink max-w-[480px]">
                Hepatic adverse events occurred in 8.2% of Aurora-IV recipients<StreamingCursor />
              </div>
            </div>
          </Section>

          <Section title="Citations · sources · suggestions" group="agent">
            <div className="flex flex-col gap-4">
              <div className="font-sans text-[14px] leading-[22px] text-ink max-w-[600px]">
                Hepatic adverse events occurred in 8.2% of Aurora-IV recipients
                <CitationLink number={1} /> vs 4.1% of placebo
                <CitationLink number={2} />.
              </div>
              <FlexRow gap={4}>
                <SourceChip kind="md"  file="CSR-014.md" />
                <SourceChip kind="md"  file="CSR-014.md" pointer="§12.4" />
                <SourceChip kind="csv" file="LFT-labs.csv" pointer="row 142" />
                <SourceChip kind="pdf" file="protocol-v3.pdf" pointer="p. 47" variant="bordered" />
              </FlexRow>
              <FlexRow>
                <SuggestionPill>Suggest subgroup framing</SuggestionPill>
                <SuggestionPill tone="primary">Apply suggestion</SuggestionPill>
                <SuggestionPill size="md">Tighten with Peer</SuggestionPill>
              </FlexRow>
            </div>
          </Section>

          <Section title="ReasonedChip · ConfidenceBadge · HallucinationFlag" group="agent">
            <div className="flex flex-col gap-4">
              <FlexRow>
                <ReasonedChip
                  label="Reasoned · 6 steps · 12s"
                  steps={[
                    "Identified Aurora-IV hepatic AE incidence: 8.2%",
                    "Compared to placebo arm: 4.1%",
                    "Grouped events by grade · transient ALT dominant",
                  ]}
                  sources={
                    <div className="flex flex-col gap-1">
                      <SourceChip kind="md"  file="CSR-014.md" pointer="§12.4" />
                      <SourceChip kind="csv" file="LFT-labs.csv" />
                    </div>
                  }
                />
              </FlexRow>
              <FlexRow>
                <ConfidenceBadge value={94} showLabel />
                <ConfidenceBadge value={72} showLabel />
                <ConfidenceBadge value={48} showLabel />
                <div className="w-[240px]"><ConfidenceBadge value={94} variant="bar" /></div>
                <div className="w-[240px]"><ConfidenceBadge value={72} variant="bar" /></div>
                <div className="w-[240px]"><ConfidenceBadge value={48} variant="bar" /></div>
              </FlexRow>
              <FlexRow>
                <HallucinationFlag />
                <HallucinationFlag tone="warning" />
              </FlexRow>
              <HallucinationFlag
                variant="block"
                title="Claim could not be sourced"
                body='"Hepatotoxicity was reversible in 95% of cases" was generated by Peer but no row in the linked tables supports it. Review before accepting.'
                actions={
                  <>
                    <Button variant="secondary" size="sm">Open in audit</Button>
                    <Button variant="ghost" size="sm">Remove claim</Button>
                  </>
                }
              />
            </div>
          </Section>

          {/* ============================================================ */}
          <GroupHeader id="group h" title="Agent molecules" body="MessageBubble, ToolCallCard, ReasoningTrace, DiffView, CarouselCard, MultiStepFlow, AcceptRejectBar, AgentErrorCard, PromptBar" />

          <Section title="Chat surface · MessageBubble · ToolCallCard" group="agent">
            <div className="flex flex-col gap-4 max-w-[480px]">
              <MessageBubble role="user" timestamp="14:03">Draft the §12.4 hepatic AE narrative.</MessageBubble>
              <MessageBubble role="assistant" state="thinking" timestamp="14:03" />
              <MessageBubble role="assistant" timestamp="14:03">
                Most events were Grade 1-2 transient ALT elevations, resolving without intervention.
              </MessageBubble>
              <MessageBubble role="assistant" state="streaming" timestamp="14:03">
                Hepatic adverse events occurred in 8.2% of Aurora-IV
              </MessageBubble>
              <ToolCallCard name="search_claims" args='query: "hepatic adverse events" · scope: §12.4' state="running" elapsed="8s" />
              <ToolCallCard
                name="search_claims"
                args='query: "hepatic adverse events" · scope: §12.4'
                state="completed"
                resultSummary="4 results · 12s"
                results={["CSR-014.md · §12.4", "LFT-labs.csv · 142 rows"]}
              />
              <ToolCallCard name="fetch_protocol" state="failed" elapsed="3s" reason="Source document not accessible." />
            </div>
          </Section>

          <Section title="ReasoningTrace · DiffView" group="agent">
            <div className="flex flex-col gap-5">
              <ReasoningTrace
                defaultOpen
                steps={[
                  { label: "Loaded source documents", detail: "CSR-014.md, LFT-labs.csv · 2.1s" },
                  { label: "Counted hepatic AEs per arm", detail: "Aurora-IV: 49/598 = 8.2%" },
                  { label: "Grouped by grade", detail: "Grade 1-2 dominant" },
                  { label: "Drafted narrative", detail: "Three framings: conservative · direct · comparative", done: true },
                ]}
              />
              <DiffViewSideBySide
                label="section 12.4 · paragraph 2"
                before="Hepatic adverse events were moderate severity Grade 2 in most cases."
                after={<>Most hepatic AEs were <DiffAdded>Grade 1–2 transient</DiffAdded> ALT elevations, resolving without intervention.</>}
              />
              <div className="font-sans text-[14px] text-ink max-w-[640px]">
                Most hepatic AEs were <DiffRemoved>moderate severity Grade 2</DiffRemoved>
                {" "}<DiffAdded>Grade 1–2 transient</DiffAdded>, resolving without intervention.
              </div>
            </div>
          </Section>

          <Section title="CarouselCard · MultiStepFlow" group="agent">
            <div className="flex flex-wrap gap-5">
              <CarouselCard
                variants={[
                  { label: "conservative", body: "Most events were Grade 1–2 transient ALT elevations, resolving without intervention.", footer: "Pro 1 · Pro 2 · Con 1 · Con 2" },
                  { label: "direct",        body: "Aurora-IV doubled the hepatic AE rate vs placebo (8.2% vs 4.1%), but events were transient.", footer: "Pro 1 · Pro 2 · Con 1 · Con 2" },
                  { label: "comparative",   body: "Hepatic AE rates: Aurora-IV 8.2% (n=49) vs placebo 4.1% (n=12). Grade distribution favorable.", footer: "Pro 1 · Pro 2 · Con 1 · Con 2" },
                ]}
              />
              <MultiStepFlow
                total={3}
                current={2}
                stepLabel="Q2 of 3 · framing"
                question="How conservative should the framing be?"
                options={[
                  { value: "conservative", label: "Conservative", description: "Mirrors FDA template phrasings." },
                  { value: "direct",       label: "Direct",       description: "Plain, no hedging." },
                  { value: "comparative",  label: "Comparative",  description: "Side-by-side framing." },
                ]}
                value="conservative"
                onContinue={() => {}}
                onBack={() => {}}
                onSkip={() => {}}
              />
            </div>
          </Section>

          <Section title="AcceptRejectBar · AgentErrorCard · PromptBar" group="agent">
            <div className="flex flex-col gap-5">
              <AcceptRejectBar
                iteration={{ current: 2, total: 5 }}
                onAccept={() => {}}
                onReject={() => {}}
                onRegenerate={() => {}}
              />
              <FlexRow gap={4}>
                <AgentErrorCard
                  tone="error"
                  title="Peer hit an error"
                  body="The reasoning step lost the LFT-labs.csv source. Try again, or pick a different framing."
                  actions={<>
                    <Button variant="destructive" size="sm">Retry draft</Button>
                    <Button variant="ghost" size="sm">Dismiss</Button>
                  </>}
                />
                <AgentErrorCard
                  tone="rate-limited"
                  title="Rate limit · slowing down"
                  body="You've hit Peer's usage cap. Resumes in 4 min, or upgrade for higher limits."
                  actions={<Button variant="secondary" size="sm">View plan</Button>}
                />
                <AgentErrorCard
                  tone="refusal"
                  title="Peer can't help with that"
                  body="Drafting unsourced claims isn't supported. Add references or rephrase as a hypothesis."
                />
              </FlexRow>
              <div className="max-w-[480px]">
                <PromptBar
                  placeholder="Ask Peer about §12.4…"
                  attachments={[
                    { id: "1", label: "CSR-014.md", kindBadge: <Badge>md</Badge> },
                    { id: "2", label: "LFT-labs.csv", kindBadge: <Badge tone="success">csv</Badge> },
                  ]}
                  onSubmit={() => {}}
                  onAttach={() => {}}
                />
              </div>
            </div>
          </Section>

          {/* ============================================================ */}
          <GroupHeader id="group i" title="Page templates" body="Full assembled views in Paper · doc-editor, dashboard, agent-chat, settings" />

          <Section title="Page templates" group="page">
            <MetaText size="md" tone="default">
              Four full-screen reference layouts live as Paper artboards (7GJ-0, 7GK-0, 7GL-0,
              7GM-0). They compose every primitive into doc-editor, dashboard, agent-chat, and
              settings shells. Use them as visual references when /build-hifi scaffolds new screens.
            </MetaText>
          </Section>

          <div className="pt-8 pb-12 border-t border-hairline">
            <MetaText size="sm" tone="faint">
              Phase 2 complete · 50 React components across 9 groups · 59 Paper artboards · build clean
            </MetaText>
          </div>

        </div>
      </div>
    </AppShell>
  );
}
