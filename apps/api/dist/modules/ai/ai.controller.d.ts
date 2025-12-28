import { AiService } from './ai.service';
export declare class AiController {
    private readonly aiService;
    constructor(aiService: AiService);
    generateQuiz(body: {
        subject: string;
        topic: string;
        numberOfQuestions: number;
        context?: string;
    }): Promise<any>;
    generateFlashcards(body: {
        topic: string;
        numberOfCards: number;
        context?: string;
    }): Promise<any>;
    summarize(body: {
        content: string;
    }): Promise<any>;
    optimizeResume(body: {
        resume: string;
        jobDescription: string;
    }): Promise<any>;
    analyzeSpeaking(body: {
        transcript: string;
    }): Promise<any>;
    analyzeWriting(body: {
        text: string;
        taskType: 'ielts_task1' | 'ielts_task2' | 'toefl_integrated' | 'toefl_independent';
    }): Promise<any>;
    chat(body: {
        message: string;
        history: {
            role: string;
            parts: string;
        }[];
    }): Promise<{
        text: any;
    }>;
    interview(body: {
        role: string;
        experience: string;
        description: string;
    }): Promise<any>;
    analyzeInterview(body: {
        question: string;
        transcript: string;
    }): Promise<any>;
    generateCoding(body: {
        difficulty: string;
        language: string;
    }): Promise<any>;
    evaluateCoding(body: {
        code: string;
        language: string;
        problem: string;
    }): Promise<any>;
    generateSql(body: {
        difficulty: string;
    }): Promise<any>;
}
