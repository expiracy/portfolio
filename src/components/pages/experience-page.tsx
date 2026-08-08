"use client"

import React from "react";
import { experiences, filterExperience } from "@/data/content";
import { TimelineList } from "@/components/timeline-list";
import { TimelineEntry } from "@/components/timeline-entry";
import { DetailModal, BulletList, BadgeList } from "@/components/detail-modal";
import { pluralCount } from "@/lib/utils";

export const ExperiencePage: React.FC = () => {
  return (
    <TimelineList
      command="log experience"
      items={experiences}
      getKey={(e) => e.id}
      filterFn={filterExperience}
      renderEntry={(e) => (
        <TimelineEntry
          period={e.period}
          title={e.company}
          subtitle={e.role}
          detailLine={e.summary.join(" · ")}
          tags={e.tags}
        />
      )}
      renderModal={(exp, onClose) => (
        <DetailModal
          open={exp !== null}
          onClose={onClose}
          title={exp?.company ?? ""}
          subtitle={exp?.role}
          meta={exp?.period}
          sections={exp ? [
            {
              heading: "Summary",
              content: <p className="text-terminal-dim t-body leading-relaxed">{exp.summary.join(" · ")}</p>,
            },
            ...(exp.details.length > 0 ? [{
              heading: "Details",
              content: <BulletList items={exp.details} />,
            }] : []),
            ...(exp.tags.length > 0 ? [{
              heading: "Tags",
              content: <BadgeList items={exp.tags} />,
            }] : []),
          ] : []}
        />
      )}
      renderFooter={(filtered, total) => pluralCount(filtered, total, "entries")}
    />
  );
};
