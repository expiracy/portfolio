import {SkillCard} from "@/components/SkillCard";
import pythonIcon from "@/components/icons/languages/python.webp";
import csIcon from "@/components/icons/languages/csharp.png";
import cppIcon from "@/components/icons/languages/Cpp.png";
import cIcon from "@/components/icons/languages/C.png";
import javaIcon from "@/components/icons/languages/java.png";
import tsIcon from "@/components/icons/languages/ts.png";
import reactIcon from "@/components/icons/languages/react.webp";
import vaadinIcon from "@/components/icons/languages/vaadin.png";
import haskellIcon from "@/components/icons/languages/haskell.png";
import pgIcon from "@/components/icons/languages/postgress.png";
import cssIcon from "@/components/icons/languages/css.png";
import openaiIcon from "@/components/icons/languages/openai.png";
import verilogIcon from "@/components/icons/languages/verilog.png";
import React from "react";

export interface SkillGridProps {
}

export const SkillGrid: React.FC<SkillGridProps> = (props: SkillGridProps) => {
  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4`}>
      <SkillCard title={"Python"} iconSrc={pythonIcon.src} bg={"!bg-amber-200"}/>
      <SkillCard title={"C#"} iconSrc={csIcon.src} bg={"!bg-purple-300"}/>
      <SkillCard title={"C++"} iconSrc={cppIcon.src} bg={"!bg-blue-300"}/>
      <SkillCard title={"C"} iconSrc={cIcon.src} bg={"!bg-blue-300"}/>
      <SkillCard title={"Java"} iconSrc={javaIcon.src} bg={"!bg-indigo-200"}/>
      <SkillCard title={"Verilog"} iconSrc={verilogIcon.src} bg={"!bg-gray-200"}/>
      <SkillCard title={"Typescript"} iconSrc={tsIcon.src} bg={"!bg-indigo-300"}/>
      <SkillCard title={"React"} iconSrc={reactIcon.src} bg={"!bg-blue-200"}/>
      <SkillCard title={"Vaadin"} iconSrc={vaadinIcon.src} bg={"!bg-blue-200"}/>
      <SkillCard title={"Haskell"} iconSrc={haskellIcon.src} bg={"!bg-purple-300"}/>
      <SkillCard title={"PostgreSQL"} iconSrc={pgIcon.src} bg={"!bg-blue-200"}/>
      <SkillCard title={"OpenAI API"} iconSrc={openaiIcon.src} bg={"!bg-neutral-200"}/>
    </div>
  )
}