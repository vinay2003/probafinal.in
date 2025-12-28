'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BotMessageSquare, CalendarCheck, FileQuestion, Layers, Lock, Sparkles, TrendingUp } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getExplanationAction } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { useSubscription } from '@/hooks/use-subscription';

const features = [
  {
    title: 'Interactive Study Plan',
    description: 'Create and manage your study schedule with ease. Plan your sessions and stay on track.',
    href: '/study-plan',
    icon: CalendarCheck,
  },
  {
    title: 'Visual Progress Tracker',
    description: 'Monitor your learning journey with interactive charts. See how far you’ve come.',
    href: '/progress',
    icon: TrendingUp,
  },
  {
    title: 'Customizable Quizzes',
    description: 'Generate quizzes on any topic to test your knowledge and prepare for exams.',
    href: '/quiz',
    icon: FileQuestion,
  },
  {
    title: 'AI Flashcards',
    description: 'Generate flashcard decks on any topic for quick review sessions.',
    href: '/flashcards',
    icon: Layers,
  },
];

const explanationFormSchema = z.object({
  topic: z.string().min(2, {
    message: 'Topic must be at least 2 characters.',
  }),
  complexityLevel: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  learningStyle: z.string().min(2, {
    message: 'Learning style must be at least 2 characters.',
  }),
});

function ProFeatureLock() {
    return (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-lg">
            <Lock className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-bold">This is a Pro Feature</h3>
            <p className="text-muted-foreground mb-4">Upgrade your plan to use the AI Assistant.</p>
            <Button asChild>
                <Link href="/subscription">Upgrade to Pro</Link>
            </Button>
        </div>
    )
}


export default function DashboardPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-dashboard');
  const { isPro, isLoading: isSubLoading } = useSubscription();

  const [isLoading, setIsLoading] = React.useState(false);
  const [explanation, setExplanation] = React.useState<{ explanation: string; example: string } | null>(null);

  const form = useForm<z.infer<typeof explanationFormSchema>>({
    resolver: zodResolver(explanationFormSchema),
    defaultValues: {
      topic: '',
      complexityLevel: 'Intermediate',
      learningStyle: 'visual analogies',
    },
  });

  async function onSubmit(values: z.infer<typeof explanationFormSchema>) {
    setIsLoading(true);
    setExplanation(null);
    try {
      const result = await getExplanationAction(values);
      setExplanation(result);
    } catch (error) {
      console.error('Error getting explanation:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <Card className="overflow-hidden">
        <div className="relative h-48 sm:h-64 w-full">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Welcome to Proba</h1>
            <p className="mt-1 sm:mt-2 text-base sm:text-lg text-white/90">Your personal AI-powered study companion.</p>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Card key={feature.title} className="flex flex-col group hover:border-primary transition-all duration-300">
            <CardHeader className="flex-row items-center gap-4 space-y-0">
                <div className="bg-primary/10 p-3 rounded-md group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-bold text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <Link href={feature.href}>
                  Go to {feature.title.split(' ')[0]} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card className='relative'>
        {!isSubLoading && !isPro && <ProFeatureLock />}
        <CardHeader>
          <div className="flex items-center gap-2">
            <BotMessageSquare className="w-6 h-6 text-accent" />
            <CardTitle className="font-bold">AI Quick Explanation</CardTitle>
          </div>
          <CardDescription>
            Need help with a concept? Get a personalized explanation from your AI assistant.
          </CardDescription>
        </CardHeader>
        <CardContent>
            {isSubLoading ? <Skeleton className="h-32 w-full" /> : (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                    <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Topic</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Photosynthesis" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="complexityLevel"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Complexity</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select complexity" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="learningStyle"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Learning Style</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., simple analogies" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <Button type="submit" disabled={isLoading || !isPro} className="w-full sm:w-auto font-bold">
                    {isLoading ? 'Generating...' : 'Get Explanation'}
                </Button>
                </form>
            </Form>
            )}
        </CardContent>
        {(isLoading || explanation) && (
          <CardFooter className="flex flex-col items-start gap-4">
            {isLoading && (
              <div className="w-full space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                 <Skeleton className="h-4 w-1/4 mt-4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            )}
            {explanation && (
              <div className="space-y-4 text-sm w-full p-4 bg-secondary/50 rounded-lg">
                <div>
                  <h3 className="font-bold">Explanation</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">{explanation.explanation}</p>
                </div>
                <div>
                  <h3 className="font-bold">Example</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">{explanation.example}</p>
                </div>
              </div>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
