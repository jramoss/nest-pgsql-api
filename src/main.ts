import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './common/middleware/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      disableErrorMessages: false,
      whitelist: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('users example')
    .setDescription('The users API description')
    .setVersion('2.0')
    .setContact(
      'jonas Ramos',
      'http://localhost:3000/api',
      'jonas.ramos@gmail.com',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //app.use(logger);
  await app.listen(3000);
}
bootstrap();
