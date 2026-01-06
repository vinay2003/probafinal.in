'use client';

import { motion } from 'framer-motion';
import { XCircle, CheckCircle } from 'lucide-react';

export function ProblemSolution() {
    return (
        <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 mb-6">
                        Stop Struggling with Outdated Methods
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Traditional preparation is overwhelming. Proba brings clarity and efficiency to your study routine.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-2xl bg-red-500/5 border border-red-500/10"
                    >
                        <h3 className="text-xl font-semibold text-red-600 mb-6 flex items-center gap-2">
                            <XCircle className="w-5 h-5" />
                            The Old Way
                        </h3>
                        <ul className="space-y-4">
                            {['Generic study materials', 'No personalized feedback', 'Scattered resources', 'Uncertain progress tracking'].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                                    <XCircle className="w-5 h-5 text-red-500/50 shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-2xl bg-primary/5 border border-primary/10 relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl" />
                        <h3 className="text-xl font-semibold text-primary mb-6 flex items-center gap-2 relative">
                            <CheckCircle className="w-5 h-5" />
                            The Proba Way
                        </h3>
                        <ul className="space-y-4 relative">
                            {['AI-driven adaptive learning', 'Instant detailed feedback', 'All-in-one platform', 'Real-time performance analytics'].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-foreground/80">
                                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
