export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-terminal-border bg-terminal-bg/90 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-2 text-sm">
        <div className="flex items-center gap-4 ml-8 md:ml-0">
          <span className="text-terminal-dim">james@portfolio</span>
          <span className="text-terminal-green">~</span>
        </div>
        <div className="flex items-center gap-2 text-terminal-dim">
          <span className="hidden sm:inline text-terminal-amber">[PID 1337]</span>
          <span className="w-2 h-4 bg-terminal-green animate-blink"></span>
        </div>
      </div>
    </header>
  )
}
