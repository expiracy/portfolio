export interface ProfileField {
  key: string;
  value: string;
  url?: string;
  /** Renders indented under the field above it, so the pair reads as one entry. */
  child?: boolean;
  /** Picks the theme's gold accent instead of the usual link/plain treatment. */
  highlight?: boolean;
}

export interface Tag {
  label: string;
  visible?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  summary: string[];
  tags: Tag[];
  details: string[];
}

export interface Project {
  title: string;
  dir: string;
  description: string;
  tags: Tag[];
  details: string[];
}

export interface Education {
  id: string;
  institution: string;
  qualification: string;
  period: string;
  grade?: string;
  tags: Tag[];
  details: string[];
}

function matchesTags(tags: Tag[], q: string): boolean {
  return tags.some((t) => t.label.toLowerCase().includes(q));
}

export function filterEducation(e: Education, q: string): boolean {
  return (
    e.institution.toLowerCase().includes(q) ||
    e.qualification.toLowerCase().includes(q) ||
    e.period.toLowerCase().includes(q) ||
    (e.grade?.toLowerCase().includes(q) ?? false) ||
    e.details.some((d) => d.toLowerCase().includes(q)) ||
    matchesTags(e.tags, q)
  );
}

export function filterExperience(e: Experience, q: string): boolean {
  return (
    e.role.toLowerCase().includes(q) ||
    e.company.toLowerCase().includes(q) ||
    e.period.toLowerCase().includes(q) ||
    e.summary.some((d) => d.toLowerCase().includes(q)) ||
    matchesTags(e.tags, q)
  );
}

export function filterProject(p: Project, q: string): boolean {
  return (
    p.title.toLowerCase().includes(q) ||
    p.dir.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    matchesTags(p.tags, q)
  );
}

export function filterContact(f: ProfileField, q: string): boolean {
  return (
    f.key.toLowerCase().includes(q) ||
    f.value.toLowerCase().includes(q)
  );
}

/** Single source for the grade — shown on the profile and the education timeline. */
export const DEGREE_GRADE = "First Class (81.1%)";

// The role, the degree and the grade carry no link — the company and university
// rows beneath them already lead somewhere, and highlighting reads better than
// three links stacked together.
export const PROFILE_FIELDS: ProfileField[] = [
  { key: "JOB", value: "Incoming Quant Tech", highlight: true },
  { key: "COMPANY", value: "Qube Research & Technologies", url: "https://www.qube-rt.com/", child: true },
  { key: "UNIVERSITY", value: "University of Warwick", url: "https://warwick.ac.uk/" },
  { key: "DEGREE", value: "BEng Computer Systems Engineering (Year in Industry)", child: true, highlight: true },
  { key: "GRADE", value: DEGREE_GRADE, child: true, highlight: true },
];

export const CONTACT_FIELDS: ProfileField[] = [
  { key: "EMAIL", value: "jameslaigray@gmail.com", url: "mailto:jameslaigray@gmail.com" },
  { key: "LINKEDIN", value: "in/jameslaigray", url: "https://www.linkedin.com/in/jameslaigray/" },
  { key: "GITHUB", value: "@expiracy", url: "https://github.com/expiracy" },
];

export const BIO_TEXT = "Computer Systems Engineering student with industry experience in quantitative technology. Skilled in C, C++, C#, Python, Java, TypeScript and React, across systems programming, hardware and machine learning.";

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
    id: "a1b2c3d",
    role: "Quantitative Technology Intern",
    company: "Qube Research & Technologies",
    period: "Jun 2024 — Jun 2025",
    summary: ["Developed deployment tooling, process management services, and LLM-based support systems."],
    tags: [
      { label: "C++" },
      { label: "C#" },
      { label: "React" },
      { label: "Python" },
      { label: "CI/CD" },
      { label: "LLM" },
      { label: "Linux", visible: false },
      { label: "DevOps", visible: false },
      { label: "TypeScript", visible: false },
      { label: "RAG", visible: false },
      { label: "Infrastructure as Code", visible: false },
    ],
    details: [
      "Designed and implemented a C++ process management service that enables support teams to control and monitor system processes through both a UI and code, eliminating the need for manual SSH interaction",
      "Introduced an infrastructure-as-code initiative that auto-generates environment-specific configurations and wires them into the process management service, establishing a single source of truth",
      "Reworked and upgraded system components and the CI/CD pipeline to support C# builds and tests on the Linux environment, increasing code coverage and unblocking Linux developers",
      "Built an LLM support assistant with a React.js frontend, using RAG over company-specific knowledge in a reasoning-and-act loop with custom tools for multi-step reasoning, context access, and output verification, improving answer accuracy and quality",
      "Developed automated tools to generate documentation and samples for multiple languages to a single reference point",
    ],
  },
  {
    id: "e4f5a6b",
    role: "A-Level and GCSE Tutor",
    company: "MyTutor",
    period: "Jan 2023 — Present",
    summary: ["Communicating complex concepts in a simple way to help A-Level and GCSE students master subject material."],
    tags: [
      { label: "Teaching" },
      { label: "Maths" },
      { label: "Physics" },
      { label: "CS" },
      { label: "Education", visible: false },
      { label: "Tutoring", visible: false },
    ],
    details: [
      "Communicated complex concepts in a simple way to help A-Level and GCSE students master subject material",
    ],
  },
  {
    id: "b7c8d9e",
    role: "Spring Insight",
    company: "Expedia",
    period: "Apr 2022",
    summary: ["Gained practical insights into agile methodologies in software engineering and mobile app development."],
    tags: [
      { label: "Agile" },
      { label: "Mobile Dev" },
      { label: "Software Engineering", visible: false },
    ],
    details: [
      "Gained practical insights into the processes and agile methodologies employed in software engineering and mobile app development projects",
    ],
  },
  {
    id: "f0a1b2c",
    role: "Software Engineering Course",
    company: "Cisco",
    period: "Jun 2019",
    summary: ["Built and iterated on Python programs, familiarised with Git for collaboration."],
    tags: [
      { label: "Python" },
      { label: "Git" },
      { label: "Software Engineering", visible: false },
    ],
    details: [
      "Gained practical insight into the software development process by building and iterating on basic Python programs, and familiarised with Git for collaboration",
    ],
  },
  {
    id: "d3e4f5a",
    role: "Work Experience",
    company: "Oracle",
    period: "May 2019",
    summary: ["Developed a web-based chatbot with a Java Spring backend and HTML/CSS/JS frontend."],
    tags: [
      { label: "Java" },
      { label: "Spring" },
      { label: "REST" },
      { label: "Gradle" },
      { label: "HTML", visible: false },
      { label: "CSS", visible: false },
      { label: "JavaScript", visible: false },
    ],
    details: [
      "Developed a basic web-based chatbot with a Java Spring backend and an HTML, CSS and JS frontend, gaining hands-on experience with RESTful APIs and using Gradle for dependency management and project build automation",
    ],
  },
];

// Ordered to match the CV's "Key Projects" section — dissertation first, then the
// systems work, then everything else roughly newest-first.
export const projects: Project[] = [
  {
    title: "Efficient PPG Sleep Staging",
    dir: "ppg-sleep-staging",
    description: "Final-year dissertation cutting the inference cost of deep sleep-staging models on PPG signals without giving up accuracy.",
    tags: [
      { label: "Python" },
      { label: "PyTorch" },
      { label: "Mamba" },
      { label: "Deep Learning" },
      { label: "Machine Learning", visible: false },
      { label: "ML", visible: false },
      { label: "Time-Series", visible: false },
      { label: "Signal Processing", visible: false },
      { label: "Dissertation", visible: false },
    ],
    details: [
      "Pinpointed the architectural bottlenecks driving inference cost in state-of-the-art PPG sleep-staging models",
      "Designed and implemented Mamba and efficient-attention architectures in PyTorch, holding accuracy (κ = 0.74) across three clinical datasets (MESA, CFS, HOMEPAP)",
      "Raised inference throughput 3.8x while cutting VRAM 53% and model size 57%, making deployment far more scalable",
    ],
  },
  {
    title: "Conjugate Gradient Optimisation",
    dir: "sim-optimisation",
    description: "Optimised the conjugate gradient numerical method on a 3D mesh, achieving an 8.88x speedup.",
    tags: [
      { label: "C" },
      { label: "AVX" },
      { label: "OpenMP" },
      { label: "Cache Optimisation" },
      { label: "HPC", visible: false },
      { label: "Performance", visible: false },
    ],
    details: [
      "Leveraged AVX-256 intrinsics, OpenMP directives, and code refactoring to optimise memory data locality",
    ],
  },
  {
    title: "Mini C Compiler",
    dir: "minic-compiler",
    description: "A compiler for a subset of C, with a hand-written recursive-descent front end and LLVM IR code generation.",
    tags: [
      { label: "C++" },
      { label: "LLVM" },
      { label: "Compilers" },
      { label: "Parsing", visible: false },
      { label: "Code Generation", visible: false },
      { label: "Compiler Design", visible: false },
    ],
    details: [
      "Built a top-down recursive-descent lexer and parser in C++, generating code via LLVM IR, for a subset of C",
      "Produced colourised, informative error diagnostics more detailed than mainstream C compilers",
    ],
  },
  {
    title: "Multithreaded Packet Sniffer",
    dir: "packet-sniffer",
    description: "Developed a multithreaded packet sniffer to identify domain blacklist violations, SYN attacks, and ARP cache poisoning.",
    tags: [
      { label: "C" },
      { label: "Networking" },
      { label: "Multithreading" },
      { label: "Security", visible: false },
      { label: "Linux", visible: false },
    ],
    details: [
      "Implemented a thread-safe packet queue with pthreads feeding a thread pool, processing 1,000,000s of packets without loss",
      "Validated the program was free of memory leaks and race conditions with Valgrind, Helgrind and GDB",
    ],
  },
  {
    title: "FPGA Pacman",
    dir: "fpga-pacman",
    description: "Recreation of Pacman on a Nexys 4 FPGA using Verilog. Achieved the top score in the year.",
    tags: [
      { label: "Verilog" },
      { label: "FPGA" },
      { label: "VGA" },
      { label: "Vivado", visible: false },
      { label: "BRAM", visible: false },
      { label: "Hardware", visible: false },
      { label: "Digital Design", visible: false },
      { label: "High Performance Systems", visible: false },
    ],
    details: [
      "Implemented Pacman's game logic — movement, collisions and scoring — as hardware state machines, taking the top score in the year",
      "Rendered the game from sprites held in on-chip BRAM, with custom frame-drawing logic and a real-time VGA driver built in hardware",
      "Debugged hardware signals using Verilog test benches in Vivado to verify signals and timings across different digital modules",
    ],
  },
  {
    title: "Magnetic Electron Trap Simulation",
    dir: "electron-trap-sim",
    description: "Solved and visualised differential equations to model an electron within a magnetic field. Achieved 100%.",
    tags: [
      { label: "Python" },
      { label: "NumPy" },
      { label: "SciPy" },
      { label: "Matplotlib" },
      { label: "Simulation", visible: false },
      { label: "Physics", visible: false },
    ],
    details: [
      "Implemented multiprocessing to parallelise simulation code and bypass the Global Interpreter Lock (GIL) to achieve a 20x performance improvement",
    ],
  },
  {
    title: "Movie Information Viewer",
    dir: "movie-viewer",
    description: "Implemented data structures from scratch and applied each to minimise lookup time.",
    tags: [
      { label: "Java" },
      { label: "Data Structures" },
      { label: "Algorithms", visible: false },
      { label: "Graphs", visible: false },
    ],
    details: [
      "Implemented binary heap, hash map, linked list, array list, and graph from scratch; applied each appropriately to minimise lookup time based on context",
      "Implemented an algorithm to find the distance via common movies between 2 distinct cast members",
    ],
  },
  {
    title: "Resistor Image Scanner",
    dir: "resistor-scanner",
    description: "Web app using image processing techniques to identify resistor values from images. Achieved 100%.",
    tags: [
      { label: "Python" },
      { label: "OpenCV" },
      { label: "Flask" },
      { label: "Image Processing", visible: false },
      { label: "ML", visible: false },
      { label: "Machine Learning" },
    ],
    details: [
      "Developed various image transformation pipelines using OpenCV for resistor localisation, image normalisation (denoising, deblurring, removing glare), and final colour extraction",
      "Implemented the K-Means clustering algorithm to segment colour regions and accurately detect resistor band positions",
    ],
  },
  {
    title: "Discord Drive",
    dir: "discord-drive",
    description: "A proof of concept full-stack web app allowing users to store files via Discord and browse them in a browser.",
    tags: [
      { label: "Python" },
      { label: "Quart" },
      { label: "SQLite" },
      { label: "Full Stack", visible: false },
      { label: "Discord API", visible: false },
    ],
    details: [
      "Designed and implemented a 3NF SQL database to optimise storage and retrieval of user file data, ensuring efficient and scalable performance",
    ],
  },
  {
    title: "Stock Browser & News Analysis",
    dir: "stock-browser",
    description: "App for viewing stock info, discovering stocks, tracking portfolios and performing news sentiment analysis.",
    tags: [
      { label: "Java" },
      { label: "Vaadin" },
      { label: "JPA" },
      { label: "PostgreSQL" },
      { label: "NLP", visible: false },
      { label: "ML", visible: false },
      { label: "Machine Learning" },
      { label: "Finance", visible: false },
    ],
    details: [],
  },
  {
    title: "Gig Management Application",
    dir: "gig-manager",
    description: "A gig management system for venues to create, manage, and query information about gigs and acts.",
    tags: [
      { label: "Java" },
      { label: "PostgreSQL" },
      { label: "JDBC" },
      { label: "SQL", visible: false },
      { label: "Database Design", visible: false },
    ],
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
    tags: [
      { label: "Python" },
      { label: "Graphs" },
      { label: "Algorithms", visible: false },
      { label: "Electronics", visible: false },
    ],
    details: [],
  },
  {
    title: "Rhythm Game Score Bot",
    dir: "rhythm-bot",
    description: "A Discord bot allowing users to save and showcase scores across multiple servers through custom-generated interactive embeds.",
    tags: [
      { label: "Python" },
      { label: "SQLite" },
      { label: "Discord API" },
      { label: "Async", visible: false },
    ],
    details: [
      "Implemented asynchronous handling for user interactions to improve system responsiveness",
    ],
  },
  {
    title: "search++",
    dir: "search-plus-plus",
    description: "A VS Code extension bringing JetBrains-style search everywhere — files, folders, text, symbols and commands behind one shortcut.",
    tags: [
      { label: "TypeScript" },
      { label: "VS Code" },
      { label: "ripgrep" },
      { label: "Extension", visible: false },
      { label: "Developer Tools", visible: false },
    ],
    details: [
      "Unified filename, folder, ripgrep-backed text, language-server symbol and command search behind a single keyboard-driven modal",
    ],
  },
  {
    title: "Sign Language Detector",
    dir: "sign-language-detector",
    description: "Webcam ASL fingerspelling detector in MATLAB, with the surrounding tooling to collect datasets, train networks and score them.",
    tags: [
      { label: "MATLAB" },
      { label: "CNN" },
      { label: "Computer Vision" },
      { label: "Deep Learning" },
      { label: "Machine Learning", visible: false },
      { label: "ML", visible: false },
    ],
    details: [
      "Trained and compared ResNet-18/50/101 and GoogLeNet backbones, scoring each on accuracy, precision, recall, F1 and confusion matrices",
      "Built the dataset pipeline around the model: webcam image and video capture tools, per-letter timestamping, and a train/test split utility",
    ],
  },
  {
    title: "Connect-N Minimax AI",
    dir: "connect-n-minimax",
    description: "A minimax bot player for generalised Connect-N, benchmarked against a random-move opponent.",
    tags: [
      { label: "Python" },
      { label: "Minimax" },
      { label: "Game AI" },
      { label: "AI", visible: false },
      { label: "Algorithms", visible: false },
    ],
    details: [],
  },
  {
    title: "Maze Solver",
    dir: "maze-solver",
    description: "Search algorithms that explore an unknown maze and route a robot to the exit.",
    tags: [
      { label: "Java" },
      { label: "Search Algorithms" },
      { label: "Graphs", visible: false },
      { label: "Pathfinding", visible: false },
    ],
    details: [],
  },
  {
    title: "Line-Following Buggy",
    dir: "line-buggy",
    description: "Embedded C firmware for a buggy that tracks a line using reflectance sensor feedback.",
    tags: [
      { label: "C" },
      { label: "Embedded" },
      { label: "Microcontroller" },
      { label: "Sensors", visible: false },
      { label: "Control", visible: false },
    ],
    details: [],
  },
  {
    title: "Self-Balancing Robot",
    dir: "balancing-robot",
    description: "Modelled and tuned the control loop for a self-balancing robot in Simulink.",
    tags: [
      { label: "Simulink" },
      { label: "MATLAB" },
      { label: "Control Systems" },
      { label: "Modelling", visible: false },
    ],
    details: [],
  },
];

export const education: Education[] = [
  {
    id: "c4d5e6f",
    institution: "University of Warwick",
    qualification: "BEng Computer Systems Engineering (Year in Industry at QRT)",
    period: "2022 — 2026",
    grade: DEGREE_GRADE,
    tags: [
      { label: "Artificial Intelligence" },
      { label: "AI", visible: false },
      { label: "Machine Learning" },
      // Dropped from the CV's Key Concepts line for space — kept searchable here.
      { label: "Neural Computing", visible: false },
      { label: "Compiler Design" },
      { label: "Data Structures" },
      { label: "Operating Systems" },
      { label: "Networking" },
      { label: "FPGAs" },
      { label: "Databases" },
      { label: "Signal Processing" },
      { label: "C", visible: false },
      { label: "C++", visible: false },
      { label: "Python", visible: false },
      { label: "Java", visible: false },
      { label: "Verilog", visible: false },
      { label: "SoCs", visible: false },
      { label: "Analogue Electronic Design", visible: false },
      { label: "Mathematics", visible: false },
      { label: "Software Engineering", visible: false },
      { label: "Computer Architecture", visible: false },
      { label: "Data Analytics", visible: false },
    ],
    details: [
      "Award: Exceptional Achievement in Second Year",
    ],
  },
  {
    id: "a7b8c9d",
    institution: "Reading School",
    qualification: "A-Levels: Physics (A*), Maths (A*), Computer Science (A*)",
    period: "2019 — 2022",
    tags: [
      { label: "Physics" },
      { label: "Maths" },
      { label: "Computer Science" },
      { label: "A-Level", visible: false },
    ],
    details: [
      "100% achieved in Computer Science Coursework",
      "Award: Computer Science Award",
    ],
  },
  {
    id: "b3c4d5e",
    institution: "Herschel Grammar School",
    qualification: "GCSEs: 9, 9, 9, 8, 8, 8, 7, 7, 7, 7",
    period: "2016 — 2019",
    tags: [
      { label: "GCSE", visible: false },
    ],
    details: [],
  },
];
