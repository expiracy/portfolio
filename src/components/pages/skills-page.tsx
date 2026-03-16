"use client"

import React, { useState, useEffect } from "react";
import { TerminalWindow } from "@/components/terminal-window";
import { TerminalCursor } from "@/components/terminal-cursor";

interface Skill {
  name: string;
  version: string;
}

interface SkillCategory {
  label: string;
  icon: string;
  skills: Skill[];
}

const categories: SkillCategory[] = [
  {
    label: "Languages",
    icon: ">>",
    skills: [
      { name: "python", version: "3.12.0" },
      { name: "c", version: "C17" },
      { name: "c++", version: "C++20" },
      { name: "c#", version: "12.0" },
      { name: "java", version: "21" },
      { name: "typescript", version: "5.4" },
      { name: "verilog", version: "HDL" },
      { name: "haskell", version: "GHC 9.6" },
    ],
  },
  {
    label: "Frameworks",
    icon: "=>",
    skills: [
      { name: "react", version: "18.2.0" },
      { name: "vaadin", version: "24.x" },
    ],
  },
  {
    label: "Tools & Databases",
    icon: "~>",
    skills: [
      { name: "postgresql", version: "16.0" },
      { name: "openai-api", version: "latest" },
    ],
  },
];

const totalSkills = categories.reduce((sum, cat) => sum + cat.skills.length, 0);

export const SkillsPage: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <TerminalWindow title="skills.sh — bash">
        <div className="text-terminal-green mb-4 text-sm md:text-base">
          $ neofetch --skills
        </div>

        {visible && (
          <div className="space-y-5">
            {categories.map((category, catIndex) => (
              <div key={catIndex}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-terminal-amber font-bold">{category.icon}</span>
                  <span className="text-terminal-green font-bold text-sm md:text-base uppercase tracking-wider">
                    {category.label}
                  </span>
                  <span className="flex-1 border-b border-terminal-border"></span>
                  <span className="text-terminal-dim text-xs">[{category.skills.length}]</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 ml-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="border border-terminal-border bg-terminal-bg px-3 py-2 hover:border-terminal-green/60 hover:bg-terminal-green/5 transition-colors"
                    >
                      <div className="text-terminal-cyan text-sm font-semibold">{skill.name}</div>
                      <div className="text-terminal-dim text-xs">{skill.version}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-3 border-t border-terminal-border text-terminal-dim text-xs md:text-sm">
              <div>{totalSkills} packages loaded across {categories.length} modules.</div>
              <TerminalCursor />
            </div>
          </div>
        )}
      </TerminalWindow>
    </div>
  );
};
