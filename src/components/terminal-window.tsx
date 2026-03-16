import React from "react";

interface TerminalWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({ title, children, className }) => {
  return (
    <div className={`bg-terminal-bg-light border border-terminal-border rounded-sm p-4 md:p-6 max-w-3xl w-full ${className ?? ""}`}>
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-terminal-border">
        <span className="w-3 h-3 rounded-full bg-terminal-red"></span>
        <span className="w-3 h-3 rounded-full bg-terminal-amber"></span>
        <span className="w-3 h-3 rounded-full bg-terminal-green"></span>
        <span className="ml-2 text-terminal-dim text-xs">{title}</span>
      </div>
      {children}
    </div>
  );
};
