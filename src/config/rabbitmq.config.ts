import { ClientProviderOptions, Transport } from '@nestjs/microservices';

export const rabbitMQConfig: ClientProviderOptions = {
  name: 'USERS_SERVICE',
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://localhost:5672'],
    queue: 'users-queue',
    queueOptions: {
      durable: true, 
    },
  },
};
