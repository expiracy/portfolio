"use client"

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export interface DetailSection {
  heading: string;
  content: React.ReactNode;
}

interface DetailModalProps {
  open: boolean;
  onClose: () => void;
  command: string;
  title: string;
  subtitle?: string;
  meta?: string;
  sections: DetailSection[];
}

export const DetailModal: React.FC<DetailModalProps> = ({ open, onClose, command, title, subtitle, meta, sections }) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="fixed z-50 bg-terminal-bg border border-terminal-border rounded-sm overflow-y-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-2xl max-h-[80vh]"
            initial={{ opacity: 0, scale: 0.9, y: "-50%", x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
            exit={{ opacity: 0, scale: 0.9, y: "-50%", x: "-50%" }}
            transition={{ duration: 0.15 }}
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-terminal-border bg-terminal-bg-light sticky top-0 z-10">
              <span className="text-terminal-dim text-xs">{command}</span>
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Close"
                className="text-terminal-dim hover:text-terminal-green transition-colors text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <div className="p-4 md:p-6 space-y-4">
              <div>
                <h2 className="text-terminal-green font-bold text-sm md:text-base">{title}</h2>
                {subtitle && <div className="text-terminal-cyan text-xs md:text-sm mt-1">{subtitle}</div>}
                {meta && <div className="text-terminal-amber text-xs md:text-sm mt-1">{meta}</div>}
              </div>

              {sections.map((section, i) => (
                <div key={i}>
                  <h3 className="text-terminal-green font-bold text-xs md:text-sm mb-2">{section.heading}</h3>
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
    <ul className="space-y-1.5 text-terminal-dim text-xs md:text-sm">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span className="text-terminal-green shrink-0 mt-0.5">-</span>
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function BadgeList({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((badge, i) => (
        <span
          key={i}
          className="text-[10px] md:text-xs border border-terminal-border text-terminal-amber px-1.5 py-0.5 rounded-sm"
        >
          {badge}
        </span>
      ))}
    </div>
  );
}

export function SourceLink({ url }: { url: string }) {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-terminal-cyan hover:underline text-xs md:text-sm"
    >
      {url.replace("https://", "")}
    </Link>
  );
}
