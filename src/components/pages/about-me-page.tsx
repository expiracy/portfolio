"use client"

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { TerminalPage } from "@/components/terminal-page";
import { PROFILE_FIELDS, BIO_TEXT, ASCII_JAMES, ASCII_GRAY } from "@/data/content";

function useScanlineReveal(lines: string[], speed = 80) {
  const [revealed, setRevealed] = useState(0);
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced.current) {
      setRevealed(lines.length);
      return;
    }

    setRevealed(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setRevealed(i);
      if (i >= lines.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [lines.length, speed]);

  return { revealed, done: revealed >= lines.length };
}

const profileVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const profileItemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
};

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
          <div className="shrink-0 overflow-x-auto max-w-[50%] lg:max-w-none">
            <pre className="text-terminal-green text-glow text-[0.5rem] sm:text-[0.6rem] lg:text-xs leading-tight whitespace-pre">
              {jamesLines.map((line, i) => (
                <div
                  key={i}
                  className={`transition-opacity duration-300 ${
                    i < revealed ? "opacity-100" : "opacity-0"
                  } ${i === revealed - 1 && !done ? "text-glow-bright" : ""}`}
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
                    className={`transition-opacity duration-300 ${
                      globalIndex < revealed ? "opacity-100" : "opacity-0"
                    } ${globalIndex === revealed - 1 && !done ? "text-glow-bright" : ""}`}
                  >
                    {line}
                  </div>
                );
              })}
            </pre>
          </div>

          <motion.div
            className="text-xs md:text-sm space-y-1 min-w-0"
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
              <motion.div key={i} className="flex flex-wrap gap-1" variants={profileItemVariants}>
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
              </motion.div>
            ))}

            <motion.div className="border-b border-terminal-border my-2 w-full" variants={profileItemVariants} />
            <motion.div className="text-terminal-dim leading-relaxed" variants={profileItemVariants}>
              {BIO_TEXT}
            </motion.div>

            <motion.div className="flex gap-0.5 mt-3" aria-hidden="true" variants={profileItemVariants}>
              {["bg-terminal-red", "bg-terminal-green", "bg-terminal-amber", "bg-terminal-cyan", "bg-terminal-dim", "bg-terminal-border", "bg-terminal-bg-light", "bg-terminal-bg"].map((color, i) => (
                <div key={i} className={`w-4 h-4 md:w-5 md:h-5 ${color}`}></div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      )}
    </TerminalPage>
  );
};
