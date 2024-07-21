import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './config/jwt-auth.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Only allow properties that are part of the DTO
      transform: true, // Transform payload to DTO instance
      forbidNonWhitelisted: false, // Do not throw error if non-whitelisted properties are present
      skipMissingProperties: false, // Validate all properties, not just those provided
    }),
  );

  app.useGlobalGuards(new JwtAuthGuard());

  const config = new DocumentBuilder()
    .setTitle('Example API')
    .setDescription('The example API description')
    .setVersion('1.0')
    .addTag('example')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
