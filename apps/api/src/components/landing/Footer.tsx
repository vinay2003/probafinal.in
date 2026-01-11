'use client';

import Link from 'next/link';
import { Twitter, Instagram, Linkedin, Github } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-background border-t pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="font-bold text-2xl flex items-center gap-2 mb-4">
                            Proba.
                        </Link>
                        <p className="text-muted-foreground max-w-xs mb-6">
                            AI-powered study companion designed to help you ace your global exams with confidence.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors">
                                <Twitter className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors">
                                <Github className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-6">Product</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link href="/features" className="hover:text-foreground transition-colors">Features</Link></li>
                            <li><Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                            <li><Link href="/testimonials" className="hover:text-foreground transition-colors">Testimonials</Link></li>
                            <li><Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link href="/about-us" className="hover:text-foreground transition-colors">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
                            <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
                            <li><Link href="/contact-us" className="hover:text-foreground transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-6">Legal</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                            <li><Link href="/cookie-policy" className="hover:text-foreground transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t pt-8 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Proba Global. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
