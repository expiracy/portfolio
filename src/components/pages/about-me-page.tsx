"use client"

import React from "react";
import { ExternalLink } from "@/components/external-link";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeIn } from "@/lib/motion";
import { useRevealCount } from "@/lib/use-reveal-count";
import { terminalColors as T } from "@/lib/tokens";
import { motion, useReducedMotion } from "framer-motion";
import { TerminalPage } from "@/components/terminal-page";
import { PROFILE_FIELDS, BIO_TEXT, ASCII_JAMES, ASCII_GRAY } from "@/data/content";

function useScanlineReveal(lines: string[], speed = 80) {
  const { count, done } = useRevealCount(lines.length, speed);
  return { revealed: count, done };
}

const profileVariants = staggerContainer(0.06);
const profileItemVariants = fadeIn({ x: -8, duration: 0.25 });

// Neofetch-style palette strip, derived from the terminal tokens.
const SWATCH_TOKENS = ["red", "green", "amber", "cyan", "dim", "border", "bg-light", "bg"] as const;

export const AboutMePage: React.FC = () => {
  const jamesLines = ASCII_JAMES.split("\n");
  const grayLines = ASCII_GRAY.split("\n");
  const allLines = [...jamesLines, ...grayLines];
  const { revealed, done } = useScanlineReveal(allLines);
  const reduceMotion = useReducedMotion();

  return (
    <TerminalPage command="neofetch" showSearch={false}>
      {() => (
        <div className="flex flex-col lg:flex-row gap-6 w-full h-full items-center justify-center">
          <div className="shrink-0 overflow-x-auto">
            <pre className="text-terminal-green text-glow text-[0.5rem] sm:text-[0.6rem] lg:text-xs leading-tight whitespace-pre">
              {jamesLines.map((line, i) => (
                <div
                  key={i}
                  className={cn(
                    "transition-opacity duration-300",
                    i < revealed ? "opacity-100" : "opacity-0",
                    i === revealed - 1 && !done && "text-glow-bright",
                  )}
                >
                  {line}
                </div>
              ))}
            </pre>
            <pre className="text-terminal-cyan text-glow text-[0.5rem] sm:text-[0.6rem] lg:text-xs leading-tight whitespace-pre mt-1">
              {grayLines.map((line, i) => {
                const globalIndex = jamesLines.length + i;
                return (
                  <div
                    key={i}
                    className={cn(
                      "transition-opacity duration-300",
                      globalIndex < revealed ? "opacity-100" : "opacity-0",
                      globalIndex === revealed - 1 && !done && "text-glow-bright",
                    )}
                  >
                    {line}
                  </div>
                );
              })}
            </pre>
          </div>

          <motion.div
            className="text-[0.65rem] sm:text-xs md:text-sm space-y-1 min-w-0"
            variants={profileVariants}
            initial={reduceMotion ? false : "hidden"}
            animate={done ? "visible" : "hidden"}
          >
            <motion.div className="mb-2" variants={profileItemVariants}>
              <span className="text-terminal-cyan font-bold">james</span>
              <span className="text-terminal-dim">@</span>
              <span className="text-terminal-cyan font-bold">portfolio</span>
            </motion.div>
            <motion.div className="border-b border-terminal-border mb-2 w-full" variants={profileItemVariants} />

            {PROFILE_FIELDS.map((field, i) => (
              <motion.div key={i} className="flex gap-1" variants={profileItemVariants}>
                <span className="text-terminal-amber font-bold">{field.key}:</span>
                {field.url ? (
                  <ExternalLink
                    href={field.url}
                    className="text-terminal-cyan hover:underline"
                  >
                    {field.value}
                  </ExternalLink>
                ) : (
                  <span className="text-terminal-dim">{field.value}</span>
                )}
              </motion.div>
            ))}

            <motion.div className="border-b border-terminal-border my-2 w-full" variants={profileItemVariants} />
            <motion.div className="text-terminal-dim leading-relaxed" variants={profileItemVariants}>
              {BIO_TEXT}
            </motion.div>

            <motion.div className="flex gap-0.5 mt-3" aria-hidden="true" variants={profileItemVariants}>
              {SWATCH_TOKENS.map((token) => (
                <div
                  key={token}
                  className="w-4 h-4 md:w-5 md:h-5"
                  style={{ backgroundColor: T[token] }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      )}
    </TerminalPage>
  );
};
