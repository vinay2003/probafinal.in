'use server';

/**
 * @fileOverview An AI agent that provides feedback on student answers to quizzes and practice questions.
 *
 * - getFeedbackOnAnswers - A function that takes student answers and provides feedback.
 * - GetFeedbackOnAnswersInput - The input type for the getFeedbackOnAnswers function.
 * - GetFeedbackOnAnswersOutput - The return type for the getFeedbackOnAnswers function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetFeedbackOnAnswersInputSchema = z.object({
  question: z.string().describe('The question being asked.'),
  studentAnswer: z.string().describe('The student\u2019s answer to the question.'),
  correctAnswer: z.string().describe('The correct answer to the question.'),
});
export type GetFeedbackOnAnswersInput = z.infer<typeof GetFeedbackOnAnswersInputSchema>;

const GetFeedbackOnAnswersOutputSchema = z.object({
  feedback: z.string().describe('The AI\u2019s feedback on the student\u2019s answer.'),
});
export type GetFeedbackOnAnswersOutput = z.infer<typeof GetFeedbackOnAnswersOutputSchema>;

export async function getFeedbackOnAnswers(input: GetFeedbackOnAnswersInput): Promise<GetFeedbackOnAnswersOutput> {
  return getFeedbackOnAnswersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getFeedbackOnAnswersPrompt',
  input: {schema: GetFeedbackOnAnswersInputSchema},
  output: {schema: GetFeedbackOnAnswersOutputSchema},
  prompt: `You are an AI study assistant that provides feedback on student answers to quizzes and practice questions.

  Question: {{{question}}}
  Student's Answer: {{{studentAnswer}}}
  Correct Answer: {{{correctAnswer}}}

  Provide constructive feedback to the student, explaining what they did well and where they can improve. Focus on clarity, accuracy, and completeness.
  Be encouraging and supportive, and offer specific suggestions for how the student can better understand the material.
  Keep the feedback concise and easy to understand.
  `,
});

const getFeedbackOnAnswersFlow = ai.defineFlow(
  {
    name: 'getFeedbackOnAnswersFlow',
    inputSchema: GetFeedbackOnAnswersInputSchema,
    outputSchema: GetFeedbackOnAnswersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
