import React from "react";
import Link from "next/link";
import { TerminalWindow } from "@/components/terminal-window";
import { TerminalCursor } from "@/components/terminal-cursor";
import { PROFILE_FIELDS, BIO_TEXT, ASCII_JAMES, ASCII_GRAY } from "@/data/content";

export const AboutMePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <TerminalWindow title="neofetch — bash">
        <div className="text-terminal-green mb-4 text-sm md:text-base">
          $ neofetch
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="shrink-0 overflow-x-auto">
            <pre className="text-terminal-green text-glow text-[0.35rem] sm:text-[0.5rem] md:text-xs leading-tight whitespace-pre">
              {ASCII_JAMES}
            </pre>
            <pre className="text-terminal-cyan text-glow text-[0.35rem] sm:text-[0.5rem] md:text-xs leading-tight whitespace-pre mt-1">
              {ASCII_GRAY}
            </pre>
          </div>

          <div className="text-sm space-y-1 min-w-0">
            <div className="mb-2">
              <span className="text-terminal-cyan font-bold">james</span>
              <span className="text-terminal-dim">@</span>
              <span className="text-terminal-cyan font-bold">portfolio</span>
            </div>
            <div className="border-b border-terminal-border mb-2 w-full"></div>

            {PROFILE_FIELDS.map((field, i) => (
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
              {["bg-red-500", "bg-green-500", "bg-yellow-500", "bg-blue-500", "bg-purple-500", "bg-cyan-500", "bg-white", "bg-gray-500"].map((color, i) => (
                <div key={i} className={`w-4 h-4 md:w-5 md:h-5 ${color}`}></div>
              ))}
            </div>
          </div>
        </div>

        <TerminalCursor />
      </TerminalWindow>
    </div>
  );
};
