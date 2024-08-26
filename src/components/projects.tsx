import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Text } from "@/components/text";
import {Badges} from "@/components/badges";

export interface ProjectInformation {
  title: string;
  description: string;
  badges: string[];
  url?: string;
}

const projectData: ProjectInformation[] = [
  {
    title: "FPGA Pacman",
    description: "A recreation of the retro arcade game Pacman written entirely using Verilog. Scored the highest mark in the year.",
    badges: ["Verilog", "Signal Analysis", "FPGA Hardware Interfacing"]
  },
  {
    title: "Electron Magnetic Field Trap Simulator",
    description: "Simulation and graphical analysis of the trajectory of an electron under within a magnetic field trap. Achieved a mark of 100\%",
    badges: ["Python", "numpy", "scipy", "matplotlib", "Multiprocessing"],
  },
  {
    title: "Stock Browser and News Analysis Application",
    description: "An app that allows users to view detailed stock information, discover stocks, track stocks and view the sentiment of news stories.",
    badges: ["Java", "Vaadin", "JPA", "PostgreSQL"],
  },
  {
    title: "Multithreaded Packet Sniffer",
    description: "Analysed incoming packets for certain properties to detect SYN attacks and ARP cache poisoning.",
    badges: ["C", "Networking", "Multithreading"],
  },
  {
    title: "Simulation Code Optimisation",
    description: "Optimised an application by 8x by optimising cache and memory usage, refactoring code and implementing vector AVX instructions.",
    badges: ["C", "AVX Instructions", "Cache and Memory"],
  },
  {
    title: "Simple Circuit Solver",
    description:
      "Developed algorithms that solved simple circuits consisting of only Ohmic components.",
    url: "https://github.com/expiracy/circuit-calculator",
    badges: ["Python", "Graphs"],
  },
  {
    title: "Discord Drive",
    description:
      "A web application that utilises the discord.py bot API to use discord as a cloud file storage application",
    url: "https://github.com/expiracy/discord-drive",
    badges: ["Python", "Flask", "SQLite", "Discord API"],
  },
  {
    title: "Resistor Value Scanner",
    description:
      "An image processing system that uses the OpenCV library to locate and identify resistor bands to calculate a resistor's value.",
    url: "https://github.com/expiracy/resistor",
    badges: ["Python", "OpenCV", "Flask"]
  },
];

export const Projects = () => {
  return (
    <>
      {projectData.map((project: ProjectInformation, index: number) => (
        <Card key={index} className={"bg-accent border-zinc-200 dark:border-zinc-600 dark:text-zinc-50 text-zinc-900"}>
          <CardHeader className={"px-6 pt-6"}>
            <CardTitle className={"text-3xl"}>{project.title}</CardTitle>
            <Badges className={"items-center"} badges={project.badges ?? []} />
            {project.url ? (
              <Link href={project.url} className="text-blue-600 hover:underline font-semibold break-all">
                Source
              </Link>
            ) : (
              <span className={"font-semibold"}>Closed Source</span>
            )}
          </CardHeader>
          <CardContent>
            {project.description}
          </CardContent>
        </Card>
      ))}
    </>
  );
};
