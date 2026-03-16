"use client"

import React, { useState } from "react";

import { AboutMePage } from "@/components/pages/about-me-page";
import { ExperiencePage } from "@/components/pages/experience-page";
import { ProjectsPage } from "@/components/pages/projects-page";
import { ContactPage } from "@/components/pages/contact-page";
import { EducationPage } from "@/components/pages/education-page";

interface PageDefinition {
  label: string;
  component: React.FC;
}

const PAGES: PageDefinition[] = [
  { label: "about", component: AboutMePage },
  { label: "education", component: EducationPage },
  { label: "experience", component: ExperiencePage },
  { label: "projects", component: ProjectsPage },
  { label: "contact", component: ContactPage },
];

export const PageLayout: React.FC = () => {
  const [index, setIndex] = useState(0);

  const PageComponent = PAGES[index].component;

  return (
    <div className="flex flex-col h-dvh overflow-hidden pt-[41px]">
      {/* Terminal tabs */}
      <div className="shrink-0 bg-terminal-bg-light flex">
        {PAGES.map((page, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`flex-1 min-w-0 px-1 md:px-4 py-2 text-[11px] md:text-sm font-mono font-bold truncate transition-colors border-r border-terminal-border ${
              i === index
                ? "text-terminal-green bg-terminal-bg border-b-2 border-b-terminal-green"
                : "text-terminal-dim hover:text-terminal-green border-b border-b-terminal-border"
            }`}
          >
            {page.label}
            {i === index && <span className="ml-1 md:ml-2 text-terminal-dim text-[10px]">●</span>}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        <div key={index} className="w-[95%] max-w-5xl mx-auto pt-6 pb-4 h-full flex flex-col">
          <div className="w-full flex-1 min-h-0">
            <PageComponent />
          </div>
        </div>
      </div>
    </div>
  );
};
