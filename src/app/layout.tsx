import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import React, { ReactNode } from "react";
import {Header} from "@/components/header";

const firaCode = Fira_Code({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "james@portfolio:~$",
  description: "James Gray — Portfolio",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <head/>
      <body className={firaCode.className}>
        <Header/>
        {children}
      </body>
    </html>
  )
}
