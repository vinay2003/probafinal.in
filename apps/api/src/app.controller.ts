import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    getHello(): { message: string; version: string } {
        return {
            message: 'Welcome to Proba API',
            version: '1.0.0',
        };
    }
}
