import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import React, { ReactNode } from "react";
import {Header} from "@/components/header"; // Import ReactNode for defining children type

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "James Gray",
  description: "Portfolio",
};

// Define RootLayoutProps type
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning={true}>
        <head/>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
              <Header/>
              {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
