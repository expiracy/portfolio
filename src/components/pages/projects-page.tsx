"use client"

import React from "react";
import { projects, filterProject } from "@/data/content";
import { TimelineList } from "@/components/timeline-list";
import { RowChevron } from "@/components/timeline-entry";
import { MatrixText } from "@/components/matrix-text";
import { DetailModal, BulletList, BadgeList } from "@/components/detail-modal";
import { pluralCount } from "@/lib/utils";

const CARD_STEP_MS = 70; // keep in step with TimelineList's per-row reveal delay

export const ProjectsPage: React.FC = () => {
  return (
    <TimelineList
      command="ls projects"
      items={projects}
      getKey={(p) => p.dir}
      filterFn={filterProject}
      renderItem={(p, onClick, index) => (
        <button
          onClick={onClick}
          className="relative block w-full text-left pl-7 pr-4 py-3 rounded-sm transition-all hover:bg-terminal-green/5 group border border-terminal-border hover:border-terminal-green/60 hover:shadow-marker bg-terminal-bg"
        >
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-terminal-green font-bold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 motion-reduce:transition-none">
            &gt;
          </span>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-terminal-green font-bold text-sm md:text-base flex items-center gap-1 group-hover:underline">
              <MatrixText text={p.title} delay={index * CARD_STEP_MS + 60} />
              <RowChevron />
            </span>
          </div>
          {/* Sits in the cyan subtitle slot, matching the log timelines' second line. */}
          <div className="text-terminal-cyan t-body mb-2">
            {p.description}
          </div>
          {/* tags resolve last */}
          <span className="matrix-card-in block" style={{ animationDelay: `${index * CARD_STEP_MS + 380}ms` }}>
            <BadgeList items={p.tags} />
          </span>
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
          ] : []}
        />
      )}
      renderFooter={(filtered, total) => pluralCount(filtered, total, "items")}
    />
  );
};
