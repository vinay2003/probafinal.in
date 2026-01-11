"use client";

import { useState, useEffect, useRef } from "react";
import { generateInterviewQuestionsAction, analyzeInterviewAnswerAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Video, VideoOff, Loader2, Play, ChevronRight, Volume2, Monitor, MonitorOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

// Web Speech API Types
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

export default function InterviewPage() {
    const { toast } = useToast();

    // Setup State
    const [setupComplete, setSetupComplete] = useState(false);
    const [config, setConfig] = useState({
        role: "Full Stack Developer",
        experience: "2 years",
        description: "Focus on React, Node.js and System Design."
    });

    // Interview State
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [analysis, setAnalysis] = useState<any>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [cameraActive, setCameraActive] = useState(false);
    const [screenActive, setScreenActive] = useState(false);

    // Refs
    const videoRef = useRef<HTMLVideoElement>(null);
    const screenRef = useRef<HTMLVideoElement>(null);
    const recognitionRef = useRef<any>(null);
    const silenceTimer = useRef<NodeJS.Timeout | null>(null);

    // 1. Initialize Camera
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setCameraActive(true);
            }
        } catch (err) {
            toast({ title: "Camera Error", description: "Could not access webcam.", variant: "destructive" });
        }
    };

    // 2. Initialize Screen Share
    const startScreenShare = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
            if (screenRef.current) {
                screenRef.current.srcObject = stream;
                setScreenActive(true);
            }
            // Handle stream stop (user clicks "Stop sharing" in browser UI)
            stream.getVideoTracks()[0].onended = () => {
                setScreenActive(false);
            };
        } catch (err) {
            console.error(err);
            // User cancelled or error
            setScreenActive(false);
        }
    };

    const stopScreenShare = () => {
        if (screenRef.current && screenRef.current.srcObject) {
            const stream = screenRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            setScreenActive(false);
        }
    }

    // 3. Initialize Speech Recognition
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.lang = 'en-US';

                recognition.onresult = (event: any) => {
                    let finalTranscript = '';
                    for (let i = event.resultIndex; i < event.results.length; ++i) {
                        if (event.results[i].isFinal) {
                            finalTranscript += event.results[i][0].transcript;
                        }
                    }
                    const currentTranscript = Array.from(event.results).map((result: any) => result[0].transcript).join(' ');
                    setTranscript(currentTranscript);

                    // Silence Detection (VAD)
                    if (silenceTimer.current) clearTimeout(silenceTimer.current);
                    silenceTimer.current = setTimeout(() => {
                        // Auto-submit if silence > 3 seconds and we have enough text
                        if (currentTranscript.trim().length > 5) {
                            recognition.stop();
                            setIsListening(false);
                            submitAnswer(currentTranscript);
                        }
                    }, 3000);
                };

                recognition.onerror = (event: any) => {
                    console.error("Speech recognition error", event.error);
                    if (silenceTimer.current) clearTimeout(silenceTimer.current);
                };

                recognitionRef.current = recognition;
            } else {
                toast({ title: "Browser Unsupported", description: "Speech Recognition not supported in this browser.", variant: "destructive" });
            }
        }
        return () => {
            if (silenceTimer.current) clearTimeout(silenceTimer.current);
            // Cleanup camera
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
            stopScreenShare();
        }
    }, [questions, currentIndex]); // Re-bind if questions change, mainly for submit context

    // 4. Start Interview Flow
    const startInterview = async () => {
        setLoading(true);
        try {
            const data = await generateInterviewQuestionsAction(config.role, config.experience, config.description);
            if (data?.questions) {
                setQuestions(data.questions);
                setSetupComplete(true);
                // Slight delay to allow DOM to update before starting camera
                setTimeout(() => {
                    startCamera();
                    speakQuestion(data.questions[0]);
                }, 100);
            }
        } catch (err: any) {
            toast({ title: "Error", description: err.message, variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };


    // 5. TTS Helper
    const speakQuestion = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => {
            // Auto-start Mic after speaking
            setTranscript("");
            try {
                recognitionRef.current?.start();
                setIsListening(true);
            } catch (e) {
                // Already started or error
                console.log("Mic auto-start info:", e);
            }
        };
        window.speechSynthesis.speak(utterance);
    };

    // 6. Handling Recording
    const toggleRecording = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
            if (silenceTimer.current) clearTimeout(silenceTimer.current);
        } else {
            setTranscript("");
            recognitionRef.current?.start();
            setIsListening(true);
        }
    };

    // 7. Analyze Answer
    const submitAnswer = async (finalText?: string) => {
        const answerText = finalText || transcript;
        console.log("Submitting:", answerText);

        // Stop if still running
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
        }
        if (silenceTimer.current) clearTimeout(silenceTimer.current);

        setAnalyzing(true);
        try {
            const result = await analyzeInterviewAnswerAction(questions[currentIndex], answerText);
            setAnalysis(result);
        } catch (err: any) {
            toast({ title: "Analysis Failed", description: err.message, variant: "destructive" });
        } finally {
            setAnalyzing(false);
        }
    };

    const nextQuestion = () => {
        setAnalysis(null);
        setTranscript("");
        const next = currentIndex + 1;
        if (next < questions.length) {
            setCurrentIndex(next);
            speakQuestion(questions[next]);
        } else {
            toast({ title: "Interview Complete", description: "Great job! You finished the session." });
            setSetupComplete(false); // Reset to setup
        }
    };

    if (!setupComplete) {
        return (
            <div className="container max-w-xl mx-auto py-20 space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight">AI Mock Interview</h1>
                    <p className="text-xl text-muted-foreground">Customize your interview session.</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Interview Configuration</CardTitle>
                        <CardDescription>Tell the AI about the role you are preparing for.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="role">Target Role</Label>
                            <Input
                                id="role"
                                value={config.role}
                                onChange={(e) => setConfig({ ...config, role: e.target.value })}
                                placeholder="e.g. Senior Frontend Engineer"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="experience">Experience Level</Label>
                            <Input
                                id="experience"
                                value={config.experience}
                                onChange={(e) => setConfig({ ...config, experience: e.target.value })}
                                placeholder="e.g. 5 years"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="desc">Specific Focus / Job Description</Label>
                            <Textarea
                                id="desc"
                                value={config.description}
                                onChange={(e) => setConfig({ ...config, description: e.target.value })}
                                placeholder="e.g. Focus on system design, scalability, and leadership questions."
                                className="h-32"
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button size="lg" onClick={startInterview} disabled={loading} className="w-full text-lg">
                            {loading ? <Loader2 className="animate-spin mr-2" /> : "Start Interview Session"}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    return (
        <div className="container max-w-6xl mx-auto py-6 grid lg:grid-cols-2 gap-6 h-[85vh]">
            {/* Left Col: Interviewer & Question */}
            <div className="space-y-6 flex flex-col h-full">
                <Card className="flex-none bg-gradient-to-br from-indigo-900 to-slate-900 border-0 text-white shadow-2xl relative overflow-hidden min-h-[300px] flex flex-col justify-center">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                    <CardContent className="z-10 text-center space-y-6 p-10">
                        <div className="w-20 h-20 bg-white/10 rounded-full mx-auto flex items-center justify-center animate-pulse">
                            <Volume2 className="w-8 h-8 text-white" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-sm font-medium text-indigo-200 uppercase tracking-widest">Question {currentIndex + 1} of {questions.length}</h2>
                            <h3 className="text-xl md:text-2xl font-bold leading-relaxed">"{questions[currentIndex]}"</h3>
                        </div>
                        <Button variant="ghost" size="sm" className="text-white/50 hover:text-white" onClick={() => speakQuestion(questions[currentIndex])}>
                            <Play className="w-4 h-4 mr-2" /> Replay Question
                        </Button>
                    </CardContent>
                </Card>

                {/* Analysis Result */}
                <div className="flex-1 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        {analysis ? (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} key="result">
                                <Card className="border-green-500/50 bg-green-500/5">
                                    <CardHeader>
                                        <CardTitle className="flex justify-between items-center text-green-700 dark:text-green-400">
                                            Feedback
                                            <Badge className="bg-green-600">Score: {analysis.score}/100</Badge>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2 text-sm">
                                        <p><strong>Analysis:</strong> {analysis.feedback}</p>
                                        <p className="text-muted-foreground"><strong>Tip:</strong> {analysis.improvement_tip}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full" onClick={nextQuestion}>Next Question <ChevronRight className="ml-2 w-4 h-4" /></Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-full items-center justify-center text-muted-foreground italic text-sm" key="empty">
                                Answer the question to receive AI feedback.
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Right Col: User Camera, Screen & Controls */}
            <div className="space-y-4 flex flex-col h-full">
                {/* Video / Screen Grid */}
                <div className="grid grid-rows-2 gap-4 flex-1 min-h-0">
                    {/* Webcam */}
                    <div className="relative bg-black rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 shadow-inner group">
                        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover mirror-mode" />
                        {!cameraActive && (
                            <div className="absolute inset-0 flex items-center justify-center text-white/50">
                                <VideoOff className="w-10 h-10" />
                            </div>
                        )}
                        <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">Webcam</div>
                    </div>

                    {/* Screen Share Preview */}
                    <div className="relative bg-slate-900 rounded-xl overflow-hidden border-2 border-slate-800 shadow-inner group flex items-center justify-center">
                        {screenActive ? (
                            <video ref={screenRef} autoPlay playsInline muted className="w-full h-full object-contain" />
                        ) : (
                            <div className="text-slate-500 flex flex-col items-center gap-2">
                                <MonitorOff className="w-10 h-10 opacity-50" />
                                <span className="text-xs">Screen not shared</span>
                            </div>
                        )}
                        {screenActive && <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">Screen Share</div>}
                    </div>
                </div>

                {/* Controls */}
                <Card className="flex-none">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Your Answer</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <div className="p-3 bg-muted/50 rounded-lg h-24 overflow-y-auto text-sm font-mono italic text-muted-foreground border">
                            {transcript || "Listening..."}
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Button
                                variant={isListening ? "destructive" : "default"}
                                className="flex-1"
                                onClick={toggleRecording}
                                disabled={!!analysis}
                            >
                                {isListening ? <><MicOff className="mr-2 w-4 h-4" /> Stop</> : <><Mic className="mr-2 w-4 h-4" /> Answer</>}
                            </Button>

                            <Button
                                variant={screenActive ? "destructive" : "outline"}
                                onClick={screenActive ? stopScreenShare : startScreenShare}
                                className="flex-none"
                            >
                                {screenActive ? <MonitorOff className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
                            </Button>
                        </div>

                        {!isListening && transcript.length > 5 && !analysis && (
                            <Button size="lg" variant="secondary" onClick={() => submitAnswer()} disabled={analyzing} className="w-full">
                                {analyzing ? <Loader2 className="animate-spin mr-2" /> : "Submit Answer for Analysis"}
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
