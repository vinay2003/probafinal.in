'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';

export function Hero() {
    const container = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const visualRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Initial state setup to prevent flash of unstyled content
        gsap.set([titleRef.current, subtitleRef.current, buttonsRef.current], {
            autoAlpha: 1
        });

        tl.from(titleRef.current, {
            y: 100,
            opacity: 0,
            duration: 1.2,
            skewY: 5,
        })
            .from(subtitleRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
            }, "-=0.8")
            .from(buttonsRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.8,
            }, "-=0.6")
            .from(visualRef.current, {
                scale: 0.9,
                opacity: 0,
                duration: 1.5,
                ease: 'power2.out'
            }, "-=1.0");

    }, { scope: container });

    return (
        <section
            ref={container}
            className="relative min-h-screen flex flex-col justify-center items-center pt-20 overflow-hidden"
        >
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
            </div>

            <div className="container mx-auto px-4 text-center z-10 flex flex-col items-center">

                {/* Badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
                    <Sparkles className="h-4 w-4" />
                    <span>AI-Powered Learning Platform</span>
                </div>

                {/* H1 Title */}
                <div className="overflow-hidden">
                    <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-6 max-w-4xl mx-auto opacity-0 translate-y-10">
                        Master Your Exams with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Proba AI</span>
                    </h1>
                </div>

                {/* Subtitle */}
                <p ref={subtitleRef} className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto opacity-0 translate-y-5">
                    The all-in-one AI study companion. Mock interviews, adaptive quizzes, and smart flashcards designed to help you succeed.
                </p>

                {/* Buttons */}
                <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center gap-4 opacity-0 translate-y-5">
                    <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300" asChild>
                        <Link href="/subscription">
                            Start Learning Free <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-2 hover:bg-secondary/50" asChild>
                        <Link href="#showcase">
                            View Feature Showcase
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Visual / Dashboard Mockup Placeholder */}
            <div ref={visualRef} className="mt-16 w-full max-w-6xl px-4 relative opacity-0">
                <div className="relative rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm shadow-2xl p-2 md:p-4">
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20 pointer-events-none h-full w-full" />
                    <div className="aspect-[16/9] w-full rounded-lg bg-muted/20 overflow-hidden relative group">
                        {/* 
                   Ideally, we would place a high-quality screenshot of the dashboard here.
                   For now, a placeholder div with a nice gradient.
                */}
                        <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-background flex items-center justify-center">
                            <span className="text-muted-foreground/50 font-medium">Dashboard Preview</span>
                        </div>
                    </div>
                </div>
                {/* Decorative elements behind dashboard */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-yellow-400/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />
            </div>

        </section>
    );
}
