'use server';

/**
 * @fileOverview An AI agent that provides personalized explanations for complex concepts.
 *
 * - getPersonalizedExplanation - A function that generates personalized explanations.
 * - PersonalizedExplanationInput - The input type for the getPersonalizedExplanation function.
 * - PersonalizedExplanationOutput - The return type for the getPersonalizedExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedExplanationInputSchema = z.object({
  topic: z.string().describe('The topic for which the explanation is needed.'),
  complexityLevel: z
    .enum(['Beginner', 'Intermediate', 'Advanced'])
    .describe('The desired complexity level of the explanation.'),
  learningStyle: z
    .string()
    .describe(
      'The preferred learning style of the student (e.g., visual, auditory, kinesthetic).' + ' Include any specific preferences or techniques that resonate with them.'
    ),
});
export type PersonalizedExplanationInput = z.infer<typeof PersonalizedExplanationInputSchema>;

const PersonalizedExplanationOutputSchema = z.object({
  explanation: z.string().describe('The personalized explanation of the topic.'),
  example: z.string().describe('A practical example to illustrate the concept.'),
});
export type PersonalizedExplanationOutput = z.infer<typeof PersonalizedExplanationOutputSchema>;

export async function getPersonalizedExplanation(
  input: PersonalizedExplanationInput
): Promise<PersonalizedExplanationOutput> {
  return personalizedExplanationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedExplanationPrompt',
  input: {schema: PersonalizedExplanationInputSchema},
  output: {schema: PersonalizedExplanationOutputSchema},
  prompt: `You are an AI study assistant that provides personalized explanations for complex topics.

  Based on the student's preferred learning style and the desired complexity level, create a tailored explanation for the given topic.

  Topic: {{{topic}}}
  Complexity Level: {{{complexityLevel}}}
  Learning Style: {{{learningStyle}}}

  Explanation (tailored to the student's learning style and complexity level):
  `, // The example will be generated after this.
});

const personalizedExplanationFlow = ai.defineFlow(
  {
    name: 'personalizedExplanationFlow',
    inputSchema: PersonalizedExplanationInputSchema,
    outputSchema: PersonalizedExplanationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
