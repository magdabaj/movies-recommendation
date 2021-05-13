import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger} from "@nestjs/common";
import {json} from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '1000000kb' }));
  const logger = new Logger('bootstrap')
  if (process.env.NODE_ENV === 'development')
    app.enableCors({
      credentials: true
    })
  else {
    app.enableCors({ origin: 'http://localhost:3001' })
    logger.log(`Accepting request from origin "${'http://localhost:3001'}"`)
  }
  await app.listen(3000);
}
bootstrap();
