// Mock question bank for demo
const questionBank: any = {
    easy: [
        {
            id: "e1",
            question: "What is 2+2?",
            options: ["3", "4", "5"],
            answer: "4",
            difficulty: "easy",
        },
        {
            id: "e2",
            question: "Capital of India?",
            options: ["Mumbai", "Delhi", "Chennai"],
            answer: "Delhi",
            difficulty: "easy",
        },
    ],
    medium: [
        {
            id: "m1",
            question: "Square root of 144?",
            options: ["10", "11", "12"],
            answer: "12",
            difficulty: "medium",
        },
        {
            id: "m2",
            question: "Who wrote Romeo and Juliet?",
            options: ["Shakespeare", "Dickens", "Austen"],
            answer: "Shakespeare",
            difficulty: "medium",
        },
    ],
    hard: [
        {
            id: "h1",
            question: "Derivative of x^2?",
            options: ["x", "2x", "x^2"],
            answer: "2x",
            difficulty: "hard",
        },
        {
            id: "h2",
            question: "Quantum entanglement implies?",
            options: ["Faster than light info", "Hidden variables", "Non-locality"],
            answer: "Non-locality",
            difficulty: "hard",
        },
    ],
};

export async function getNextQuestion(
    currentDifficulty: "easy" | "medium" | "hard",
    previousCorrect: boolean
) {
    let nextDifficulty = currentDifficulty;

    if (previousCorrect) {
        if (currentDifficulty === "easy") nextDifficulty = "medium";
        else if (currentDifficulty === "medium") nextDifficulty = "hard";
    } else {
        if (currentDifficulty === "hard") nextDifficulty = "medium";
        else if (currentDifficulty === "medium") nextDifficulty = "easy";
    }

    const questions = questionBank[nextDifficulty];
    const randomQ = questions[Math.floor(Math.random() * questions.length)];

    return {
        question: randomQ,
        nextDifficulty,
    };
}

export async function submitAnswer(questionId: string, answer: string) {
    let found = null;
    for (const level in questionBank) {
        found = questionBank[level].find((q: any) => q.id === questionId);
        if (found) break;
    }

    if (!found) return { correct: false, correctAnswer: null };

    return {
        correct: found.answer === answer,
        correctAnswer: found.answer,
    };
}
