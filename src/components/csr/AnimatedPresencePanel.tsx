"use client";

import { AnimatePresence, motion } from "framer-motion";
import { fadeIn, slideUp } from "@/lib/motion";

type AnimatedPresencePanelProps = {
  panelKey: string;
  children: React.ReactNode;
  variant?: "fade" | "slide";
};

export function AnimatedPresencePanel({
  panelKey,
  children,
  variant = "slide",
}: AnimatedPresencePanelProps) {
  const motionProps = variant === "fade" ? fadeIn : slideUp;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={panelKey}
        initial={motionProps.initial}
        animate={motionProps.animate}
        exit={motionProps.exit}
        transition={motionProps.transition}
        className="h-full min-h-0 flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
