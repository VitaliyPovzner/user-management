import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { PaginationOffsetDTO } from 'src/common/pagination-offset.dto';
import { DEFAULT_PAGINATION_OPTIONS } from 'src/common/constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll({
    offset = DEFAULT_PAGINATION_OPTIONS.offset,
    limit = DEFAULT_PAGINATION_OPTIONS.limit,
  }: PaginationOffsetDTO): Promise<User[]> {
    return this.usersRepository.find({
      skip: offset,
      take: limit,
    });
  }
}
