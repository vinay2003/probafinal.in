"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";

export type HinglishMode = "english" | "hindi" | "spanish" | "hinglish";

interface HinglishToggleProps {
    mode: HinglishMode;
    setMode: (mode: HinglishMode) => void;
}

export function HinglishToggle({ mode, setMode }: HinglishToggleProps) {
    const labels = {
        english: "English",
        hindi: "Hindi",
        spanish: "Spanish",
        hinglish: "Simplified Hinglish"
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" title="Switch Language Mode">
                    <Languages className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Toggle Language Mode</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {(Object.keys(labels) as HinglishMode[]).map((m) => (
                    <DropdownMenuItem key={m} onClick={() => setMode(m)}>
                        <span className={mode === m ? "font-bold" : ""}>{labels[m]}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
