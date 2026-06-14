"use client"

import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { projects, filterProject } from "@/data/content";
import { TimelineList } from "@/components/timeline-list";
import { DetailModal, BulletList, BadgeList, SourceLink } from "@/components/detail-modal";
import { cn } from "@/lib/utils";

export const ProjectsPage: React.FC = () => {
  const publicCount = projects.filter(p => p.url).length;

  return (
    <TimelineList
      command="ls -la ~/projects/"
      items={projects}
      getKey={(p) => p.dir}
      filterFn={filterProject}
      renderItem={(p, onClick) => (
        <button
          onClick={onClick}
          className="relative block w-full text-left pl-7 pr-4 py-3 rounded-sm transition-all hover:bg-terminal-green/5 group border border-terminal-border hover:border-terminal-green/60 hover:shadow-marker bg-terminal-bg"
        >
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-terminal-green font-bold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 motion-reduce:transition-none">
            &gt;
          </span>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-terminal-green font-bold text-sm md:text-base flex items-center gap-1 group-hover:underline">
              {p.dir}/
              <FiChevronRight className="w-4 h-4 text-terminal-dim group-hover:text-terminal-green transition-colors" />
            </span>
            <span className={cn("ml-auto shrink-0 t-micro px-1.5 py-0.5 rounded-sm border border-terminal-border", p.url ? "text-terminal-green" : "text-terminal-red")}>
              {p.url ? "public" : "private"}
            </span>
          </div>
          <div className="text-terminal-dim t-body mb-2">
            {p.description}
          </div>
          <BadgeList items={p.tags} />
        </button>
      )}
      renderEntry={() => null}
      renderModal={(project, onClose) => (
        <DetailModal
          open={project !== null}
          onClose={onClose}
          command={project ? `cat ~/${project.dir}/README.md` : ""}
          title={project?.title ?? ""}
          subtitle={project?.description}
          sections={project ? [
            ...(project.details.length > 0 ? [{
              heading: "Description",
              content: <BulletList items={project.details} />,
            }] : []),
            {
              heading: "Tags",
              content: <BadgeList items={project.tags} />,
            },
            ...(project.url ? [{
              heading: "Source",
              content: <SourceLink url={project.url} />,
            }] : []),
          ] : []}
        />
      )}
      renderFooter={(filtered, total) =>
        filtered === total
          ? `${total} items, ${publicCount} public`
          : `${filtered} of ${total} items, ${publicCount} public`
      }
    />
  );
};
