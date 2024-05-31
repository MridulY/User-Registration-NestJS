import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserProducerService } from './user.producer.service';
import { UserConsumerService } from './user.consumer.service';
import { UserService } from './user.service';
import { User } from './user.entity';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserConsumerController } from './user.consumer.controller'
import {AppRedisModule} from '../redis.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'users-queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [{ name: 'exchange_name', type: 'topic' }],
      uri: 'amqp://guest:guest@localhost:5672',
      connectionInitOptions: { wait: false },
    }),
    AppRedisModule,
  ],
  controllers: [UserController, UserConsumerController],
  providers: [UserProducerService, UserConsumerService, UserService],
})
export class UserModule {}
