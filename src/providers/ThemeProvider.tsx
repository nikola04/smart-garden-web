import { ThemeContext, type Theme } from "@/contexts/ThemeContext";
import { useCallback, useEffect, useState } from "react";

export const ThemeProvider = ({ children }: {
    children: React.ReactNode
}) => {
    const [theme, setTheme] = useState<Theme|null>(null);

    const applyTheme = (theme: Exclude<Theme, 'system'>) => {
        document.documentElement.classList.toggle("dark", theme === "dark")
    }

    const handleMediaQChange = useCallback((e: MediaQueryListEvent) => {
        if(theme !== 'system')
            return
        if(e.matches) applyTheme("dark")
        else applyTheme("light")
    }, [theme])

    useEffect(() => {
        if(!theme)
            return

        localStorage.setItem("theme", theme);

        if(theme !== "system")
            applyTheme(theme)
        else {
            if(window.matchMedia("(prefers-color-scheme: dark)").matches)
                applyTheme("dark")
            else applyTheme("light")
        }
    }, [theme])

    useEffect(() => {
        const saved = localStorage.getItem("theme") as Theme | null;
        const mQ = window.matchMedia("(prefers-color-scheme: dark)")
        const initial = saved ?? "system";

        setTheme(initial);

        mQ.addEventListener("change", handleMediaQChange)
        return () => mQ.removeEventListener("change", handleMediaQChange)
    }, []);

    return <ThemeContext.Provider value={{ theme, setTheme }}>
        { children }
    </ThemeContext.Provider>
}
