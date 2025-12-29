'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        id: 1,
        title: "1. Create Your Study Plan",
        description: "Tell Proba your exam date and goals. Our AI builds a personalized roadmap adapting to your daily schedule.",
        badge: "Planning",
        color: "bg-blue-500",
    },
    {
        id: 2,
        title: "2. Practice with AI",
        description: "Engage in realistic mock interviews and solve adaptive quizzes that get harder as you improve.",
        badge: "Execution",
        color: "bg-purple-500",
    },
    {
        id: 3,
        title: "3. Analyze & Improve",
        description: "Get instant feedback on your performance. Identify weak spots and conquer them with targeted repetition.",
        badge: "Optimization",
        color: "bg-green-500",
    }
];

export function Showcase() {
    const container = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(0);

    useGSAP(() => {
        const sectionHeight = triggerRef.current!.offsetHeight;
        const scrollHeight = sectionHeight - window.innerHeight;

        ScrollTrigger.create({
            trigger: triggerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            onUpdate: (self) => {
                // Calculate which step should be active based on scroll progress
                const progress = self.progress;
                const stepIndex = Math.floor(progress * steps.length);
                setActiveStep(Math.min(stepIndex, steps.length - 1));
            },
        });
    }, { scope: container });

    return (
        <section id="showcase" ref={container} className="bg-background">
            <div ref={triggerRef} className="relative h-[300vh]"> {/* 300vh for 3 steps scroll space */}
                <div className="sticky top-0 h-screen overflow-hidden">
                    <div className="container mx-auto px-6 h-full flex items-center">

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-center">

                            {/* Left Side: Visuals (Dynamic) */}
                            <div className="order-2 lg:order-1 relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-border bg-muted/20">
                                {/* 
                    In a real app, I'd map over images and fade them in/out based on activeStep.
                    For now, using CSS transitions on background/content.
                 */}
                                {steps.map((step, index) => (
                                    <div
                                        key={step.id}
                                        className={`absolute inset-0 transition-opacity duration-500 flex items-center justify-center p-8 ${activeStep === index ? 'opacity-100' : 'opacity-0'}`}
                                    >
                                        <div className={`w-full h-full rounded-xl ${step.color}/10 border border-${step.color}/20 flex items-center justify-center relative overflow-hidden group`}>
                                            <div className={`absolute -right-20 -bottom-20 w-64 h-64 ${step.color}/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700`} />
                                            <h3 className={`text-4xl font-bold ${step.color.replace('bg-', 'text-')} opacity-20`}>Step 0{step.id}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Right Side: Text (Static List with Highlights) */}
                            <div className="order-1 lg:order-2 flex flex-col justify-center space-y-12">
                                {steps.map((step, index) => (
                                    <div
                                        key={step.id}
                                        className={`transition-all duration-500 p-6 rounded-xl border ${activeStep === index ? 'bg-secondary/50 border-primary/50 translate-x-4' : 'border-transparent opacity-40'}`}
                                    >
                                        <Badge variant="outline" className="mb-4">{step.badge}</Badge>
                                        <h3 className="text-3xl font-bold mb-3">{step.title}</h3>
                                        <p className="text-muted-foreground text-lg">{step.description}</p>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
