"use client"

import React, { useState } from "react";
import { projects } from "@/data/content";
import { ReadmeModal } from "@/components/readme-modal";

export const ProjectsPage: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-3xl w-full text-xs md:text-sm overflow-y-auto max-h-[85vh] pr-2">
        <div className="text-terminal-green mb-4">
          $ ls -la ~/projects/
        </div>

        <div className="space-y-2">
          {projects.map((project, index) => (
            <button
              key={index}
              onClick={() => setSelected(index)}
              className="block w-full text-left p-3 rounded-sm transition-colors hover:bg-terminal-green/5 group border border-terminal-border hover:border-terminal-green/40 bg-terminal-bg"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-terminal-amber" aria-hidden="true">📁</span>
                <span className="text-terminal-cyan group-hover:text-terminal-green transition-colors font-bold text-sm md:text-base">
                  {project.dir}/
                </span>
                <span className={`ml-auto shrink-0 text-[10px] md:text-xs px-1.5 py-0.5 rounded-sm border ${project.url ? "text-terminal-green border-terminal-green/30 bg-terminal-green/5" : "text-terminal-red/50 border-terminal-red/20 bg-terminal-red/5"}`}>
                  {project.url ? "public" : "private"}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 ml-1">
                {project.badges.map((badge, i) => (
                  <span
                    key={i}
                    className="text-[10px] md:text-xs border border-terminal-amber/20 bg-terminal-amber/5 text-terminal-amber/80 px-1.5 py-0.5 rounded-sm"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 pt-2 border-t border-terminal-border text-terminal-dim">
          {projects.length} items, {projects.filter(p => p.url).length} public
        </div>
      </div>

      <ReadmeModal
        project={selected !== null ? projects[selected] : null}
        onClose={() => setSelected(null)}
      />
    </div>
  );
};
