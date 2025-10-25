'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Sparkles, ArrowLeft, ArrowRight, RefreshCw, Layers, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { useToast } from '@/hooks/use-toast';
import { generateFlashcardsAction } from '@/app/actions';
import { GenerateFlashcardsOutput } from '@/ai/flows/generate-flashcards';
import { Skeleton } from '@/components/ui/skeleton';
import { useSubscription } from '@/hooks/use-subscription';
import Link from 'next/link';

const flashcardFormSchema = z.object({
  topic: z.string().min(2, 'Topic must be at least 2 characters.'),
  numberOfCards: z.coerce.number().min(3, 'Must have at least 3 cards.').max(20, 'Cannot exceed 20 cards.'),
});

type Flashcard = {
  term: string;
  definition: string;
};

function ProFeatureLock() {
    return (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-lg">
            <Lock className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-bold">This is a Pro Feature</h3>
            <p className="text-muted-foreground mb-4">Upgrade your plan to generate flashcards.</p>
            <Button asChild>
                <Link href="/subscription">Upgrade to Pro</Link>
            </Button>
        </div>
    )
}

function FlashcardViewer({ cards, onRestart }: { cards: Flashcard[]; onRestart: () => void }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isFlipped, setIsFlipped] = React.useState(false);

  React.useEffect(() => {
    // Reset flip state when card changes
    setIsFlipped(false);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className='font-bold flex justify-between items-center'>
          <span>Flashcards</span>
          <span className="text-sm font-normal text-muted-foreground">{currentIndex + 1} / {cards.length}</span>
        </CardTitle>
        <CardDescription>Click the card to flip it.</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col items-center gap-4'>
        <div 
          className="w-full h-64 perspective-1000"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div
            className={cn(
              "relative w-full h-full transform-style-3d transition-transform duration-700",
              isFlipped ? 'rotate-y-180' : ''
            )}
          >
            <div className="absolute w-full h-full backface-hidden flex items-center justify-center p-6 bg-secondary rounded-lg">
                <p className="text-center text-xl font-semibold">{cards[currentIndex].term}</p>
            </div>
            <div className="absolute w-full h-full backface-hidden flex items-center justify-center p-6 bg-primary text-primary-foreground rounded-lg rotate-y-180">
                <p className="text-center text-base">{cards[currentIndex].definition}</p>
            </div>
          </div>
        </div>

      </CardContent>
      <CardFooter className="flex justify-between flex-wrap gap-2">
        <Button variant="outline" onClick={handlePrev} className="font-bold">
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button onClick={onRestart} variant="secondary" className="font-bold">
          <RefreshCw className="mr-2 h-4 w-4" /> New Deck
        </Button>
        <Button onClick={handleNext} className="font-bold">
            Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function FlashcardsPage() {
  const { toast } = useToast();
  const { isPro, isLoading: isSubLoading } = useSubscription();

  const [isLoading, setIsLoading] = React.useState(false);
  const [flashcards, setFlashcards] = React.useState<GenerateFlashcardsOutput | null>(null);

  const form = useForm<z.infer<typeof flashcardFormSchema>>({
    resolver: zodResolver(flashcardFormSchema),
    defaultValues: {
      topic: 'JavaScript Fundamentals',
      numberOfCards: 10,
    },
  });
  
  async function onSubmit(values: z.infer<typeof flashcardFormSchema>) {
    setIsLoading(true);
    setFlashcards(null);
    try {
      const result = await generateFlashcardsAction(values);
      setFlashcards(result);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error Generating Flashcards',
        description: 'There was a problem creating your deck. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  function handleRestart() {
    setFlashcards(null);
    form.reset();
  }

  if (isSubLoading) {
      return <Card className="w-full max-w-2xl mx-auto"><CardHeader><Skeleton className="h-8 w-3/4" /></CardHeader><CardContent><Skeleton className="h-64 w-full" /></CardContent></Card>
  }

  if (isLoading) {
    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
                <Skeleton className="w-full h-64" />
            </CardContent>
            <CardFooter className="flex justify-between">
                <Skeleton className="h-10 w-28" />
                <Skeleton className="h-10 w-28" />
            </CardFooter>
        </Card>
    );
  }

  if (flashcards) {
    return <FlashcardViewer cards={flashcards.flashcards} onRestart={handleRestart} />;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto relative overflow-hidden">
        {!isPro && <ProFeatureLock />}
        <div>
            <CardHeader>
                <div className='flex items-center gap-2'>
                    <Layers className="w-6 h-6 text-accent" />
                    <CardTitle className="font-bold">Generate Flashcards</CardTitle>
                </div>
                <CardDescription>
                    Create a deck of flashcards on any topic to supercharge your study sessions.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Topic</FormLabel>
                        <FormControl><Input placeholder="e.g., The Periodic Table" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="numberOfCards"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Number of Cards</FormLabel>
                        <FormControl><Input type="number" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" disabled={isLoading || !isPro} className="w-full font-bold">
                    {isLoading ? 'Generating Deck...' : <><Sparkles className="mr-2 h-4 w-4" /> Generate Deck</>}
                    </Button>
                </form>
                </Form>
            </CardContent>
        </div>
    </Card>
  );
}
