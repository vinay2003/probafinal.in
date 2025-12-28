"use client"

import * as React from "react"
import { useThemeStore } from "@/hooks/use-theme-store"

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
    const { color } = useThemeStore()

    // Apply theme class to body when it changes
    React.useEffect(() => {
        const root = window.document.body
        root.classList.remove("theme-violet", "theme-blue", "theme-green", "theme-orange", "theme-red")
        root.classList.add(color)
    }, [color])

    return <>{children}</>
}
