"use client";

import { useState } from "react";
import { optimizeResumeAction } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CheckCircle, AlertTriangle, FileText, Briefcase, Loader2, RefreshCw, BarChart } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function ResumePage() {
    const [resume, setResume] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState("");

    const handleOptimize = async () => {
        if (!resume.trim() || !jobDesc.trim()) {
            setError("Please provide both your resume text and the job description.");
            return;
        }

        setLoading(true);
        setError("");
        try {
            const data = await optimizeResumeAction(resume, jobDesc);
            setResult(data);
        } catch (err: any) {
            setError(err.message || "Failed to analyze resume. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-5xl space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/dashboard">
                    <Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">ATS Resume Optimizer</h1>
                    <p className="text-muted-foreground">Beat the bots. Get a higher score.</p>
                </div>
            </div>

            {!result ? (
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="h-full border-primary/20 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-500" />
                                Your Resume
                            </CardTitle>
                            <CardDescription>Paste your raw resume text below.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                placeholder="Paste your full resume text here..."
                                className="min-h-[300px] font-mono text-sm leading-relaxed"
                                value={resume}
                                onChange={(e) => setResume(e.target.value)}
                            />
                        </CardContent>
                    </Card>

                    <Card className="h-full border-primary/20 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-green-500" />
                                Job Description
                            </CardTitle>
                            <CardDescription>Paste the job description you are targeting.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                placeholder="Paste the job description (responsibilities, requirements)..."
                                className="min-h-[300px] font-mono text-sm leading-relaxed"
                                value={jobDesc}
                                onChange={(e) => setJobDesc(e.target.value)}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button
                                onClick={handleOptimize}
                                size="lg"
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Analyzing against ATS...
                                    </>
                                ) : (
                                    <>
                                        <BarChart className="mr-2 h-4 w-4" />
                                        Run ATS Audit
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Score Card */}
                    <Card className="border-2 border-primary/10 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-6 flex flex-col items-center justify-center text-center border-b">
                            <div className="relative">
                                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-600">
                                    {result.match_score}%
                                </div>
                                <div className="text-sm font-medium text-muted-foreground mt-2 uppercase tracking-wide">Match Score</div>
                            </div>
                            <Progress value={result.match_score} className="w-64 h-2 mt-4" />
                        </div>
                    </Card>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Missing Keywords */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-destructive">
                                    <AlertTriangle className="w-5 h-5" />
                                    Missing Keywords
                                </CardTitle>
                                <CardDescription>Add these to your resume to pass the initial screen.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {result.missing_keywords && result.missing_keywords.map((kw: string, i: number) => (
                                        <Badge key={i} variant="secondary" className="px-3 py-1 text-sm border-destructive/20 text-destructive-foreground">
                                            {kw}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Strategic Feedback */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-blue-600">
                                    <CheckCircle className="w-5 h-5" />
                                    Strategic Analysis
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="prose dark:prose-invert text-sm">
                                <p>{result.feedback}</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Improved Bullets */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-green-600">AI Suggested Improvements</CardTitle>
                            <CardDescription>Specific rewrites to increase impact.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {result.improved_bullets && result.improved_bullets.map((bullet: string, i: number) => (
                                <div key={i} className="bg-muted/50 p-4 rounded-lg border text-sm">
                                    {bullet}
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" onClick={() => setResult(null)} className="w-full">
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Analyze New Resume
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>
            )}

            {error && (
                <div className="bg-destructive/10 text-destructive p-4 rounded-lg flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    {error}
                </div>
            )}
        </div>
    );
}
