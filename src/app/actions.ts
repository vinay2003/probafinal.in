'use server';

import {
  generateQuizQuestions,
  GenerateQuizQuestionsInput,
  GenerateQuizQuestionsOutput,
} from '@/ai/flows/generate-quiz-questions';
import {
    generateFlashcards,
    GenerateFlashcardsInput,
    GenerateFlashcardsOutput,
  } from '@/ai/flows/generate-flashcards';
import {
  getFeedbackOnAnswers,
  GetFeedbackOnAnswersInput,
  GetFeedbackOnAnswersOutput,
} from '@/ai/flows/feedback-on-answers';
import {
  getPersonalizedExplanation,
  PersonalizedExplanationInput,
  PersonalizedExplanationOutput,
} from '@/ai/flows/personalized-explanations';
import {
  getStudyStrategySuggestions,
  StudyStrategySuggestionsInput,
  StudyStrategySuggestionsOutput,
} from '@/ai/flows/study-strategy-suggestions';
import {
    summarizeDocument,
    SummarizeDocumentInput,
    SummarizeDocumentOutput,
  } from '@/ai/flows/summarize-document';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '@/firebase/server';


export async function generateQuizAction(
  input: GenerateQuizQuestionsInput,
): Promise<GenerateQuizQuestionsOutput> {
  return await generateQuizQuestions(input);
}

export async function generateFlashcardsAction(
    input: GenerateFlashcardsInput,
  ): Promise<GenerateFlashcardsOutput> {
    return await generateFlashcards(input);
  }

export async function getFeedbackAction(
  input: GetFeedbackOnAnswersInput
): Promise<GetFeedbackOnAnswersOutput> {
  return await getFeedbackOnAnswers(input);
}

export async function getExplanationAction(
  input: PersonalizedExplanationInput,
): Promise<PersonalizedExplanationOutput> {
  return await getPersonalizedExplanation(input);
}

export async function getStrategyAction(
  input: StudyStrategySuggestionsInput,
): Promise<StudyStrategySuggestionsOutput> {
  return await getStudyStrategySuggestions(input);
}

export async function getSummaryAction(
    input: SummarizeDocumentInput,
  ): Promise<SummarizeDocumentOutput> {
    return await summarizeDocument(input);
}

export async function upgradeSubscriptionAction(userId: string, tier: 'quiz' | 'pro'): Promise<{ success: boolean; error?: string }> {
    if (!userId) {
        return { success: false, error: "User not authenticated." };
    }
    
    const userDocRef = doc(firestore, 'users', userId);
    
    try {
        await setDoc(userDocRef, { subscriptionTier: tier }, { merge: true });
        return { success: true };
    } catch (error) {
        console.error("Error upgrading subscription:", error);
        return { success: false, error: "Could not upgrade subscription." };
    }
}
