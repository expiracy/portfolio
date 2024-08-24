import * as React from "react"

import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export interface SkillCardProps {
  title: string,
  className?: string,
  iconSrc: string,
  bg: string
  children?: React.ReactNode
}

export const SkillCard: React.FC<SkillCardProps> = (props: SkillCardProps) => {
  return (
    <Card
      className={`${props.className} ${props.bg} transform transition-transform duration-300 hover:-translate-y-2`}
    >
      <CardHeader>
        <CardTitle className={`break-all text-black mb-2 mx-auto md:text-lg text-sm font-semibold`}>{props.title}</CardTitle>
          <img className={`h-auto w-auto max-h-[50px] md:max-h-[75px] mx-auto`} src={props.iconSrc} alt={props.title}/>
          {props.children}
      </CardHeader>
    </Card>
  )
}
