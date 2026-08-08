"use client"

import React from "react";
import { education, filterEducation } from "@/data/content";
import { TimelineList } from "@/components/timeline-list";
import { TimelineEntry } from "@/components/timeline-entry";
import { DetailModal, BulletList, BadgeList } from "@/components/detail-modal";
import { pluralCount } from "@/lib/utils";

export const EducationPage: React.FC = () => {
  return (
    <TimelineList
      command="log education"
      items={education}
      getKey={(e) => e.id}
      filterFn={filterEducation}
      renderEntry={(e) => (
        <TimelineEntry
          period={e.period}
          title={e.institution}
          subtitle={e.grade ? `${e.qualification}: ${e.grade}` : e.qualification}
          detailLine={e.details.join(" · ")}
          tags={e.tags}
        />
      )}
      renderModal={(edu, onClose) => (
        <DetailModal
          open={edu !== null}
          onClose={onClose}
          command={edu ? `git show "${edu.institution}"` : ""}
          title={edu?.institution ?? ""}
          subtitle={edu?.grade ? `${edu.qualification}: ${edu.grade}` : edu?.qualification}
          meta={edu?.period}
          sections={edu ? [
            ...(edu.details.length > 0 ? [{
              heading: "Details",
              content: <BulletList items={edu.details} />,
            }] : []),
            ...(edu.tags.length > 0 ? [{
              heading: "Tags",
              content: <BadgeList items={edu.tags} />,
            }] : []),
          ] : []}
        />
      )}
      renderFooter={(filtered, total) => pluralCount(filtered, total, "entries")}
    />
  );
};
