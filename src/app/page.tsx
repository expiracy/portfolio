import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import {TopBar} from "@/components/TopBar";
import React from "react";
import {TextLink} from "@/components/TextLink";


export default function Home() {
  return (
    <div className="flex flex-col w-[55%] mx-auto">
      <TopBar />

      <div className="flex flex-col items-center mx-auto min-h-screen">
        <div id="aboutMe" className="flex flex-col w-full p-4 animate-in">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            About Me
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6 break-words">
            I am a <TextLink href={"https://warwick.ac.uk/study/undergraduate/courses/beng-computer-systems-engineering/"}
                             text={"Computer Systems Engineering"}/> student at
            the <TextLink href={"https://warwick.ac.uk/"}
                          text={"University of Warwick"}/>, currently on a sandwich year
            working as a quantitative technology intern at <TextLink href={"https://www.qube-rt.com/"}
                                                                     text={"Qube Research and Technologies"}/>.

          </p>
        </div>

        <div id="skills" className="flex flex-col w-full p-4">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-right">
            My Skills
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6 break-words">
            Through work, personal and academic projects, I have gained experience in many languages and libraries.
          </p>
        </div>

        <div id="projects" className="flex flex-col w-full p-4">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Projects
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6 break-all">
            pipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipopipo
          </p>
        </div>
      </div>


    </div>
  );
}
