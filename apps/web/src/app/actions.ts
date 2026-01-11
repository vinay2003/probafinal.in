'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import * as aiService from '@/services/ai/ai.service';
import * as adminService from '@/services/admin/admin.service';
import * as careerService from '@/services/career/career.service';
import * as paymentsService from '@/services/payments/payments.service';

// --- Authentication (Admin) ---

export async function loginAdmin(username: string, pass: string) {
  const adminUser = process.env.ADMIN_USERNAME || 'admin';
  const adminPass = process.env.ADMIN_PASSWORD || 'admin';

  if (username === adminUser && pass === adminPass) {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    return { success: true };
  }

  return { success: false, error: 'Invalid credentials' };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/admin');
}

// --- AI Service Actions ---

type GenerateQuizQuestionsInput = {
  subject: string;
  topic: string;
  numberOfQuestions: number;
  context?: string;
};

type GenerateFlashcardsInput = {
  topic: string;
  numberOfCards: number;
  context?: string;
};

type PersonalizedExplanationInput = {
  topic: string;
  complexityLevel: string;
  learningStyle: string;
};

type StudyStrategySuggestionsInput = {
  studyHabits: string;
};

type SummarizeDocumentInput = {
  document: string;
};

export async function generateQuizAction(input: GenerateQuizQuestionsInput) {
  return await aiService.generateQuizQuestions(input.subject, input.topic, input.numberOfQuestions, input.context);
}

export async function generateFlashcardsAction(input: GenerateFlashcardsInput) {
  return await aiService.generateFlashcards(input.topic, input.numberOfCards, input.context);
}

export async function getFeedbackAction(input: any) {
  return { feedback: "AI feedback is currently being migrated to the new engine." };
}

export async function getExplanationAction(input: PersonalizedExplanationInput) {
  return { explanation: "This feature is being migrated.", example: "Please try again later." };
}

export async function getStrategyAction(input: StudyStrategySuggestionsInput) {
  return { suggestions: "Focus on consistency. (Migration in progress)" };
}

export async function getSummaryAction(input: SummarizeDocumentInput) {
  return await aiService.summarizeContent(input.document);
}

export async function chatAction(message: string, history: any[]) {
  return await aiService.chat(message, history);
}

// --- Career Service Actions ---

export async function generateInterviewQuestionsAction(role: string, experience: string, description: string) {
  return await aiService.generateInterviewQuestions(role, experience, description);
}

export async function analyzeInterviewAnswerAction(question: string, transcript: string) {
  return await aiService.analyzeInterviewAnswer(question, transcript);
}

export async function analyzeWritingAction(text: string, taskType: any) {
  // Ensuring taskType is one of the valid strings or default to ielts_task2 if unsure, 
  // but ignoring strict check for now as the service handles string matching
  return await aiService.analyzeWriting(text, taskType);
}

export async function analyzeSpeakingAction(transcript: string) {
  return await aiService.analyzeSpeaking(transcript);
}

export async function generateCodingAction(difficulty: string, language: string) {
  return await aiService.generateCodingChallenge(difficulty, language);
}

export async function evaluateCodingAction(code: string, language: string, problem: string) {
  return await aiService.evaluateCode(code, language, problem);
}

export async function generateSqlAction(difficulty: string) {
  return await aiService.generateSqlChallenge(difficulty);
}

export async function optimizeResumeAction(resume: string, jobDescription: string) {
  return await careerService.optimizeResume(resume, jobDescription);
}

// --- Payments Actions ---

export async function upgradeSubscriptionAction(userId: string, tier: 'quiz' | 'pro'): Promise<{ success: boolean; error?: string }> {
  // In a real flow, this would create an order and return the order ID
  // For now, we stub it or use the payments service if we had the full flow
  // return await paymentsService.createOrder(tier === 'pro' ? 119 : 49);
  return { success: true };
}

// --- Admin Actions ---

export async function getAdminUsers() {
  const users = await adminService.getUsers();
  // Return plain objects to avoid serialization issues with Firestore dates if any remain
  return JSON.parse(JSON.stringify(users));
}

export async function getAdminPlans() {
  const plans = await adminService.getPlans();
  return JSON.parse(JSON.stringify(plans));
}

export async function createAdminPlan(plan: any) {
  const newPlan = await adminService.createPlan(plan);
  return JSON.parse(JSON.stringify(newPlan));
}

export async function getAdminStats() {
  const stats = await adminService.getStats();
  return JSON.parse(JSON.stringify(stats));
}
