import { Controller, Post, Body, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CareerService } from './career.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('career')
export class CareerController {
    constructor(private readonly careerService: CareerService) { }

    @Post('interview/start')
    async startInterview(@Body() body: { role: string }) {
        return this.careerService.startInterview(body.role);
    }

    @Post('interview/analyze')
    async analyzeInterview(@Body() body: { transcript: string }) {
        return this.careerService.analyzeInterview(body.transcript);
    }

    @Post('resume/optimize')
    async optimizeResume(@Body() body: { resume: string; jobDescription: string }) {
        return this.careerService.optimizeResume(body.resume, body.jobDescription);
    }

    // Placeholder for audio upload if we implement direct audio processing later
    // @Post('interview/audio')
    // @UseInterceptors(FileInterceptor('file'))
    // async uploadAudio(@UploadedFile() file: Express.Multer.File) { ... }
}
