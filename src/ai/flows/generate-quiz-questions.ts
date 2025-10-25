'use server';

/**
 * @fileOverview A quiz question generator AI agent.
 *
 * - generateQuizQuestions - A function that handles the quiz question generation process.
 * - GenerateQuizQuestionsInput - The input type for the generateQuizQuestions function.
 * - GenerateQuizQuestionsOutput - The return type for the generateQuizQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuizQuestionsInputSchema = z.object({
  subject: z.string().describe('The subject of the quiz.'),
  topic: z.string().describe('The specific topic for the quiz questions.'),
  numberOfQuestions: z.number().describe('The number of quiz questions to generate.'),
});
export type GenerateQuizQuestionsInput = z.infer<typeof GenerateQuizQuestionsInputSchema>;

const GenerateQuizQuestionsOutputSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string().describe('The quiz question.'),
      options: z.array(z.string()).describe('An array of 4 multiple-choice options.'),
      answer: z.string().describe('The correct answer from the options.'),
    })
  ).describe('An array of multiple-choice quiz questions.'),
});
export type GenerateQuizQuestionsOutput = z.infer<typeof GenerateQuizQuestionsOutputSchema>;

export async function generateQuizQuestions(input: GenerateQuizQuestionsInput): Promise<GenerateQuizQuestionsOutput> {
  return generateQuizQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizQuestionsPrompt',
  input: {schema: GenerateQuizQuestionsInputSchema},
  output: {schema: GenerateQuizQuestionsOutputSchema},
  prompt: `You are an AI quiz generator that creates multiple-choice quizzes.

  Generate {{numberOfQuestions}} quiz questions for the following subject and topic.

  Subject: {{{subject}}}
  Topic: {{{topic}}}

  Each question must have 4 distinct multiple-choice options, and one of them must be the correct answer.

  Format the output as a JSON object with a "questions" array. Each object in the array should have a "question" field, an "options" array with 4 strings, and an "answer" field containing the correct option.
  `,
});

const generateQuizQuestionsFlow = ai.defineFlow(
  {
    name: 'generateQuizQuestionsFlow',
    inputSchema: GenerateQuizQuestionsInputSchema,
    outputSchema: GenerateQuizQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
