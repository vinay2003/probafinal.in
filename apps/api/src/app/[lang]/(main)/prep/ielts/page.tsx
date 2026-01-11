"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Globe, PenTool, Mic, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";
import { analyzeWritingAction, analyzeSpeakingAction } from "@/app/actions";

export default function Page() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [inputText, setInputText] = useState("");
    const [activeTab, setActiveTab] = useState("writing");

    const handleAnalyze = async () => {
        if (!inputText.trim()) return;
        setLoading(true);
        setResult(null);
        try {
            let res;
            if (activeTab === 'writing') {
                // Defaulting to IELTS Task 2 for simplicity in this MVP
                res = await analyzeWritingAction(inputText, 'ielts_task2');
            } else {
                res = await analyzeSpeakingAction(inputText);
            }
            setResult(res);
        } catch (error) {
            console.error("Analysis Failed", error);
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
                    <h1 className="text-3xl font-bold tracking-tight">Global Exam Prep</h1>
                    <p className="text-muted-foreground">AI-powered evaluation for IELTS & TOEFL.</p>
                </div>
            </div>

            <Tabs defaultValue="writing" onValueChange={(v) => { setActiveTab(v); setResult(null); setInputText(""); }} className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                    <TabsTrigger value="writing" className="flex gap-2"><PenTool className="w-4 h-4" /> Writing</TabsTrigger>
                    <TabsTrigger value="speaking" className="flex gap-2"><Mic className="w-4 h-4" /> Speaking</TabsTrigger>
                </TabsList>

                <div className="grid lg:grid-cols-2 gap-8 mt-6">
                    <Card className="h-fit">
                        <CardHeader>
                            <CardTitle>{activeTab === 'writing' ? 'Writing Task' : 'Speaking Transcript'}</CardTitle>
                            <CardDescription>
                                {activeTab === 'writing'
                                    ? "Paste your essay (IELTS Task 2 or TOEFL Independent) below for instant grading."
                                    : "Paste the transcript of your spoken response (or use dictation software) to evaluate fluency."}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Textarea
                                placeholder={activeTab === 'writing' ? "Write your essay here..." : "Paste speech transcript here..."}
                                className="min-h-[300px] text-base leading-relaxed resize-y"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            />
                            <Button
                                onClick={handleAnalyze}
                                className="w-full py-6 text-lg"
                                disabled={loading || !inputText.trim()}
                            >
                                {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                                {loading ? "Analyzing..." : "Evaluate Response"}
                            </Button>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        {!result && !loading && (
                            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-muted-foreground border-2 border-dashed rounded-lg">
                                <Globe className="w-12 h-12 mb-4 opacity-20" />
                                <p>detailed analysis will appear here after evaluation.</p>
                            </div>
                        )}

                        {loading && (
                            <div className="h-full flex flex-col items-center justify-center p-8 text-muted-foreground">
                                <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
                                <p>AI Examiner is grading your work...</p>
                            </div>
                        )}

                        {result && (
                            <Card className="border-primary/20 bg-primary/5">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-xl">Evaluation Report</CardTitle>
                                        <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full font-bold text-lg">
                                            {activeTab === 'writing' ? 'Band ' + result.overall_band : 'Score ' + result.overall_band}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        {activeTab === 'writing' ? (
                                            <>
                                                <ScoreItem label="Task Response" score={result.task_response_score} />
                                                <ScoreItem label="Coherence" score={result.coherence_cohesion_score} />
                                                <ScoreItem label="Lexical" score={result.lexical_resource_score} />
                                                <ScoreItem label="Grammar" score={result.grammatical_range_accuracy_score} />
                                            </>
                                        ) : (
                                            <>
                                                <ScoreItem label="Fluency" score={result.fluency_score} />
                                                <ScoreItem label="Pronunciation" score={result.pronunciation_score} />
                                                <ScoreItem label="Grammar" score={result.grammar_score} />
                                                <ScoreItem label="Vocabulary" score={result.vocabulary_score} />
                                            </>
                                        )}
                                    </div>

                                    <div className="bg-background p-4 rounded-md border">
                                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" /> Examiner Feedback
                                        </h4>
                                        <p className="text-sm leading-relaxed">{result.feedback}</p>
                                    </div>

                                    {result.corrections && result.corrections.length > 0 && (
                                        <div className="space-y-2">
                                            <h4 className="font-semibold">Corrections & Improvements</h4>
                                            <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                                                {result.corrections.map((c: string, i: number) => (
                                                    <li key={i}>{c}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </Tabs>
        </div>
    )
}

function ScoreItem({ label, score }: { label: string, score: number }) {
    return (
        <div className="flex justify-between items-center bg-background p-3 rounded border">
            <span className="text-sm font-medium">{label}</span>
            <span className="font-bold text-primary">{score}</span>
        </div>
    )
}
