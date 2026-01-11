'use client';

import { Check } from 'lucide-react';

export function Benefits() {
    const benefits = [
        'Save 100+ hours of study time',
        'Get real-time feedback on errors',
        'Access study materials offline',
        'Join a community of achievers',
        'Affordable premium plans',
        'Guaranteed score improvement'
    ];

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                <div className="w-full md:w-1/2">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Unlock Your True Potential</h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Don't just study harder, study smarter. Our AI adapts to your learning style to maximize retention and minimize burnout.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                                    <Check className="w-3 h-3" />
                                </div>
                                <span className="font-medium text-foreground/90">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full md:w-1/2 relative h-[400px] bg-muted/20 rounded-2xl overflow-hidden">
                    {/* Placeholder for an image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 font-bold text-2xl">
                        Student Success Image
                    </div>
                </div>
            </div>
        </section>
    );
}
