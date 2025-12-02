import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { Auth, Log } from './app.middleware'
import { ConfigService } from '@nestjs/config';
import { log } from 'console';
import { JwtService } from '@nestjs/jwt';
import { MessagePattern } from '@nestjs/microservices';

@UseInterceptors(new Log())
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private conf: ConfigService,
    private jwt: JwtService
  ) {}

  // @UseGuards(Auth)
  @Get("/hi")
  getHello(): string {
    log(this.conf.get("PORT"))
    log(this.jwt.sign({user:"mamad"}))
    return this.appService.getHello();
  }
}

@Controller()
export class Math {
  @MessagePattern("sum")
  sum(data: number[]): number{
    return (data || []).reduce((a,b)=>a+b,0)
  }
}

