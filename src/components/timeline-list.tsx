"use client"

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TerminalPage } from "@/components/terminal-page";

interface TimelineListProps<T> {
  command: string;
  items: T[];
  getKey: (item: T) => string;
  filterFn: (item: T, query: string) => boolean;
  renderEntry: (item: T) => React.ReactNode;
  renderItem?: (item: T, onClick: () => void) => React.ReactNode;
  renderModal: (item: T | null, onClose: () => void) => React.ReactNode;
  renderFooter: (filtered: number, total: number) => React.ReactNode;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
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
              className={`w-full text-xs md:text-sm ${renderItem ? "space-y-2" : "pl-3 pt-3"}`}
              ref={containerRef}
              onMouseMove={!renderItem ? handleMouseMove : undefined}
              onMouseLeave={!renderItem ? handleMouseLeave : undefined}
              variants={containerVariants}
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
                    variants={itemVariants}
                    onClick={() => setSelectedKey(key)}
                    className="flex w-full text-left group cursor-pointer"
                  >
                    <div className="flex flex-col items-center mr-4 shrink-0 overflow-visible">
                      <div
                        ref={(el) => setDotRef(index, el)}
                        className={`w-3 h-3 rounded-full bg-terminal-green border-2 mt-1 transition-all duration-200 ${
                          isActive
                            ? "border-terminal-green scale-[1.3] shadow-glow"
                            : "border-terminal-dim group-hover:border-terminal-green"
                        }`}
                      />
                      {!isLast && (
                        <div className={`w-0.5 flex-1 transition-colors duration-200 ${
                          isActive ? "bg-terminal-green" : "bg-terminal-dim"
                        }`} />
                      )}
                    </div>

                    <div className={`pb-6 flex-1 min-w-0 transition-opacity duration-200 ${
                      isActive ? "opacity-100" : activeIndex !== null ? "opacity-60" : ""
                    }`}>
                      {renderEntry(item)}
                    </div>
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
