import React from "react";
import { experiences } from "@/data/content";

export const ExperiencePage: React.FC = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-3xl w-full text-xs md:text-sm">
        <div className="text-terminal-green mb-6">
          $ git log --graph --all --oneline ~/experience
        </div>

        {experiences.map((exp, index) => {
          const isLast = index === experiences.length - 1;

          return (
            <div key={index} className="flex">
              <div className="flex flex-col items-center mr-4 shrink-0">
                <div className="w-3 h-3 rounded-full bg-terminal-green border-2 border-terminal-green/60 mt-1"></div>
                {!isLast && <div className="w-px flex-1 bg-terminal-green/30"></div>}
              </div>

              <div className="pb-8">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-terminal-cyan">{exp.hash}</span>
                  <span className="text-terminal-amber">{exp.period}</span>
                </div>

                <div className="text-terminal-green font-bold text-sm md:text-base mb-1">
                  {exp.role}
                </div>
                <div className="text-terminal-cyan text-xs mb-2">
                  {exp.company}
                </div>

                <div className="text-terminal-dim leading-relaxed">
                  {exp.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
