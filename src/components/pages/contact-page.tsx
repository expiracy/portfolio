"use client"

import React, { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiMail, FiGithub, FiLinkedin, FiCopy, FiCheck, FiExternalLink, FiSend } from "react-icons/fi";
import { CONTACT_FIELDS, ProfileField } from "@/data/content";
import { TerminalPage } from "@/components/terminal-page";
import { ExternalLink } from "@/components/external-link";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  EMAIL: FiMail,
  LINKEDIN: FiLinkedin,
  GITHUB: FiGithub,
};

const EMAIL = CONTACT_FIELDS.find((f) => f.key === "EMAIL")?.value ?? "";
const DEFAULT_SUBJECT = "Hello from your portfolio";

function useCopy(value: string) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => {
    navigator.clipboard
      ?.writeText(value)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {
        /* clipboard unavailable — no-op */
      });
  }, [value]);
  return { copied, copy };
}

/** Live "available for work" status with the owner's local time. */
function StatusLine() {
  const reduce = useReducedMotion();
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/London",
        timeZoneName: "short",
      }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 20_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2 t-body">
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        {!reduce && (
          <span className="absolute inline-flex h-full w-full rounded-full bg-terminal-green opacity-60 animate-ping" />
        )}
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-terminal-green" />
      </span>
      <span className="text-terminal-green font-bold">available for work</span>
      <span className="text-terminal-dim">· {time ?? "--:--"} local</span>
    </div>
  );
}

function ConnectionRow({ field }: { field: ProfileField }) {
  const Icon = ICON_MAP[field.key] ?? FiMail;
  const isEmail = field.key === "EMAIL";
  const { copied, copy } = useCopy(isEmail ? field.value : field.url ?? field.value);

  return (
    <div className="group flex items-center gap-3 px-3 py-2 border border-terminal-border rounded-sm bg-terminal-bg transition-colors hover:border-terminal-green/50">
      <Icon className="w-4 h-4 shrink-0 text-terminal-dim transition-colors group-hover:text-terminal-green" />
      <div className="min-w-0 flex-1">
        <div className="t-body text-terminal-green truncate">{field.value}</div>
      </div>
      <div className="flex items-center gap-0.5 shrink-0">
        <button
          type="button"
          onClick={copy}
          aria-label={`Copy ${field.key.toLowerCase()}`}
          className="p-1.5 text-terminal-dim transition-colors hover:text-terminal-green"
        >
          {copied ? (
            <FiCheck className="w-3.5 h-3.5 text-terminal-green" />
          ) : (
            <FiCopy className="w-3.5 h-3.5" />
          )}
        </button>
        {field.url &&
          (isEmail ? (
            <a
              href={field.url}
              aria-label="Email James"
              className="p-1.5 text-terminal-dim transition-colors hover:text-terminal-green"
            >
              <FiExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <ExternalLink
              href={field.url}
              aria-label={`Open ${field.key.toLowerCase()}`}
              className="p-1.5 text-terminal-dim transition-colors hover:text-terminal-green"
            >
              <FiExternalLink className="w-3.5 h-3.5" />
            </ExternalLink>
          ))}
      </div>
    </div>
  );
}

function Composer() {
  const reduce = useReducedMotion();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const { copied, copy } = useCopy(EMAIL);

  // ── Single integration point ──
  // Static export has no backend, so we hand off to the visitor's mail client.
  // To deliver straight to an inbox instead, replace this body with a
  // `fetch("https://formspree.io/f/<id>", { method: "POST", … })`.
  const deliver = useCallback((subj: string, body: string) => {
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    const subj = subject.trim() || DEFAULT_SUBJECT;
    setSent(true);
    deliver(subj, message);
  };

  const canSend = message.trim().length > 0;

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col overflow-hidden rounded-sm border border-terminal-border bg-terminal-bg-light/40 lg:flex-1 lg:min-h-0"
    >
      <div className="flex items-center gap-2 border-b border-terminal-border bg-terminal-bg-light/60 px-3 py-2 t-micro text-terminal-dim">
        <FiSend className="w-3 h-3" /> compose — mail james_gray
      </div>

      <div className="flex flex-col gap-3 p-3 lg:flex-1 lg:min-h-0">
        <div className="flex items-center gap-2 t-body">
          <span className="font-bold text-terminal-amber">To:</span>
          <span className="truncate text-terminal-green">{EMAIL}</span>
          <FiCheck className="w-3.5 h-3.5 shrink-0 text-terminal-green" />
        </div>

        <label className="flex flex-col gap-1">
          <span className="t-micro font-bold text-terminal-amber">Subject:</span>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder={DEFAULT_SUBJECT}
            className="rounded-sm border border-terminal-border bg-terminal-bg px-2 py-1.5 t-body text-terminal-green caret-terminal-green outline-none transition-colors placeholder:text-terminal-dim/40 focus:border-terminal-green/60"
          />
        </label>

        <label className="flex flex-col gap-1 lg:flex-1 lg:min-h-0">
          <span className="t-micro font-bold text-terminal-amber">Message:</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="type your message…"
            className="min-h-[140px] resize-none rounded-sm border border-terminal-border bg-terminal-bg px-2 py-1.5 t-body text-terminal-green caret-terminal-green outline-none transition-colors placeholder:text-terminal-dim/40 focus:border-terminal-green/60 lg:flex-1"
          />
        </label>

        {sent && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="t-micro space-y-0.5 border-l-2 border-terminal-green/50 pl-2"
          >
            <div className="text-terminal-dim break-all">
              $ mail -s &quot;{subject.trim() || DEFAULT_SUBJECT}&quot; james_gray
            </div>
            <div className="text-terminal-green">✓ message composed — opening your mail client…</div>
          </motion.div>
        )}

        <div className="flex items-center justify-between gap-2 pt-1">
          <button
            type="button"
            onClick={copy}
            className="t-micro text-terminal-dim transition-colors hover:text-terminal-green"
          >
            {copied ? "copied!" : "or copy address"}
          </button>
          <button
            type="submit"
            disabled={!canSend}
            className={cn(
              "flex items-center gap-2 rounded-sm border px-4 py-1.5 t-body font-bold transition-colors",
              canSend
                ? "border-terminal-green text-terminal-green hover:bg-terminal-green/10"
                : "cursor-not-allowed border-terminal-border text-terminal-dim",
            )}
          >
            <FiSend className="w-3.5 h-3.5" /> send
          </button>
        </div>
      </div>
    </form>
  );
}

export const ContactPage: React.FC = () => {
  const reduce = useReducedMotion();
  // Gentle top-to-bottom stagger: short items rise + fade; the full-height
  // composer fades only (a transform on it would nudge a scrollbar on mount).
  const rise = reduce ? "" : "fade-rise";
  const fade = reduce ? "" : "fade-soft";
  const at = (i: number): React.CSSProperties | undefined =>
    reduce ? undefined : { animationDelay: `${i * 80}ms` };

  return (
    <TerminalPage
      command="./contact.sh"
      showSearch={false}
      footer="I read every message"
    >
      {() => (
        <div className="grid gap-4 lg:h-full lg:grid-cols-2 lg:gap-6">
          {/* Left — identity, status & connections fade in top-to-bottom */}
          <div className="flex flex-col gap-4 lg:min-h-0">
            <p className={cn("t-body text-terminal-dim leading-relaxed", rise)} style={at(0)}>
              Let&apos;s build something. Reach me on any channel — or send a message right here.
            </p>

            <div className={rise} style={at(1)}>
              <StatusLine />
            </div>

            <div className="flex flex-col gap-2">
              {CONTACT_FIELDS.map((field, i) => (
                <div key={field.key} className={rise} style={at(2 + i)}>
                  <ConnectionRow field={field} />
                </div>
              ))}
            </div>
          </div>

          {/* Right — message composer */}
          <div className={cn("flex flex-col lg:min-h-0", fade)} style={at(2)}>
            <Composer />
          </div>
        </div>
      )}
    </TerminalPage>
  );
};
