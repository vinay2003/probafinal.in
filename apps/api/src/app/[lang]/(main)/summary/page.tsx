'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, FileText, Loader2 } from "lucide-react";
import { Textarea } from '@/components/ui/textarea';
import Link from "next/link";
import { getSummaryAction } from '@/app/actions';

export default function Page() {
    const [text, setText] = useState('');
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSummarize = async () => {
        if (!text) return;
        setLoading(true);
        try {
            const result = await getSummaryAction({ document: text });
            // Assuming result structure, adjust if needed based on API response
            setSummary(result.summary || typeof result === 'string' ? result : JSON.stringify(result));
        } catch (e) {
            console.error(e);
            setSummary("Failed to generate summary. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/dashboard">
                    <Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button>
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">AI Document Summarizer</h1>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Input Text</CardTitle>
                        <CardDescription>Paste your document text here.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Textarea
                            placeholder="Paste article, notes, or document content..."
                            className="min-h-[400px]"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <Button onClick={handleSummarize} disabled={loading || !text} className="w-full">
                            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                            Summarize
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-muted/30">
                    <CardHeader>
                        <CardTitle>AI Summary</CardTitle>
                        <CardDescription>Your condensed summary will appear here.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {summary ? (
                            <div className="prose dark:prose-invert">
                                <p className="whitespace-pre-wrap">{summary}</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground opacity-50">
                                <FileText className="w-16 h-16 mb-4" />
                                <p>Waiting for content...</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
