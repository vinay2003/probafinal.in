"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { useThemeStore, type ColorTheme } from "@/hooks/use-theme-store"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const themes: { name: string; value: ColorTheme; color: string }[] = [
    { name: "Violet", value: "theme-violet", color: "bg-violet-600" },
    { name: "Blue", value: "theme-blue", color: "bg-blue-600" },
    { name: "Green", value: "theme-green", color: "bg-green-600" },
    { name: "Orange", value: "theme-orange", color: "bg-orange-500" },
    { name: "Red", value: "theme-red", color: "bg-red-600" },
]

export function ThemeCustomizer() {
    const { color, setColor } = useThemeStore()
    const [mounted, setMounted] = React.useState(false)

    // Avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <div className="flex items-center space-x-2">
            <TooltipProvider>
                {themes.map((theme) => (
                    <Tooltip key={theme.value}>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "h-8 w-8 rounded-full p-0 border-2",
                                    color === theme.value ? "border-primary" : "border-transparent"
                                )}
                                onClick={() => setColor(theme.value)}
                            >
                                <div
                                    className={cn(
                                        "h-6 w-6 rounded-full",
                                        theme.color
                                    )}
                                >
                                    {color === theme.value && (
                                        <Check className="h-4 w-4 text-white mx-auto my-1" />
                                    )}
                                </div>
                                <span className="sr-only">{theme.name}</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{theme.name}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </TooltipProvider>
        </div>
    )
}
