"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamsService = void 0;
const common_1 = require("@nestjs/common");
let ExamsService = class ExamsService {
    constructor() {
        this.questionBank = {
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
    }
    getNextQuestion(currentDifficulty, previousCorrect) {
        let nextDifficulty = currentDifficulty;
        if (previousCorrect) {
            if (currentDifficulty === "easy")
                nextDifficulty = "medium";
            else if (currentDifficulty === "medium")
                nextDifficulty = "hard";
        }
        else {
            if (currentDifficulty === "hard")
                nextDifficulty = "medium";
            else if (currentDifficulty === "medium")
                nextDifficulty = "easy";
        }
        const questions = this.questionBank[nextDifficulty];
        const randomQ = questions[Math.floor(Math.random() * questions.length)];
        return {
            question: randomQ,
            nextDifficulty,
        };
    }
    submitAnswer(questionId, answer) {
        let found = null;
        for (const level in this.questionBank) {
            found = this.questionBank[level].find((q) => q.id === questionId);
            if (found)
                break;
        }
        if (!found)
            return { correct: false, correctAnswer: null };
        return {
            correct: found.answer === answer,
            correctAnswer: found.answer,
        };
    }
};
exports.ExamsService = ExamsService;
exports.ExamsService = ExamsService = __decorate([
    (0, common_1.Injectable)()
], ExamsService);
//# sourceMappingURL=exams.service.js.map