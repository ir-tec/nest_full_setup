import { Controller, Get, NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './common/decorators/public.decorator';

@Controller({ path: "", version: "1" })
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getStatus(): string {
    return this.appService.getStatus();
  }
  @Public()
  @Get('test-error')
  testError() {
    throw new NotFoundException('Something was not found');
  }
}
