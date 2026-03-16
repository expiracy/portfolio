import React from "react";

export const TerminalCursor: React.FC = () => {
  return (
    <div className="flex items-center gap-0 mt-2">
      <span className="text-terminal-green">$ </span>
      <span className="w-2 h-4 bg-terminal-green animate-blink inline-block"></span>
    </div>
  );
};
