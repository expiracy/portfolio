"use client"

import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { education, filterEducation } from "@/data/content";
import { TimelineList } from "@/components/timeline-list";
import { DetailModal, BulletList, BadgeList } from "@/components/detail-modal";

export const EducationPage: React.FC = () => {
  return (
    <TimelineList
      command="git log ~/education"
      items={education}
      getKey={(e) => e.hash}
      filterFn={filterEducation}
      renderEntry={(e) => (
        <>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-terminal-cyan">{e.hash}</span>
            <span className="text-terminal-amber">{e.period}</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-terminal-green font-bold text-sm md:text-base group-hover:underline">
              {e.institution}
            </span>
            <FiChevronRight className="w-4 h-4 text-terminal-dim group-hover:text-terminal-green transition-colors shrink-0" />
          </div>
          <div className="text-terminal-cyan text-xs md:text-sm mb-1">
            {e.qualification}
          </div>
          {e.grade && (
            <div className="text-terminal-amber text-xs md:text-sm mb-2">
              {e.grade}
            </div>
          )}
          <BadgeList items={e.tags} />
        </>
      )}
      renderModal={(edu, onClose) => (
        <DetailModal
          open={edu !== null}
          onClose={onClose}
          command={edu ? `git show ${edu.hash}` : ""}
          title={edu?.institution ?? ""}
          subtitle={edu?.qualification}
          meta={edu?.grade ? `${edu.period} — ${edu.grade}` : edu?.period}
          sections={edu ? [
            ...(edu.details.length > 0 ? [{
              heading: "Description",
              content: <BulletList items={edu.details} />,
            }] : []),
            ...(edu.tags.length > 0 ? [{
              heading: "Topics",
              content: <BadgeList items={edu.tags} />,
            }] : []),
          ] : []}
        />
      )}
      renderFooter={(filtered, total) => filtered === total ? `${total} entries` : `${filtered} of ${total} entries`}
    />
  );
};
