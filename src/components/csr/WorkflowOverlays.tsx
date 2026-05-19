"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Modal } from "@/components/ui/Modal";
import { Stack } from "@/components/layout/Stack";
import { Cluster } from "@/components/layout/Cluster";
import { LinkButton } from "@/components/layout/LinkButton";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { MetaText } from "@/components/ui/MetaText";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { collectArtifacts, reviewRoster } from "@/lib/mock-data";
import { docPath } from "@/lib/csr-urls";

type WorkflowOverlaysProps = {
  overlay: string;
  docId: string;
  closeHref: string;
  quorumHref: string;
  launchHref: string;
  sectionId: string;
};

const rosterStatusTone = {
  stale: "warning",
  done: "success",
  in_progress: "info",
  opened: "neutral",
} as const;

export function WorkflowOverlays({
  overlay,
  docId,
  closeHref,
  quorumHref,
  launchHref,
  sectionId,
}: WorkflowOverlaysProps) {
  const router = useRouter();
  const dismiss = () => router.push(closeHref);

  if (!overlay) return null;

  const motionProps = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.2 },
  };

  if (overlay === "collect") {
    return (
      <Modal
        open
        size="md"
        title="Collect data package"
        description="Jordan Lee locked ADSL and TLFs on 2026-03-14."
        onClose={dismiss}
        footer={
          <Cluster gap="cozy" justify="end">
            <Link href={closeHref}>
              <Button variant="secondary" size="sm">
                Cancel
              </Button>
            </Link>
            <LinkButton href={docPath(docId, { tab: "workflow" })} variant="primary" size="sm">
              Accept package
            </LinkButton>
          </Cluster>
        }
      >
        <motion.div {...motionProps}>
          <Stack gap="cozy">
            <MetaText tone="faint" size="sm">
              Manifest · {collectArtifacts.length} artifacts
            </MetaText>
            <ul className="text-sm space-y-2 max-h-48 overflow-y-auto scroll-tame">
              {collectArtifacts.map((a) => (
                <li
                  key={a.name}
                  className="flex justify-between gap-2 py-1 border-b border-hairline last:border-0"
                >
                  <span className="text-ink">{a.name}</span>
                  <Cluster gap="tight">
                    <Badge tone={a.status === "locked" ? "success" : "info"}>{a.status}</Badge>
                    <MetaText tone="faintest" size="sm">
                      {a.size}
                    </MetaText>
                  </Cluster>
                </li>
              ))}
            </ul>
            <Link
              href={docPath(docId, { tab: "copilot", overlay: "sources" })}
              className="text-xs text-coral underline"
            >
              View all source artifacts →
            </Link>
          </Stack>
        </motion.div>
      </Modal>
    );
  }

  if (overlay === "collect-loading") {
    return (
      <Modal open size="sm" title="Checking package" onClose={dismiss}>
        <Stack gap="cozy">
          <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ repeat: Infinity, duration: 1.4 }}>
            <ProgressBar value={72} />
          </motion.div>
          <MetaText tone="faint" size="sm">
            Peer is verifying manifest against lock id…
          </MetaText>
        </Stack>
      </Modal>
    );
  }

  if (overlay === "launch-review") {
    return (
      <Modal
        open
        size="md"
        title="Launch review round"
        onClose={dismiss}
        footer={
          <Cluster gap="cozy" justify="end">
            <Link href={closeHref}>
              <Button variant="secondary" size="sm">
                Cancel
              </Button>
            </Link>
            <LinkButton href={quorumHref} variant="primary" size="sm">
              Open round
            </LinkButton>
          </Cluster>
        }
      >
        <Stack gap="cozy">
          <MetaText tone="ink" size="sm">
            Pin v4 for reviewers. Working v5 stays with you.
          </MetaText>
          <MetaText tone="faint" size="sm">
            Reviewers: Elena, Jordan, Sam, Maya, James, Priya, Alex · Due 2026-06-01
          </MetaText>
          <Card variant="soft" padding="sm">
            <MetaLabel tone="muted" className="block mb-1">
              Sections in scope
            </MetaLabel>
            <MetaText tone="default" size="sm">
              SEC 9 through 11.2 · Pinned v4 · Export v4.2 excluded until reimport
            </MetaText>
          </Card>
          <Link
            href={docPath(docId, { tab: "comments", filter: "open" })}
            className="text-xs text-coral underline"
          >
            Preview open comments before launch →
          </Link>
        </Stack>
      </Modal>
    );
  }

  if (overlay === "launch-review-blocked") {
    return (
      <Modal
        open
        size="md"
        title="Cannot launch review"
        onClose={dismiss}
        footer={<LinkButton href={closeHref} variant="secondary" size="sm">Close</LinkButton>}
      >
        <Alert
          tone="warning"
          body="Outstanding Word export v4.2 must be reconciled or reimported first."
        />
        <LinkButton
          href={`/documents/${docId}/reimport`}
          variant="primary"
          size="sm"
          className="mt-3"
        >
          Go to reimport
        </LinkButton>
      </Modal>
    );
  }

  if (overlay === "quorum" || overlay === "quorum-stale") {
    return (
      <Modal
        open
        size="lg"
        title="Review quorum"
        onClose={dismiss}
        footer={
          <Cluster gap="cozy" justify="end">
            <LinkButton
              href={docPath(docId, { tab: "comments", filter: "open" })}
              variant="secondary"
              size="sm"
            >
              Nudge stale
            </LinkButton>
            <LinkButton href={closeHref} variant="primary" size="sm">
              Close round
            </LinkButton>
          </Cluster>
        }
      >
        <Stack gap="cozy">
          {(overlay === "quorum-stale" || overlay === "quorum") && (
            <Alert tone="warning" compact body="Elena Vasquez opened v3 export, not pinned v4." />
          )}
          <Cluster gap="cozy">
            <Card variant="soft" padding="sm">
              <p className="text-ink font-semibold text-lg text-center">4/7</p>
              <MetaText tone="default" className="text-center block">
                responded on v4
              </MetaText>
            </Card>
            <Card variant="soft" padding="sm">
              <p className="text-ink font-semibold text-lg text-center">v4</p>
              <MetaText tone="default" className="text-center block">
                pinned for review
              </MetaText>
            </Card>
          </Cluster>
          <MetaLabel tone="muted">Reviewer roster</MetaLabel>
          <ul className="space-y-2 max-h-56 overflow-y-auto scroll-tame">
            {reviewRoster.map((r, i) => (
              <motion.li
                key={r.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center justify-between gap-2 py-2 border-b border-hairline"
              >
                <div>
                  <MetaText tone="ink" size="sm" className="font-medium block">
                    {r.name}
                  </MetaText>
                  <MetaText tone="faint" size="sm">
                    {r.role} · {r.version}
                  </MetaText>
                </div>
                <Badge tone={rosterStatusTone[r.status] ?? "neutral"}>
                  {r.responded ? "responded" : r.status}
                </Badge>
              </motion.li>
            ))}
          </ul>
          <Link
            href={docPath(docId, { tab: "workflow", panel: "quorum", section: sectionId })}
            className="text-xs text-muted underline"
          >
            Open in workflow rail →
          </Link>
        </Stack>
      </Modal>
    );
  }

  if (overlay === "qc-gate") {
    return (
      <Modal
        open
        size="md"
        title="Request QC"
        onClose={dismiss}
        footer={
          <Cluster gap="cozy" justify="end">
            <LinkButton href={docPath(docId, { tab: "qc" })} variant="secondary" size="sm">
              View QC tab
            </LinkButton>
            <LinkButton href={closeHref} variant="primary" size="sm">
              Send to Sam
            </LinkButton>
          </Cluster>
        }
      >
        <Stack gap="cozy">
          <MetaText tone="faint" size="sm">
            QC will run on pinned v4. Working v5 remains editable.
          </MetaText>
          <ul className="text-sm text-muted space-y-1">
            <li>Trace gate: 2 warnings in SEC 11.2</li>
            <li>Abbreviation scan: 3 failures</li>
            <li>Version alignment: v4.2 export outstanding</li>
          </ul>
        </Stack>
      </Modal>
    );
  }

  if (overlay === "signoff") {
    return (
      <Modal
        open
        size="md"
        title="Director sign-off"
        onClose={dismiss}
        footer={
          <Cluster gap="cozy" justify="end">
            <LinkButton href={docPath(docId, { tab: "workflow" })} variant="secondary" size="sm">
              Preview workflow
            </LinkButton>
            <LinkButton href={closeHref} variant="primary" size="sm">
              Request sign-off
            </LinkButton>
          </Cluster>
        }
      >
        <Stack gap="cozy">
          <MetaText tone="faint" size="sm">
            James Okonkwo signs explicit version id after QC pass.
          </MetaText>
          <Card variant="soft" padding="sm">
            <MetaText tone="ink" size="sm">
              Staged preview on v4 · blocked while v4.2 Word export is outstanding
            </MetaText>
          </Card>
          <Link href="/review/director-preview-abc23" className="text-xs text-coral underline">
            Open director read-only view →
          </Link>
        </Stack>
      </Modal>
    );
  }

  if (overlay === "signoff-blocked") {
    return (
      <Modal
        open
        size="md"
        title="Sign-off blocked"
        onClose={dismiss}
        footer={<LinkButton href={launchHref} variant="secondary" size="sm">View workflow</LinkButton>}
      >
        <Alert tone="danger" body="QC stamp applies to v4; working v5 has unpublished edits." />
        <LinkButton
          href={`/documents/${docId}/reimport`}
          variant="primary"
          size="sm"
          className="mt-3"
        >
          Reconcile export
        </LinkButton>
      </Modal>
    );
  }

  return null;
}
