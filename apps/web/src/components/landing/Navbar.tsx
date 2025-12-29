'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
    SheetClose
} from '@/components/ui/sheet';

const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Showcase', href: '#showcase' },
    { name: 'Reviews', href: '#testimonials' },
    // { name: 'FAQ', href: '#faq' }, 
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 20);
    });

    const Logo = () => (
        <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 overflow-hidden rounded-lg">
                <Image
                    src="/favicon.ico"
                    alt="Proba Logo"
                    fill
                    className="object-cover"
                />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">Proba</span>
        </div>
    );

    return (
        <motion.nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6",
                isScrolled
                    ? "bg-background/70 backdrop-blur-xl border-b border-white/10 dark:border-white/5 py-3 shadow-sm supports-[backdrop-filter]:bg-background/60"
                    : "bg-transparent py-5"
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="container mx-auto flex items-center justify-between">
                <Link href="/landing" className="focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg">
                    <Logo />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <Link href="/login" className="text-sm font-medium hover:text-foreground/80 transition-colors">
                        Log in
                    </Link>
                    <Button asChild className="rounded-full px-6 font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 hover:scale-105">
                        <Link href="/signup">Get Started</Link>
                    </Button>
                </div>

                {/* Mobile Nav */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="w-6 h-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l border-border/50 bg-background/95 backdrop-blur-xl">
                            <SheetHeader className="text-left mb-8">
                                <SheetTitle><Logo /></SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-6">
                                <nav className="flex flex-col gap-4">
                                    {navLinks.map((link) => (
                                        <SheetClose asChild key={link.name}>
                                            <Link
                                                href={link.href}
                                                className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                {link.name}
                                            </Link>
                                        </SheetClose>
                                    ))}
                                </nav>
                                <div className="flex flex-col gap-4 mt-4">
                                    <SheetClose asChild>
                                        <Button variant="outline" className="w-full justify-center rounded-full" asChild>
                                            <Link href="/login">Log in</Link>
                                        </Button>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Button className="w-full justify-center rounded-full shadow-lg shadow-primary/20" asChild>
                                            <Link href="/signup">Get Started</Link>
                                        </Button>
                                    </SheetClose>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </motion.nav>
    );
}
