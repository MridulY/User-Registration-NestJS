import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, CreateUserBatchDto } from './dto/create-user.dto';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { EventPattern, Payload } from '@nestjs/microservices';

@Injectable()
export class UserConsumerService {
  // private readonly logger = new Logger(UserConsumerService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  // async onModuleInit() {
  //   this.logger.log('UserConsumerService initializing...');
  //   this.amqpConnection.createSubscriber(
  //     this.handleMessage.bind(this),
  //     {
  //       exchange: 'exchange_name',
  //       routingKey: 'user_created',
  //     },
  //     'handleMessage',
  //   );
  //   this.logger.log('Subscriber created and listening for messages...');
  //   //this.logger.log('HANDLE MESSAGE BINDED', this.handleMessage.bind(this));
  // }
  async handleDataSava(@Payload() userData: CreateUserDto) {
    const user = this.userRepository.create(userData);
    await this.userRepository.save(user);
  }

  async handleBatchData(batchData: CreateUserBatchDto) {
    // Create multiple users from the batch data
    const users = batchData.users.map((dto) => this.userRepository.create(dto));
    await this.userRepository.save(users);
  }
}
