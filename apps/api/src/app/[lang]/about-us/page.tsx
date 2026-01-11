import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Target, Users } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About Us - Proba',
    description: 'Learn about Proba’s mission to democratize interview preparation with AI.',
};

export default function AboutUsPage() {
    return (
        <div className="container mx-auto py-16 px-4 max-w-5xl">
            {/* Hero Section */}
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                    Empowering Careers with AI
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Proba is on a mission to democratize access to high-quality interview preparation, making it accessible, personalized, and effective for everyone.
                </p>
            </div>

            {/* Grid Section */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
                <Card className="border-none shadow-lg bg-background/50 backdrop-blur">
                    <CardContent className="pt-6 text-center space-y-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                            <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold">Innovation First</h3>
                        <p className="text-muted-foreground">We leverage cutting-edge LLMs and Voice AI to simulate realistic interview scenarios.</p>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-lg bg-background/50 backdrop-blur">
                    <CardContent className="pt-6 text-center space-y-4">
                        <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                            <Target className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold">Precision Feedback</h3>
                        <p className="text-muted-foreground">Our AI provides detailed, actionable analysis on your answers, tone, and delivery.</p>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-lg bg-background/50 backdrop-blur">
                    <CardContent className="pt-6 text-center space-y-4">
                        <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                            <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-xl font-bold">User Centric</h3>
                        <p className="text-muted-foreground">Built for students, job seekers, and professionals looking to level up their careers.</p>
                    </CardContent>
                </Card>
            </div>

            {/* Story Section */}
            <div className="prose dark:prose-invert max-w-none text-center">
                <h2>Our Story</h2>
                <p className="text-lg text-muted-foreground mx-auto max-w-3xl">
                    Founded in 2024, Proba started with a simple question: "Why is interview prep so disconnected from reality?" We set out to bridge the gap between static question banks and the dynamic, high-pressure environment of a real interview. Today, we help thousands of candidates practice smarter, not harder.
                </p>
            </div>
        </div>
    );
}
