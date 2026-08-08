"use client"

import React, { useCallback, useState } from "react";
import { FiCheck, FiCopy, FiExternalLink, FiGithub, FiLinkedin, FiMail, FiX } from "react-icons/fi";
import { TerminalPage } from "@/components/terminal-page";
import { ExternalLink } from "@/components/external-link";
import { CONTACT_FIELDS, type ProfileField } from "@/data/content";

/**
 * The socials tab as a business card: one framed block headed by the name, with
 * a row per profile inside it. Dotted leaders carry the eye from each platform
 * across to its handle, and the copy/open pair closes the line off. Actions stay
 * visible rather than appearing on hover, so the page behaves the same under a
 * thumb as under a pointer; hovering a row picks it out with the same chevron
 * marker the project cards and timeline rows use.
 */

const EMAIL_KEY = "EMAIL";

const LABELS: Record<string, string> = {
  EMAIL: "Email",
  LINKEDIN: "LinkedIn",
  GITHUB: "GitHub",
};

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  EMAIL: FiMail,
  LINKEDIN: FiLinkedin,
  GITHUB: FiGithub,
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
  const Icon = ICONS[field.key] ?? FiMail;
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
      className="group relative flex items-baseline gap-2 rounded-sm py-3 transition-colors fade-rise hover:bg-terminal-bg-light sm:gap-3 md:py-4"
      style={{ animationDelay: `${140 + index * 90}ms` }}
    >
      {/* The same marker the project cards and timeline rows slide in on hover.
          It lives in the card's own padding so the icons still line up with the
          title bar above. */}
      <span
        aria-hidden="true"
        className="absolute -left-3 top-1/2 -translate-x-2 -translate-y-1/2 font-bold text-terminal-green opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none md:-left-4"
      >
        &gt;
      </span>

      {/* Same weight and size as a project title on the projects tab. The name
          drops below `sm` so a long handle keeps its own line — the icon still
          says which platform it is. */}
      <span className="flex shrink-0 items-center gap-2 font-bold text-terminal-green">
        <Icon className="h-4 w-4 text-terminal-amber" />
        <span className="hidden sm:inline">{name}</span>
      </span>

      <span
        aria-hidden="true"
        // Dotted rules read about half as strong as solid ones, so the leader
        // takes the dim token rather than the fainter border token.
        className="min-w-[0.5rem] flex-1 -translate-y-[0.3em] border-b border-dotted border-terminal-dim transition-colors group-hover:border-terminal-green sm:min-w-[0.75rem]"
      />

      <ExternalLink
        href={field.url ?? "#"}
        // Allowed to give way on the narrowest screens rather than push the
        // actions out of the card.
        className="min-w-0 break-all text-terminal-cyan hover:underline group-hover:underline sm:shrink-0 sm:break-normal"
      >
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
      // Centred: three short lines would otherwise sit marooned at the top of a
      // full-height terminal.
      <div className="flex h-full items-center justify-center">
        <div className="w-full max-w-2xl overflow-hidden rounded-sm border border-terminal-border fade-rise">
          {/* Title bar. The ✕ is window dressing, not a control — it carries no
              button semantics and is hidden from assistive tech, so nobody is
              invited to click something that does nothing. */}
          <div className="flex items-baseline gap-2 border-b border-terminal-border bg-terminal-bg-light px-4 py-2 sm:px-5 md:px-6">
            <span className="text-sm font-bold text-terminal-green md:text-base">james_gray</span>
            <span className="t-micro text-terminal-dim">— socials</span>
            <FiX className="ml-auto h-4 w-4 shrink-0 self-center text-terminal-dim" aria-hidden="true" />
          </div>

          {/* Steps down to the site's body size on phones so a full email address
              still fits on one line inside the frame. Horizontal padding matches
              the title bar, so the row icons sit under the window title. */}
          <div className="px-4 py-4 text-xs sm:px-5 sm:py-5 sm:text-sm md:px-6 md:py-6 md:text-base">
            <div className="t-micro text-terminal-dim">Find me on</div>
            {CONTACT_FIELDS.map((field, i) => (
              <SocialRow key={field.key} field={field} index={i} />
            ))}
          </div>
        </div>
      </div>
    )}
  </TerminalPage>
);
