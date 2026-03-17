"use client"

import React, { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

function useTypewriter(text: string, speed = 30) {
  const [length, setLength] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (prefersReduced.current) {
      setLength(text.length);
      setShowCursor(false);
      return;
    }

    setLength(0);
    setShowCursor(true);

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setLength(i);
      if (i >= text.length) {
        clearInterval(interval);
        setTimeout(() => setShowCursor(false), 1500);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayed: text.slice(0, length), showCursor, done: length >= text.length };
}

interface TerminalPageProps {
  command: string;
  footer?: React.ReactNode | ((search: string) => React.ReactNode);
  showSearch?: boolean;
  onCommandDone?: () => void;
  children: (search: string) => React.ReactNode;
}

function TypewriterCommand({ command, onDone }: { command: string; onDone?: () => void }) {
  const { displayed, showCursor, done } = useTypewriter(command);
  const firedRef = useRef(false);

  useEffect(() => {
    if (done && onDone && !firedRef.current) {
      firedRef.current = true;
      onDone();
    }
  }, [done, onDone]);

  return (
    <>
      {displayed}
      {showCursor && <span className="animate-blink">_</span>}
    </>
  );
}

export const TerminalPage: React.FC<TerminalPageProps> = ({ command, footer, showSearch = true, onCommandDone, children }) => {
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const footerContent = typeof footer === "function" ? footer(search) : footer;
  const expanded = focused || search.length > 0;

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0 flex items-center justify-between gap-2 mb-4">
        <div className="text-terminal-green text-xs md:text-sm min-w-0 truncate">
          $ <TypewriterCommand command={command} onDone={onCommandDone} />
        </div>
        {showSearch && (
          <div
            onClick={() => inputRef.current?.focus()}
            className={`flex items-center gap-1.5 border border-terminal-border rounded-sm px-2 py-1 bg-terminal-bg shrink-0 cursor-text transition-all ${
              expanded ? "w-48 md:w-56" : "w-8 md:w-48"
            }`}
          >
            <FiSearch className="w-3 h-3 text-terminal-dim shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="search..."
              aria-label="Filter results"
              className={`bg-transparent text-terminal-green text-xs md:text-sm outline-none placeholder:text-terminal-dim/50 caret-terminal-green min-w-0 w-full ${
                expanded ? "opacity-100" : "opacity-0 w-0 md:opacity-100 md:w-full"
              }`}
            />
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 pr-2">
        {children(search)}
      </div>

      {footerContent && (
        <div className="shrink-0 border-t border-terminal-border mt-2 pt-2">
          <div className="text-terminal-dim text-xs md:text-sm">
            {footerContent}
          </div>
        </div>
      )}
    </div>
  );
};
