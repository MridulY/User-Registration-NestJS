import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { rabbitMQConfig } from '../config/rabbitmq.config';
import { CreateUserDto, CreateUserBatchDto } from './dto/create-user.dto';

@Injectable()
export class UserProducerService {
  constructor(@Inject('USERS_SERVICE') private rabbitClient: ClientProxy) {}

  //   constructor() {
  //     this.client = ClientProxyFactory.create(rabbitMQConfig);
  //   }

  async sendUser(createUserDto: CreateUserDto) {
    this.rabbitClient.emit('user_created', createUserDto);
  }

  async sendBatchUser(createUserBatchDto: CreateUserBatchDto){
    this.rabbitClient.emit('batch-user-created', createUserBatchDto);
  }
}
