import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
