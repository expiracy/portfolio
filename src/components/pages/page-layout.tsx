"use client"

import React, {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {AboutMePage} from "@/components/pages/about-me-page";
import {ExperiencePage} from "@/components/pages/experience-page";
import {ProjectsPage} from "@/components/pages/projects-page";

interface PageDefinition {
    label: string;
    component: React.FC;
}

const PAGES: PageDefinition[] = [
    { label: "about", component: AboutMePage },
    { label: "experience", component: ExperiencePage },
    { label: "projects", component: ProjectsPage },
];

function FileTree({ pages, index, onSelect }: { pages: PageDefinition[]; index: number; onSelect: (i: number) => void }) {
    return (
        <div className="text-sm select-none space-y-1">
            {pages.map((page, i) => (
                <button
                    key={i}
                    onClick={() => onSelect(i)}
                    className={`block w-full text-left px-2 py-1 transition-colors ${
                        i === index
                            ? "text-terminal-green border border-terminal-green/40 bg-terminal-green/10"
                            : "text-terminal-dim hover:text-terminal-green"
                    }`}
                >
                    {page.label}
                </button>
            ))}
        </div>
    );
}

export default function PageLayout() {
    const [index, setIndex] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const PageComponent = PAGES[index].component;

    return (
        <div className="flex h-dvh overflow-hidden">
            {/* Desktop sidebar */}
            <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-terminal-border bg-terminal-bg-light pt-14 px-4 py-4">
                <FileTree pages={PAGES} index={index} onSelect={(i) => setIndex(i)} />
            </aside>

            {/* Mobile hamburger button */}
            <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden fixed top-2.5 left-3 z-50 text-terminal-dim hover:text-terminal-green transition-colors p-1 text-xl leading-none"
                aria-label="Open navigation"
            >
                ≡
            </button>

            {/* Mobile full-screen overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        className="md:hidden fixed inset-0 z-50 bg-terminal-bg flex flex-col items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="absolute top-3 left-3 text-terminal-dim hover:text-terminal-green transition-colors text-xl p-1"
                            aria-label="Close navigation"
                        >
                            ✕
                        </button>

                        <div className="text-lg select-none space-y-2">
                            {PAGES.map((page, i) => (
                                <button
                                    key={i}
                                    onClick={() => { setIndex(i); setSidebarOpen(false); }}
                                    className={`block w-full text-left px-4 py-2 transition-colors ${
                                        i === index
                                            ? "text-terminal-green border border-terminal-green/40 bg-terminal-green/10"
                                            : "text-terminal-dim hover:text-terminal-green"
                                    }`}
                                >
                                    {page.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main content */}
            <div className="flex-1 overflow-y-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        className="w-[95%] max-w-5xl mx-auto pt-14 pb-8 min-h-dvh flex items-center"
                        initial={{opacity: 0, y: 30}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -30}}
                        transition={{duration: 0.25}}
                    >
                        <div className="w-full">
                            <PageComponent/>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
