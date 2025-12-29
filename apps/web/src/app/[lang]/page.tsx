'use client';

import * as React from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import Head from 'next/head';
import {
  ArrowRight,
  BrainCircuit,
  Layers,
  Github,
  Linkedin,
  Twitter,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/landing/Navbar';
import { Features } from '@/components/landing/Features';
import { Showcase } from '@/components/landing/Showcase';
import { Testimonials } from '@/components/landing/Testimonials';
import { SmoothScroll } from '@/components/landing/SmoothScroll';
import image1 from '@/assets/images/1.jpeg';
import image2 from '@/assets/images/2.jpeg';
import image3 from '@/assets/images/3.jpeg';
import image21 from '@/assets/images/21.jpg';
import favicon from '@/assets/icons/favicon.svg';

// Constants
const ANIMATION_BASE_DELAY = 200;
const SECTION_PADDING = 'py-12 md:py-24 lg:py-32';

// Types
interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface WorkflowStep {
  title: string;
  description: string;
  image: StaticImageData;
}

// Data
const features: Feature[] = [
  {
    icon: Zap,
    title: 'Personalized Learning Paths',
    description: 'AI-driven study plans tailored to your goals and learning style.',
  },
  {
    icon: Layers,
    title: 'AI Flashcards',
    description: 'Generate flashcards on any topic to reinforce your learning.',
  },
  {
    icon: BrainCircuit,
    title: 'Smart Quizzes',
    description: 'Test your knowledge with AI-generated quizzes that adapt to your level.',
  },
];

const workflowSteps: WorkflowStep[] = [
  {
    title: 'Create Your Study Plan',
    description: 'Tell Proba your exam date and goals. Our AI builds a personalized roadmap adapting to your daily schedule.',
    image: image1,
  },
  {
    title: 'Practice with AI',
    description: 'Engage in realistic mock interviews and solve adaptive quizzes that get harder as you improve.',
    image: image2,
  },
  {
    title: 'Analyze & Improve',
    description: 'Get instant feedback on your performance. Identify weak spots and conquer them with targeted repetition.',
    image: image3,
  },
];

// Components
const FeatureCard = React.memo(({ feature, index }: { feature: Feature; index: number }) => (
  <Card
    className="text-center animate-fade-in-up"
    style={{ animationDelay: `${ANIMATION_BASE_DELAY + index * 150}ms` }}
  >
    <CardHeader>
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <feature.icon className="h-8 w-8 text-primary" />
      </div>
    </CardHeader>
    <CardContent>
      <CardTitle className="font-bold mb-2">{feature.title}</CardTitle>
      <CardDescription>{feature.description}</CardDescription>
    </CardContent>
  </Card>
));

const WorkflowStepCard = React.memo(({ step, index }: { step: WorkflowStep; index: number }) => (
  <div
    className="flex flex-col items-center text-center animate-fade-in-up"
    style={{ animationDelay: `${ANIMATION_BASE_DELAY + index * 150}ms` }}
  >
    <div className="relative w-full max-w-[300px] aspect-square mb-4 rounded-lg overflow-hidden ring-2 ring-primary/20">
      <Image
        src={step.image}
        alt={step.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 300px"
        priority={index === 0}
        loading={index > 0 ? 'lazy' : undefined}
      />
    </div>
    <h3 className="text-xl font-bold">{step.title}</h3>
    <p className="mt-1 text-muted-foreground">{step.description}</p>
  </div>
));

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-landing') || {
    imageUrl: '/fallback-hero.jpg',
    description: 'Fallback hero image',
  };
  const beforeImage = PlaceHolderImages.find((img) => img.id === 'before-ai') || {
    imageUrl: '/fallback-before.jpg',
    description: 'Fallback before image',
  };

  return (
    <>
      <Head>
        <title>Proba - Unlock Your Learning Potential</title>
        <meta
          name="description"
          content="Proba is your AI-powered study companion, offering personalized study plans, AI-generated quizzes, and instant explanations."
        />
        <meta property="og:title" content="Proba - Unlock Your Learning Potential" />
        <meta
          property="og:description"
          content="Proba combines AI with proven learning techniques to help you succeed."
        />
        <meta property="og:image" content={heroImage.imageUrl} />
        <meta property="og:url" content="https://proba.ai" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <SmoothScroll>
        <div className="flex min-h-dvh flex-col bg-background text-foreground">
          {/* Header */}
          <Navbar />

          <main role="main" className="flex-1">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-16 md:pt-20 lg:pt-32 pb-16 md:pb-24 lg:pb-32">
              {/* Background Gradients */}
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-70" />
              <div aria-hidden="true" className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[100px] opacity-50" />
              <div aria-hidden="true" className="absolute bottom-0 left-0 -z-10 h-[300px] w-[300px] rounded-full bg-accent/20 blur-[80px] opacity-40" />

              <div className="container relative z-10">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                  {/* Text Content */}
                  <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-8 animate-fade-in-up">
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
                      <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                      AI-Powered Learning V2.0
                    </div>

                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                      <span className="block text-foreground">Unlock Your</span>
                      <span className="bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent pb-2">
                        Learning Potential
                      </span>
                    </h1>

                    <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                      Your personal AI-powered study companion. Create dynamic study plans, generate quizzes, and get instant explanations on any topic.
                    </p>

                    <div className="flex flex-col w-full sm:flex-row gap-4 justify-center lg:justify-start">
                      <Button size="lg" className="h-12 px-8 text-lg rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow" asChild>
                        <Link href="/signup">
                          Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="lg" className="h-12 px-8 text-lg rounded-full backdrop-blur-sm bg-background/50" asChild>
                        <Link href="#features">
                          Explore Features
                        </Link>
                      </Button>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-background flex items-center justify-center text-xs font-bold">A</div>
                        <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-background flex items-center justify-center text-xs font-bold">B</div>
                        <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-background flex items-center justify-center text-xs font-bold">C</div>
                      </div>
                      <p>Join 10,000+ students learning smarter.</p>
                    </div>
                  </div>

                  {/* Hero Visual */}
                  <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none lg:ml-auto perspective-1000 group">
                    <div className="relative z-10 transform transition-transform duration-500 hover:rotate-y-6 hover:rotate-x-6 transform-style-3d">
                      {/* Main Floating Card */}
                      <div className="relative rounded-2xl border border-border/50 bg-background/80 backdrop-blur-xl shadow-2xl p-6 glass-card animate-glow">
                        <div className="flex items-center justify-between mb-6 border-b border-border/50 pb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                          </div>
                          <div className="h-2 w-20 rounded-full bg-muted"></div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start gap-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
                            <div className="p-2 rounded-md bg-primary/20 text-primary">
                              <BrainCircuit className="w-6 h-6" />
                            </div>
                            <div className="space-y-2 flex-1">
                              <div className="h-4 w-3/4 rounded bg-primary/20"></div>
                              <div className="h-3 w-1/2 rounded bg-primary/10"></div>
                            </div>
                          </div>

                          <div className="space-y-2 pl-4 border-l-2 border-dashed border-muted">
                            <div className="flex items-center gap-3 p-2">
                              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs">1</div>
                              <div className="h-3 w-2/3 rounded bg-muted"></div>
                            </div>
                            <div className="flex items-center gap-3 p-2">
                              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs">2</div>
                              <div className="h-3 w-3/4 rounded bg-muted"></div>
                            </div>
                          </div>
                        </div>

                        {/* Floating Floating Elements */}
                        <div className="absolute -top-10 -right-10 p-4 rounded-xl bg-background/90 backdrop-blur-md shadow-xl border border-border/50 animate-bounce [animation-duration:3s]">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">🔥</span>
                            <div>
                              <p className="text-xs font-bold">Streak</p>
                              <p className="text-sm font-bold text-orange-500">12 Days</p>
                            </div>
                          </div>
                        </div>

                        <div className="absolute -bottom-8 -left-8 p-4 rounded-xl bg-background/90 backdrop-blur-md shadow-xl border border-border/50 animate-bounce [animation-duration:4s] [animation-delay:1s]">
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-full bg-green-500/20 text-green-600">
                              <Zap className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-muted-foreground">Accuracy</p>
                              <p className="text-sm font-bold">98%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Blobs visual behind the card */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 rounded-full bg-primary/20 blur-[60px] animate-pulse"></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Premium Features Section */}
            <Features />

            {/* Scroll Showcase Section */}
            <Showcase />

            {/* Workflow Section */}
            <section id="how-it-works" className={cn("container", SECTION_PADDING)}>
              <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                <h2 className="text-2xl font-bold sm:text-3xl">How It Works</h2>
                <p className="mt-4 text-base sm:text-lg text-muted-foreground">
                  Start learning in 3 simple, visual steps.
                </p>
              </div>
              <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-12">
                {workflowSteps.map((step, index) => (
                  <WorkflowStepCard key={step.title} step={step} index={index} />
                ))}
              </div>
            </section>

            {/* Testimonials / Reviews */}
            <Testimonials />

            {/* Before/After Section */}
            <section className={cn("container", SECTION_PADDING)}>
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-2xl font-bold sm:text-3xl">From Scattered to Structured</h2>
                <p className="mt-4 text-base sm:text-lg text-muted-foreground">
                  See the difference AI-powered planning can make.
                </p>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
                <Card className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                  <CardHeader>
                    <CardTitle className="font-bold text-center text-red-400">
                      Before Proba
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="italic text-muted-foreground">
                      "My notes were a mess, I never knew what to study next, and I was constantly cramming before exams."
                    </p>
                    <div className="relative mt-4 h-64 w-full overflow-hidden rounded-lg">
                      <Image
                        src={beforeImage.imageUrl}
                        alt={beforeImage.description}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="lazy"
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card
                  className="border-primary ring-2 ring-primary animate-glow animate-fade-in-up"
                  style={{ animationDelay: '400ms' }}
                >
                  <CardHeader>
                    <CardTitle className="font-bold text-center text-green-400">
                      After Proba
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="italic text-muted-foreground">
                      "Now I have a clear plan, instant help when I'm stuck, and I feel confident and prepared for every test."
                    </p>
                    <div className="relative mt-4 h-64 w-full overflow-hidden rounded-lg">
                      <Image
                        src={image21}
                        alt="Structured study plan with Proba"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="lazy"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer role="contentinfo" className="border-t bg-background/50">
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                <div className="col-span-full lg:col-span-1">
                  <Link href="/" aria-label="Proba Home">
                    <Image src={favicon} alt="Proba Logo" width={72} height={72} priority />
                  </Link>
                  <p className="mt-4 text-sm text-muted-foreground">Learn smarter, not harder with AI.</p>
                </div>
                <div className="md:col-start-2">
                  <h3 className="font-bold tracking-wider uppercase text-sm">Product</h3>
                  <ul className="mt-4 space-y-2">
                    <li>
                      <Link
                        href="#features"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        Features
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/login"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        Sign In
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/signup"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        Sign Up
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold tracking-wider uppercase text-sm">Company</h3>
                  <ul className="mt-4 space-y-2">
                    <li>
                      <Link
                        href="/about-us"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact-us"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold tracking-wider uppercase text-sm">Legal</h3>
                  <ul className="mt-4 space-y-2">
                    <li>
                      <Link
                        href="/privacy-policy"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/return-policy"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        Return Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/refund-policy"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        Refund Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/disclaimer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        Disclaimer
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-span-full md:col-span-1 lg:col-span-1 mt-8 md:mt-0">
                  <h3 className="font-bold tracking-wider uppercase text-sm">Follow Us</h3>
                  <div className="mt-4 flex space-x-4">
                    <Link
                      href="https://twitter.com/proba"
                      className="text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                      aria-label="Follow Proba on Twitter"
                    >
                      <Twitter className="h-6 w-6" />
                    </Link>
                    <Link
                      href="https://github.com/proba"
                      className="text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                      aria-label="Follow Proba on GitHub"
                    >
                      <Github className="h-6 w-6" />
                    </Link>
                    <Link
                      href="https://linkedin.com/company/proba"
                      className="text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                      aria-label="Follow Proba on LinkedIn"
                    >
                      <Linkedin className="h-6 w-6" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Proba, Inc. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </SmoothScroll>
    </>
  );
}