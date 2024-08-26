import {Header} from "@/components/header";
import React from "react";
import {Badge} from "@/components/ui/badge";
import {SkillGrid} from "@/components/skill-grid";
import Link from "next/link";
import {Title1, Text, Title2} from "@/components/text";
import {Projects} from "@/components/projects";


export default function Home() {
  return (
    <div className="flex flex-col w-[95%] items-center justify-center mx-auto px-8">
      <div className="flex flex-grow min-h-dvh flex-col items-start justify-center w-full">
        <Title1>
          {"Hi, I'm"}<br/>{"James Gray!"}
        </Title1>
        <div className="flex flex-row justify-center items-center mt-6">
          <Text>
            {"I am a "}
            <Link
              className={"font-bold text-blue-600 hover:underline"}
              href={"https://warwick.ac.uk/study/undergraduate/courses/beng-computer-systems-engineering/"}
              target={"_blank"}
            >
              Computer Systems Engineering
            </Link>
            {" student at the "}
            <Link
              className={"font-bold text-blue-600 hover:underline"}
              href={"https://warwick.ac.uk/"}
              target={"_blank"}
            >
              University of Warwick
            </Link>
            {", currently on a sandwich year working as a quantitative technology intern at "}
            <Link
              className={"font-bold text-blue-600 hover:underline"}
              href={"https://www.qube-rt.com/"}
              target={"_blank"}
            >
              Qube Research and Technologies
            </Link>
            . Through work, personal, and university projects, I have gained experience with
            many programming languages and libraries.
          </Text>
        </div>
      </div>
      <div id="skills" className="space-y-6 w-full min-h-dvh">
        <Title2>
          My skills include...
        </Title2>
        <SkillGrid/>
      </div>
      <div id="projects" className="min-h-dvh w-full space-y-6 mb-12">
        <Title2>
          Projects
        </Title2>
        <Text>
          Below are some short descriptions of some of my favourite projects!
        </Text>
        <Projects />
      </div>
    </div>
  );
}
