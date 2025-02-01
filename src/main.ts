import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Legion Master')
    .setDescription('Api para el manejo basico de las tareas diarias.')
    .setVersion('1.2.0')
    .addBearerAuth({
      description: "Introduzca el token de la siguiente manera: 'Bearer {token generado}'",
      name: 'Authorization',
      scheme: 'Bearer',
      bearerFormat: 'JWT',
      type: 'apiKey',
      in: 'header'
    })
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors()

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
