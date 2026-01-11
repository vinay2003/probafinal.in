"use client";

import { motion } from "framer-motion";
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Mic, FileText, Globe, Sparkles, TrendingUp, CalendarCheck, FileQuestion, Layers, BotMessageSquare, Lock, Code, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useSubscription } from '@/hooks/use-subscription';
import { useUser } from '@/firebase';
import { Badge } from "@/components/ui/badge";

const features = [
  // ... (omitted for brevity, will rely on accurate range targeting or just Replace specific lines)
  // Actually I will just target the imports and the component start.

  // Let's do it in two chunks? No, replace_file_content is single chunk.
  // I'll replace from imports down to the component definition start.

  {
    title: 'AI Mock Interview',
    description: 'Master your speaking skills with real-time AI feedback.',
    href: '/interview',
    icon: Mic,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    delay: 0.1
  },
  {
    title: 'Global Exams Prep',
    description: 'Targeted practice for IELTS, TOEFL, and GRE.',
    href: '/prep/ielts',
    icon: Globe,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    delay: 0.2
  },
  {
    title: 'Resume Optimizer',
    description: 'Beat the ATS with AI-driven keyword analysis.',
    href: '/resume',
    icon: FileText,
    color: "text-green-500",
    bg: "bg-green-500/10",
    delay: 0.3
  },
  {
    title: 'Smart Summarizer',
    description: 'Convert heavy PDFs into bite-sized audio cheat sheets.',
    href: '/summary',
    icon: Sparkles,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    delay: 0.4
  },
  {
    title: 'Coding Challenge',
    description: 'Live JS/TS Sandbox with AI Code Review.',
    href: '/test/coding',
    icon: Code,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    delay: 0.5
  },
  {
    title: 'SQL Playground',
    description: 'Test your database skills with AI query optimization.',
    href: '/test/sql',
    icon: Database,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    delay: 0.6
  }
];

const coreTools = [
  { title: 'Study Plan', href: '/study-plan', icon: CalendarCheck },
  { title: 'Progress', href: '/progress', icon: TrendingUp },
  { title: 'Quizzes', href: '/quiz', icon: FileQuestion },
  { title: 'Flashcards', href: '/flashcards', icon: Layers },
];

export default function DashboardPage() {
  const { isPro } = useSubscription();
  const { user } = useUser();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8 pb-10">

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-zinc-950 border border-border/10 p-8 md:p-12 text-center md:text-left">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent opacity-50 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <header className="space-y-6 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Welcome back, <span className="text-violet-400">Scholar</span>
            </h1>
            <p className="text-xl text-zinc-400 mb-8">
              Your AI Career Hub is ready. What goal are we crushing today?
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Button size="lg" className="rounded-full bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 shadow-lg shadow-violet-500/20 transition-all font-semibold" asChild>
                <Link href="/interview">
                  <Mic className="mr-2 h-5 w-5" /> Start Interview
                </Link>
              </Button>
            </div>
          </header>

          <div className="relative block w-full max-w-[300px] md:max-w-[500px] shrink-0 mt-8 md:mt-0 mx-auto md:mx-0">
            <Image
              src="/dashboard-hero-v2.png"
              alt="Dashboard Hero"
              width={600}
              height={600}
              className="object-contain drop-shadow-2xl"
              priority
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>
        </div>
      </section >

      {/* Feature Grid */}
      < motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {
          features.map((f) => (
            <motion.div key={f.title} variants={item}>
              <Link href={f.href}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 group overflow-hidden relative">
                  <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity`}>
                    <f.icon className="w-24 h-24" />
                  </div>
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${f.bg} ${f.color}`}>
                      <f.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl">{f.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{f.description}</CardDescription>
                  </CardContent>
                  {!isPro && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm"><Lock className="w-3 h-3 mr-1" /> Pro</Badge>
                    </div>
                  )}
                </Card>
              </Link>
            </motion.div>
          ))
        }
      </motion.div >

      {/* Core Tools */}
      < section >
        <h2 className="text-2xl font-bold mb-6">Learning Tools</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coreTools.map((tool) => (
            <Link href={tool.href} key={tool.title}>
              <div className="flex items-center p-4 bg-card hover:bg-muted/50 border rounded-xl transition-colors gap-4 shadow-sm hover:shadow-md">
                <div className="p-2 bg-secondary rounded-full">
                  <tool.icon className="w-5 h-5 text-foreground" />
                </div>
                <span className="font-semibold">{tool.title}</span>
                <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </section >

      {/* Quick Bot Action */}
      <section className="glass rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="p-3 bg-primary/20 rounded-full text-primary">
            <BotMessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Need quick help?</h3>
            <p className="text-muted-foreground">Ask the AI Assistant anything about your prep.</p>
          </div>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/assistant">Chat Now</Link>
        </Button>
      </section>
    </div >
  );
}
