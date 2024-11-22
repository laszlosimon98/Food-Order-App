import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters()
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Food Order')
    .setDescription('Api for food order app')
    .setVersion('0.1')
    .addBearerAuth()
    .addCookieAuth(
      'refreshToken',
      {
        type: 'http',
        in: 'Header',
        scheme: 'Bearer',
      },
      'refreshToken',
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000);
}
bootstrap();
