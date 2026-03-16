export interface ProfileField {
  key: string;
  value: string;
  url?: string;
}

export interface Experience {
  hash: string;
  role: string;
  company: string;
  period: string;
  description: string;
  badges: string[];
  details: string[];
}

export interface Project {
  title: string;
  dir: string;
  description: string;
  badges: string[];
  details: string[];
  url?: string;
}

export interface Education {
  hash: string;
  institution: string;
  qualification: string;
  period: string;
  grade?: string;
  details: string[];
}

export const PROFILE_FIELDS: ProfileField[] = [
  { key: "ROLE", value: "Computer Systems Engineering Student" },
  { key: "UNIVERSITY", value: "University of Warwick", url: "https://warwick.ac.uk/" },
  { key: "POSITION", value: "Quantitative Technology Intern", url: "https://www.qube-rt.com/" },
  { key: "COMPANY", value: "Qube Research & Technologies", url: "https://www.qube-rt.com/" },
];

export const CONTACT_FIELDS: ProfileField[] = [
  { key: "EMAIL", value: "jameslaigray@gmail.com", url: "mailto:jameslaigray@gmail.com" },
  { key: "LINKEDIN", value: "jameslaigray", url: "https://www.linkedin.com/in/jameslaigray/" },
  { key: "GITHUB", value: "expiracy", url: "https://github.com/expiracy" },
];

export const BIO_TEXT = "Computer Systems Engineering student with industry experience in quantitative technology. Skilled in C, C++, Python, Java, TypeScript, React, and systems programming.";

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
    period: "Jun 2024 — Present",
    description: "Developing deployment tooling, process management services, and LLM-based support systems.",
    badges: ["C++", "C#", "React", "Python", "CI/CD", "LLM"],
    details: [
      "Improving deployments by developing a tool that automatically generates environment-specific configurations, new supporting tools that leverage these configurations, and integrating the process management service to enhance consistency and reduce manual effort",
      "Designed and implemented a C++ process management service that enables support teams to control and monitor system processes through both a UI and code, eliminating the need for manual SSH interaction",
      "Developed automated tools to generate documentation and samples for multiple languages to a single reference point",
      "Reworked and upgraded system components and the CI/CD pipeline to support C# builds and tests on the Linux environment, increasing code coverage and Linux developer capabilities",
      "Developed an LLM-based support assistant with a React.js frontend using the ReAct framework with custom tools for multi-step reasoning, domain-specific context access, and output verification",
    ],
  },
  {
    hash: "e4f5a6b",
    role: "Tutor",
    company: "MyTutor",
    period: "Jan 2023 — Present",
    description: "Communicating complex concepts in a simple way to help A-Level and GCSE students master subject material.",
    badges: ["Teaching", "Maths", "Physics", "CS"],
    details: [
      "Communicated complex concepts in a simple way to help A-Level and GCSE students master subject material",
    ],
  },
  {
    hash: "b7c8d9e",
    role: "Spring Insight",
    company: "Expedia",
    period: "Apr 2022",
    description: "Gained practical insights into agile methodologies in software engineering and mobile app development.",
    badges: ["Agile", "Mobile Dev"],
    details: [
      "Gained practical insights into the processes and agile methodologies employed in software engineering and mobile app development projects",
    ],
  },
  {
    hash: "f0a1b2c",
    role: "Software Engineering Course",
    company: "Cisco",
    period: "Jun 2019",
    description: "Built and iterated on Python programs, familiarised with Git for collaboration.",
    badges: ["Python", "Git"],
    details: [
      "Gained practical insight into the software development process by building and iterating on basic Python programs, and familiarised with Git for collaboration",
    ],
  },
  {
    hash: "d3e4f5a",
    role: "Work Experience",
    company: "Oracle",
    period: "May 2019",
    description: "Developed a web-based chatbot with a Java Spring backend and HTML/CSS/JS frontend.",
    badges: ["Java", "Spring", "REST", "Gradle"],
    details: [
      "Developed a basic web-based chatbot with a Java Spring backend and an HTML, CSS and JS frontend, gaining hands-on experience with RESTful APIs and using Gradle for dependency management and project build automation",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "FPGA Pacman",
    dir: "fpga-pacman",
    description: "Recreation of Pacman on a Nexys 4 FPGA using Verilog. Achieved the top score in the year.",
    badges: ["Verilog", "FPGA", "VGA"],
    details: [
      "Debugged hardware signals using Verilog test benches in Vivado to verify signals and timings across different digital modules",
      "Implemented custom VGA drivers to manage the graphics output, including frame buffer control and pixel timing generation",
    ],
  },
  {
    title: "Magnetic Electron Trap Simulation",
    dir: "electron-trap-sim",
    description: "Solved and visualised differential equations to model an electron within a magnetic field. Achieved 100%.",
    badges: ["Python", "NumPy", "SciPy", "Matplotlib"],
    details: [
      "Implemented multiprocessing to parallelise simulation code and bypass the Global Interpreter Lock (GIL) to achieve a 20x performance improvement",
    ],
  },
  {
    title: "Multithreaded Packet Sniffer",
    dir: "packet-sniffer",
    description: "Developed a multithreaded packet sniffer to identify domain blacklist violations, SYN attacks, and ARP cache poisoning.",
    badges: ["C", "Networking", "Multithreading"],
    details: [
      "Implemented a thread-safe packet queue with pthreads to dispatch work efficiently to a thread pool, allowing the application to successfully process 1,000,000s of packets without loss",
      "Ensured memory leak, race condition and bug free code by validating code with tools like Valgrind, Helgrind and GDB",
    ],
  },
  {
    title: "Conjugate Gradient Optimisation",
    dir: "sim-optimisation",
    description: "Optimised the conjugate gradient numerical method on a 3D mesh, achieving an 8.88x speedup.",
    badges: ["C", "AVX", "OpenMP", "Cache Optimisation"],
    details: [
      "Leveraged AVX-256 intrinsics, OpenMP directives, and code refactoring to optimise memory data locality",
    ],
  },
  {
    title: "Movie Information Viewer",
    dir: "movie-viewer",
    description: "Implemented data structures from scratch and applied each to minimise lookup time.",
    badges: ["Java", "Data Structures"],
    details: [
      "Implemented binary heap, hash map, linked list, array list, and graph from scratch; applied each appropriately to minimise lookup time based on context",
      "Implemented an algorithm to find the distance via common movies between 2 distinct cast members",
    ],
  },
  {
    title: "Resistor Image Scanner",
    dir: "resistor-scanner",
    description: "Web app using image processing techniques to identify resistor values from images. Achieved 100%.",
    url: "https://github.com/expiracy/resistor",
    badges: ["Python", "OpenCV", "Flask"],
    details: [
      "Developed various image transformation pipelines using OpenCV for resistor localisation, image normalisation (denoising, deblurring, removing glare), and final colour extraction",
      "Implemented the K-Means clustering algorithm to segment colour regions and accurately detect resistor band positions",
    ],
  },
  {
    title: "Discord Drive",
    dir: "discord-drive",
    description: "A proof of concept full-stack web app allowing users to store files via Discord and browse them in a browser.",
    url: "https://github.com/expiracy/discord-drive",
    badges: ["Python", "Quart", "SQLite"],
    details: [
      "Designed and implemented a 3NF SQL database to optimise storage and retrieval of user file data, ensuring efficient and scalable performance",
    ],
  },
  {
    title: "Stock Browser & News Analysis",
    dir: "stock-browser",
    description: "App for viewing stock info, discovering stocks, tracking portfolios and performing news sentiment analysis.",
    badges: ["Java", "Vaadin", "JPA", "PostgreSQL"],
    details: [],
  },
  {
    title: "Gig Management Application",
    dir: "gig-manager",
    description: "A gig management system for venues to create, manage, and query information about gigs and acts.",
    badges: ["Java", "PostgreSQL", "JDBC"],
    details: [
      "Designed a robust database schema with triggers and views, ensuring robust data validation and providing intuitive database access interfaces",
      "Utilised unit testing to validate both the database design and the database mutators and accessors, ensuring system reliability",
      "Demonstrated proficiency in crafting complex queries through aggregate queries and subqueries",
    ],
  },
  {
    title: "Simple Circuit Solver",
    dir: "circuit-solver",
    description: "Algorithms that solve simple circuits consisting of only Ohmic components.",
    url: "https://github.com/expiracy/circuit-calculator",
    badges: ["Python", "Graphs"],
    details: [],
  },
  {
    title: "Rhythm Game Score Bot",
    dir: "rhythm-bot",
    description: "A Discord bot allowing users to save and showcase scores across multiple servers through custom-generated interactive embeds.",
    badges: ["Python", "SQLite", "Discord API"],
    details: [
      "Implemented asynchronous handling for user interactions to improve system responsiveness",
    ],
  },
];

export const education: Education[] = [
  {
    hash: "c4d5e6f",
    institution: "University of Warwick",
    qualification: "BEng Computer Systems Engineering (Year in Industry)",
    period: "2022 — 2026",
    grade: "First Class (83.3%)",
    details: [
      "Award for Exceptional Performance (2nd Year)",
      "Key Modules: AI, Data Structures, Operating Systems & Networks, Data Analytics, Computer Architecture, FPGAs, Software Engineering",
    ],
  },
  {
    hash: "a7b8c9d",
    institution: "Reading School",
    qualification: "A-Levels: Physics (A*), Maths (A*), Computer Science (A*)",
    period: "2019 — 2022",
    details: [
      "100% achieved in Computer Science Coursework",
      "Computer Science Award",
    ],
  },
  {
    hash: "b3c4d5e",
    institution: "Herschel Grammar School",
    qualification: "GCSEs: 9, 9, 9, 8, 8, 8, 7, 7, 7, 7",
    period: "2016 — 2019",
    details: [
      "Computer Science (9), Music (9), Geography (9)",
      "Maths (8), Physics (8), Chemistry (8)",
      "Biology (7), Religious Studies (7), English Literature (7), English Language (7)",
    ],
  },
];
