"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";
import type { DriftMarker } from "@/lib/types";
import { MetaText } from "@/components/ui/MetaText";

type DriftInlineMarkerProps = {
  marker: DriftMarker;
  docId: string;
  href: string;
};

export function DriftInlineMarker({ marker, docId, href }: DriftInlineMarkerProps) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline">
      <button
        type="button"
        className={cn(
          "inline border-b-2 border-dotted border-gold bg-gold-soft/40 px-0.5 rounded-sm",
          "text-ink cursor-pointer hover:bg-gold-soft transition-colors"
        )}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        aria-describedby={`drift-tip-${marker.id}`}
      >
        {marker.anchorText}
      </button>
      {open && (
        <span
          id={`drift-tip-${marker.id}`}
          role="tooltip"
          className="absolute left-0 top-full z-20 mt-1 w-56 rounded-md border border-hairline-strong bg-paper p-2 shadow-pop anim-fade-in"
        >
          <MetaText tone="ink" size="sm" className="block font-medium mb-1">
            Version drift
          </MetaText>
          <MetaText tone="faint" size="sm" className="block mb-2">
            {marker.summary}
          </MetaText>
          <Link href={href} className="text-coral text-xs font-medium underline">
            Open in workflow →
          </Link>
        </span>
      )}
    </span>
  );
}
