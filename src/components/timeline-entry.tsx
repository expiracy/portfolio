"use client"

import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { BadgeList } from "@/components/detail-modal";
import { Tag } from "@/data/content";

/** The hover-affordance chevron shared by timeline rows and project cards. */
export function RowChevron() {
  return (
    <FiChevronRight className="w-4 h-4 text-terminal-dim group-hover:text-terminal-green transition-colors shrink-0" />
  );
}

interface TimelineEntryProps {
  period: string;
  title: string;
  subtitle: string;
  detailLine: string;
  tags: Tag[];
}

/** One commit-style row in a git-log timeline (education, experience). */
export function TimelineEntry({ period, title, subtitle, detailLine, tags }: TimelineEntryProps) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className="text-terminal-amber">{period}</span>
      </div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-terminal-green font-bold text-sm md:text-base group-hover:underline">
          {title}
        </span>
        <RowChevron />
      </div>
      <div className="text-terminal-cyan t-body mb-1">{subtitle}</div>
      <div className="text-terminal-dim t-body mb-2 leading-relaxed">{detailLine}</div>
      <BadgeList items={tags} />
    </>
  );
}
