"use client"

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Project } from "@/data/content";

interface ReadmeModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ReadmeModal: React.FC<ReadmeModalProps> = ({ project, onClose }) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    // Focus the close button on open
    closeRef.current?.focus();

    // Lock body scroll
    document.body.style.overflow = "hidden";

    // Escape key handler
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
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
            aria-label={`${project.title} README`}
            className="fixed z-50 bg-terminal-bg border border-terminal-border rounded-sm overflow-y-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-2xl max-h-[80vh]"
            initial={{ opacity: 0, scale: 0.9, y: "-50%", x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
            exit={{ opacity: 0, scale: 0.9, y: "-50%", x: "-50%" }}
            transition={{ duration: 0.15 }}
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-terminal-border bg-terminal-bg-light sticky top-0">
              <span className="text-terminal-dim text-xs">cat ~/{project.dir}/README.md</span>
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Close"
                className="text-terminal-dim hover:text-terminal-green transition-colors text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <div className="p-4 md:p-6 text-sm md:text-base space-y-4">
              <div className="text-terminal-green font-bold text-lg md:text-xl">
                # {project.title}
              </div>

              <div className="text-terminal-dim leading-relaxed">
                {project.description}
              </div>

              <div>
                <div className="text-terminal-green font-bold text-sm mb-2">## Technologies</div>
                <div className="flex flex-wrap gap-2">
                  {project.badges.map((badge, i) => (
                    <span
                      key={i}
                      className="text-xs border border-terminal-amber/30 bg-terminal-amber/5 text-terminal-amber px-2 py-0.5 rounded-sm"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {project.url && (
                <div>
                  <div className="text-terminal-green font-bold text-sm mb-2">## Source</div>
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terminal-cyan hover:underline text-sm"
                  >
                    {project.url.replace("https://", "")}
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
