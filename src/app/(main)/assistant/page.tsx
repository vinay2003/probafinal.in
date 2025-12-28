'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Lightbulb, Sparkles, BookText, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
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
import { Textarea } from '@/components/ui/textarea';
import { getExplanationAction, getStrategyAction, getSummaryAction } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { useSubscription } from '@/hooks/use-subscription';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const explanationFormSchema = z.object({
  topic: z.string().min(2, { message: 'Topic must be at least 2 characters.' }),
  complexityLevel: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  learningStyle: z.string().min(2, { message: 'Learning style must be at least 2 characters.' }),
});

const strategyFormSchema = z.object({
  studyHabits: z.string().min(10, { message: 'Please describe your habits in more detail.' }),
});

const summaryFormSchema = z.object({
    document: z.string().min(50, { message: 'Document must be at least 50 characters long.' }),
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

export default function AssistantPage() {
  const router = useRouter();
  const { isPro, isLoading: isSubLoading } = useSubscription();
  const { toast } = useToast();

  const [isExplanationLoading, setIsExplanationLoading] = React.useState(false);
  const [explanation, setExplanation] = React.useState<{ explanation: string; example: string } | null>(null);
  
  const [isStrategyLoading, setIsStrategyLoading] = React.useState(false);
  const [strategy, setStrategy] = React.useState<string | null>(null);

  const [isSummaryLoading, setIsSummaryLoading] = React.useState(false);
  const [summary, setSummary] = React.useState<string | null>(null);

  const explanationForm = useForm<z.infer<typeof explanationFormSchema>>({
    resolver: zodResolver(explanationFormSchema),
    defaultValues: {
      topic: '',
      complexityLevel: 'Intermediate',
      learningStyle: 'through real-world examples',
    },
  });

  const strategyForm = useForm<z.infer<typeof strategyFormSchema>>({
    resolver: zodResolver(strategyFormSchema),
    defaultValues: {
      studyHabits: '',
    },
  });

  const summaryForm = useForm<z.infer<typeof summaryFormSchema>>({
    resolver: zodResolver(summaryFormSchema),
    defaultValues: {
      document: '',
    },
  });

  async function onExplanationSubmit(values: z.infer<typeof explanationFormSchema>) {
    setIsExplanationLoading(true);
    setExplanation(null);
    try {
      const result = await getExplanationAction(values);
      setExplanation(result);
    } catch (error) {
      console.error('Error getting explanation:', error);
      toast({ title: 'Error', description: 'Could not generate explanation.', variant: 'destructive'})
    } finally {
      setIsExplanationLoading(false);
    }
  }

  async function onStrategySubmit(values: z.infer<typeof strategyFormSchema>) {
    setIsStrategyLoading(true);
    setStrategy(null);
    try {
      const result = await getStrategyAction(values);
      setStrategy(result.suggestions);
    } catch (error) {
      console.error('Error getting strategy:', error);
      toast({ title: 'Error', description: 'Could not generate suggestions.', variant: 'destructive'})
    } finally {
      setIsStrategyLoading(false);
    }
  }

  async function onSummarySubmit(values: z.infer<typeof summaryFormSchema>) {
    setIsSummaryLoading(true);
    setSummary(null);
    try {
        const result = await getSummaryAction(values);
        setSummary(result.summary);
    } catch(e) {
        console.error(e);
        toast({ title: 'Error', description: 'Could not generate summary.', variant: 'destructive'})
    } finally {
        setIsSummaryLoading(false);
    }
  }

  if (isSubLoading) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <Card><CardHeader><Skeleton className="h-8 w-3/4" /></CardHeader><CardContent><Skeleton className="h-40 w-full" /></CardContent></Card>
            <Card><CardHeader><Skeleton className="h-8 w-3/4" /></CardHeader><CardContent><Skeleton className="h-40 w-full" /></CardContent></Card>
            <Card className="lg:col-span-2"><CardHeader><Skeleton className="h-8 w-3/4" /></CardHeader><CardContent><Skeleton className="h-40 w-full" /></CardContent></Card>
        </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="relative">
            {!isPro && <ProFeatureLock />}
            <Card className='overflow-hidden'>
            <CardHeader>
                <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-accent" />
                <CardTitle className="font-bold">Personalized Explanations</CardTitle>
                </div>
                <CardDescription>
                Stuck on a tricky concept? Let the AI explain it in a way that makes sense to you.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...explanationForm}>
                <form onSubmit={explanationForm.handleSubmit(onExplanationSubmit)} className="space-y-6">
                    <FormField
                    control={explanationForm.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Topic</FormLabel>
                        <FormControl><Input placeholder="e.g., Quantum Entanglement" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={explanationForm.control}
                    name="complexityLevel"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Complexity Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
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
                    control={explanationForm.control}
                    name="learningStyle"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Preferred Learning Style</FormLabel>
                        <FormControl><Input placeholder="e.g., visual learner, love analogies" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" disabled={isExplanationLoading || !isPro} className="w-full font-bold">
                    {isExplanationLoading ? 'Generating...' : 'Get Explanation'}
                    </Button>
                </form>
                </Form>
            </CardContent>
            {(isExplanationLoading || explanation) && (
                <CardFooter className="flex flex-col items-start gap-4">
                {isExplanationLoading && (
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

        <div className="relative">
            {!isPro && <ProFeatureLock />}
            <Card className='overflow-hidden'>
            <CardHeader>
                <div className="flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-accent" />
                <CardTitle className="font-bold">Study Strategy Suggestions</CardTitle>
                </div>
                <CardDescription>
                Optimize your learning by getting AI-powered suggestions based on your study habits.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...strategyForm}>
                <form onSubmit={strategyForm.handleSubmit(onStrategySubmit)} className="space-y-6">
                    <FormField
                    control={strategyForm.control}
                    name="studyHabits"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Describe Your Study Habits</FormLabel>
                        <FormControl>
                            <Textarea
                            rows={5}
                            placeholder="e.g., I study chemistry for 2 hours every night by reading the textbook. I struggle to remember formulas."
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" disabled={isStrategyLoading || !isPro} className="w-full font-bold">
                    {isStrategyLoading ? 'Analyzing...' : 'Get Suggestions'}
                    </Button>
                </form>
                </Form>
            </CardContent>
            {(isStrategyLoading || strategy) && (
                <CardFooter className="flex flex-col items-start gap-4">
                {isStrategyLoading && (
                    <div className="w-full space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                )}
                {strategy && (
                    <div className="space-y-2 text-sm w-full p-4 bg-secondary/50 rounded-lg">
                    <h3 className="font-bold">Suggestions</h3>
                    <p className="text-muted-foreground whitespace-pre-wrap">{strategy}</p>
                    </div>
                )}
                </CardFooter>
            )}
            </Card>
        </div>

        <div className="lg:col-span-2 relative">
             {!isPro && <ProFeatureLock />}
            <Card className='overflow-hidden'>
                <CardHeader>
                    <div className="flex items-center gap-2">
                    <BookText className="w-6 h-6 text-accent" />
                    <CardTitle className="font-bold">AI Document Summarizer</CardTitle>
                    </div>
                    <CardDescription>
                    Paste in a long article, notes, or any text and get a concise summary from the AI.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...summaryForm}>
                    <form onSubmit={summaryForm.handleSubmit(onSummarySubmit)} className="space-y-6">
                        <FormField
                        control={summaryForm.control}
                        name="document"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Document to Summarize</FormLabel>
                            <FormControl>
                                <Textarea
                                rows={8}
                                placeholder="Paste your text here..."
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" disabled={isSummaryLoading || !isPro} className="w-full font-bold">
                        {isSummaryLoading ? 'Summarizing...' : 'Get Summary'}
                        </Button>
                    </form>
                    </Form>
                </CardContent>
                {(isSummaryLoading || summary) && (
                    <CardFooter className="flex flex-col items-start gap-4">
                    {isSummaryLoading && (
                        <div className="w-full space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    )}
                    {summary && (
                        <div className="space-y-2 text-sm w-full p-4 bg-secondary/50 rounded-lg">
                        <h3 className="font-bold">Summary</h3>
                        <p className="text-muted-foreground whitespace-pre-wrap">{summary}</p>
                        </div>
                    )}
                    </CardFooter>
                )}
            </Card>
        </div>
      </div>
  );
}
