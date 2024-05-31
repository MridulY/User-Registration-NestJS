import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, CreateUserBatchDto } from './dto/create-user.dto';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UserConsumerService } from './user.consumer.service';
import { Controller, Post, Body } from '@nestjs/common';

@Controller()
export class UserConsumerController {
  constructor(private readonly consumerService: UserConsumerService) {}

  @EventPattern('user_created')
  async handleMessage(@Payload() userData: CreateUserDto) {
    return this.consumerService.handleDataSava(userData);
  }

  @EventPattern('batch-user-created')
  async handleBatchMessage(@Payload() batchuser: CreateUserBatchDto){
    return this.consumerService.handleBatchData(batchuser);
  }
}