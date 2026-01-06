'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CTA() {
    return (
        <section className="py-20 lg:py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/10 -z-10" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 max-w-2xl mx-auto">
                    Ready to Transform Your Study Routine?
                </h2>
                <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
                    Join thousands of students who are already mastering their exams with Proba.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/signup">
                        <Button size="lg" className="h-12 px-8 text-base rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                            Start Learning Now
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                    <Link href="/contact-us">
                        <Button variant="outline" size="lg" className="h-12 px-8 text-base rounded-full bg-background/50 backdrop-blur-sm">
                            Contact Sales
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
