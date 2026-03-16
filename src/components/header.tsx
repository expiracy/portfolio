"use client"

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FiMail, FiGithub, FiLinkedin } from "react-icons/fi";
import { useTheme, THEMES } from "@/components/theme-provider";

export const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-terminal-border bg-terminal-bg/90 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-2 text-sm">
        <div className="flex items-center gap-4">
          <span className="text-terminal-dim">james@portfolio</span>
          <span className="text-terminal-green">~</span>
        </div>
        <div className="flex items-center gap-3 text-terminal-dim">
          <Link href="mailto:jameslaigray@gmail.com" className="hover:text-terminal-green transition-colors" aria-label="Email">
            <FiMail className="w-4 h-4" />
          </Link>
          <Link href="https://www.linkedin.com/in/jameslaigray/" target="_blank" rel="noopener noreferrer" className="hover:text-terminal-green transition-colors" aria-label="LinkedIn">
            <FiLinkedin className="w-4 h-4" />
          </Link>
          <Link href="https://github.com/expiracy" target="_blank" rel="noopener noreferrer" className="hover:text-terminal-green transition-colors" aria-label="GitHub">
            <FiGithub className="w-4 h-4" />
          </Link>

          <div className="w-px h-4 bg-terminal-border mx-1" />

          <div ref={menuRef} className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="hover:text-terminal-green transition-colors text-xs font-mono"
              aria-label="Change theme"
            >
              [{theme}]
            </button>

            {open && (
              <div className="absolute right-0 top-full mt-2 border border-terminal-border bg-terminal-bg rounded-sm overflow-hidden min-w-[120px]">
                {THEMES.map((t) => (
                  <button
                    key={t}
                    onClick={() => { setTheme(t); setOpen(false); }}
                    className={`block w-full text-left px-3 py-1.5 text-xs font-mono transition-colors ${
                      t === theme
                        ? "text-terminal-green bg-terminal-bg-light"
                        : "text-terminal-dim hover:text-terminal-green hover:bg-terminal-bg-light"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
