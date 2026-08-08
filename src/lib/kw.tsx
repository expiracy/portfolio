import React from "react";

/**
 * Portfolio counterpart of the CV's `\kw{…}` (cv.cls): content strings mark
 * keywords as `**span**`, and KwText renders those spans bold. Same house
 * rules as the CV — bold the key technology/technique and any hard metric,
 * 1–3 short spans per bullet, never whole clauses.
 */
export function KwText({ text }: { text: string }) {
  const parts = text.split("**");
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-bold">
            {part}
          </strong>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

/** Drops the `**` keyword markers, for search matching over the plain text. */
export function stripKw(text: string): string {
  return text.split("**").join("");
}
