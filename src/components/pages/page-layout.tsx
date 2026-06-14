"use client"

import React, { useState } from "react";
import { FiUser, FiBookOpen, FiBriefcase, FiFolder, FiMail } from "react-icons/fi";
import { cn } from "@/lib/utils";

import { ErrorBoundary } from "@/components/error-boundary";
import { AboutMePage } from "@/components/pages/about-me-page";
import { ExperiencePage } from "@/components/pages/experience-page";
import { ProjectsPage } from "@/components/pages/projects-page";
import { ContactPage } from "@/components/pages/contact-page";
import { EducationPage } from "@/components/pages/education-page";

interface PageDefinition {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  component: React.FC;
}

const PAGES: PageDefinition[] = [
  { label: "about", icon: FiUser, component: AboutMePage },
  { label: "education", icon: FiBookOpen, component: EducationPage },
  { label: "experience", icon: FiBriefcase, component: ExperiencePage },
  { label: "projects", icon: FiFolder, component: ProjectsPage },
  { label: "contact", icon: FiMail, component: ContactPage },
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
            key={page.label}
            onClick={() => setIndex(i)}
            className={cn(
              "flex-1 min-w-0 flex items-center justify-center gap-1 md:gap-2 px-2 md:px-4 py-2 text-sm font-mono font-bold transition-colors border-r border-terminal-border",
              i === index
                ? "text-terminal-green bg-terminal-bg border-b-2 border-b-terminal-green"
                : "text-terminal-dim hover:text-terminal-green border-b border-b-terminal-border",
            )}
          >
            <page.icon className="w-4 h-4 shrink-0" />
            <span className="hidden md:inline">{page.label}</span>
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        <div key={PAGES[index].label} className="w-[90%] max-w-5xl mx-auto pt-4 md:pt-6 pb-4 h-full flex flex-col">
          <ErrorBoundary>
            <div className="w-full flex-1 min-h-0">
              <PageComponent />
            </div>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};
