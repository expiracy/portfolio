import React from "react";

export interface TextLinkProps {
  className?: string,
  href: string,
  text: string
}

export const TextLink : React.FC<TextLinkProps> = (props: TextLinkProps) => {
  return <a
    className={`font-mono font-bold text-blue-600 ${props.className}`}
    href={props.href}
  >
    {props.text}
  </a>
}