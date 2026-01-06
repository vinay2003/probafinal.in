export declare class ExamsService {
    private questionBank;
    getNextQuestion(currentDifficulty: "easy" | "medium" | "hard", previousCorrect: boolean): {
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
    submitAnswer(questionId: string, answer: string): {
        correct: boolean;
        correctAnswer: any;
    };
}
