import { CareerService } from "./career.service";
export declare class CareerController {
    private readonly careerService;
    constructor(careerService: CareerService);
    startInterview(body: {
        role: string;
    }): Promise<any>;
    analyzeInterview(body: {
        transcript: string;
    }): Promise<any>;
    optimizeResume(body: {
        resume: string;
        jobDescription: string;
    }): Promise<any>;
}
