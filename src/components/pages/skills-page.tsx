"use client"

import {Title2} from "@/components/text";
import {SkillGrid} from "@/components/skill-grid";

export const SkillsPage: React.FC = () => {
    return (
        <div id="skills" className="space-y-6 w-full min-h-dvh">
            <Title2>
                My skills include...
            </Title2>
            <SkillGrid/>
        </div>
    );
}