'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/10 to-transparent blur-3xl opacity-30 -z-10" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 blur-3xl rounded-full opacity-20 -z-10" />

            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary-foreground text-sm font-medium mb-8 border border-secondary/20"
                >
                    <Sparkles className="w-4 h-4" />
                    <span>AI-Powered Exam Preparation</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
                >
                    Master Your Global Exams <br className="hidden md:block" />
                    <span className="text-primary">With Intelligent AI</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    Your personal study companion for IELTS, TOEFL, GRE, and UPSC.
                    Get adaptive quizzes, smart flashcards, and realistic mock interviews.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link href="/signup">
                        <Button size="lg" className="h-12 px-8 text-base rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                            Get Started for Free
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                    <Link href="/about-us">
                        <Button variant="outline" size="lg" className="h-12 px-8 text-base rounded-full bg-background/50 backdrop-blur-sm">
                            Learn How It Works
                        </Button>
                    </Link>
                </motion.div>

                {/* Floating UI Elements / Showoff (Placeholder for now, can be an image) */}
                {/* Floating UI Elements / Showoff */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
                    className="mt-20 relative mx-auto max-w-5xl"
                >
                    {/* Abstract Glow Behind */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl blur-2xl opacity-50" />

                    <div className="relative rounded-xl border border-white/10 bg-black/50 backdrop-blur-md shadow-2xl overflow-hidden">
                        {/* Browser Window Header */}
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            <div className="ml-4 px-3 py-1 rounded-md bg-white/5 text-[10px] text-muted-foreground font-mono">
                                app.proba.ai/dashboard
                            </div>
                        </div>

                        {/* Image Container */}
                        <div className="relative aspect-[16/9] w-full bg-background/50">
                            <Image
                                src="/dashboard-preview.png"
                                alt="Proba Dashboard Preview"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                                priority
                            />
                            {/* Inner Shadow Overlay for Depth */}
                            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
