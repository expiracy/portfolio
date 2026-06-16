"use client"

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { TerminalPage } from "@/components/terminal-page";
import { staggerContainer, fadeIn, REVEAL_STAGGER, TIMELINE_CADENCE } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface TimelineListProps<T> {
  command: string;
  items: T[];
  getKey: (item: T) => string;
  filterFn: (item: T, query: string) => boolean;
  renderEntry: (item: T, index: number) => React.ReactNode;
  renderItem?: (item: T, onClick: () => void) => React.ReactNode;
  renderModal: (item: T | null, onClose: () => void) => React.ReactNode;
  renderFooter: (filtered: number, total: number) => React.ReactNode;
}

// Timeline rows fire on the cadence beat; the denser project-card list keeps a
// tighter fade-stagger (it has no branch line to draw).
const timelineContainer = staggerContainer(TIMELINE_CADENCE);
const cardContainer = staggerContainer(REVEAL_STAGGER / 2);

// Projects (card list) keep their rise-fade (duration inherited from REVEAL_DURATION).
const itemVariants = fadeIn({ y: 8 });

// Git-log timeline — the graph draws itself as one continuous line. The row's
// elements all fire on the same beat (the container stagger spaces beats by
// TIMELINE_CADENCE): the commit dot springs in, a glow ripples out, and the
// branch line below it draws downward over exactly one beat — so it reaches the
// next commit just as that dot lights. Text fades as its own layer to keep the
// line solid while it draws. All collapse to their resting state under
// prefers-reduced-motion.
const rowVariants: Variants = { hidden: {}, visible: {} };

const contentVariants = fadeIn({ duration: 0.45 });

const dotVariants: Variants = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { type: "spring", stiffness: 340, damping: 22 } },
};

const haloVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: [0, 0.6, 0],
    scale: [0.6, 1.8, 1.8],
    transition: { duration: 0.55, times: [0, 0.45, 1] },
  },
};

const lineVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: TIMELINE_CADENCE, ease: "easeOut" } },
};

export function TimelineList<T>({ command, items, getKey, filterFn, renderEntry, renderItem, renderModal, renderFooter }: TimelineListProps<T>) {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const selectedItem = selectedKey !== null ? items.find((item) => getKey(item) === selectedKey) ?? null : null;
  const reduceMotion = useReducedMotion();

  const dotRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const setDotRef = useCallback((index: number, el: HTMLDivElement | null) => {
    if (el) dotRefs.current.set(index, el);
    else dotRefs.current.delete(index);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const mouseY = e.clientY;
      let closest = -1;
      let minDist = Infinity;
      dotRefs.current.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height / 2 - mouseY);
        if (dist < minDist) {
          minDist = dist;
          closest = idx;
        }
      });
      setActiveIndex(closest >= 0 ? closest : null);
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setActiveIndex(null);
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const filterItems = (search: string) => {
    const q = search.toLowerCase();
    return items.filter((item) => !q || filterFn(item, q));
  };

  return (
    <TerminalPage
      command={command}
      footer={(search) => {
        const filtered = filterItems(search);
        return renderFooter(filtered.length, items.length);
      }}
    >
      {(search) => {
        const filtered = filterItems(search);

        return (
          <>
            <motion.div
              className={cn("w-full t-body", renderItem ? "space-y-2" : "pl-3 pt-3")}
              ref={containerRef}
              onMouseMove={!renderItem ? handleMouseMove : undefined}
              onMouseLeave={!renderItem ? handleMouseLeave : undefined}
              variants={renderItem ? cardContainer : timelineContainer}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
            >
              {filtered.map((item, index) => {
                const key = getKey(item);

                if (renderItem) {
                  return (
                    <motion.div key={key} variants={itemVariants}>
                      {renderItem(item, () => setSelectedKey(key))}
                    </motion.div>
                  );
                }

                const isLast = index === filtered.length - 1;
                const isActive = activeIndex === index;
                return (
                  <motion.button
                    key={key}
                    variants={rowVariants}
                    onClick={() => setSelectedKey(key)}
                    className="flex w-full text-left group cursor-pointer"
                  >
                    <div className="flex flex-col items-center mr-4 shrink-0 overflow-visible">
                      <div className="relative mt-1">
                        {!reduceMotion && (
                          <motion.span
                            aria-hidden
                            variants={haloVariants}
                            className="absolute inset-0 rounded-full bg-terminal-green"
                          />
                        )}
                        <motion.div variants={dotVariants} className="relative w-3 h-3">
                          <div
                            ref={(el) => setDotRef(index, el)}
                            className={cn(
                              "w-3 h-3 rounded-full bg-terminal-green border-2 transition-all duration-200",
                              isActive
                                ? "border-terminal-green scale-[1.3] shadow-glow"
                                : "border-terminal-dim group-hover:border-terminal-green",
                            )}
                          />
                        </motion.div>
                      </div>
                      {!isLast && (
                        <motion.div
                          variants={lineVariants}
                          className={cn(
                            "w-0.5 flex-1 origin-top transition-colors duration-200",
                            isActive ? "bg-terminal-green" : "bg-terminal-dim",
                          )}
                        />
                      )}
                    </div>

                    <motion.div variants={contentVariants} className="pb-6 flex-1 min-w-0">
                      <div className={cn(
                        "transition-opacity duration-200",
                        isActive ? "opacity-100" : activeIndex !== null ? "opacity-60" : "",
                      )}>
                        {renderEntry(item, index)}
                      </div>
                    </motion.div>
                  </motion.button>
                );
              })}
            </motion.div>

            {renderModal(selectedItem, () => setSelectedKey(null))}
          </>
        );
      }}
    </TerminalPage>
  );
}
