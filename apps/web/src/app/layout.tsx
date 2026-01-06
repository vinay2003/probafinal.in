import type { Metadata } from 'next';
import Script from 'next/script';
import JsonLd from '@/components/seo/json-ld';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeWrapper } from '@/components/theme-wrapper';


import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL('https://probafinal.in'),
  title: {
    default: 'Proba - AI Powered Study Companion',
    template: '%s | Proba',
  },
  description: 'Master your exams with Proba. AI-powered mock interviews, adaptive quizzes, and smart flashcards for IELTS, TOEFL, UPSC, and more.',
  keywords: ['AI Study Tool', 'Mock Interview AI', 'IELTS Prep', 'TOEFL Prep', 'Flashcard Generator', 'Exam Preparation'],
  authors: [{ name: 'Proba Team' }],
  creator: 'Proba Global',
  publisher: 'Proba Global',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://probafinal.in',
    title: 'Proba - AI Powered Study Companion',
    description: 'Your personal AI-powered study companion for global exams.',
    siteName: 'Proba',
    images: [
      {
        url: '/og-image.jpg', // Ensure this image exists or create it
        width: 1200,
        height: 630,
        alt: 'Proba AI Study Companion',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Proba - AI Powered Study Companion',
    description: 'Master your exams with AI. Mock interviews, quizzes, and more.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

import { Atkinson_Hyperlegible } from 'next/font/google';

const atkinson = Atkinson_Hyperlegible({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-atkinson',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-body antialiased", atkinson.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseClientProvider>
            <ThemeWrapper>
              <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern -z-10"></div>

              <Script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6943163093297878"
                crossOrigin="anonymous"
                strategy="afterInteractive"
              />

              <JsonLd />
              {children}

              <Toaster />
              <SpeedInsights />
            </ThemeWrapper>
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
