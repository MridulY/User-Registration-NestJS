import { Controller, Post, Body, Get, ParseIntPipe, Param } from '@nestjs/common';
import { UserProducerService } from './user.producer.service';
import { CreateUserDto, CreateUserBatchDto } from './dto/create-user.dto';
import { UserService} from './user.service';
import { User } from './user.entity'

@Controller('user')
export class UserController {
  constructor(
    private readonly userProducerService: UserProducerService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    await this.userProducerService.sendUser(createUserDto);
    return { message: 'User registration message sent to RabbitMQ' };
  }

  @Post('register-batch')
  async registerBatch(@Body() createUserBatchDto: CreateUserBatchDto) {
    await this.userProducerService.sendBatchUser(createUserBatchDto);
    return { message: 'Batch user registration message sent to RabbitMQ' };
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) userId: number): Promise<User> {
    return this.userService.getUserById(userId);
  }
}
