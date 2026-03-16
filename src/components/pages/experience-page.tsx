"use client"

import React, { useState, useEffect } from "react";
import { TerminalWindow } from "@/components/terminal-window";
import { TerminalCursor } from "@/components/terminal-cursor";

interface Experience {
  id: string;
  title: string;
  context: string;
  description: string;
  badges: string[];
}

const experiences: Experience[] = [
  {
    id: "001",
    title: "FPGA Pacman",
    context: "University — Year 2",
    description: "Recreation of Pacman in Verilog on FPGA hardware. Scored the highest mark in the year.",
    badges: ["Verilog", "Signal Analysis", "FPGA"],
  },
  {
    id: "002",
    title: "Electron Magnetic Field Trap Simulator",
    context: "University — Year 1",
    description: "Simulation and graphical analysis of electron trajectories in magnetic field traps. 100% mark.",
    badges: ["Python", "numpy", "scipy", "matplotlib"],
  },
  {
    id: "003",
    title: "Stock Browser & News Analysis",
    context: "University — Year 2",
    description: "App for viewing stock info, discovering stocks, tracking portfolios and news sentiment analysis.",
    badges: ["Java", "Vaadin", "JPA", "PostgreSQL"],
  },
  {
    id: "004",
    title: "Multithreaded Packet Sniffer",
    context: "University — Year 2",
    description: "Analysed incoming packets to detect SYN attacks and ARP cache poisoning.",
    badges: ["C", "Networking", "Multithreading"],
  },
  {
    id: "005",
    title: "Simulation Code Optimisation",
    context: "University — Year 2",
    description: "8x speedup via cache optimisation, code refactoring and AVX vector instructions.",
    badges: ["C", "AVX", "Cache Optimisation"],
  },
];

export const ExperiencePage: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState(0);

  useEffect(() => {
    const timers = experiences.map((_, i) =>
      setTimeout(() => setVisibleItems(i + 1), 200 + i * 120)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full flex justify-center">
      <TerminalWindow title="experience — history">
        <div className="text-terminal-green mb-4 text-sm md:text-base">
          $ history --work --university
        </div>

        <div className="space-y-3 text-xs md:text-sm overflow-y-auto max-h-[60vh] pr-2">
          {experiences.slice(0, visibleItems).map((exp, index) => (
            <div
              key={index}
              className="border border-terminal-border bg-terminal-bg p-3 md:p-4 hover:border-terminal-green/50 transition-colors"
            >
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-terminal-amber font-bold">[{exp.id}]</span>
                <span className="text-terminal-green font-bold text-sm md:text-base">{exp.title}</span>
              </div>

              <div className="text-terminal-cyan text-xs ml-5 mb-1">
                {exp.context}
              </div>

              <div className="text-terminal-dim mb-2 ml-5 leading-relaxed">
                {exp.description}
              </div>

              <div className="flex flex-wrap gap-1.5 ml-5">
                {exp.badges.map((badge, i) => (
                  <span
                    key={i}
                    className="text-[10px] md:text-xs border border-terminal-amber/30 bg-terminal-amber/5 text-terminal-amber px-2 py-0.5 rounded-sm"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {visibleItems >= experiences.length && (
          <div className="mt-4 pt-2 border-t border-terminal-border text-terminal-dim text-xs md:text-sm">
            <div>-- {experiences.length} entries in history --</div>
            <TerminalCursor />
          </div>
        )}
      </TerminalWindow>
    </div>
  );
};
