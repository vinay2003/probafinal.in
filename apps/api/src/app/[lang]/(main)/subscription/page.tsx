'use client';

import * as React from 'react';
import { Check, Sparkles, Zap, FileQuestion, BotMessageSquare, Layers } from 'lucide-react';
import { useSubscription } from '@/hooks/use-subscription';
import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const quizFeatures = [
  'Unlimited AI-powered quiz generation',
  'AI feedback on your answers',
];

const proFeatures = [
    ...quizFeatures,
  'Unlimited AI flashcard decks',
  'Personalized explanations for any topic',
  'AI-powered study strategy suggestions',
  'Priority support',
];

export default function SubscriptionPage() {
  const { tier, isLoading: isSubLoading } = useSubscription();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  const isLoading = isSubLoading || isUserLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-8">
        <div className="w-full max-w-4xl animate-fade-in-up">
            <div className='text-center mb-10'>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Find the Plan That's Right for You</h1>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                    Whether you need a little help or a full AI-powered study suite, we have a plan for you.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <Card className={cn("transition-all hover:shadow-lg hover:-translate-y-1", tier === 'quiz' && 'border-primary ring-2 ring-primary')}>
                    <CardHeader className="text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                            <FileQuestion className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="text-3xl font-bold">Quiz Access</CardTitle>
                        <CardDescription className="text-lg text-muted-foreground">
                           Perfect for exam prep.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-center">
                            <p className="text-4xl font-bold">₹49<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                        </div>
                        <ul className="space-y-2">
                            {quizFeatures.map((feature) => (
                            <li key={feature} className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                <span className="text-muted-foreground">{feature}</span>
                            </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        {tier === 'quiz' ? (
                             <Button disabled className="w-full font-bold text-lg py-6">Your Current Plan</Button>
                        ) : (
                            <Button
                            asChild
                            disabled={tier === 'pro'}
                            className="w-full font-bold text-lg py-6"
                            >
                              <Link href="/subscription/checkout?tier=quiz">Get Quiz Access</Link>
                            </Button>
                        )}
                    </CardFooter>
                </Card>

                 <Card className={cn('transition-all hover:shadow-lg hover:-translate-y-1 border-primary ring-2 ring-primary', tier === 'pro' && 'shadow-primary/40')}>
                    <CardHeader className="text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                            <Sparkles className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="text-3xl font-bold">Pro Access</CardTitle>
                        <CardDescription className="text-lg text-muted-foreground">
                           The ultimate AI study companion.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <div className="text-center">
                            <p className="text-4xl font-bold">₹119<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                        </div>
                        <ul className="space-y-2">
                        {proFeatures.map((feature) => (
                            <li key={feature} className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                            </li>
                        ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        {tier === 'pro' ? (
                            <Button disabled className="w-full font-bold text-lg py-6">Your Current Plan</Button>
                        ) : (
                            <Button
                                asChild
                                className="w-full font-bold text-lg py-6 animate-glow"
                            >
                              <Link href="/subscription/checkout?tier=pro">
                                <Zap className="mr-2 h-5 w-5" /> Upgrade to Pro
                              </Link>
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </div>
    </div>
  );
}
