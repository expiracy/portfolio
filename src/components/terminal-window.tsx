"use client"

import React from "react";
import { FiX } from "react-icons/fi";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TerminalWindowBarProps {
  title: string;
  /** Muted suffix after an em dash, e.g. "james_gray — socials". */
  subtitle?: string;
  onClose: () => void;
  closeLabel?: string;
  closeRef?: React.Ref<HTMLButtonElement>;
}

/** Title bar shared by the floating detail modal and the inline window below. */
export function TerminalWindowBar({
  title,
  subtitle,
  onClose,
  closeLabel = "Close",
  closeRef,
}: TerminalWindowBarProps) {
  return (
    <div className="sticky top-0 z-10 flex items-baseline gap-2 border-b border-terminal-border bg-terminal-bg-light px-4 py-2 sm:px-5 md:px-6">
      <span className="text-sm font-bold text-terminal-green md:text-base">{title}</span>
      {subtitle && <span className="t-micro text-terminal-dim">— {subtitle}</span>}
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        className="ml-auto shrink-0 self-center text-terminal-dim transition-colors hover:text-terminal-green"
      >
        <FiX className="h-4 w-4" />
      </button>
    </div>
  );
}

// Damped left-right shake: the window shrugs off a ✕ that has nothing to close.
const WIGGLE = { x: [0, -6, 6, -5, 5, -3, 3, 0] };

interface TerminalWindowProps {
  title: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * The detail modal's frame without the modal — same chrome, sits inline in the
 * page. Its ✕ is honest window dressing: it stays clickable, but wiggles rather
 * than pretending there is something to dismiss.
 */
export function TerminalWindow({ title, subtitle, className, children }: TerminalWindowProps) {
  const controls = useAnimationControls();
  const reduceMotion = useReducedMotion();

  const shrug = () => {
    if (reduceMotion) return;
    controls.start({ ...WIGGLE, transition: { duration: 0.4, ease: "easeInOut" } });
  };

  // Two elements on purpose: the caller's entrance animation (`fade-rise`) is a
  // CSS animation with `animation-fill-mode: forwards`, which outranks inline
  // styles — on one element it would permanently pin the transform and swallow
  // the shake. The outer div owns the entrance, the inner one owns the wiggle.
  return (
    <div className={className}>
      <motion.div
        animate={controls}
        className="overflow-hidden rounded-sm border border-terminal-border bg-terminal-bg"
      >
        <TerminalWindowBar
          title={title}
          subtitle={subtitle}
          onClose={shrug}
          closeLabel="This window stays put"
        />
        {children}
      </motion.div>
    </div>
  );
}
