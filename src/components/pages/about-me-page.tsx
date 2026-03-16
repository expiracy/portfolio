"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { TerminalWindow } from "@/components/terminal-window";
import { TerminalCursor } from "@/components/terminal-cursor";

const ASCII_ART = `
     _                              ____
    | | __ _ _ __ ___   ___  ___   / ___|_ __ __ _ _   _
 _  | |/ _\` | '_ \` _ \\ / _ \\/ __| | |  _| '__/ _\` | | | |
| |_| | (_| | | | | | |  __/\\__ \\ | |_| | | | (_| | |_| |
 \\___/ \\__,_|_| |_| |_|\\___||___/  \\____|_|  \\__,_|\\__, |
                                                    |___/`;

interface ProfileField {
  key: string;
  value: string;
  url?: string;
}

const PROFILE_FIELDS: ProfileField[] = [
  { key: "ROLE", value: "Computer Systems Engineering Student" },
  { key: "UNIVERSITY", value: "University of Warwick", url: "https://warwick.ac.uk/" },
  { key: "POSITION", value: "Quantitative Technology Intern", url: "https://www.qube-rt.com/" },
  { key: "COMPANY", value: "Qube Research & Technologies", url: "https://www.qube-rt.com/" },
];

const BIO_TEXT = "Through work, personal, and university projects, I have gained experience with many programming languages and libraries.";

export const AboutMePage: React.FC = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const delays = [0, 400, 800, 1200, 1600, 2400, 2800];
    const timers = delays.map((delay, i) =>
      setTimeout(() => setStage(i + 1), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <pre className="text-terminal-green text-glow text-[0.4rem] sm:text-xs md:text-sm leading-tight mb-8 whitespace-pre overflow-x-auto">
        {ASCII_ART}
      </pre>

      <TerminalWindow title="bash — 80x24">
        <div className="space-y-2 text-sm md:text-base">
          {stage >= 1 && (
            <div className="text-terminal-green">$ whoami</div>
          )}
          {stage >= 2 && (
            <div className="text-terminal-cyan text-lg font-bold mb-2">james.gray</div>
          )}

          {stage >= 3 && (
            <div className="text-terminal-green mt-3">$ cat /etc/profile</div>
          )}

          {stage >= 4 && (
            <div className="border border-terminal-border bg-terminal-bg rounded-sm divide-y divide-terminal-border mt-1">
              {PROFILE_FIELDS.map((field, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center px-3 py-2 gap-1 sm:gap-3">
                  <span className="text-terminal-amber font-bold text-xs sm:text-sm w-28 shrink-0">
                    {field.key}
                  </span>
                  {field.url ? (
                    <Link
                      href={field.url}
                      target="_blank"
                      className="text-terminal-cyan hover:underline text-sm"
                    >
                      {field.value}
                    </Link>
                  ) : (
                    <span className="text-terminal-green/90 text-sm">{field.value}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {stage >= 5 && (
            <div className="text-terminal-green mt-4">$ cat /proc/bio</div>
          )}
          {stage >= 6 && (
            <div className="text-terminal-dim mt-1 leading-relaxed">
              {BIO_TEXT}
            </div>
          )}

          <TerminalCursor />
        </div>
      </TerminalWindow>
    </div>
  );
};
