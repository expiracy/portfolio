"use client"

import React from "react";
import Link from "next/link";
import { FiMail, FiGithub, FiLinkedin } from "react-icons/fi";
import { CONTACT_FIELDS, ProfileField } from "@/data/content";
import { TerminalPage } from "@/components/terminal-page";

const ICON_MAP: Record<string, React.ReactNode> = {
  EMAIL: <FiMail className="w-5 h-5 md:w-6 md:h-6" />,
  LINKEDIN: <FiLinkedin className="w-5 h-5 md:w-6 md:h-6" />,
  GITHUB: <FiGithub className="w-5 h-5 md:w-6 md:h-6" />,
};

function ContactCard({ field }: { field: ProfileField }) {
  const icon = ICON_MAP[field.key];
  const content = (
    <div className="flex items-center gap-4 border border-terminal-border rounded-sm px-4 py-3 transition-colors hover:border-terminal-green/40 hover:bg-terminal-green/5 bg-terminal-bg">
      <span className="text-terminal-green shrink-0">{icon}</span>
      <div className="min-w-0">
        <div className="text-terminal-green font-bold text-sm md:text-base">{field.key}</div>
        <div className="text-terminal-dim text-xs md:text-sm truncate">{field.value}</div>
      </div>
    </div>
  );

  if (field.url) {
    return (
      <Link
        href={field.url}
        target={field.url.startsWith("mailto:") ? undefined : "_blank"}
        rel="noopener noreferrer"
      >
        {content}
      </Link>
    );
  }

  return content;
}

export const ContactPage: React.FC = () => {
  return (
    <TerminalPage
      command="cat ~/contacts"
      footer={(search) => {
        const q = search.toLowerCase();
        const filtered = CONTACT_FIELDS.filter(
          (f) => !q || f.key.toLowerCase().includes(q) || f.value.toLowerCase().includes(q)
        );
        return filtered.length === CONTACT_FIELDS.length
          ? `${CONTACT_FIELDS.length} entries`
          : `${filtered.length} of ${CONTACT_FIELDS.length} entries`;
      }}
    >
      {(search) => {
        const q = search.toLowerCase();
        const filtered = CONTACT_FIELDS.filter(
          (f) =>
            !q ||
            f.key.toLowerCase().includes(q) ||
            f.value.toLowerCase().includes(q)
        );

        return (
          <div className="grid gap-3 w-full">
            {filtered.map((field, i) => (
              <ContactCard key={i} field={field} />
            ))}
          </div>
        );
      }}
    </TerminalPage>
  );
};
