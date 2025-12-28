import { ExamsService } from './exams.service';
export declare class ExamsController {
    private readonly examsService;
    constructor(examsService: ExamsService);
    getNextQuestion(body: {
        currentDifficulty: 'easy' | 'medium' | 'hard';
        previousCorrect: boolean;
    }): {
        question: {
            id: string;
            question: string;
            options: string[];
            answer: string;
            difficulty: string;
        } | {
            id: string;
            question: string;
            options: string[];
            answer: string;
            difficulty: string;
        } | {
            id: string;
            question: string;
            options: string[];
            answer: string;
            difficulty: string;
        };
        nextDifficulty: "easy" | "medium" | "hard";
    };
    submitAnswer(body: {
        questionId: string;
        answer: string;
    }): {
        correct: boolean;
        correctAnswer: any;
    };
}
