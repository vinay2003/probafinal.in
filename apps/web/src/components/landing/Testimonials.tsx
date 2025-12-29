'use client';

import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const testimonials = [
    {
        name: "Sarah J.",
        role: "IELTS 8.5/9",
        avatar: "/avatars/1.png",
        content: "Proba's mock interviews were a game changer. The AI feedback on my pronunciation was spot on.",
    },
    {
        name: "Michael C.",
        role: "Software Engineer @ Google",
        avatar: "/avatars/2.png",
        content: "The coding challenges are actually relevant. Helped me crack my technical rounds with confidence.",
    },
    {
        name: "Priya R.",
        role: "UPSC Aspirant",
        avatar: "/avatars/3.png",
        content: "The generated flashcards saved me hours of manual work. A must-have for any serious student.",
    },
    {
        name: "David K.",
        role: "GRE 330/340",
        avatar: "/avatars/4.png",
        content: "Adaptive quizzes really targeted my weak areas. I saw my score improve week over week.",
    },
    {
        name: "Emily W.",
        role: "Student",
        avatar: "/avatars/5.png",
        content: "The study plan feature kept me organized and on track. I didn't feel overwhelmed once.",
    }
];

export function Testimonials() {
    return (
        <section id="testimonials" className="py-24 overflow-hidden bg-background">
            <div className="container mx-auto px-6 mb-12 text-center">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Trusted by students worldwide</h2>
                <p className="text-muted-foreground text-lg">Join thousands of others achieving their dream scores.</p>
            </div>

            <div className="relative w-full">
                {/* Gradients to mask edges */}
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10" />
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10" />

                <div className="flex overflow-hidden">
                    <motion.div
                        className="flex gap-6 px-6"
                        animate={{ x: "-50%" }}
                        transition={{
                            duration: 30,
                            ease: "linear",
                            repeat: Infinity
                        }}
                        initial={{ x: 0 }}
                        style={{ width: "fit-content" }}
                    >
                        {/* Double the list for infinite loop */}
                        {[...testimonials, ...testimonials].map((t, i) => (
                            <Card key={i} className="min-w-[350px] md:min-w-[400px] border-border/50 bg-muted/10 hover:bg-muted/20 transition-colors">
                                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                    <Avatar>
                                        <AvatarImage src={t.avatar} alt={t.name} />
                                        <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-sm">{t.name}</span>
                                        <span className="text-xs text-muted-foreground">{t.role}</span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Quote className="w-8 h-8 text-primary/20 mb-2" />
                                    <p className="text-muted-foreground italic leading-relaxed">"{t.content}"</p>
                                </CardContent>
                            </Card>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
