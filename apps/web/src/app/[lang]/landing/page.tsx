import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { About } from '@/components/landing/About';
import { Features } from '@/components/landing/Features';
import { Showcase } from '@/components/landing/Showcase';
import { Benefits } from '@/components/landing/Benefits';
import { Testimonials } from '@/components/landing/Testimonials';
import { CTA } from '@/components/landing/CTA';
import { Footer } from '@/components/landing/Footer';
import { SmoothScroll } from '@/components/landing/SmoothScroll';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Proba - AI Powered Study Companion',
    description: 'Master your exams with Proba. AI-powered mock interviews, adaptive quizzes, and smart flashcards designed to help you succeed in IELTS, TOEFL, UPSC, and more.',
    alternates: {
        canonical: 'https://probafinal.in/landing',
    },
    openGraph: {
        title: 'Proba - AI Powered Study Companion',
        description: 'Master your exams with Proba. AI-powered mock interviews, adaptive quizzes, and smart flashcards.',
        url: 'https://probafinal.in/landing',
        siteName: 'Proba',
        images: [
            {
                url: 'https://probafinal.in/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Proba AI Landing Page',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Proba - AI Powered Study Companion',
        description: 'Master your exams with Proba. AI-powered mock interviews, adaptive quizzes, and smart flashcards.',
        images: ['https://probafinal.in/og-image.jpg'],
    },
};

export default function LandingPage() {

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Proba',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Web',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '1250',
        },
        description: 'AI-powered study companion for global exams including IELTS, TOEFL, GRE, and UPSC.',
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <SmoothScroll>
                <main className="relative bg-background min-h-screen">
                    <Navbar />
                    <Hero />
                    <About />
                    <Features />
                    <Showcase />
                    <Benefits />
                    <Testimonials />
                    <CTA />
                    <Footer />
                </main>
            </SmoothScroll>
        </>
    );
}
