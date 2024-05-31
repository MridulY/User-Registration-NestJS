import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRedis() private readonly redisClient: Redis,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  

  async getUserById(userId: number): Promise<User> {
    const cacheKey = `user:${userId}`;
    const cachedUser = await this.redisClient.get(cacheKey);

    if (cachedUser) {
      console.log('Retrieving user from Redis cache:', userId);
      return JSON.parse(cachedUser);
    }

    console.log('Fetching user from database:', userId);

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user) {
      await this.redisClient.set(cacheKey, JSON.stringify(user), 'EX', 3600); 
    }
    return user;
  }
}
