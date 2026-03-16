export interface ProfileField {
  key: string;
  value: string;
  url?: string;
  hidden?: boolean;
}

export interface Experience {
  hash: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Project {
  title: string;
  dir: string;
  description: string;
  badges: string[];
  url?: string;
}

export const PROFILE_FIELDS: ProfileField[] = [
  { key: "ROLE", value: "Computer Systems Engineering Student" },
  { key: "UNIVERSITY", value: "University of Warwick", url: "https://warwick.ac.uk/" },
  { key: "POSITION", value: "Quantitative Technology Intern", url: "https://www.qube-rt.com/" },
  { key: "COMPANY", value: "Qube Research & Technologies", url: "https://www.qube-rt.com/" },
];

export const CONTACT_FIELDS: ProfileField[] = [
  { key: "EMAIL", value: "jameslaigray@gmail.com", url: "mailto:jameslaigray@gmail.com", hidden: true },
  { key: "LINKEDIN", value: "jameslaigray", url: "https://www.linkedin.com/in/jameslaigray/" },
  { key: "GITHUB", value: "expiracy", url: "https://github.com/expiracy" },
];

export const BIO_TEXT = "Through work, personal, and university projects, I have gained experience with many programming languages and libraries.";

export const ASCII_JAMES = `     ██╗ █████╗ ███╗   ███╗███████╗███████╗
     ██║██╔══██╗████╗ ████║██╔════╝██╔════╝
     ██║███████║██╔████╔██║█████╗  ███████╗
██   ██║██╔══██║██║╚██╔╝██║██╔══╝  ╚════██║
╚█████╔╝██║  ██║██║ ╚═╝ ██║███████╗███████║
 ╚════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚══════╝`;

export const ASCII_GRAY = ` ██████╗ ██████╗  █████╗ ██╗   ██╗
██╔════╝ ██╔══██╗██╔══██╗╚██╗ ██╔╝
██║  ███╗██████╔╝███████║ ╚████╔╝
██║   ██║██╔══██╗██╔══██║  ╚██╔╝
╚██████╔╝██║  ██║██║  ██║   ██║
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝`;

export const experiences: Experience[] = [
  {
    hash: "a1b2c3d",
    role: "Quantitative Technology Intern",
    company: "Qube Research & Technologies",
    period: "2024 — 2025",
    description: "Placeholder description.",
  },
  {
    hash: "e4f5a6b",
    role: "placeholder",
    company: "placeholder",
    period: "20XX — 20XX",
    description: "Placeholder description.",
  },
];

export const projects: Project[] = [
  {
    title: "FPGA Pacman",
    dir: "fpga-pacman",
    description: "Recreation of Pacman in Verilog on FPGA hardware. Scored the highest mark in the year.",
    badges: ["Verilog", "Signal Analysis", "FPGA"],
  },
  {
    title: "Electron Magnetic Field Trap Simulator",
    dir: "electron-trap-sim",
    description: "Simulation and graphical analysis of electron trajectories in magnetic field traps. 100% mark.",
    badges: ["Python", "numpy", "scipy", "matplotlib"],
  },
  {
    title: "Stock Browser & News Analysis",
    dir: "stock-browser",
    description: "App for viewing stock info, discovering stocks, tracking portfolios and news sentiment analysis.",
    badges: ["Java", "Vaadin", "JPA", "PostgreSQL"],
  },
  {
    title: "Multithreaded Packet Sniffer",
    dir: "packet-sniffer",
    description: "Analysed incoming packets to detect SYN attacks and ARP cache poisoning.",
    badges: ["C", "Networking", "Multithreading"],
  },
  {
    title: "Simulation Code Optimisation",
    dir: "sim-optimisation",
    description: "8x speedup via cache optimisation, code refactoring and AVX vector instructions.",
    badges: ["C", "AVX", "Cache Optimisation"],
  },
  {
    title: "Simple Circuit Solver",
    dir: "circuit-solver",
    description: "Algorithms that solve simple circuits consisting of only Ohmic components.",
    url: "https://github.com/expiracy/circuit-calculator",
    badges: ["Python", "Graphs"],
  },
  {
    title: "Discord Drive",
    dir: "discord-drive",
    description: "Web app using discord.py bot API to use Discord as cloud file storage.",
    url: "https://github.com/expiracy/discord-drive",
    badges: ["Python", "Flask", "SQLite", "Discord API"],
  },
  {
    title: "Resistor Value Scanner",
    dir: "resistor-scanner",
    description: "Image processing system using OpenCV to identify resistor bands and calculate values.",
    url: "https://github.com/expiracy/resistor",
    badges: ["Python", "OpenCV", "Flask"],
  },
];
