import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import React, { ReactNode } from "react";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";

const firaCode = Fira_Code({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], display: "block" });

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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t&&["green","amber","blue","light"].includes(t)){document.documentElement.setAttribute("data-theme",t)}else{document.documentElement.setAttribute("data-theme","green")}}catch(e){document.documentElement.setAttribute("data-theme","green")}})()`,
          }}
        />
        <ThemeProvider>
          <Header/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
