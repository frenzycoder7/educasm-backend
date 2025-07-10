import { BadGatewayException, BadRequestException, Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ExploreRequestDto } from './dto/explore-request.dto';
import { AIService } from './core/services/ai.service';
import { Response } from 'express';
import { PlaygroundRequestDto } from './dto/plagyground-request-dto';

@Controller()
export class AppController {
  constructor(private readonly aiService: AIService) { }

  @Post("ai/explore")
  async explore(@Body() body: ExploreRequestDto) {
    try {
      const response = await this.aiService.exploreQuery(body.query, body.age, body.followUP);
      return response;
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }

  @Post("ai/playground")
  async playground(@Body() body: PlaygroundRequestDto) {
    try {
      const response = await this.aiService.getPlaygroundQuestion(body.topic, body.level, body.age);
      if (!response) {
        throw new BadGatewayException('Failed to generate question');
      }
      return response;
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }

  @Get('static/:id')
  async getStatic(@Param('id') id: string, @Res() res: Response) {
    if (id === '1') {
      return res.sendFile('../static/static-1/index.html');
    } else if (id === '2') {
      return res.sendFile('../static/static-2/index.html');
    }
  }
}
