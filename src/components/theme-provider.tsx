"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { DEFAULT_THEME, isTheme, type Theme } from "@/lib/themes";

const ThemeContext = createContext<{ theme: Theme; setTheme: (t: Theme) => void }>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (isTheme(saved)) setThemeState(saved);
    document.documentElement.setAttribute("data-theme", isTheme(saved) ? saved : DEFAULT_THEME);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    localStorage.setItem("theme", t);
    document.documentElement.setAttribute("data-theme", t);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
