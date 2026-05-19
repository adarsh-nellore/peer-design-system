"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import {
  WALKTHROUGH_STEPS,
  clearTourSession,
  readTourSession,
  resolveTourStepIndex,
  writeTourSession,
} from "@/lib/walkthrough-steps";
import { Card } from "@/components/ui/Card";
import { Stack } from "@/components/layout/Stack";
import { Cluster } from "@/components/layout/Cluster";
import { Button } from "@/components/ui/Button";
import { MetaText } from "@/components/ui/MetaText";
import { Heading } from "@/components/typography/Heading";

function currentPath(pathname: string, search: URLSearchParams) {
  const q = search.toString();
  return q ? `${pathname}?${q}` : pathname;
}

export function TourPanel() {
  const pathname = usePathname();
  const search = useSearchParams();
  const router = useRouter();
  const tab = search.get("tab");
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const onEditor = pathname.includes("/documents/");

  useEffect(() => {
    const session = readTourSession();
    if (session?.active) {
      setActive(true);
      setIndex(session.index);
    } else if (search.get("tour") === "1") {
      const start = resolveTourStepIndex(pathname, tab);
      setActive(true);
      setIndex(start);
      writeTourSession(true, start);
    }
    setHydrated(true);
  }, [pathname, tab, search]);

  useEffect(() => {
    if (!active) return;
    writeTourSession(true, index);
    document.querySelectorAll("[data-wt]").forEach((el) => el.classList.remove("walkthrough-spotlight"));
    const step = WALKTHROUGH_STEPS[index];
    if (step?.target) {
      const el = document.querySelector(`[data-wt="${step.target}"]`);
      el?.classList.add("walkthrough-spotlight");
      el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [active, index]);

  const step = WALKTHROUGH_STEPS[index];

  const endTour = () => {
    setActive(false);
    clearTourSession();
    document.querySelectorAll("[data-wt]").forEach((el) => el.classList.remove("walkthrough-spotlight"));
  };

  const go = (next: number) => {
    const clamped = Math.max(0, Math.min(WALKTHROUGH_STEPS.length - 1, next));
    setIndex(clamped);
    const href = WALKTHROUGH_STEPS[clamped].href;
    if (currentPath(pathname, search) !== href) {
      router.push(href);
    }
  };

  if (!hydrated) return null;

  if (!active) {
    return (
      <div
        className={clsx(
          "fixed right-4 z-[90]",
          onEditor ? "bottom-3 left-3 right-auto" : "bottom-4"
        )}
      >
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            const start = resolveTourStepIndex(pathname, tab);
            setActive(true);
            setIndex(start);
            writeTourSession(true, start);
          }}
        >
          Take the tour
        </Button>
      </div>
    );
  }

  return (
    <Card
      variant="elevated"
      padding="md"
      className={clsx(
        "fixed right-4 z-[90] w-[280px] walkthrough-card anim-fade-in",
        onEditor ? "bottom-3 left-3 right-auto" : "bottom-4",
        collapsed && "pb-2"
      )}
    >
      <Stack gap="cozy">
        <Cluster gap="cozy" justify="between" align="start">
          <Stack gap="tight" className="min-w-0">
            <MetaText tone="faint" size="sm">
              Step {index + 1} of {WALKTHROUGH_STEPS.length}
            </MetaText>
            <Heading size="h4">{step.title}</Heading>
          </Stack>
          <button
            type="button"
            className="text-faint text-xs shrink-0 p-1"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? "▾" : "▴"}
          </button>
        </Cluster>
        {!collapsed && (
          <>
            <MetaText tone="default" size="sm">{step.body}</MetaText>
            <Cluster gap="cozy" justify="between" align="center">
              <Button variant="ghost" size="sm" onClick={endTour}>
                Skip
              </Button>
              <Cluster gap="tight">
                <Button variant="secondary" size="sm" disabled={index === 0} onClick={() => go(index - 1)}>
                  Back
                </Button>
                {index < WALKTHROUGH_STEPS.length - 1 ? (
                  <Button variant="primary" size="sm" onClick={() => go(index + 1)}>
                    Next
                  </Button>
                ) : (
                  <Button variant="primary" size="sm" onClick={endTour}>
                    Done
                  </Button>
                )}
              </Cluster>
            </Cluster>
          </>
        )}
        {collapsed && (
          <Cluster gap="tight" justify="end">
            <Button variant="secondary" size="sm" disabled={index === 0} onClick={() => go(index - 1)}>
              Back
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => (index < WALKTHROUGH_STEPS.length - 1 ? go(index + 1) : endTour())}
            >
              Next
            </Button>
          </Cluster>
        )}
      </Stack>
    </Card>
  );
}
