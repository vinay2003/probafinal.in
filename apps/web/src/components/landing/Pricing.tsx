'use client';

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Pricing() {
    return (
        <section className="py-20 lg:py-32 bg-background" id="pricing">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
                    <p className="text-muted-foreground">Start for free, upgrade when you need more power.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Free Tier */}
                    <div className="p-8 rounded-2xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all">
                        <h3 className="text-xl font-bold mb-2">Free Starter</h3>
                        <p className="text-muted-foreground mb-6 text-sm">Essential tools for casual learners.</p>
                        <div className="text-4xl font-bold mb-6">$0<span className="text-base font-normal text-muted-foreground">/mo</span></div>
                        <Link href="/auth/signup">
                            <Button variant="outline" className="w-full mb-8">Get Started</Button>
                        </Link>
                        <ul className="space-y-3">
                            {['5 Mock Interviews/month', 'Basic Quiz Access', '10 Flashcard Decks', 'Standard Support'].map((feat, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm">
                                    <Check className="w-4 h-4 text-green-500" />
                                    {feat}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Pro Tier */}
                    <div className="p-8 rounded-2xl border-2 border-primary bg-background shadow-xl md:-mt-4 md:mb-4 relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                            Most Popular
                        </div>
                        <h3 className="text-xl font-bold mb-2">Pro Scholar</h3>
                        <p className="text-muted-foreground mb-6 text-sm">Everything you need to ace your exam.</p>
                        <div className="text-4xl font-bold mb-6">$19<span className="text-base font-normal text-muted-foreground">/mo</span></div>
                        <Link href="/subscription/checkout?plan=pro">
                            <Button className="w-full mb-8">Upgrade to Pro</Button>
                        </Link>
                        <ul className="space-y-3">
                            {['Unlimited Mock Interviews', 'Advanced Adaptive Quizzes', 'Unlimited Flashcards', 'Document Summarizer', 'Priority Support'].map((feat, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm">
                                    <Check className="w-4 h-4 text-primary" />
                                    {feat}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Team Tier */}
                    <div className="p-8 rounded-2xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all">
                        <h3 className="text-xl font-bold mb-2">Lifetime Access</h3>
                        <p className="text-muted-foreground mb-6 text-sm">One-time payment for permanent access.</p>
                        <div className="text-4xl font-bold mb-6">$199<span className="text-base font-normal text-muted-foreground">/once</span></div>
                        <Link href="/subscription/checkout?plan=lifetime">
                            <Button variant="outline" className="w-full mb-8">Buy Lifetime</Button>
                        </Link>
                        <ul className="space-y-3">
                            {['Everything in Pro', 'Lifetime Updates', 'Early Access to New Features', 'Exclusive Community Access'].map((feat, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm">
                                    <Check className="w-4 h-4 text-green-500" />
                                    {feat}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
