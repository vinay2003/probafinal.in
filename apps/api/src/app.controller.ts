import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    @Redirect('https://probafinal.in', 302)
    getHello() {
        return { url: 'https://probafinal.in' };
    }
}
