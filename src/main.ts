import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ConfigKeys } from './config/config.keys';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('main.ts');

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  const configService = app.get(ConfigService);
  const port = configService.get<number>(ConfigKeys.PORT);
  if (!port) {
    logger.error('PORT is not set');
    process.exit(1);
  }
  await app.listen(port);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

