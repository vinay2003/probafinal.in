'use client';

import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { SmoothScroll } from '@/components/landing/SmoothScroll';
import { cn } from '@/lib/utils';

export function LegalLayout({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <SmoothScroll>
            <div className="min-h-screen bg-background text-foreground flex flex-col font-body selection:bg-primary/20 selection:text-primary">
                <Navbar />

                {/* Main Content Area */}
                <main className={cn("flex-1 pt-24 pb-16 relative", className)}>
                    {/* Background elements */}
                    <div className="fixed inset-0 pointer-events-none z-[-1]">
                        <div className="absolute top-0 right-0 w-[50vh] h-[50vh] bg-primary/5 rounded-full blur-[100px]" />
                        <div className="absolute bottom-0 left-0 w-[50vh] h-[50vh] bg-blue-500/5 rounded-full blur-[100px]" />
                        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
                    </div>

                    {children}
                </main>

                <Footer />
            </div>
        </SmoothScroll>
    );
}
