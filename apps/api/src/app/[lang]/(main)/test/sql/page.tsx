"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Database, Play, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";
import Link from "next/link";
import { generateSqlAction, evaluateCodingAction } from "@/app/actions"; // Reusing evaluateCoding generic prompt for now or adding specific if needed
import { ProctoringMonitor } from "@/components/proctoring-monitor";

import { useToast } from "@/hooks/use-toast";

export default function Page() {
    const { toast } = useToast();
    const [started, setStarted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [challenge, setChallenge] = useState<any>(null);
    const [code, setCode] = useState("");
    const [result, setResult] = useState<any>(null);
    const [cheatingAttempts, setCheatingAttempts] = useState<string[]>([]);

    const startTest = async () => {
        setLoading(true);
        try {
            const data = await generateSqlAction("Medium");
            setChallenge(data);
            setCode("SELECT * FROM users WHERE status = 'active'; -- Example");
            setStarted(true);
        } catch (e: any) {
            console.error(e);
            toast({
                title: "Error",
                description: e.message || "Failed to generate challenge.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const submitCode = async () => {
        if (!challenge) return;
        setLoading(true);
        try {
            // Using evaluateCodingAction as a generic code evaluator for now. 
            // In a real app we'd have evaluateSqlAction to check against actual DB or AI logic.
            const res = await evaluateCodingAction(code, "SQL", challenge.question);
            setResult(res);
            setResult(res);
        } catch (e: any) {
            console.error(e);
            toast({
                title: "Error",
                description: e.message || "Failed to submit code.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCheat = (reason: string) => {
        setCheatingAttempts(prev => [...prev, reason]);
    };

    if (!started) {
        return (
            <div className="container mx-auto p-6 max-w-4xl space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">SQL Challenges</h1>
                </div>
                <Card className="text-center py-12 border-destructive/20 bg-destructive/5">
                    <CardHeader>
                        <div className="mx-auto bg-muted p-4 rounded-full w-fit mb-4">
                            <Database className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle className="text-2xl">Proctored SQL Verification</CardTitle>
                        <div className="text-sm text-muted-foreground max-w-md mx-auto">
                            Test your database skills under proctored conditions.
                            <br /><br />
                            <span className="font-bold text-destructive">Rules:</span>
                            <ul className="text-sm text-left list-disc pl-8 mt-2 space-y-1">
                                <li>Webcam & Microphone required.</li>
                                <li>No tab switching allowed.</li>
                            </ul>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={startTest} size="lg" className="w-48" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin" /> : "Start SQL Test"}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col bg-background">
            <ProctoringMonitor onCheatDetected={handleCheat} />

            <header className="border-b p-4 flex justify-between items-center bg-card">
                <div>
                    <h2 className="font-bold">{challenge?.title || "SQL Challenge"}</h2>
                    <p className="text-xs text-muted-foreground">SQL • Medium Risk</p>
                </div>
                <div className="flex gap-2">
                    {cheatingAttempts.length > 0 && (
                        <div className="flex items-center gap-1 text-destructive font-bold text-sm bg-destructive/10 px-3 py-1 rounded">
                            <AlertTriangle className="w-4 h-4" /> {cheatingAttempts.length} Flags
                        </div>
                    )}
                    <Button onClick={submitCode} disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Run Query
                    </Button>
                </div>
            </header>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 overflow-hidden">
                <div className="border-r md:border-r-0 md:border-b p-6 overflow-y-auto space-y-6">
                    <div className="prose dark:prose-invert">
                        <h3>Task</h3>
                        <p>{challenge?.question}</p>

                        <h4>Schema</h4>
                        <pre className="bg-muted p-2 rounded text-xs language-sql">{challenge?.schema}</pre>
                    </div>

                    {result && (
                        <Card className={`border-l-4 ${result.passed ? 'border-l-green-500' : 'border-l-red-500'}`}>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    {result.passed ? <CheckCircle className="text-green-500" /> : <AlertTriangle className="text-red-500" />}
                                    Query Analysis
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="font-medium">Score: {result.score}/100</p>
                                <p className="text-sm text-muted-foreground">{result.feedback}</p>
                            </CardContent>
                        </Card>
                    )}
                </div>

                <div className="flex flex-col border-t md:border-t-0 md:border-l">
                    <Textarea
                        className="flex-1 font-mono text-sm resize-none border-0 focus-visible:ring-0 p-4 leading-relaxed"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="SELECT * FROM table..."
                        spellCheck={false}
                    />
                </div>
            </div>
        </div>
    )
}
