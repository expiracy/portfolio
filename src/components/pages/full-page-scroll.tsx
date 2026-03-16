"use client"

import React, {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

export interface FullPageScrollProps {
    pages: React.FC[]
}

const PAGE_LABELS = ["~/about", "~/experience", "~/projects"];

function FileTree({ index, onSelect }: { index: number; onSelect: (i: number) => void }) {
    return (
        <div className="text-sm select-none space-y-1">
            {PAGE_LABELS.map((label, i) => (
                <button
                    key={i}
                    onClick={() => onSelect(i)}
                    className={`block w-full text-left px-2 py-1 transition-colors ${
                        i === index
                            ? "text-terminal-green border border-terminal-green/40 bg-terminal-green/10"
                            : "text-terminal-dim hover:text-terminal-green"
                    }`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}

export default function FullPageScroll(props: FullPageScrollProps) {
    const [index, setIndex] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const PageComponent = props.pages[index];

    return (
        <div className="flex h-dvh overflow-hidden">
            {/* Desktop sidebar — always visible on md+ */}
            <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-terminal-border bg-terminal-bg-light pt-14 px-4 py-4">
                <FileTree index={index} onSelect={(i) => setIndex(i)} />
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
                            {PAGE_LABELS.map((label, i) => (
                                <button
                                    key={i}
                                    onClick={() => { setIndex(i); setSidebarOpen(false); }}
                                    className={`block w-full text-left px-4 py-2 transition-colors ${
                                        i === index
                                            ? "text-terminal-green border border-terminal-green/40 bg-terminal-green/10"
                                            : "text-terminal-dim hover:text-terminal-green"
                                    }`}
                                >
                                    {label}
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
