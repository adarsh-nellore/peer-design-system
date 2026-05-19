"use client";

import { Suspense } from "react";
import { TourPanel } from "@/components/walkthrough/TourPanel";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <TourPanel />
      </Suspense>
    </>
  );
}
