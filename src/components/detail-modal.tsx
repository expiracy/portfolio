"use client"

import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TerminalWindowBar } from "@/components/terminal-window";
import { KwText } from "@/lib/kw";
import { Tag } from "@/data/content";

export interface DetailSection {
  heading: string;
  content: React.ReactNode;
}

interface DetailModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  meta?: string;
  sections: DetailSection[];
}

export const DetailModal: React.FC<DetailModalProps> = ({ open, onClose, title, subtitle, meta, sections }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      // Return focus to whatever opened the modal (WAI-ARIA dialog pattern).
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="fixed z-[60] bg-terminal-bg border border-terminal-border rounded-sm overflow-y-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-2xl max-h-[80vh]"
            initial={{ opacity: 0, scale: 0.9, y: "-50%", x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
            exit={{ opacity: 0, scale: 0.9, y: "-50%", x: "-50%" }}
            transition={{ duration: 0.15 }}
          >
            <TerminalWindowBar title={title} onClose={onClose} closeRef={closeRef} />

            <div className="p-4 md:p-6 space-y-4">
              {(subtitle || meta) && (
                <div>
                  {subtitle && <div className="text-terminal-cyan t-body"><KwText text={subtitle} /></div>}
                  {meta && <div className="text-terminal-amber t-body mt-1">{meta}</div>}
                </div>
              )}

              {sections.map((section) => (
                <div key={section.heading}>
                  <h3 className="text-terminal-green font-bold t-body mb-2">{section.heading}</h3>
                  {section.content}
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export function BulletList({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="space-y-1.5 text-terminal-dim t-body">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span className="text-terminal-green shrink-0 mt-0.5">-</span>
          <span className="leading-relaxed"><KwText text={item} /></span>
        </li>
      ))}
    </ul>
  );
}

export function BadgeList({ items }: { items: Tag[] }) {
  const visible = items.filter((t) => t.visible !== false);
  if (visible.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {visible.map((tag, i) => (
        <span
          key={i}
          className="t-micro border border-terminal-border text-terminal-amber px-1.5 py-0.5 rounded-sm"
        >
          {tag.label}
        </span>
      ))}
    </div>
  );
}
