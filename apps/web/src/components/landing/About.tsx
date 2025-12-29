'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function About() {
    const container = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const visualsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Text animations
        gsap.from(textRef.current!.children, {
            scrollTrigger: {
                trigger: textRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            },
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
            ease: 'power3.out',
        });

        // Visuals animation
        gsap.from(visualsRef.current, {
            scrollTrigger: {
                trigger: visualsRef.current,
                start: 'top 75%',
            },
            scale: 0.9,
            opacity: 0,
            duration: 1.2,
            ease: 'power2.out',
        });
    }, { scope: container });

    const benefits = [
        "AI-Powered Personalization",
        "Real-world Simulation",
        "Adaptive Difficulty Levels",
        "Instant Performance Analytics"
    ];

    return (
        <section ref={container} className="py-24 md:py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">

                    {/* Content */}
                    <div ref={textRef} className="flex-1 space-y-8">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                            Why settle for generic study materials?
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Proba isn't just another question bank. It's an intelligent learning engine that adapts to your learning style, focusing on your weak points and turning them into strengths.
                        </p>

                        <div className="space-y-4">
                            {benefits.map((benefit, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                                    <span className="text-lg font-medium">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Visuals */}
                    <div ref={visualsRef} className="flex-1 w-full">
                        <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-muted/30 border border-border">
                            {/* Abstract shape or image placeholder */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-background rounded-xl shadow-2xl border border-border/50 p-6 flex flex-col gap-4">
                                {/* Mock UI elements */}
                                <div className="h-4 w-1/3 bg-muted rounded animate-pulse" />
                                <div className="h-4 w-full bg-muted/50 rounded animate-pulse delay-75" />
                                <div className="h-4 w-full bg-muted/50 rounded animate-pulse delay-150" />
                                <div className="h-32 w-full bg-primary/5 rounded mt-4" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
