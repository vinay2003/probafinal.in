export declare class AiService {
    private genAI;
    private model;
    private jsonModel;
    constructor();
    chat(message: string, history: {
        role: string;
        parts: string;
    }[]): Promise<{
        text: any;
    }>;
    private _retryWithBackoff;
    generateQuizQuestions(subject: string, topic: string, numberOfQuestions: number, context?: string): Promise<any>;
    generateFlashcards(topic: string, numberOfCards: number, context?: string): Promise<any>;
    summarizeContent(content: string): Promise<any>;
    auditResume(resumeText: string, jobDescription: string): Promise<any>;
    analyzeSpeaking(transcript: string): Promise<any>;
    analyzeWriting(text: string, taskType: "ielts_task1" | "ielts_task2" | "toefl_integrated" | "toefl_independent"): Promise<any>;
    analyzeInterviewAnswer(question: string, transcript: string): Promise<any>;
    generateInterviewQuestions(role: string, experience: string, description: string): Promise<any>;
    generateCodingChallenge(difficulty: string, language: string): Promise<any>;
    evaluateCode(code: string, language: string, problem: string): Promise<any>;
    generateSqlChallenge(difficulty: string): Promise<any>;
    private _generateJson;
}
