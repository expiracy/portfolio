"use client"

import React, { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { projects } from "@/data/content";
import { TerminalPage } from "@/components/terminal-page";
import { DetailModal, BulletList, BadgeList, SourceLink } from "@/components/detail-modal";

export const ProjectsPage: React.FC = () => {
  const [selectedDir, setSelectedDir] = useState<string | null>(null);
  const project = selectedDir !== null ? projects.find((p) => p.dir === selectedDir) ?? null : null;

  return (
    <TerminalPage
      command="ls -la ~/projects/"
      footer={(search) => {
        const q = search.toLowerCase();
        const filtered = projects.filter(
          (p) =>
            !q ||
            p.title.toLowerCase().includes(q) ||
            p.dir.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.badges.some((b) => b.toLowerCase().includes(q))
        );
        const publicCount = projects.filter(p => p.url).length;
        return filtered.length === projects.length
          ? `${projects.length} items, ${publicCount} public`
          : `${filtered.length} of ${projects.length} items, ${publicCount} public`;
      }}
    >
      {(search) => {
        const q = search.toLowerCase();
        const filtered = projects.filter(
          (p) =>
            !q ||
            p.title.toLowerCase().includes(q) ||
            p.dir.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.badges.some((b) => b.toLowerCase().includes(q))
        );

        return (
          <>
            <div className="w-full text-xs md:text-sm space-y-2">
              {filtered.map((p) => (
                <button
                  key={p.dir}
                  onClick={() => setSelectedDir(p.dir)}
                  className="block w-full text-left px-4 py-3 rounded-sm transition-colors hover:bg-terminal-green/5 group border border-terminal-border hover:border-terminal-green/40 bg-terminal-bg"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-terminal-green font-bold text-sm md:text-base flex items-center gap-1 group-hover:underline">
                      {p.dir}/
                      <FiChevronRight className="w-4 h-4 text-terminal-dim group-hover:text-terminal-green transition-colors" />
                    </span>
                    <span className={`ml-auto shrink-0 text-[10px] md:text-xs px-1.5 py-0.5 rounded-sm border border-terminal-border ${p.url ? "text-terminal-green" : "text-terminal-red"}`}>
                      {p.url ? "public" : "private"}
                    </span>
                  </div>
                  <div className="text-terminal-dim text-xs md:text-sm mb-2">
                    {p.description}
                  </div>
                  <BadgeList items={p.badges} />
                </button>
              ))}
            </div>

            <DetailModal
              open={project !== null}
              onClose={() => setSelectedDir(null)}
              command={project ? `cat ~/${project.dir}/README.md` : ""}
              title={project?.title ?? ""}
              subtitle={project?.description}
              sections={project ? [
                ...(project.details.length > 0 ? [{
                  heading: "Description",
                  content: <BulletList items={project.details} />,
                }] : []),
                {
                  heading: "Technologies",
                  content: <BadgeList items={project.badges} />,
                },
                ...(project.url ? [{
                  heading: "Source",
                  content: <SourceLink url={project.url} />,
                }] : []),
              ] : []}
            />
          </>
        );
      }}
    </TerminalPage>
  );
};
