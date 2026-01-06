'use client';

import { motion } from 'framer-motion';
import { Brain, Mic, ListChecks, FileText, Zap, BarChart } from 'lucide-react';

const features = [
    {
        icon: Mic,
        title: 'AI Mock Interviews',
        description: 'Practice speaking with our AI examiner that provides real-time feedback on pronunciation and grammar.',
    },
    {
        icon: Brain,
        title: 'Adaptive Quizzes',
        description: 'Questions that adapt to your skill level, focusing on areas where you need the most improvement.',
    },
    {
        icon: Zap,
        title: 'Smart Flashcards',
        description: 'Generate flashcards instantly from any text and use spaced repetition to memorize effectively.',
    },
    {
        icon: FileText,
        title: 'Document Summarizer',
        description: 'Upload complex study materials and get concise, easy-to-understand summaries in seconds.',
    },
    {
        icon: ListChecks,
        title: 'Personalized Study Plans',
        description: 'Get a custom daily schedule tailored to your exam date and target score.',
    },
    {
        icon: BarChart,
        title: 'Deep Analytics',
        description: 'Track your progress with detailed charts and insights to optimize your study strategy.',
    },
];

export function Features() {
    return (
        <section className="py-20 lg:py-32 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <span className="text-primary font-medium text-sm tracking-widest uppercase mb-3 block">Features</span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Everything You Need to Succeed</h2>
                    <p className="text-muted-foreground text-lg">
                        Powerful tools built to help you master every aspect of your exam preparation.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-8 rounded-2xl bg-background border hover:border-primary/50 transition-colors group"
                        >
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
