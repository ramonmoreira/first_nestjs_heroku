import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
  .setTitle('First NestJS API')
  .setDescription('Teste de nestjs como api')
  .setVersion('1.0')
  .addTag('nestjs')
  .build()
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)
  
  await app.listen(process.env.PORT || 2000);
}
bootstrap();
