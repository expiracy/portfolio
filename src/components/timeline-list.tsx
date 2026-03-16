"use client"

import React, { useState } from "react";
import { TerminalPage } from "@/components/terminal-page";

interface TimelineListProps<T> {
  command: string;
  items: T[];
  getKey: (item: T) => string;
  filterFn: (item: T, query: string) => boolean;
  renderEntry: (item: T) => React.ReactNode;
  renderModal: (item: T | null, onClose: () => void) => React.ReactNode;
  renderFooter: (filtered: number, total: number) => React.ReactNode;
}

export function TimelineList<T>({ command, items, getKey, filterFn, renderEntry, renderModal, renderFooter }: TimelineListProps<T>) {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const selectedItem = selectedKey !== null ? items.find((item) => getKey(item) === selectedKey) ?? null : null;

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
            <div className="w-full text-xs md:text-sm">
              {filtered.map((item, index) => {
                const isLast = index === filtered.length - 1;

                return (
                  <button
                    key={getKey(item)}
                    onClick={() => setSelectedKey(getKey(item))}
                    className="flex w-full text-left group cursor-pointer"
                  >
                    <div className="flex flex-col items-center mr-4 shrink-0">
                      <div className="w-3 h-3 rounded-full bg-terminal-green border-2 border-terminal-dim mt-1 group-hover:border-terminal-green transition-colors"></div>
                      {!isLast && <div className="w-0.5 flex-1 bg-terminal-dim"></div>}
                    </div>

                    <div className="pb-6 flex-1 min-w-0">
                      {renderEntry(item)}
                    </div>
                  </button>
                );
              })}
            </div>

            {renderModal(selectedItem, () => setSelectedKey(null))}
          </>
        );
      }}
    </TerminalPage>
  );
}
