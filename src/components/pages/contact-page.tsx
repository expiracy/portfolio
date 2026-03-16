"use client"

import React, { useState } from "react";
import Link from "next/link";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { CONTACT_FIELDS, ProfileField } from "@/data/content";

const ICONS: Record<string, React.ReactNode> = {
  EMAIL: <FaEnvelope size="1.2em" />,
  LINKEDIN: <FaLinkedin size="1.2em" />,
  GITHUB: <FaGithub size="1.2em" />,
};

function ContactValue({ field }: { field: ProfileField }) {
  const [revealed, setRevealed] = useState(false);

  if (field.hidden && !revealed) {
    return (
      <button
        onClick={() => setRevealed(true)}
        className="text-terminal-dim hover:text-terminal-cyan transition-colors"
      >
        [click to reveal]
      </button>
    );
  }

  if (field.url) {
    return (
      <Link
        href={field.url}
        target={field.url.startsWith("mailto:") ? undefined : "_blank"}
        rel="noopener noreferrer"
        className="text-terminal-cyan hover:underline"
      >
        {field.value}
      </Link>
    );
  }

  return <span className="text-terminal-dim">{field.value}</span>;
}

export const ContactPage: React.FC = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-3xl w-full text-xs md:text-sm">
        <div className="text-terminal-green mb-6">
          $ systemctl status contact-*
        </div>

        <div className="space-y-4">
          {CONTACT_FIELDS.map((field, i) => (
            <div key={i} className="border border-terminal-border bg-terminal-bg p-4 rounded-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-terminal-green">●</span>
                <span className="text-terminal-cyan">{ICONS[field.key]}</span>
                <span className="text-terminal-green font-bold text-sm md:text-base">
                  {field.key.toLowerCase()}.service
                </span>
                <span className="text-terminal-dim">—</span>
                <span className="text-terminal-dim">{field.key} Profile</span>
              </div>

              <div className="ml-7 space-y-1 text-terminal-dim">
                <div className="flex gap-3">
                  <span className="text-terminal-amber w-16 shrink-0">Active:</span>
                  <span className="text-terminal-green">active (running)</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-terminal-amber w-16 shrink-0">Link:</span>
                  <ContactValue field={field} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-terminal-dim">
          {CONTACT_FIELDS.length} services listed. {CONTACT_FIELDS.length} active.
        </div>
      </div>
    </div>
  );
};
