'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, FileText, Scale } from 'lucide-react';

interface LegalContentProps {
    title: string;
    updatedAt: string;
    icon?: 'shield' | 'file' | 'scale';
    children: React.ReactNode;
}

export function LegalContent({ title, updatedAt, icon = 'file', children }: LegalContentProps) {

    const formattedDate = new Date(updatedAt).toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const Icon = () => {
        switch (icon) {
            case 'shield': return <ShieldCheck className="w-6 h-6 text-primary" />;
            case 'scale': return <Scale className="w-6 h-6 text-primary" />;
            default: return <FileText className="w-6 h-6 text-primary" />;
        }
    };

    return (
        <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
                className="mb-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-primary/10 ring-1 ring-primary/20">
                    <Icon />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{title}</h1>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Badge variant="outline" className="rounded-full px-3 py-1 border-primary/20 bg-primary/5">
                        Last Updated: {formattedDate}
                    </Badge>
                </div>
            </motion.div>

            <motion.div
                className="prose prose-lg dark:prose-invert max-w-none 
                   prose-headings:font-bold prose-headings:tracking-tight 
                   prose-a:text-primary hover:prose-a:text-primary/80 
                   prose-img:rounded-xl bg-background/50 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-border/50 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                {children}
            </motion.div>
        </div>
    );
}
