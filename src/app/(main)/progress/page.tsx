'use client';

import * as React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { useCollection, useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';

const chartConfig = {
  studied: {
    label: 'Hours Studied',
    color: 'hsl(var(--primary))',
  },
  quizzes: {
    label: 'Quizzes Taken',
    color: 'hsl(var(--primary))',
  },
  score: {
    label: 'Avg. Score',
    color: 'hsl(var(--primary))',
  },
};

export default function ProgressPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const studySessionsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    const today = new Date();
    const weekStart = startOfWeek(today);
    const weekEnd = endOfWeek(today);
    return query(
      collection(firestore, 'users', user.uid, 'studyPlans'),
      where('date', '>=', weekStart),
      where('date', '<=', weekEnd)
    );
  }, [firestore, user]);

  const quizzesQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, 'users', user.uid, 'quizzes');
  }, [firestore, user]);

  const { data: studySessions, isLoading: isLoadingSessions } = useCollection(studySessionsQuery);
  const { data: quizzes, isLoading: isLoadingQuizzes } = useCollection(quizzesQuery);

  const weeklyStudyData = React.useMemo(() => {
    const today = new Date();
    const weekStart = startOfWeek(today);
    const weekEnd = endOfWeek(today);
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

    if (!studySessions) {
      return weekDays.map((day) => ({
        date: format(day, 'EEE'),
        studied: 0,
      }));
    }

    return weekDays.map((day) => {
      const dailySessions = studySessions.filter((session) =>
        isSameDay(session.date.toDate(), day) && session.status === 'completed'
      );
      const totalMinutes = dailySessions.reduce(
        (sum, session) => sum + session.duration,
        0
      );
      return {
        date: format(day, 'EEE'),
        studied: parseFloat((totalMinutes / 60).toFixed(1)),
      };
    });
  }, [studySessions]);

  const quizPerformanceData = React.useMemo(() => {
    if (!quizzes) return [];
    // Sort quizzes by date and take the last 6
    return quizzes
      .sort((a, b) => a.createdAt.toDate() - b.createdAt.toDate())
      .slice(-6)
      .map((quiz) => ({
        date: format(quiz.createdAt.toDate(), 'MMM'),
        score: quiz.score,
      }));
  }, [quizzes]);

  const isLoading = isLoadingSessions || isLoadingQuizzes;

  if (isLoading) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <Skeleton className="h-7 w-48" />
                    <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[300px] w-full" />
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <Skeleton className="h-7 w-48" />
                    <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[300px] w-full" />
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-bold">This Week's Study Hours</CardTitle>
          <CardDescription>
            Your completed study sessions for the current week.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart accessibilityLayer data={weeklyStudyData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis unit="h" />
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="studied" fill="var(--color-studied)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-bold">Quiz Performance Over Time</CardTitle>
          <CardDescription>
            Your average quiz scores from recent quizzes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <LineChart accessibilityLayer data={quizPerformanceData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis domain={[0, 100]} unit="%" />
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                dataKey="score"
                type="monotone"
                stroke="var(--color-score)"
                strokeWidth={3}
                dot={{
                  fill: 'var(--color-score)',
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
