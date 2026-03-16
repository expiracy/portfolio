"use client"

import React, { useState } from "react";

interface TerminalPageProps {
  command: string;
  footer?: React.ReactNode | ((search: string) => React.ReactNode);
  children: (search: string) => React.ReactNode;
}

export const TerminalPage: React.FC<TerminalPageProps> = ({ command, footer, children }) => {
  const [search, setSearch] = useState("");

  const footerContent = typeof footer === "function" ? footer(search) : footer;

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0 text-terminal-green text-xs md:text-sm mb-4">
        $ {command}
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        {children(search)}
      </div>

      <div className="shrink-0 border-t border-terminal-border mt-2 pt-2">
        {footerContent && (
          <div className="text-terminal-dim text-xs md:text-sm mb-1">
            {footerContent}
          </div>
        )}
        <div className="flex items-center gap-1 mt-1">
          <span className="text-terminal-green shrink-0">$</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="filter this page..."
            aria-label="Filter results"
            className="flex-1 bg-transparent text-terminal-green text-sm outline-none placeholder:text-terminal-dim/50 caret-terminal-green"
          />
        </div>
      </div>
    </div>
  );
};
