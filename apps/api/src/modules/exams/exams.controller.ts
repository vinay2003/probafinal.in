import { Controller, Post, Body } from "@nestjs/common";
import { ExamsService } from "./exams.service";

@Controller("exams")
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post("next")
  getNextQuestion(
    @Body()
    body: {
      currentDifficulty: "easy" | "medium" | "hard";
      previousCorrect: boolean;
    },
  ) {
    return this.examsService.getNextQuestion(
      body.currentDifficulty,
      body.previousCorrect,
    );
  }

  @Post("submit")
  submitAnswer(@Body() body: { questionId: string; answer: string }) {
    return this.examsService.submitAnswer(body.questionId, body.answer);
  }
}
