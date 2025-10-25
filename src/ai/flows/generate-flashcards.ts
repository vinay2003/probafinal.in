'use server';

/**
 * @fileOverview An AI agent for generating flashcards.
 *
 * - generateFlashcards - A function that handles the flashcard generation process.
 * - GenerateFlashcardsInput - The input type for the generateFlashcards function.
 * - GenerateFlashcardsOutput - The return type for the generateFlashcards function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFlashcardsInputSchema = z.object({
  topic: z.string().describe('The specific topic for the flashcards.'),
  numberOfCards: z.number().describe('The number of flashcards to generate.'),
});
export type GenerateFlashcardsInput = z.infer<typeof GenerateFlashcardsInputSchema>;

const GenerateFlashcardsOutputSchema = z.object({
  flashcards: z.array(
    z.object({
      term: z.string().describe('The term or question for the front of the flashcard.'),
      definition: z.string().describe('The definition or answer for the back of the flashcard.'),
    })
  ).describe('An array of flashcards, each with a term and a definition.'),
});
export type GenerateFlashcardsOutput = z.infer<typeof GenerateFlashcardsOutputSchema>;

export async function generateFlashcards(input: GenerateFlashcardsInput): Promise<GenerateFlashcardsOutput> {
  return generateFlashcardsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFlashcardsPrompt',
  input: {schema: GenerateFlashcardsInputSchema},
  output: {schema: GenerateFlashcardsOutputSchema},
  prompt: `You are an AI assistant that creates flashcard decks for students.

  Generate {{numberOfCards}} flashcards for the following topic: {{{topic}}}.

  Each flashcard should have a 'term' (a key concept, name, or question) and a 'definition' (a clear and concise explanation or answer).

  Format the output as a JSON object with a "flashcards" array.
  `,
});

const generateFlashcardsFlow = ai.defineFlow(
  {
    name: 'generateFlashcardsFlow',
    inputSchema: GenerateFlashcardsInputSchema,
    outputSchema: GenerateFlashcardsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
