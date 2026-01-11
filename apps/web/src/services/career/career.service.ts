import { analyzeSpeaking, auditResume, generateInterviewQuestions } from "../ai/ai.service";

export async function analyzeInterview(transcript: string) {
    return analyzeSpeaking(transcript);
}

export async function optimizeResume(resumeText: string, jobDescription: string) {
    return auditResume(resumeText, jobDescription);
}

export async function startInterview(role: string) {
    return generateInterviewQuestions(
        role,
        "Intermediate",
        "General interview statistics and common questions"
    );
}
