import { config } from 'dotenv';
config();

import '@/ai/flows/feedback-on-answers.ts';
import '@/ai/flows/study-strategy-suggestions.ts';
import '@/ai/flows/generate-quiz-questions.ts';
import '@/ai/flows/generate-flashcards.ts';
import '@/ai/flows/personalized-explanations.ts';
import '@/ai/flows/summarize-document.ts';
