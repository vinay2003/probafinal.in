import { Injectable } from '@nestjs/common';
import { AiService } from '../ai/ai.service';

@Injectable()
export class CareerService {
    constructor(private readonly aiService: AiService) { }

    async analyzeInterview(transcript: string) {
        // Basic analysis for now. User mentioned "audio", but for V1 we might stick to text analysis of the transcript 
        // since handling raw audio upload -> Gemini Audio needs FileInterceptor and converting buffer.
        // The prompt in AiService.analyzeSpeaking covers this.
        return this.aiService.analyzeSpeaking(transcript);
    }

    async optimizeResume(resumeText: string, jobDescription: string) {
        return this.aiService.auditResume(resumeText, jobDescription);
    }

    async startInterview(role: string) {
        // Providing default context for generic career service calls
        return this.aiService.generateInterviewQuestions(role, "Intermediate", "General interview statistics and common questions");
    }
}
