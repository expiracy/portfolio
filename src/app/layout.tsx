import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import React, { ReactNode } from "react";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { THEMES, DEFAULT_THEME } from "@/lib/themes";

const firaCode = Fira_Code({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], display: "block" });

// Blocking pre-hydration script that applies the saved theme before first paint
// (prevents a flash). Derived from THEMES so adding a theme needs no edits here.
const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");document.documentElement.setAttribute("data-theme",${JSON.stringify(THEMES)}.indexOf(t)>-1?t:${JSON.stringify(DEFAULT_THEME)})}catch(e){document.documentElement.setAttribute("data-theme",${JSON.stringify(DEFAULT_THEME)})}})()`;

export const metadata: Metadata = {
  title: "james@portfolio:~$",
  description: "James Gray — Portfolio",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head/>
      <body className={firaCode.className}>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ThemeProvider>
          <Header/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
