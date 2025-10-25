'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CalendarIcon, PlusCircle, Trash2, CheckCircle, Circle } from 'lucide-react';
import { format } from 'date-fns';
import { collection, serverTimestamp, Timestamp, query, orderBy } from 'firebase/firestore';
import { useFirestore, useUser, useCollection, useMemoFirebase, addDocumentNonBlocking, updateDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase';
import { doc } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';


const planSchema = z.object({
  subject: z.string().min(2, 'Subject must be at least 2 characters.'),
  topic: z.string().min(2, 'Topic must be at least 2 characters.'),
  date: z.date({
    required_error: 'A date is required.',
  }),
  duration: z.coerce.number().min(5, 'Duration must be at least 5 minutes.'),
});

type StudyPlan = z.infer<typeof planSchema> & { id: string, status: 'pending' | 'completed', date: Timestamp };


export default function StudyPlanPage() {
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();

  const studyPlansQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(collection(firestore, 'users', user.uid, 'studyPlans'), orderBy('date', 'desc'));
  }, [firestore, user]);


  const { data: studyPlans, isLoading } = useCollection<StudyPlan>(studyPlansQuery);

  const form = useForm<z.infer<typeof planSchema>>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      subject: '',
      topic: '',
      date: new Date(),
      duration: 60,
    },
  });

  async function onSubmit(values: z.infer<typeof planSchema>) {
    if (!user) return;
    const studyPlansCollection = collection(firestore, 'users', user.uid, 'studyPlans');

    const newPlan = { 
      ...values, 
      userId: user.uid,
      createdAt: serverTimestamp(),
      status: 'pending',
    };
    addDocumentNonBlocking(studyPlansCollection, newPlan);
    form.reset({
        subject: '',
        topic: '',
        date: new Date(),
        duration: 60,
    });
    toast({
      title: 'Success!',
      description: 'Your study session has been scheduled.',
    });
  }

  async function deletePlan(id: string) {
    if (!firestore || !user) return;
    const docRef = doc(firestore, 'users', user.uid, 'studyPlans', id);
    deleteDocumentNonBlocking(docRef);
    toast({
        title: 'Session Removed',
        description: 'The study session has been removed from your plan.',
        variant: 'destructive',
    });
  }

  async function togglePlanStatus(plan: StudyPlan) {
    if (!firestore || !user) return;
    const docRef = doc(firestore, 'users', user.uid, 'studyPlans', plan.id);
    const newStatus = plan.status === 'pending' ? 'completed' : 'pending';
    updateDocumentNonBlocking(docRef, { status: newStatus });
  }

  return (
    <div className="grid gap-8 grid-cols-1 lg:grid-cols-3 items-start">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">Create Study Session</CardTitle>
            <CardDescription>Add a new session to your study plan.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Biology" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Cell Structure" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full justify-start text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date(new Date().toDateString())}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (minutes)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 60" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full font-bold">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Session
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">Your Study Plan</CardTitle>
            <CardDescription>Here are your upcoming study sessions. Click to mark as complete.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
                <div className='space-y-4'>
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                </div>
            ) : studyPlans && studyPlans.length > 0 ? (
              <div className="space-y-4">
                {studyPlans.map((plan) => (
                  <Card key={plan.id} className={cn("flex items-center p-3 sm:p-4 transition-colors", plan.status === 'completed' && "bg-secondary")}>
                    <Button variant="ghost" size="icon" onClick={() => togglePlanStatus(plan)} className="shrink-0 mr-4">
                        {plan.status === 'completed' ? <CheckCircle className="h-5 w-5 text-primary" /> : <Circle className="h-5 w-5 text-muted-foreground"/>}
                    </Button>
                    <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                      <div>
                        <p className={cn("font-bold", plan.status === 'completed' && "line-through text-muted-foreground")}>{plan.subject}</p>
                        <p className={cn("font-normal text-muted-foreground", plan.status === 'completed' && "line-through")}>{plan.topic}</p>
                      </div>
                       <p className={cn("text-sm text-muted-foreground sm:text-right", plan.status === 'completed' && "line-through")}>
                        {format(plan.date.toDate(), 'PPP')} - {plan.duration} minutes
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => deletePlan(plan.id)} className="shrink-0 ml-4">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-12">
                <p>No study sessions planned yet.</p>
                <p className="text-sm">Use the form to add your first session!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
