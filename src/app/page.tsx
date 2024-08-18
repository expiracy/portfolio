import {TopBar} from "@/components/TopBar";
import React from "react";
import {TextLink} from "@/components/TextLink";
import {Badge} from "@/components/ui/badge";
import {SkillGrid} from "@/components/SkillGrid";


export default function Home() {
  return (
    <div className="flex flex-col w-[90%] sm:w-[75%] mx-auto">
      <TopBar/>

      <div className="items-center space-y-12">
        <div id="aboutMe" className="p-4 space-y-4">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {"Hi, I'm James!"}
          </h1>
          <Badge>Software Engineer</Badge>
          <p className="leading-7 [&:not(:first-child)]:mt-6 text-justify">
            I am a <TextLink href={"https://warwick.ac.uk/study/undergraduate/courses/beng-computer-systems-engineering/"} text={"Computer Systems Engineering"}/> student at
            the <TextLink href={"https://warwick.ac.uk/"} text={"University of Warwick"}/>, currently on a sandwich year
            working as a quantitative technology intern at <TextLink href={"https://www.qube-rt.com/"} text={"Qube Research and Technologies"}/>.
            I have gained experience with a variety of programming languages and paradigms and have worked with computer systems
            at both a high and hardware level.
          </p>
        </div>

        <div id="skills" className="p-4 space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            My skills include...
          </h1>
          <SkillGrid cols={2} colsLg={4} colsXl={6}/>
        </div>

        {/*<div id="projects" className="flex flex-col p-4">*/}
        {/*  <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">*/}
        {/*    Projects*/}
        {/*  </h1>*/}
        {/*  <p className="leading-7 [&:not(:first-child)]:mt-6 break-all">*/}
        {/*    pipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipo*/}
        {/*  </p>*/}
        {/*</div>*/}
      </div>


    </div>
  );
}
