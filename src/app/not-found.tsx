import Link from "next/link";

const ASCII_404 = `██╗  ██╗ ██████╗ ██╗  ██╗
██║  ██║██╔═████╗██║  ██║
███████║██║██╔██║███████║
╚════██║████╔╝██║╚════██║
     ██║╚██████╔╝     ██║
     ╚═╝ ╚═════╝      ╚═╝`;

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-5 px-6 pt-[38px] text-center font-mono">
      <pre className="text-terminal-green text-glow text-[0.55rem] sm:text-xs leading-tight whitespace-pre">
        {ASCII_404}
      </pre>

      <div className="space-y-1">
        <p className="t-body font-bold text-terminal-red">segmentation fault (core dumped)</p>
        <p className="t-body text-terminal-dim">
          <span className="text-terminal-green">$</span> cat that-page &mdash; no such file or directory
        </p>
      </div>

      <Link
        href="/"
        className="rounded-sm border border-terminal-green px-4 py-1.5 t-body font-bold text-terminal-green transition-colors hover:bg-terminal-green/10"
      >
        cd ~ &nbsp;<span className="text-terminal-dim">(return home)</span>
      </Link>
    </main>
  );
}
