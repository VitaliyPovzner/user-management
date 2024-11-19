import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(limit: number, offset: number): Promise<User[]> {
    return this.usersRepository.find({
      skip: offset,
      take: limit,
    });
  }
}

