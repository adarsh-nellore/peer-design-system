"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DEMO_DOC_ID, documents, versionActivity } from "@/lib/mock-data";
import { docPath } from "@/lib/csr-urls";
import { AppShell } from "@/components/layout/AppShell";
import { TopNav } from "@/components/layout/TopNav";
import { Stack } from "@/components/layout/Stack";
import { Cluster } from "@/components/layout/Cluster";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Dot } from "@/components/ui/Dot";
import { Heading } from "@/components/typography/Heading";
import { Body } from "@/components/typography/Body";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { MetaText } from "@/components/ui/MetaText";
import { LinkButton } from "@/components/layout/LinkButton";
import { stagger } from "@/lib/motion";

const KPIS = [
  { label: "Review duration", value: "14d", sub: "avg this cycle", href: docPath(DEMO_DOC_ID, { tab: "workflow" }) },
  { label: "Edit distance", value: "2.3k", sub: "words changed", href: docPath(DEMO_DOC_ID, { overlay: "version-history" }) },
  { label: "Review cycles", value: "2", sub: "rounds complete", href: docPath(DEMO_DOC_ID, { overlay: "quorum" }) },
  { label: "Submission readiness", value: "68%", sub: "QC pre-flight", href: docPath(DEMO_DOC_ID, { tab: "qc" }) },
];

const STAGE_LABELS = [
  "Lock", "Files", "Collect", "Draft", "Review", "Incorporate", "QC", "Sign-off",
];

const OTHER_DOCS = [
  { id: "csr-xyz99-102", title: "XYZ99-102 Phase 2 CSR", state: "drafting", studyId: "XYZ99-102" },
  { id: "csr-def44-220", title: "DEF44-220 Interim CSR", state: "awaiting_lock", studyId: "DEF44-220" },
];

export default function DashboardPage() {
  const doc = documents[DEMO_DOC_ID];
  const activeStageIdx = doc.stages.findIndex((s) => s.status === "active");

  return (
    <AppShell
      topBar={
        <TopNav
          brand={<Heading size="h4" tone="ink">Command Center</Heading>}
          breadcrumb={<MetaText tone="faint">ABC23-391-401 program</MetaText>}
          trailing={
            <LinkButton href={docPath(DEMO_DOC_ID, { tab: "copilot" })} variant="primary" size="sm">
              Open cornerstone CSR
            </LinkButton>
          }
        />
      }
    >
      <Stack gap="page" className="px-8 py-6 overflow-y-auto flex-1">
        <motion.div
          className="grid grid-cols-4 gap-4"
          data-wt="dashboard-kpis"
          initial="hidden"
          animate="visible"
        >
          {KPIS.map((k, i) => (
            <motion.div key={k.label} {...stagger(i, 0.08)}>
              <Link href={k.href}>
                <Card
                  variant="paper"
                  padding="lg"
                  className="hover:border-coral/40 hover:shadow-pop transition-all"
                >
                  <Stack gap="tight">
                    <MetaLabel tone="muted">{k.label}</MetaLabel>
                    <Heading size="h3" tone="ink">{k.value}</Heading>
                    <MetaText tone="faintest" size="sm">{k.sub}</MetaText>
                  </Stack>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <Stack gap="comfortable">
          <Cluster justify="between" align="center">
            <MetaLabel tone="muted">Active documents</MetaLabel>
            <Link href="/documents/new" className="text-xs text-coral font-medium hover:underline">
              New CSR from data sources →
            </Link>
          </Cluster>

          <Card variant="paper" padding="none">
            <div className="grid grid-cols-[1fr_2fr_auto] items-center bg-soft border-b border-hairline px-4 py-2">
              <MetaLabel tone="muted">Document</MetaLabel>
              <MetaLabel tone="muted">Workflow progress</MetaLabel>
              <MetaLabel tone="muted">Status</MetaLabel>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link
                href={docPath(DEMO_DOC_ID, { tab: "copilot" })}
                className="grid grid-cols-[1fr_2fr_auto] items-center px-4 py-4 hover:bg-soft transition-colors gap-4 border-b border-hairline"
              >
                <Stack gap="tight">
                  <Body size="small" tone="ink" measured={false} className="font-medium">
                    {doc.title}
                  </Body>
                  <Body size="small" tone="muted" measured={false}>
                    {doc.studyId}
                  </Body>
                </Stack>

                <Cluster gap="tight" wrap={false}>
                  {STAGE_LABELS.map((label, i) => {
                    const stage = doc.stages[i];
                    const isComplete = stage?.status === "complete";
                    const isActive = stage?.status === "active";
                    return (
                      <span key={label} className="inline-flex items-center gap-1">
                        <span title={label}>
                          <Dot
                            color={isComplete ? "green" : isActive ? "coral" : "muted"}
                            size={isActive ? "md" : "sm"}
                            className={isActive ? "ring-2 ring-coral-soft" : undefined}
                          />
                        </span>
                        {i < STAGE_LABELS.length - 1 && (
                          <div className={`h-px w-3 ${i < activeStageIdx ? "bg-green" : "bg-faint"}`} />
                        )}
                      </span>
                    );
                  })}
                  <MetaText tone="default" size="sm" className="ml-2">
                    {doc.stages.find((s) => s.status === "active")?.label ?? "—"}
                  </MetaText>
                </Cluster>

                <Cluster gap="cozy">
                  <Badge tone="danger">Review open</Badge>
                  <span title="Elena stale — wrong version">
                    <Dot color="gold" size="sm" className="ring-2 ring-gold-soft" />
                  </span>
                </Cluster>
              </Link>
            </motion.div>

            {OTHER_DOCS.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <Link
                  href={docPath(d.id, { tab: "copilot" })}
                  className="grid grid-cols-[1fr_2fr_auto] items-center px-4 py-3 hover:bg-soft transition-colors gap-4 opacity-80"
                >
                  <Stack gap="tight">
                    <Body size="small" tone="ink" measured={false}>{d.title}</Body>
                    <MetaText tone="faint" size="sm">{d.studyId}</MetaText>
                  </Stack>
                  <MetaText tone="faint" size="sm">Earlier stage · {d.state.replace("_", " ")}</MetaText>
                  <Badge tone="neutral">Not started</Badge>
                </Link>
              </motion.div>
            ))}
          </Card>
        </Stack>

        <Stack gap="comfortable">
          <MetaLabel tone="muted">Recent program activity</MetaLabel>
          <Card variant="paper" padding="md">
            <Stack gap="cozy">
              {versionActivity.slice(0, 5).map((a, i) => (
                <motion.div key={a.id} {...stagger(i, 0.05)}>
                  <Link
                    href={docPath(DEMO_DOC_ID, { tab: "workflow", activity: a.id })}
                    className="flex justify-between gap-4 py-1.5 hover:bg-soft rounded px-2 -mx-2 transition-colors"
                  >
                    <MetaText tone="ink" size="sm">{a.label}</MetaText>
                    <MetaText tone="faintest" size="sm">{a.timestamp}</MetaText>
                  </Link>
                </motion.div>
              ))}
            </Stack>
            <Link
              href={docPath(DEMO_DOC_ID, { overlay: "version-history" })}
              className="text-xs text-coral mt-3 inline-block hover:underline"
            >
              Full version timeline →
            </Link>
          </Card>
        </Stack>
      </Stack>
    </AppShell>
  );
}
