"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { TerminalWindow } from "@/components/terminal-window";
import { TerminalCursor } from "@/components/terminal-cursor";

interface Project {
  hash: string;
  title: string;
  description: string;
  badges: string[];
  url?: string;
}

const projects: Project[] = [
  {
    hash: "a3f7c2e",
    title: "FPGA Pacman",
    description: "Recreation of Pacman in Verilog on FPGA hardware. Scored the highest mark in the year.",
    badges: ["Verilog", "Signal Analysis", "FPGA"],
  },
  {
    hash: "b8d1f4a",
    title: "Electron Magnetic Field Trap Simulator",
    description: "Simulation and graphical analysis of electron trajectories in magnetic field traps. 100% mark.",
    badges: ["Python", "numpy", "scipy", "matplotlib"],
  },
  {
    hash: "c5e9a1b",
    title: "Stock Browser & News Analysis",
    description: "App for viewing stock info, discovering stocks, tracking portfolios and news sentiment analysis.",
    badges: ["Java", "Vaadin", "JPA", "PostgreSQL"],
  },
  {
    hash: "d2f6b3c",
    title: "Multithreaded Packet Sniffer",
    description: "Analysed incoming packets to detect SYN attacks and ARP cache poisoning.",
    badges: ["C", "Networking", "Multithreading"],
  },
  {
    hash: "e7a4d8f",
    title: "Simulation Code Optimisation",
    description: "8x speedup via cache optimisation, code refactoring and AVX vector instructions.",
    badges: ["C", "AVX", "Cache Optimisation"],
  },
  {
    hash: "f1c3e5a",
    title: "Simple Circuit Solver",
    description: "Algorithms that solve simple circuits consisting of only Ohmic components.",
    url: "https://github.com/expiracy/circuit-calculator",
    badges: ["Python", "Graphs"],
  },
  {
    hash: "a9b2d7e",
    title: "Discord Drive",
    description: "Web app using discord.py bot API to use Discord as cloud file storage.",
    url: "https://github.com/expiracy/discord-drive",
    badges: ["Python", "Flask", "SQLite", "Discord API"],
  },
  {
    hash: "b4e8f2c",
    title: "Resistor Value Scanner",
    description: "Image processing system using OpenCV to identify resistor bands and calculate values.",
    url: "https://github.com/expiracy/resistor",
    badges: ["Python", "OpenCV", "Flask"],
  },
];

export const ProjectsPage: React.FC = () => {
  const [visibleProjects, setVisibleProjects] = useState(0);

  useEffect(() => {
    const timers = projects.map((_, i) =>
      setTimeout(() => setVisibleProjects(i + 1), 200 + i * 120)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full flex justify-center">
      <TerminalWindow title="projects — git log">
        <div className="text-terminal-green mb-4 text-sm md:text-base">
          $ git log --oneline --all --graph
        </div>

        <div className="space-y-3 text-xs md:text-sm overflow-y-auto max-h-[60vh] pr-2">
          {projects.slice(0, visibleProjects).map((project, index) => (
            <div
              key={index}
              className="border border-terminal-border bg-terminal-bg p-3 md:p-4 hover:border-terminal-green/50 transition-colors"
            >
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-terminal-amber font-bold">*</span>
                <span className="text-terminal-cyan">{project.hash}</span>
                <span className="text-terminal-green font-bold text-sm md:text-base">{project.title}</span>
              </div>

              <div className="text-terminal-dim mb-2 ml-5 leading-relaxed">
                {project.description}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 ml-5">
                <div className="flex flex-wrap gap-1.5">
                  {project.badges.map((badge, i) => (
                    <span
                      key={i}
                      className="text-[10px] md:text-xs border border-terminal-amber/30 bg-terminal-amber/5 text-terminal-amber px-2 py-0.5 rounded-sm"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {project.url ? (
                  <Link
                    href={project.url}
                    target="_blank"
                    className="text-terminal-cyan hover:underline text-xs whitespace-nowrap"
                  >
                    [{">>"} source]
                  </Link>
                ) : (
                  <span className="text-terminal-red/50 text-xs">[closed source]</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {visibleProjects >= projects.length && (
          <div className="mt-4 pt-2 border-t border-terminal-border text-terminal-dim text-xs md:text-sm">
            <div>-- {projects.length} commits shown --</div>
            <TerminalCursor />
          </div>
        )}
      </TerminalWindow>
    </div>
  );
};
