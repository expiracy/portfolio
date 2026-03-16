"use client"

import React, {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

export interface FullPageScrollProps {
    pages: React.FC[]
}

const PAGE_LABELS = ["~/about", "~/skills", "~/projects"];

export default function FullPageScroll(props: FullPageScrollProps) {
    const [index, setIndex] = useState(0);

    const goNext = () => {
        if (index < props.pages.length - 1) {
            setIndex(index + 1);
        }
    };

    const goPrev = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    const PageComponent = props.pages[index];

    return (
        <div className="flex flex-col h-dvh overflow-y-scroll">
            <div className="flex flex-col h-dvh">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        className="w-[95%] max-w-5xl mx-auto my-auto pt-12"
                        initial={{opacity: 0, y: 30}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -30}}
                        transition={{duration: 0.25}}
                    >
                        <PageComponent/>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Terminal-style navigation */}
            <div className="fixed bottom-0 left-0 right-0 border-t border-terminal-border bg-terminal-bg/90 backdrop-blur-sm">
                <div className="flex items-center justify-between px-4 py-2 max-w-5xl mx-auto text-xs md:text-sm font-mono">
                    {/* Page indicator */}
                    <div className="flex items-center gap-2">
                        {PAGE_LABELS.map((label, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                className={`px-2 py-0.5 transition-colors ${
                                    i === index
                                        ? "text-terminal-green border border-terminal-green/40 bg-terminal-green/10"
                                        : "text-terminal-dim hover:text-terminal-green"
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Navigation arrows */}
                    <div className="flex items-center gap-2">
                        {index > 0 && (
                            <button
                                onClick={goPrev}
                                className="text-terminal-dim hover:text-terminal-green transition-colors px-2"
                            >
                                [prev]
                            </button>
                        )}
                        {index < props.pages.length - 1 && (
                            <button
                                onClick={goNext}
                                className="text-terminal-dim hover:text-terminal-green transition-colors px-2"
                            >
                                [next]
                            </button>
                        )}
                        <span className="text-terminal-dim ml-2">
                            {index + 1}/{props.pages.length}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
