import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { ReactNode } from "react"; // Import ReactNode for defining children type

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "James Gray",
  description: "Portfolio website",
};

// Define RootLayoutProps type
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
      <head />
      <body>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
      </body>
      </html>
    </>
  )
}
