import { AiService } from '../ai/ai.service';
export declare class CareerService {
    private readonly aiService;
    constructor(aiService: AiService);
    analyzeInterview(transcript: string): Promise<any>;
    optimizeResume(resumeText: string, jobDescription: string): Promise<any>;
    startInterview(role: string): Promise<any>;
}
