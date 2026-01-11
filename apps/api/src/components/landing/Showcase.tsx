'use client';

import { motion } from 'framer-motion';

export function Showcase() {
    return (
        <section className="py-20 lg:py-32 bg-muted/30 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">See It in Action</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Experience the intuitive interface designed to keep you focused and productive.
                    </p>
                </div>

                <div className="relative max-w-6xl mx-auto">
                    {/* Main Dashboard Mockup */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-xl border bg-background shadow-2xl overflow-hidden aspect-video group"
                    >
                        <div className="absolute inset-0 bg-secondary/5 group-hover:bg-transparent transition-colors duration-500" />

                        {/* Simulated UI Content - Header */}
                        <div className="h-12 border-b bg-muted/20 flex items-center px-4 gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400/80" />
                            <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                            <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                            <div className="ml-4 w-64 h-6 rounded-md bg-muted/40" />
                        </div>

                        {/* Simulated UI Content - Body */}
                        <div className="p-6 md:p-8 grid grid-cols-12 gap-6 h-full bg-background/50 backdrop-blur-sm">
                            {/* Sidebar */}
                            <div className="col-span-3 space-y-3 hidden md:block">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="h-10 w-full rounded-md bg-muted/30 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                                ))}
                            </div>
                            {/* Main Content */}
                            <div className="col-span-12 md:col-span-9 space-y-6">
                                <div className="h-32 w-full rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center">
                                    <span className="text-primary font-medium">Performance Analytics Chart</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-24 w-full rounded-lg bg-muted/20" />
                                    <div className="h-24 w-full rounded-lg bg-muted/20" />
                                </div>
                                <div className="h-40 w-full rounded-lg bg-muted/20" />
                            </div>
                        </div>

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none md:hidden" />
                    </motion.div>

                    {/* Floating Elements (Decorative) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="absolute -right-12 -bottom-12 w-64 h-40 bg-background border rounded-lg shadow-xl p-4 hidden lg:block"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center text-xs font-bold">95%</div>
                            <div className="text-sm font-semibold">Speaking Score</div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full w-[95%] bg-green-500" />
                        </div>
                        <p className="mt-3 text-xs text-muted-foreground">Great pronunciation! Keep practicing intonation.</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
