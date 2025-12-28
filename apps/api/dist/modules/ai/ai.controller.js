"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiController = void 0;
const common_1 = require("@nestjs/common");
const ai_service_1 = require("./ai.service");
let AiController = class AiController {
    constructor(aiService) {
        this.aiService = aiService;
    }
    async generateQuiz(body) {
        return this.aiService.generateQuizQuestions(body.subject, body.topic, body.numberOfQuestions, body.context);
    }
    async generateFlashcards(body) {
        return this.aiService.generateFlashcards(body.topic, body.numberOfCards, body.context);
    }
    async summarize(body) {
        return this.aiService.summarizeContent(body.content);
    }
    async optimizeResume(body) {
        return this.aiService.auditResume(body.resume, body.jobDescription);
    }
    async analyzeSpeaking(body) {
        return this.aiService.analyzeSpeaking(body.transcript);
    }
    async analyzeWriting(body) {
        return this.aiService.analyzeWriting(body.text, body.taskType);
    }
    async chat(body) {
        return this.aiService.chat(body.message, body.history || []);
    }
    async interview(body) {
        return this.aiService.generateInterviewQuestions(body.role, body.experience, body.description);
    }
    async analyzeInterview(body) {
        return this.aiService.analyzeInterviewAnswer(body.question, body.transcript);
    }
    async generateCoding(body) {
        return this.aiService.generateCodingChallenge(body.difficulty, body.language);
    }
    async evaluateCoding(body) {
        return this.aiService.evaluateCode(body.code, body.language, body.problem);
    }
    async generateSql(body) {
        return this.aiService.generateSqlChallenge(body.difficulty);
    }
};
exports.AiController = AiController;
__decorate([
    (0, common_1.Post)('quiz'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "generateQuiz", null);
__decorate([
    (0, common_1.Post)('flashcards'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "generateFlashcards", null);
__decorate([
    (0, common_1.Post)('summarize'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "summarize", null);
__decorate([
    (0, common_1.Post)('resume'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "optimizeResume", null);
__decorate([
    (0, common_1.Post)('speaking'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "analyzeSpeaking", null);
__decorate([
    (0, common_1.Post)('writing'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "analyzeWriting", null);
__decorate([
    (0, common_1.Post)('chat'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "chat", null);
__decorate([
    (0, common_1.Post)('interview'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "interview", null);
__decorate([
    (0, common_1.Post)('interview/analyze'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "analyzeInterview", null);
__decorate([
    (0, common_1.Post)('coding/generate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "generateCoding", null);
__decorate([
    (0, common_1.Post)('coding/evaluate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "evaluateCoding", null);
__decorate([
    (0, common_1.Post)('sql/generate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "generateSql", null);
exports.AiController = AiController = __decorate([
    (0, common_1.Controller)('ai'),
    __metadata("design:paramtypes", [ai_service_1.AiService])
], AiController);
//# sourceMappingURL=ai.controller.js.map