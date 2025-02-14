import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation';
import { HttpModule } from '@nestjs/axios';
import { ThrottlerModule } from '@nestjs/throttler';
import { AIService } from './core/services/ai.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({ validate, isGlobal: true }),
    ThrottlerModule.forRoot([
      {
        ttl: 60, // 1 minute
        limit: 15, // 15 requests per minute
        getTracker: (req) => req.ip,
      },
      {
        ttl: 3600, // 1 hour
        limit: 250, // 250 requests per hour
        getTracker: (req) => req.ip,
      },
      {
        ttl: 86400, // 1 day
        limit: 500, // 500 requests per day
        getTracker: (req) => req.ip,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, AIService],
})
export class AppModule { }
