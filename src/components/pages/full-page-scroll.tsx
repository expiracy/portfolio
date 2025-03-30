"use client"

import React, {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

export interface FullPageScrollProps {
    pages: React.FC[]
}

export default function FullPageScroll(props: FullPageScrollProps) {
    const [index, setIndex] = useState(0);

    // useEffect(() => {
    //     const handleScroll = (event: any) => {
    //         if (event.deltaY > 0 && index < props.pages.length - 1) {
    //             setIndex((prev) => prev + 1);
    //         } else if (event.deltaY < 0 && index > 0) {
    //             setIndex((prev) => prev - 1);
    //         }
    //     };
    //     window.addEventListener("wheel", handleScroll);
    //     return () => window.removeEventListener("wheel", handleScroll);
    // }, [index, props.pages.length]);

    const PageComponent = props.pages[index];

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

    return (
        <div className="flex flex-col h-dvh overflow-y-scroll">
            <div className="flex flex-col h-dvh">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        className="w-[95%] mx-auto my-auto"
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -50}}
                        transition={{duration: 0.3}}
                    >
                        <PageComponent/>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Down/Up Arrows */}
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 items-center flex flex-row space-x-2">
                {/* Up Arrow */}
                {index > 0 && (
                    <motion.div
                        className="cursor-pointer p-2 bg-secondary-foreground rounded-full"
                        onClick={goPrev}
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.9}}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="text-primary-foreground"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 4l-6 6h4v6h4v-6h4l-6-6z"
                            />
                        </svg>
                    </motion.div>
                )}

                {/* Down Arrow */}
                {index < props.pages.length - 1 && (
                    <motion.div
                        className="cursor-pointer p-2 bg-secondary-foreground rounded-full"
                        onClick={goNext}
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.9}}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="text-primary-foreground"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 20l6-6h-4v-6h-4v6h-4l6 6z"
                            />
                        </svg>
                    </motion.div>
                )}
            </div>
        </div>

    );
}