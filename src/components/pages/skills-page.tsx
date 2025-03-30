"use client"

import {Title2} from "@/components/text";
import {SkillGrid} from "@/components/skill-grid";
import React from "react";

export const SkillsPage: React.FC = () => {
    return (
        <div id="skills" className={`space-y-4 h-full justify-center items-center`}>
            <Title2>
                My skills include...
            </Title2>
            <SkillGrid />
        </div>
    );
}