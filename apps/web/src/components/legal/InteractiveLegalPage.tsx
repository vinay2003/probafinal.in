'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, FileText, Scale, AlertTriangle, ChevronRight } from 'lucide-react';

// Actually, let's stick to standard anchor links with smooth scroll behavior from CSS/Lenis, and use IntersectionObserver for active state.

export interface Section {
    id: string;
    title: string;
    content: React.ReactNode;
}

interface InteractiveLegalPageProps {
    title: string;
    updatedAt: string;
    introduction: string;
    sections: Section[];
    icon: 'shield' | 'file' | 'scale' | 'alert';
}

export function InteractiveLegalPage({ title, updatedAt, introduction, sections, icon }: InteractiveLegalPageProps) {
    const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const formattedDate = new Date(updatedAt).toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const Icon = () => {
        switch (icon) {
            case 'shield': return <ShieldCheck className="w-8 h-8 text-primary" />;
            case 'scale': return <Scale className="w-8 h-8 text-primary" />;
            case 'alert': return <AlertTriangle className="w-8 h-8 text-primary" />;
            default: return <FileText className="w-8 h-8 text-primary" />;
        }
    };

    // Scroll Spy logic
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { rootMargin: '-20% 0px -60% 0px' }); // Trigger when section is near top

        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [sections]);

    return (
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60]"
                style={{ scaleX, transformOrigin: "0%" }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 pb-20">

                {/* Sidebar / TOC */}
                <div className="hidden lg:block lg:col-span-3">
                    <div className="sticky top-24 space-y-8">
                        <div className="p-6 rounded-2xl bg-background/50 border border-border/50 backdrop-blur-sm shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <Icon />
                                </div>
                                <span className="font-bold text-lg tracking-tight">Contents</span>
                            </div>
                            <nav className="flex flex-col space-y-1">
                                {sections.map((section) => (
                                    <a
                                        key={section.id}
                                        href={`#${section.id}`}
                                        className={cn(
                                            "group flex items-center justify-between py-2 px-3 rounded-md text-sm font-medium transition-all duration-200",
                                            activeSection === section.id
                                                ? "bg-primary/10 text-primary translate-x-1"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        )}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                                            setActiveSection(section.id);
                                        }}
                                    >
                                        {section.title}
                                        {activeSection === section.id && (
                                            <ChevronRight className="w-4 h-4 mr-2 opacity-100" />
                                        )}
                                    </a>
                                ))}
                            </nav>
                        </div>

                        <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                            <h4 className="font-semibold mb-2">Need help?</h4>
                            <p className="text-sm text-muted-foreground mb-4">Contact our support team for clarifications.</p>
                            <a href="/contact-us" className="text-xs font-bold uppercase tracking-wider text-primary hover:underline">Contact Support &rarr;</a>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-9">
                    {/* Header */}
                    <motion.div
                        className="mb-16 text-center lg:text-left"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            <span>Legal Documentation</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            {title}
                        </h1>
                        <div className="flex flex-col md:flex-row items-center gap-4 text-muted-foreground mb-8">
                            <Badge variant="outline" className="px-3 py-1 text-sm border-primary/20 bg-background">
                                Last Updated: {formattedDate}
                            </Badge>
                            <span className="hidden md:inline text-border">|</span>
                            <span>{Math.ceil(JSON.stringify(sections).length / 2000)} min read</span>
                        </div>
                        <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                            <p>{introduction}</p>
                        </div>
                    </motion.div>

                    {/* Sections */}
                    <div className="space-y-16">
                        {sections.map((section, index) => (
                            <motion.section
                                key={section.id}
                                id={section.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="scroll-mt-32"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                                        {index + 1}
                                    </span>
                                    <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                                        {section.title}
                                    </h2>
                                </div>
                                <div className="prose dark:prose-invert max-w-none pl-12 border-l-2 border-border/50">
                                    {typeof section.content === 'string' ? (
                                        <p dangerouslySetInnerHTML={{ __html: section.content }} />
                                    ) : (
                                        section.content
                                    )}
                                </div>
                            </motion.section>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
