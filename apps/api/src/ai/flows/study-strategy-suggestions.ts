'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing study strategy suggestions based on the student's study habits.
 *
 * - getStudyStrategySuggestions - A function that takes in the student's study habits and returns study strategy suggestions.
 * - StudyStrategySuggestionsInput - The input type for the getStudyStrategySuggestions function.
 * - StudyStrategySuggestionsOutput - The return type for the getStudyStrategySuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StudyStrategySuggestionsInputSchema = z.object({
  studyHabits: z
    .string()
    .describe(
      'A description of the student’s current study habits, including subjects studied, time spent studying, and methods used.'
    ),
});
export type StudyStrategySuggestionsInput = z.infer<
  typeof StudyStrategySuggestionsInputSchema
>;

const StudyStrategySuggestionsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe(
      'A list of suggested study strategies tailored to the student’s described study habits.'
    ),
});
export type StudyStrategySuggestionsOutput = z.infer<
  typeof StudyStrategySuggestionsOutputSchema
>;

export async function getStudyStrategySuggestions(
  input: StudyStrategySuggestionsInput
): Promise<StudyStrategySuggestionsOutput> {
  return studyStrategySuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'studyStrategySuggestionsPrompt',
  input: {schema: StudyStrategySuggestionsInputSchema},
  output: {schema: StudyStrategySuggestionsOutputSchema},
  prompt: `You are an AI study assistant that analyzes students’ study habits and provides suggestions for optimal study strategies.

  Analyze the following description of the student's study habits and provide a list of suggestions for optimal study strategies.

  Study Habits: {{{studyHabits}}}
  `,
});

const studyStrategySuggestionsFlow = ai.defineFlow(
  {
    name: 'studyStrategySuggestionsFlow',
    inputSchema: StudyStrategySuggestionsInputSchema,
    outputSchema: StudyStrategySuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
