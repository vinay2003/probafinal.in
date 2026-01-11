'use client';

import { Check, X } from 'lucide-react';

export function Comparison() {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose Proba?</h2>
                    <p className="text-muted-foreground">See how we stack up against traditional learning methods.</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full max-w-4xl mx-auto border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="p-4 text-left font-medium text-muted-foreground">Features</th>
                                <th className="p-4 text-center font-bold text-lg text-foreground">Proba AI</th>
                                <th className="p-4 text-center font-medium text-muted-foreground">Traditional Tutors</th>
                                <th className="p-4 text-center font-medium text-muted-foreground">Self Study Apps</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {[
                                { feature: 'AI-Powered Speaking Feedback', proba: true, tutor: false, apps: false },
                                { feature: 'Adaptive Difficulty Levels', proba: true, tutor: true, apps: false },
                                { feature: 'Instant Document Summaries', proba: true, tutor: false, apps: false },
                                { feature: '24/7 Availability', proba: true, tutor: false, apps: true },
                                { feature: 'Cost Effective', proba: true, tutor: false, apps: true },
                            ].map((row, idx) => (
                                <tr key={idx} className="hover:bg-background/50 transition-colors">
                                    <td className="p-4 font-medium">{row.feature}</td>
                                    <td className="p-4 text-center bg-primary/5">
                                        {row.proba ? <Check className="w-6 h-6 text-primary mx-auto" /> : <X className="w-6 h-6 text-muted-foreground mx-auto" />}
                                    </td>
                                    <td className="p-4 text-center">
                                        {row.tutor ? <Check className="w-6 h-6 text-foreground/70 mx-auto" /> : <X className="w-6 h-6 text-muted-foreground mx-auto" />}
                                    </td>
                                    <td className="p-4 text-center">
                                        {row.apps ? <Check className="w-6 h-6 text-foreground/70 mx-auto" /> : <X className="w-6 h-6 text-muted-foreground mx-auto" />}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
