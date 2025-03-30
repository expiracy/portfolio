"use client"

import {Title1} from "@/components/text";
import Link from "next/link";

export const AboutMePage: React.FC = () => {
    return (
        <div className="flex flex-grow min-h-dvh flex-col items-start justify-center w-full">
            <Title1>
                {"Hi, I'm"} <br/> {"James Gray!"}
            </Title1>
            <div className="flex flex-row justify-center items-center mt-6">
                <p className="text-lg">
                    {"I am a "}
                    <Link
                        className="font-bold text-blue-600 hover:underline"
                        href="https://warwick.ac.uk/study/undergraduate/courses/beng-computer-systems-engineering/"
                        target="_blank"
                    >
                        Computer Systems Engineering
                    </Link>
                    {" student at the "}
                    <Link
                        className="font-bold text-blue-600 hover:underline"
                        href="https://warwick.ac.uk/"
                        target="_blank"
                    >
                        University of Warwick
                    </Link>
                    {", currently on a sandwich year working as a quantitative technology intern at "}
                    <Link
                        className="font-bold text-blue-600 hover:underline"
                        href="https://www.qube-rt.com/"
                        target="_blank"
                    >
                        Qube Research and Technologies
                    </Link>
                    . Through work, personal, and university projects, I have gained experience with many
                    programming languages and libraries.
                </p>
            </div>
        </div>
    );
};
