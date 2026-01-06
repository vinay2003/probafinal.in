'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
    {
        name: 'Sarah J.',
        role: 'IELTS Student',
        quote: "I was stuck at band 6.5 for months. After using Proba's AI interview practice for just 3 weeks, I finally scored an 8.0!",
        avatar: 'S'
    },
    {
        name: 'David K.',
        role: 'GRE Aspirant',
        quote: "The adaptive quizzes are a game changer. They identified my weak areas in Verbal Reasoning immediately.",
        avatar: 'D'
    },
    {
        name: 'Priya M.',
        role: 'UPSC Candidate',
        quote: "The document summarizer saved me hours of reading. The flashcards helped me memorize key constitution articles effortlessly.",
        avatar: 'P'
    },
];

export function Testimonials() {
    return (
        <section className="py-20 lg:py-32 bg-secondary/5">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Loved by Students</h2>
                    <p className="text-muted-foreground">Join thousands of students achieving their dream scores.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-background p-8 rounded-2xl shadow-sm border hover:shadow-md transition-shadow"
                        >
                            <div className="flex gap-1 text-amber-500 mb-6">
                                {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-5 h-5 fill-current" />)}
                            </div>
                            <p className="text-lg text-foreground/80 mb-8 italic">"{t.quote}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                                    {t.avatar}
                                </div>
                                <div>
                                    <div className="font-semibold">{t.name}</div>
                                    <div className="text-sm text-muted-foreground">{t.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
