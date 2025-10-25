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
import image1 from '@/public/image/1.jpeg';
import image2 from '@/public/image/2.jpeg';
import image3 from '@/public/image/3.jpeg';
import image21 from '@/public/image/21.jpg';
import favicon from '@/public/icon/favicon.svg';

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
    title: 'Sign Up & Set Goals',
    description: 'Create your account in seconds and tell Proba what you want to achieve.',
    image: image1,
  },
  {
    title: 'Generate Your Plan',
    description: 'Our AI analyzes your goals and instantly builds a personalized study roadmap.',
    image: image2,
  },
  {
    title: 'Learn & Conquer',
    description: 'Follow your plan, use AI tools, and track your progress towards mastery.',
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
      <div className="flex min-h-dvh flex-col bg-background text-foreground">
        {/* Header */}
        <header
          role="banner"
          className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm"
        >
          <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
            <Link href="/" aria-label="Proba Home">
              <Image src={favicon} alt="Proba Logo" width={72} height={72} priority />
            </Link>
            <nav className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">
                  Start Your Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </nav>
          </div>
        </header>

        <main role="main" className="flex-1">
          {/* Hero Section */}
          <section className={cn("relative", SECTION_PADDING, "overflow-hidden")}>
            <div
              aria-hidden="true"
              className="absolute inset-0 top-0 -z-10 h-2/3 bg-primary/10 [mask-image:radial-gradient(farthest-side_at_top_center,white,transparent)]"
            />
            <div className="container text-center">
              <div className="mx-auto max-w-3xl animate-fade-in-up">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-br from-primary via-accent to-primary bg-clip-text text-transparent">
                  Unlock Your Learning Potential with Proba
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground">
                  Your personal AI-powered study companion. Create dynamic study plans, generate quizzes, and get instant explanations on any topic.
                </p>
              </div>
              <div className="mt-8 flex justify-center gap-4 animate-fade-in-up [animation-delay:200ms]">
                <Button size="lg" asChild>
                  <Link href="/signup">
                    Start Your Free Trial <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section
            id="features"
            className={cn(
              "container space-y-6 bg-secondary/30 rounded-lg",
              SECTION_PADDING
            )}
          >
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
                A Smarter Way to Study
              </h2>
              <p className="max-w-[85%] text-base sm:text-lg text-muted-foreground">
                Proba combines cutting-edge AI with proven learning techniques to help you succeed.
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
              {features.map((feature, i) => (
                <FeatureCard key={feature.title} feature={feature} index={i} />
              ))}
            </div>
          </section>

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
                <p className="mt-4 text-sm text-muted-foreground">Learn smarter, not harder.</p>
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
                <h3 className="font-bold tracking-wider uppercase text-sm">Legal</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link
                      href="/privacy"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold tracking-wider uppercase text-sm">Connect</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link
                      href="/contact"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/support"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      Support
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
    </>
  );
}