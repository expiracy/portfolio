"use client"

import React, { useCallback, useState } from "react";
import { FiCheck, FiCopy, FiExternalLink } from "react-icons/fi";
import { TerminalPage } from "@/components/terminal-page";
import { ExternalLink } from "@/components/external-link";
import { CONTACT_FIELDS, type ProfileField } from "@/data/content";

/**
 * The socials tab: a contents page. Dotted leaders carry the eye from each
 * platform across to its handle, and the copy/open pair closes the line off.
 * Actions stay visible rather than appearing on hover, so the page behaves the
 * same under a thumb as under a pointer.
 */

const EMAIL_KEY = "EMAIL";

const LABELS: Record<string, string> = {
  EMAIL: "Email",
  LINKEDIN: "LinkedIn",
  GITHUB: "GitHub",
};

/** Copy the address itself for email, the profile URL for everything else. */
function copyValue(field: ProfileField): string {
  return field.key === EMAIL_KEY ? field.value : field.url ?? field.value;
}

// No `/opacity` modifiers on the palette here: the tokens are bare `var(--t-*)`
// values, so Tailwind can't inject an alpha channel and the colour drops out.
const ACTION_CLASS =
  "text-terminal-dim transition-colors hover:text-terminal-green focus-visible:text-terminal-green";

function SocialRow({ field, index }: { field: ProfileField; index: number }) {
  const [copied, setCopied] = useState(false);
  const name = LABELS[field.key] ?? field.key.toLowerCase();
  const isEmail = field.key === EMAIL_KEY;

  const copy = useCallback(() => {
    navigator.clipboard
      ?.writeText(copyValue(field))
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {
        /* clipboard unavailable — the handle is still selectable */
      });
  }, [field]);

  return (
    // One line at every width: the leader is the only part that gives up space,
    // so the handle always sits at the end of its own dots rather than dropping
    // below them.
    <div
      className="flex items-baseline gap-2 py-3 fade-rise sm:gap-3 md:py-4"
      style={{ animationDelay: `${140 + index * 90}ms` }}
    >
      {/* Same weight and size as a project title on the projects tab. */}
      <span className="shrink-0 font-bold text-terminal-green">{name}</span>

      <span
        aria-hidden="true"
        // Dotted rules read about half as strong as solid ones, so the leader
        // takes the dim token rather than the fainter border token.
        className="min-w-[0.75rem] flex-1 -translate-y-[0.3em] border-b border-dotted border-terminal-dim"
      />

      <ExternalLink href={field.url ?? "#"} className="shrink-0 text-terminal-cyan hover:underline">
        {field.value}
      </ExternalLink>

      <span className="flex shrink-0 items-center gap-2 sm:gap-3">
        <button type="button" onClick={copy} aria-label={`Copy ${name}`} className={ACTION_CLASS}>
          {copied ? (
            <FiCheck className="h-4 w-4 text-terminal-green" />
          ) : (
            <FiCopy className="h-4 w-4" />
          )}
        </button>
        <a
          href={field.url}
          target={isEmail ? undefined : "_blank"}
          rel={isEmail ? undefined : "noopener noreferrer"}
          aria-label={isEmail ? "Open in your mail client" : `Open ${name}`}
          className={ACTION_CLASS}
        >
          <FiExternalLink className="h-4 w-4" />
        </a>
      </span>
    </div>
  );
}

export const SocialsPage: React.FC = () => (
  <TerminalPage command="socials" showSearch={false} footer={`${CONTACT_FIELDS.length} profiles`}>
    {() => (
      // Centred and set large: three short lines would otherwise sit marooned at
      // the top of a full-height terminal.
      <div className="flex h-full items-center justify-center">
        <div className="w-full text-sm md:text-base">
          {CONTACT_FIELDS.map((field, i) => (
            <SocialRow key={field.key} field={field} index={i} />
          ))}
        </div>
      </div>
    )}
  </TerminalPage>
);
