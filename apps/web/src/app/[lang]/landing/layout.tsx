import { SmoothScroll } from '@/components/landing/SmoothScroll';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Proba - AI Study Companion',
    description: 'Master your exams with Proba. AI-powered mock interviews, adaptive quizzes, and smart flashcards.',
    openGraph: {
        title: 'Proba - AI Study Companion',
        description: 'Master your exams with Proba. AI-powered mock interviews, adaptive quizzes, and smart flashcards.',
        type: 'website',
    },
};

export default function LandingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SmoothScroll>
            <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
                {children}
            </div>
        </SmoothScroll>
    );
}
