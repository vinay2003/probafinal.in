'use client';

import { motion } from 'framer-motion';

export function About() {
    return (
        <section id="about" className="py-20 md:py-32 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            About Proba
                        </h2>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            Proba is your intelligent study companion designed to help you ace global exams like IELTS, TOEFL, GRE, and UPSC.
                        </p>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            We leverage advanced AI to provide personalized mock interviews, adaptive quizzes, and smart flashcards that evolve with your learning progress.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-blue-500/10 border flex items-center justify-center p-8"
                    >
                        <div className="text-center">
                            <span className="text-6xl mb-4 block">🚀</span>
                            <p className="font-semibold text-xl">Powered by Gemini & Next.js</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
