"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger, navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {ThemeToggle} from "@/components/theme-toggle";
import {FaGithub, FaLinkedin} from "react-icons/fa";

export function Header() {

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg">
      <NavigationMenu className={"w-full max-w-full justify-between bg-transparent"}>
        <NavigationMenuList>
          {/*<NavigationMenuItem>*/}
          {/*  <NavigationMenuTrigger className={"bg-transparent"}>james gray</NavigationMenuTrigger>*/}
          {/*  <NavigationMenuContent>*/}
          {/*    <ul className="p-4 flex flex-row w-max items-center">*/}
          {/*      <FaLinkedin href="https://www.linkedin.com/in/jameslaigray/" className={"w-auto"}/>*/}
          {/*      <ListItem href="https://www.linkedin.com/in/jameslaigray/" title="LinkedIn">*/}
          {/*        Connect with me!*/}
          {/*      </ListItem>*/}
          {/*      <ListItem href="https://github.com/expiracy" title="GitHub">*/}
          {/*        View my projects!*/}
          {/*      </ListItem>*/}
          {/*    </ul>*/}
          {/*  </NavigationMenuContent>*/}
          {/*</NavigationMenuItem>*/}
          <NavigationMenuItem>
            <Link href="https://www.linkedin.com/in/jameslaigray/" target={"_blank"} passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <FaLinkedin size={"2em"}/>
              </NavigationMenuLink>
            </Link>
            <Link href="https://github.com/expiracy" target={"_blank"} passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <FaGithub size={"2em"}/>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

        </NavigationMenuList>

        <NavigationMenuList>
          <NavigationMenuItem>
            <ThemeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
