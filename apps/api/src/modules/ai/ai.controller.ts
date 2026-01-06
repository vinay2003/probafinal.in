import { Controller, Post, Body } from "@nestjs/common";
import { AiService } from "./ai.service";

@Controller("ai")
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post("quiz")
  async generateQuiz(
    @Body()
    body: {
      subject: string;
      topic: string;
      numberOfQuestions: number;
      context?: string;
    },
  ) {
    return this.aiService.generateQuizQuestions(
      body.subject,
      body.topic,
      body.numberOfQuestions,
      body.context,
    );
  }

  @Post("flashcards")
  async generateFlashcards(
    @Body() body: { topic: string; numberOfCards: number; context?: string },
  ) {
    return this.aiService.generateFlashcards(
      body.topic,
      body.numberOfCards,
      body.context,
    );
  }

  @Post("summarize")
  async summarize(@Body() body: { content: string }) {
    return this.aiService.summarizeContent(body.content);
  }

  @Post("resume")
  async optimizeResume(
    @Body() body: { resume: string; jobDescription: string },
  ) {
    return this.aiService.auditResume(body.resume, body.jobDescription);
  }

  @Post("speaking")
  async analyzeSpeaking(@Body() body: { transcript: string }) {
    return this.aiService.analyzeSpeaking(body.transcript);
  }

  @Post("writing")
  async analyzeWriting(
    @Body()
    body: {
      text: string;
      taskType:
        | "ielts_task1"
        | "ielts_task2"
        | "toefl_integrated"
        | "toefl_independent";
    },
  ) {
    return this.aiService.analyzeWriting(body.text, body.taskType);
  }

  @Post("chat")
  async chat(
    @Body()
    body: {
      message: string;
      history: { role: string; parts: string }[];
    },
  ) {
    return this.aiService.chat(body.message, body.history || []);
  }

  @Post("interview")
  async interview(
    @Body() body: { role: string; experience: string; description: string },
  ) {
    return this.aiService.generateInterviewQuestions(
      body.role,
      body.experience,
      body.description,
    );
  }

  @Post("interview/analyze")
  async analyzeInterview(
    @Body() body: { question: string; transcript: string },
  ) {
    return this.aiService.analyzeInterviewAnswer(
      body.question,
      body.transcript,
    );
  }

  @Post("coding/generate")
  async generateCoding(@Body() body: { difficulty: string; language: string }) {
    return this.aiService.generateCodingChallenge(
      body.difficulty,
      body.language,
    );
  }

  @Post("coding/evaluate")
  async evaluateCoding(
    @Body() body: { code: string; language: string; problem: string },
  ) {
    return this.aiService.evaluateCode(body.code, body.language, body.problem);
  }

  @Post("sql/generate")
  async generateSql(@Body() body: { difficulty: string }) {
    return this.aiService.generateSqlChallenge(body.difficulty);
  }
}
