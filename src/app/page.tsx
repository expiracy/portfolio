import {Header} from "@/components/header";
import React from "react";
import {Badge} from "@/components/ui/badge";
import {SkillGrid} from "@/components/skill-grid";
import Link from "next/link";
import {Title1, Text, Title2} from "@/components/text";


export default function Home() {
  return (
    <div className="flex flex-col w-[95%] max-w-[3000px] items-center justify-center mx-auto px-8">
      <div className="flex flex-grow min-h-dvh flex-col items-start justify-center w-full">
        <Title1>
          {"Hi, I'm"}<br/>{"James Gray!"}
        </Title1>
        <div className="flex flex-row justify-center items-center">
          <Text>
            {"I am a "}
            <Link
              className={"font-bold text-blue-600"}
              href={"https://warwick.ac.uk/study/undergraduate/courses/beng-computer-systems-engineering/"}>
              Computer Systems Engineering
            </Link>
            {" student at the "}
            <Link
              className={"font-bold text-blue-600"}
              href={"https://warwick.ac.uk/"}>
              University of Warwick
            </Link>
            {", currently on a sandwich year working as a quantitative technology intern at "}
            <Link
              className={"font-bold text-blue-600"}
              href={"https://www.qube-rt.com/"}>
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
      {/*<div id="projects" className="min-h-dvh">*/}
      {/*  <Title2>*/}
      {/*    Projects*/}
      {/*  </Title2>*/}
      {/*  <p className="leading-7 [&:not(:first-child)]:mt-6 break-all">*/}
      {/*    pipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipo*/}
      {/*  </p>*/}
      {/*</div>*/}
    </div>
  );



  {/*</div>*/}
}
