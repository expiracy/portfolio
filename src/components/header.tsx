"use client"

import * as React from "react"
import Link from "next/link"
import {FaGithub, FaLinkedin} from "react-icons/fa";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-terminal-border bg-terminal-bg/90 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-2 text-sm">
        <div className="flex items-center gap-4">
          <span className="text-terminal-dim">james@portfolio</span>
          <span className="text-terminal-green">~</span>
          <div className="flex items-center gap-3 ml-4">
            <Link
              href="https://www.linkedin.com/in/jameslaigray/"
              target="_blank"
              className="text-terminal-dim hover:text-terminal-cyan transition-colors flex items-center gap-1"
            >
              <FaLinkedin size="1.1em"/>
              <span className="hidden sm:inline">linkedin</span>
            </Link>
            <Link
              href="https://github.com/expiracy"
              target="_blank"
              className="text-terminal-dim hover:text-terminal-cyan transition-colors flex items-center gap-1"
            >
              <FaGithub size="1.1em"/>
              <span className="hidden sm:inline">github</span>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2 text-terminal-dim">
          <span className="hidden sm:inline text-terminal-amber">[PID 1337]</span>
          <span className="w-2 h-4 bg-terminal-green animate-blink"></span>
        </div>
      </div>
    </header>
  )
}
