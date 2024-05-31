import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // HHTP Server start krne k liye
  app.useGlobalPipes(new ValidationPipe()); 

  // Here I am connecting RabbitMQ to microservice
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'users-queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices(); // Here i am starting my microservice
  await app.listen(3000); // Here i am starting my HTTP server
  Logger.log('Application is running on: http://localhost:3000');
}

bootstrap();
