'use client';

import { useRef, useEffect } from 'react';
import { animate } from 'animejs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Bot, LineChart, FileText, BrainCircuit, Globe, Code } from 'lucide-react';

const features = [
    {
        title: "AI Mock Interviews",
        description: "Practice with realistic AI interviewers that give real-time feedback on your speech and content.",
        icon: Bot,
    },
    {
        title: "Smart Flashcards",
        description: "Generate flashcards from any topic instantly. Spaced repetition ensures you never forget.",
        icon: FileText,
    },
    {
        title: "Coding Challenges",
        description: "Live coding environment with AI hints and solution analysis for technical interviews.",
        icon: Code,
    },
    {
        title: "Global Exams Prep",
        description: "Specialized modules for IELTS, TOEFL, GRE, and UPSC with scoring guidelines.",
        icon: Globe,
    },
    {
        title: "Resume Optimizer",
        description: "ATS-friendly resume scanning and improvement suggestions to get you shortlisted.",
        icon: BrainCircuit,
    },
    {
        title: "Detailed Analytics",
        description: "Track your progress with in-depth charts and performance metrics over time.",
        icon: LineChart,
    },
];

export function Features() {
    // We can use a ref to store references to cards for animations
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const handleMouseEnter = (index: number) => {
        const card = cardsRef.current[index];
        if (!card) return;

        animate(card, {
            scale: 1.05,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            duration: 300,
            easing: 'easeOutExpo'
        });
    };

    const handleMouseLeave = (index: number) => {
        const card = cardsRef.current[index];
        if (!card) return;

        animate(card, {
            scale: 1,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            duration: 300,
            easing: 'easeOutExpo'
        });
    };

    return (
        <section id="features" className="py-24 bg-muted/30">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Everything you need to excel</h2>
                    <p className="text-muted-foreground text-lg">Powerful tools designed to cover every aspect of your preparation journey.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            ref={el => { cardsRef.current[index] = el }}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                            className="h-full"
                        >
                            <Card className="h-full border-border/50 bg-background hover:border-primary/50 transition-colors">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                                        <feature.icon className="w-6 h-6" />
                                    </div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
