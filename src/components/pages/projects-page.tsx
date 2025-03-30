"use client"

import {Title2, Text} from "@/components/text";
import {Projects} from "@/components/projects";

export const ProjectsPage: React.FC = () => {
    return (
        <div id="projects" className="min-h-dvh w-full space-y-6 mb-12">
            <Title2>
                Projects
            </Title2>
            <Text>
                Below are some short descriptions of some of my favourite projects!
            </Text>
            <Projects/>
        </div>
    );
}