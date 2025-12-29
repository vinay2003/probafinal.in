'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CTA() {
    return (
        <section className="py-24 px-6 md:px-12 bg-background">
            <div className="container mx-auto">
                <div className="relative rounded-3xl overflow-hidden bg-primary px-6 py-16 md:px-20 md:py-24 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl shadow-primary/20">

                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
                        </svg>
                    </div>

                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
                            Ready to ace your next exam?
                        </h2>
                        <p className="text-primary-foreground/90 text-lg md:text-xl leading-relaxed">
                            Start your journey with Proba today. Get personalized study plans, AI-driven practice, and real-time feedback.
                        </p>
                    </div>

                    <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <Button size="lg" className="h-14 px-8 bg-background text-primary hover:bg-background/90 font-bold text-lg shadow-lg shrink-0" asChild>
                            <Link href="/subscription">
                                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="h-14 px-8 text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10 text-lg shrink-0" asChild>
                            <Link href="/login">
                                Log In
                            </Link>
                        </Button>
                    </div>

                </div>
            </div>
        </section>
    );
}
