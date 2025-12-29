'use client';

import Link from 'next/link';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-muted/30 border-t border-border mt-20">
            <div className="container mx-auto px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
                    {/* Brand */}
                    <div className="flex flex-col gap-4">
                        <Link href="/landing" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                                P
                            </div>
                            <span className="text-xl font-bold tracking-tight">Proba</span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Empowering students worldwide with AI-driven tools for exam success.
                        </p>
                    </div>

                    {/* Links 1 */}
                    <div className="flex flex-col gap-3">
                        <h3 className="font-semibold text-foreground">Platform</h3>
                        <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">Dashboard</Link>
                        <Link href="/subscription" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
                        <Link href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</Link>
                    </div>

                    {/* Links 2 */}
                    <div className="flex flex-col gap-3">
                        <h3 className="font-semibold text-foreground">Resources</h3>
                        <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link>
                        <Link href="/guides" className="text-sm text-muted-foreground hover:text-primary transition-colors">Study Guides</Link>
                        <Link href="/help" className="text-sm text-muted-foreground hover:text-primary transition-colors">Help Center</Link>
                    </div>

                    {/* Legal */}
                    <div className="flex flex-col gap-3">
                        <h3 className="font-semibold text-foreground">Legal</h3>
                        <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
                        <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookie Policy</Link>
                    </div>
                </div>

                <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">© {currentYear} Proba Inc. All rights reserved.</p>

                    <div className="flex items-center gap-6">
                        {/* Socials placeholder */}
                        <div className="flex gap-4">
                            <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
