'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { BotMessageSquare, Sparkles, Lock } from 'lucide-react';
import { collection, serverTimestamp } from 'firebase/firestore';
import { useFirestore, useUser, useMemoFirebase, addDocumentNonBlocking } from '@/firebase';

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
import { useToast } from '@/hooks/use-toast';
import { generateQuizAction, getFeedbackAction } from '@/app/actions';
import { GenerateQuizQuestionsOutput } from '@/ai/flows/generate-quiz-questions';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Skeleton } from '@/components/ui/skeleton';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { useSubscription } from '@/hooks/use-subscription';
import Link from 'next/link';

const quizFormSchema = z.object({
  subject: z.string().min(2, 'Subject must be at least 2 characters.'),
  topic: z.string().min(2, 'Topic must be at least 2 characters.'),
  numberOfQuestions: z.coerce.number().min(1, 'Must have at least 1 question.').max(10, 'Cannot exceed 10 questions.'),
});

const quizAnswerSchema = z.object({
    answers: z.array(z.object({
        answer: z.string({ required_error: "Please select an answer."}),
    })),
});

type Feedback = { question: string; studentAnswer: string; correctAnswer: string; feedback: string };

function QuizFeatureLock() {
    return (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-lg">
            <Lock className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-bold">Quiz Access Required</h3>
            <p className="text-muted-foreground mb-4">Upgrade your plan to generate quizzes.</p>
            <Button asChild>
                <Link href="/subscription">Upgrade Plan</Link>
            </Button>
        </div>
    )
}

export default function QuizPage() {
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();
  const { isQuiz, isLoading: isSubLoading } = useSubscription();

  const [isLoading, setIsLoading] = React.useState(false);
  const [quizData, setQuizData] = React.useState<GenerateQuizQuestionsOutput | null>(null);
  const [quizState, setQuizState] = React.useState<'configuring' | 'taking' | 'results'>('configuring');
  const [feedback, setFeedback] = React.useState<Feedback[] | null>(null);
  const [score, setScore] = React.useState(0);
  const [isGettingFeedback, setIsGettingFeedback] = React.useState(false);

  const configForm = useForm<z.infer<typeof quizFormSchema>>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      subject: 'Science',
      topic: 'The Solar System',
      numberOfQuestions: 5,
    },
  });

  const answerForm = useForm<z.infer<typeof quizAnswerSchema>>({
    resolver: zodResolver(quizAnswerSchema),
  });

  React.useEffect(() => {
    if (quizData) {
      answerForm.reset({
        answers: quizData.questions.map(() => ({ answer: '' })),
      });
    }
  }, [quizData, answerForm]);


  async function onConfigSubmit(values: z.infer<typeof quizFormSchema>) {
    setIsLoading(true);
    setQuizData(null);
    setFeedback(null);
    try {
      const result = await generateQuizAction(values);
      setQuizData(result);
      setQuizState('taking');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error generating quiz',
        description: 'There was a problem creating your quiz. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  function handleAnswerSubmit(values: z.infer<typeof quizAnswerSchema>) {
    const finalAnswers = values.answers.map(a => a.answer);
    handleSubmitQuiz(finalAnswers);
  }

  const quizzesCollection = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, 'users', user.uid, 'quizzes');
  }, [firestore, user]);

  async function handleSubmitQuiz(finalAnswers: string[]) {
    if (!quizData) return;
    setIsGettingFeedback(true);
    let correctCount = 0;
    
    const feedbackPromises = quizData.questions.map((q, i) => {
      if (finalAnswers[i] === q.answer) {
        correctCount++;
      }
      return getFeedbackAction({
          question: q.question,
          studentAnswer: finalAnswers[i],
          correctAnswer: q.answer,
      });
    });

    try {
        const finalScore = (correctCount / quizData.questions.length) * 100
        const feedbackResults = await Promise.all(feedbackPromises);
        const detailedFeedback = quizData.questions.map((q, i) => ({
            question: q.question,
            correctAnswer: q.answer,
            studentAnswer: finalAnswers[i],
            feedback: feedbackResults[i].feedback,
            options: q.options,
        }));
        
        if (quizzesCollection) {
          const quizResult = {
            subject: configForm.getValues('subject'),
            topic: configForm.getValues('topic'),
            score: finalScore,
            createdAt: serverTimestamp(),
            questions: detailedFeedback,
          };
          addDocumentNonBlocking(quizzesCollection, quizResult);
        }

        setFeedback(detailedFeedback);
        setScore(finalScore);
        setQuizState('results');
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Could not get feedback",
            description: "There was an error processing the quiz results.",
        });
        const finalScore = (correctCount / quizData!.questions.length) * 100
        setScore(finalScore);
        setQuizState('results');
    } finally {
        setIsGettingFeedback(false);
    }
  }

  function resetQuiz() {
    setQuizState('configuring');
    setQuizData(null);
    setFeedback(null);
    setScore(0);
    configForm.reset();
    answerForm.reset();
  }
  
  if (isSubLoading || isLoading) {
    return <Card className="max-w-2xl mx-auto w-full"><CardHeader><Skeleton className="h-8 w-3/4" /></CardHeader><CardContent><Skeleton className="h-64 w-full" /></CardContent></Card>
  }

  const renderContent = () => {
    switch(quizState) {
        case 'configuring':
            return (
                <Card className="relative overflow-hidden">
                    {!isQuiz && <QuizFeatureLock />}
                    <div>
                        <CardHeader>
                            <CardTitle className="font-bold">Generate a New Quiz</CardTitle>
                            <CardDescription>Customize a quiz to test your knowledge.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...configForm}>
                                <form onSubmit={configForm.handleSubmit(onConfigSubmit)} className="space-y-6">
                                <FormField control={configForm.control} name="subject" render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Subject</FormLabel>
                                    <FormControl><Input placeholder="e.g., History" {...field} /></FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={configForm.control} name="topic" render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Topic</FormLabel>
                                    <FormControl><Input placeholder="e.g., The Roman Empire" {...field} /></FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={configForm.control} name="numberOfQuestions" render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Number of Questions</FormLabel>
                                    <FormControl><Input type="number" {...field} /></FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )} />
                                <Button type="submit" disabled={isLoading || !isQuiz} className="w-full font-bold">
                                    {isLoading ? 'Generating...' : <><Sparkles className="mr-2 h-4 w-4" /> Generate Quiz</>}
                                </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </div>
                </Card>
            );

        case 'taking':
            if (!quizData) return null;
            return (
              <Card>
                <Form {...answerForm}>
                  <form onSubmit={answerForm.handleSubmit(handleAnswerSubmit)}>
                    <CardHeader>
                      <CardTitle className="font-bold">{configForm.getValues('topic')} Quiz</CardTitle>
                      <CardDescription>Answer all the questions below and submit.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      {quizData.questions.map((question, qIndex) => (
                        <FormField
                          key={qIndex}
                          control={answerForm.control}
                          name={`answers.${qIndex}.answer`}
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel className="font-bold text-base">
                                Question {qIndex + 1}: {question.question}
                              </FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="grid grid-cols-1 gap-4"
                                >
                                  {question.options.map((option, oIndex) => (
                                    <FormItem
                                      key={oIndex}
                                      className="flex items-center space-x-3 space-y-0 border rounded-md p-4 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all"
                                    >
                                      <FormControl>
                                        <RadioGroupItem value={option} />
                                      </FormControl>
                                      <FormLabel className="font-normal w-full cursor-pointer text-base">
                                        {option}
                                      </FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" disabled={isGettingFeedback} className="w-full font-bold">
                        {isGettingFeedback ? 'Submitting...' : 'Submit Quiz'}
                      </Button>
                    </CardFooter>
                  </form>
                </Form>
              </Card>
            );

        case 'results':
            if (!quizData || !feedback) return null;
            return (
                <Card>
                    <CardHeader>
                        <CardTitle className="font-bold text-2xl">Quiz Results</CardTitle>
                        <CardDescription>You scored: <span className="font-bold text-primary text-xl">{score.toFixed(0)}%</span></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <h3 className="font-bold mb-4 flex items-center gap-2"><BotMessageSquare className="w-5 h-5 text-accent"/> AI Feedback</h3>
                        <Accordion type="single" collapsible className="w-full">
                            {quizData.questions.map((item, index) => {
                                const userAnswer = feedback[index].studentAnswer;
                                const correctAnswer = feedback[index].correctAnswer;
                                const isCorrect = userAnswer === correctAnswer;
                                return (
                                <AccordionItem value={`item-${index}`} key={index}>
                                    <AccordionTrigger className="text-left font-bold">
                                      <div className='flex items-center gap-2'>
                                        <span className={cn(isCorrect ? 'text-green-500' : 'text-red-500', 'text-2xl font-bold')}>
                                            {isCorrect ? '✓' : '✗'}
                                        </span>
                                        <span>Question {index + 1}: {item.question}</span>
                                      </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-4">
                                        <div className='space-y-2'>
                                            {item.options.map(option => {
                                                const isUserAnswer = option === userAnswer;
                                                const isCorrectAnswer = option === correctAnswer;
                                                
                                                return (
                                                    <div 
                                                        key={option}
                                                        className={cn(
                                                            'p-3 rounded-md border text-sm',
                                                            isUserAnswer && !isCorrectAnswer && 'bg-red-500/20 border-red-500/40',
                                                            isCorrectAnswer && 'bg-green-500/20 border-green-500/40',
                                                        )}
                                                    >
                                                        <span className='font-medium'>{option}</span>
                                                        {isUserAnswer && !isCorrectAnswer && <span className='text-red-500 font-semibold ml-2'>(Your Answer)</span>}
                                                        {isCorrectAnswer && <span className='text-green-500 font-semibold ml-2'>(Correct Answer)</span>}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        {feedback && feedback[index] && (
                                            <div className="p-3 bg-secondary/50 rounded-md">
                                                <p className="font-semibold">Feedback:</p>
                                                <p className="text-muted-foreground whitespace-pre-wrap">{feedback[index].feedback}</p>
                                            </div>
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            )})}
                        </Accordion>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={resetQuiz} className="w-full font-bold">
                           Take Another Quiz
                        </Button>
                    </CardFooter>
                </Card>
            );
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full">
        {renderContent()}
    </div>
  );
}
