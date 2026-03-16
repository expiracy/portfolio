"use client"

import React from "react";
import Link from "next/link";
import { TerminalPage } from "@/components/terminal-page";
import { PROFILE_FIELDS, BIO_TEXT, ASCII_JAMES, ASCII_GRAY } from "@/data/content";

export const AboutMePage: React.FC = () => {
  return (
    <TerminalPage command="neofetch">
      {(search) => {
        const q = search.toLowerCase();
        const filtered = PROFILE_FIELDS.filter(
          (f) =>
            !q ||
            f.key.toLowerCase().includes(q) ||
            f.value.toLowerCase().includes(q)
        );

        return (
          <div className="flex flex-col lg:flex-row gap-6 w-full h-full items-center">
            <div className="shrink-0 overflow-x-auto max-w-[50%] lg:max-w-none">
              <pre className="text-terminal-green text-glow text-[0.35rem] sm:text-[0.5rem] lg:text-xs leading-tight whitespace-pre">
                {ASCII_JAMES}
              </pre>
              <pre className="text-terminal-cyan text-glow text-[0.35rem] sm:text-[0.5rem] lg:text-xs leading-tight whitespace-pre mt-1">
                {ASCII_GRAY}
              </pre>
            </div>

            <div className="text-xs md:text-sm space-y-1 min-w-0">
              <div className="mb-2">
                <span className="text-terminal-cyan font-bold">james</span>
                <span className="text-terminal-dim">@</span>
                <span className="text-terminal-cyan font-bold">portfolio</span>
              </div>
              <div className="border-b border-terminal-border mb-2 w-full"></div>

              {filtered.map((field, i) => (
                <div key={i} className="flex flex-wrap gap-1">
                  <span className="text-terminal-amber font-bold">{field.key}:</span>
                  {field.url ? (
                    <Link
                      href={field.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-terminal-cyan hover:underline"
                    >
                      {field.value}
                    </Link>
                  ) : (
                    <span className="text-terminal-dim">{field.value}</span>
                  )}
                </div>
              ))}

              <div className="border-b border-terminal-border my-2 w-full"></div>
              <div className="text-terminal-dim leading-relaxed">
                {BIO_TEXT}
              </div>

              <div className="flex gap-0.5 mt-3" aria-hidden="true">
                {["bg-terminal-red", "bg-terminal-green", "bg-terminal-amber", "bg-terminal-cyan", "bg-terminal-dim", "bg-terminal-border", "bg-terminal-bg-light", "bg-terminal-bg"].map((color, i) => (
                  <div key={i} className={`w-4 h-4 md:w-5 md:h-5 ${color}`}></div>
                ))}
              </div>
            </div>
          </div>
        );
      }}
    </TerminalPage>
  );
};
