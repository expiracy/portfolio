import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * A next/link that always opens in a new tab with safe rel attributes, so the
 * `target="_blank" rel="noopener noreferrer"` triplet lives in exactly one place.
 */
export function ExternalLink(props: Omit<ComponentProps<typeof Link>, "target" | "rel">) {
  return <Link {...props} target="_blank" rel="noopener noreferrer" />;
}
