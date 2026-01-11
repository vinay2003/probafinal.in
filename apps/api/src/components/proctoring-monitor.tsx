"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { AlertTriangle, Camera, Maximize, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProctoringMonitorProps {
    onCheatDetected: (reason: string) => void;
}

export function ProctoringMonitor({ onCheatDetected }: ProctoringMonitorProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [streamActive, setStreamActive] = useState(false);
    const [warnings, setWarnings] = useState<string[]>([]);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // 1. Camera Access
    useEffect(() => {
        async function startCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setStreamActive(true);
                }
            } catch (err) {
                console.error("Camera access denied", err);
                onCheatDetected("Camera/Mic access denied. Test requires active monitoring.");
            }
        }
        startCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    // 2. Tab Switching Detection
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                const msg = `Tab switch detected at ${new Date().toLocaleTimeString()}`;
                setWarnings(prev => [...prev, msg]);
                onCheatDetected("Tab switching is not allowed.");
            }
        };

        const handleBlur = () => {
            const msg = `Focus lost at ${new Date().toLocaleTimeString()}`;
            setWarnings(prev => [...prev, msg]);
            // strict: onCheatDetected("Window focus lost."); 
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("blur", handleBlur);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("blur", handleBlur);
        };
    }, []);

    // 3. Fullscreen Enforcement
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, []);

    const enterFullscreen = () => {
        document.documentElement.requestFullscreen().catch(e => console.error(e));
    };

    return (
        <Card className="fixed bottom-4 right-4 w-64 p-2 bg-black/90 text-white shadow-2xl z-50 border-red-500/50 border-2">
            <div className="relative aspect-video bg-muted rounded overflow-hidden mb-2">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                {!streamActive && <div className="absolute inset-0 flex items-center justify-center"><Camera className="w-8 h-8 text-muted-foreground" /></div>}
                <div className="absolute top-1 left-1 bg-red-600 px-2 py-0.5 text-[10px] font-bold rounded animate-pulse">
                    REC
                </div>
            </div>

            <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                    <Eye className="w-3 h-3 text-green-400" />
                    <span className="text-green-400">AI Proctoring Active</span>
                </div>

                {!isFullscreen && (
                    <Button variant="destructive" size="sm" className="w-full h-6 text-xs" onClick={enterFullscreen}>
                        <Maximize className="w-3 h-3 mr-1" /> Go Fullscreen
                    </Button>
                )}

                {warnings.length > 0 && (
                    <div className="bg-red-900/50 p-1 rounded border border-red-500/30">
                        <div className="flex items-center gap-1 text-red-300 font-bold mb-1">
                            <AlertTriangle className="w-3 h-3" /> Warning ({warnings.length})
                        </div>
                        <div className="max-h-12 overflow-y-auto text-[10px] opacity-80">
                            {warnings.slice(-3).map((w, i) => (
                                <div key={i}>{w}</div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
}
