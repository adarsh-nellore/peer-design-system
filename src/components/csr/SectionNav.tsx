"use client";

import Link from "next/link";
import clsx from "clsx";
import { motion } from "framer-motion";
import { tocSectionsExpanded } from "@/lib/mock-data";
import { docPath } from "@/lib/csr-urls";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { Dot } from "@/components/ui/Dot";
import { Badge } from "@/components/ui/Badge";
import { Stack } from "@/components/layout/Stack";

type SectionNavProps = {
  docId: string;
  activeSectionId: string;
  tab: string;
};

export function SectionNav({ docId, activeSectionId, tab }: SectionNavProps) {
  return (
    <nav className="h-full overflow-y-auto scroll-tame">
      <motion.div
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="px-3 py-2"
      >
        <MetaLabel tone="muted">Contents</MetaLabel>
      </motion.div>
      <Stack gap="tight" as="ul" className="px-2 pb-4">
        {tocSectionsExpanded.map((s, i) => {
          const isActive = s.id === activeSectionId;
          const indent = s.parent ? "pl-4" : "";
          return (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.22 }}
            >
              <Link
                href={docPath(docId, { tab, section: s.id })}
                className={clsx(
                  "w-full text-left rounded-md px-2 py-1.5 text-sm flex items-center justify-between gap-1 transition-colors",
                  indent,
                  isActive
                    ? "bg-paper border border-hairline-strong font-medium text-ink shadow-sm"
                    : "text-muted hover:bg-paper/80 hover:text-ink"
                )}
              >
                <span className="truncate">{s.label}</span>
                <span className="flex items-center gap-1 shrink-0">
                  {s.driftCount > 0 && (
                    <Badge tone="warning" className="!text-[10px] !px-1">
                      {s.driftCount}
                    </Badge>
                  )}
                  {s.commentCount > 0 && (
                    <span className="text-[10px] text-faint tabular-nums">{s.commentCount}</span>
                  )}
                  {isActive && <Dot color="gold" size="sm" />}
                </span>
              </Link>
            </motion.li>
          );
        })}
      </Stack>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mx-3 mb-4 p-2 rounded-md border border-hairline bg-soft"
      >
        <Link
          href={docPath(docId, { tab, overlay: "sources" })}
          className="text-xs text-coral font-medium hover:underline"
        >
          Source artifacts (7 locked) →
        </Link>
      </motion.div>
    </nav>
  );
}
