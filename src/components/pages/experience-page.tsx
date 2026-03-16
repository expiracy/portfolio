"use client"

import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { experiences } from "@/data/content";
import { TimelineList } from "@/components/timeline-list";
import { DetailModal, BulletList, BadgeList } from "@/components/detail-modal";

export const ExperiencePage: React.FC = () => {
  return (
    <TimelineList
      command="git log --graph --all --oneline ~/experience"
      items={experiences}
      getKey={(e) => e.hash}
      filterFn={(e, q) =>
        e.role.toLowerCase().includes(q) ||
        e.company.toLowerCase().includes(q) ||
        e.period.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.badges.some((b) => b.toLowerCase().includes(q))
      }
      renderEntry={(e) => (
        <>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-terminal-cyan">{e.hash}</span>
            <span className="text-terminal-amber">{e.period}</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-terminal-green font-bold text-sm md:text-base group-hover:underline">
              {e.role}
            </span>
            <FiChevronRight className="w-4 h-4 text-terminal-dim group-hover:text-terminal-green transition-colors shrink-0" />
          </div>
          <div className="text-terminal-cyan text-xs md:text-sm mb-1">
            {e.company}
          </div>
          <div className="text-terminal-dim text-xs md:text-sm mb-2 leading-relaxed">
            {e.description}
          </div>
          <BadgeList items={e.badges} />
        </>
      )}
      renderModal={(exp, onClose) => (
        <DetailModal
          open={exp !== null}
          onClose={onClose}
          command={exp ? `git show ${exp.hash}` : ""}
          title={exp?.role ?? ""}
          subtitle={exp?.company}
          meta={exp?.period}
          sections={exp ? [
            {
              heading: "Summary",
              content: <p className="text-terminal-dim text-xs md:text-sm leading-relaxed">{exp.description}</p>,
            },
            ...(exp.details.length > 0 ? [{
              heading: "Description",
              content: <BulletList items={exp.details} />,
            }] : []),
            ...(exp.badges.length > 0 ? [{
              heading: "Technologies",
              content: <BadgeList items={exp.badges} />,
            }] : []),
          ] : []}
        />
      )}
      renderFooter={(filtered, total) => filtered === total ? `${total} entries` : `${filtered} of ${total} entries`}
    />
  );
};
