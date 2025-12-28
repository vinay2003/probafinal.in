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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const generative_ai_1 = require("@google/generative-ai");
let AiService = class AiService {
    constructor() {
        const apiKey = process.env.GOOGLE_GENAI_API_KEY || process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error('CRITICAL: GOOGLE_GENAI_API_KEY is missing in API environment.');
        }
        this.genAI = new generative_ai_1.GoogleGenerativeAI(apiKey || '');
        this.model = this.genAI.getGenerativeModel({
            model: "gemini-flash-latest",
        });
        this.jsonModel = this.genAI.getGenerativeModel({
            model: "gemini-flash-latest",
            generationConfig: {
                responseMimeType: "application/json"
            }
        });
    }
    async chat(message, history) {
        try {
            let processedHistory = history.map(h => ({
                role: h.role === 'ai' ? 'model' : 'user',
                parts: [{ text: h.parts }]
            }));
            if (processedHistory.length > 0 && processedHistory[0].role === 'model') {
                processedHistory = processedHistory.slice(1);
            }
            const chat = this.model.startChat({
                history: processedHistory,
                generationConfig: {
                    maxOutputTokens: 1000,
                },
            });
            const result = await this._retryWithBackoff(async () => await chat.sendMessage(message));
            const response = await result.response;
            return { text: response.text() };
        }
        catch (error) {
            console.error("Chat Error:", error);
            if (error.status === 429) {
                throw new common_1.HttpException('AI Busy (Rate Limit). Please wait a moment.', common_1.HttpStatus.TOO_MANY_REQUESTS);
            }
            throw new common_1.InternalServerErrorException('Chat Failed: ' + (error.message || "Unknown error"));
        }
    }
    async _retryWithBackoff(fn, retries = 3, delay = 1000) {
        try {
            return await fn();
        }
        catch (error) {
            if (retries > 0 && error.status === 429) {
                console.warn(`Rate limited. Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                return this._retryWithBackoff(fn, retries - 1, delay * 2);
            }
            throw error;
        }
    }
    async generateQuizQuestions(subject, topic, numberOfQuestions, context) {
        const prompt = `
      You are an expert educational content creator. Generate ${numberOfQuestions} high-quality, challenging multiple-choice questions for:
      Subject: ${subject}
      Topic: ${topic}
      ${context ? `Context: ${context}` : ''}
      
      Difficulty: Adaptive (Mix of easy, medium, hard).
      Each question must include 4 distinct options, the correct answer text, and a helpful hint.
      
      Format the output specifically as a JSON object with this structure:
      {
        "questions": [
          {
            "question": "The question text",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "answer": "The correct option text",
            "hint": "A subtle clue without giving away the answer"
          }
        ]
      }
    `;
        return this._generateJson(prompt);
    }
    async generateFlashcards(topic, numberOfCards, context) {
        const prompt = `
      You are an expert educator. Create ${numberOfCards} concise, high-quality flashcards on the topic: '${topic}'. 
      ${context ? `Context: ${context}` : ''}
      
      Return ONLY a JSON object with a "flashcards" array containing objects with 'front' (term/question) and 'back' (definition/answer) fields.
      
      Example JSON Structure:
      {
        "flashcards": [
          { "front": "Term", "back": "Definition" }
        ]
      }
    `;
        return this._generateJson(prompt);
    }
    async summarizeContent(content) {
        const prompt = `
      Act as a professional researcher. Analyze the following document.
      
      Tasks:
      1. Summarize into a concise, actionable summary (approx 1 page equivalent).
      2. Create 10 ultra-yield flashcards for revision.
      3. Create 5 MCQs to test understanding.
      4. Provide a "Hinglish" (Hindi + English) explanation for better clarity.

      Document Content: "${content.substring(0, 30000)}" 

      Output JSON structure:
      {
        "summary": "markdown string...",
        "flashcards": [{ "front": "...", "back": "..." }],
        "mcqs": [{ "question": "...", "options": [...], "answer": "..." }],
        "hinglish_explanation": "..."
      }
    `;
        return this._generateJson(prompt);
    }
    async auditResume(resumeText, jobDescription) {
        const prompt = `
        Act as an expert ATS (Applicant Tracking System) Resume Optimizer.
        Analyze the resume against the job description.
        
        Resume: "${resumeText.substring(0, 10000)}"
        Job Description: "${jobDescription.substring(0, 5000)}"

        Output JSON:
        {
            "match_score": 85,
            "missing_keywords": ["keyword1", "keyword2"],
            "improved_bullets": ["Original: ... -> Improved: ..."],
            "feedback": "Detailed strategic advice..."
        }
      `;
        return this._generateJson(prompt);
    }
    async analyzeSpeaking(transcript) {
        const prompt = `
        Act as a certified IELTS/TOEFL examiner. Grade this spoken response.
        
        Transcript: "${transcript}"
        
        Output JSON:
        {
            "fluency_score": 7.5,
            "pronunciation_score": 7.0,
            "grammar_score": 8.0,
            "vocabulary_score": 7.5,
            "overall_band": 7.5,
            "feedback": "Specific feedback on strength and weaknesses...",
            "improvements": ["Tip 1", "Tip 2"]
        }
      `;
        return this._generateJson(prompt);
    }
    async analyzeWriting(text, taskType) {
        const prompt = `
        Act as a certified IELTS/TOEFL Writing Examiner. Grade this essay.
        Task Type: ${taskType}
        
        Essay: "${text.substring(0, 15000)}"
        
        Output JSON:
        {
            "task_response_score": 7.0,
            "coherence_cohesion_score": 7.5,
            "lexical_resource_score": 8.0,
            "grammatical_range_accuracy_score": 7.5,
            "overall_band": 7.5,
            "feedback": "Detailed examiner feedback...",
            "corrections": ["Review paragraph 2 logic", "Fix grammar in sentence 3"]
        }
      `;
        return this._generateJson(prompt);
    }
    async analyzeInterviewAnswer(question, transcript) {
        const prompt = `
        Act as a Senior Technical Recruiter.
        Interview Question: "${question}"
        Candidate Answer (Spoken Transcript): "${transcript}"
        
        Evaluate the answer based on:
        1. Relevance to the question.
        2. Clarity and communication style.
        3. Technical accuracy (if applicable).
        
        Return JSON:
        {
            "score": 85,
            "feedback": "Good points on X, but missed Y.",
            "improvement_tip": "Try to use the STAR method."
        }
    `;
        return this._generateJson(prompt);
    }
    async generateInterviewQuestions(role, experience, description) {
        const prompt = `
        You are a Senior Technical Recruiter at a top tech company. 
        Context: The candidate is applying for a ${role} position.
        Experience Level: ${experience}.
        Job/Topic Description: ${description}.

        Generate 5 tailored interview questions (mix of behavioral and technical) based specifically on this context.
        
        Return JSON: { "questions": ["Q1", "Q2", ...] }
      `;
        return this._generateJson(prompt);
    }
    async generateCodingChallenge(difficulty, language) {
        const prompt = `
        Create a ${difficulty} coding challenge in ${language}.
        Return JSON:
        {
            "title": "Problem Title",
            "description": "Problem statement...",
            "template": "function solve() { ... }",
            "test_cases": [
                { "input": "...", "expected_output": "..." }
            ],
            "hints": ["Hint 1", "Hint 2"]
        }
      `;
        return this._generateJson(prompt);
    }
    async evaluateCode(code, language, problem) {
        const prompt = `
        Act as a Code Reviewer and Compiler.
        Problem: ${problem}
        Submitted Code (${language}):
        "${code}"

        Analyze correctness, time complexity, and style.
        Return JSON:
        {
            "passed": true,
            "score": 85,
            "feedback": "Code is correct but O(n^2) instead of O(n)...",
            "bugs": ["Line 3: potential off-by-one"]
        }
      `;
        return this._generateJson(prompt);
    }
    async generateSqlChallenge(difficulty) {
        const prompt = `
        Create a ${difficulty} SQL query challenge.
        Return JSON:
        {
            "title": "SQL Problem Title",
            "schema": "CREATE TABLE users...",
            "question": "Write a query to fetch...",
            "expected_query_logic": "SELECT * FROM ... WHERE ...",
            "hints": ["Hint 1"]
        }
      `;
        return this._generateJson(prompt);
    }
    async _generateJson(prompt) {
        try {
            const result = await this._retryWithBackoff(async () => await this.jsonModel.generateContent(prompt));
            const response = await result.response;
            const text = response.text();
            const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
            const firstBrace = jsonStr.indexOf('{');
            const lastBrace = jsonStr.lastIndexOf('}');
            if (firstBrace !== -1 && lastBrace !== -1) {
                const cleanJson = jsonStr.substring(firstBrace, lastBrace + 1);
                return JSON.parse(cleanJson);
            }
            throw new Error("No JSON found in response");
        }
        catch (error) {
            console.error("AI Generation Failed:", error);
            if (error.status === 429) {
                throw new common_1.HttpException('AI Busy (Rate Limit). Please wait a moment.', common_1.HttpStatus.TOO_MANY_REQUESTS);
            }
            throw new common_1.InternalServerErrorException('AI Service Failure: ' + (error.message || "Unknown error"));
        }
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AiService);
//# sourceMappingURL=ai.service.js.map