import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
  ) {}

  async findAll(limit: number, offset: number): Promise<Group[]> {
    return this.groupsRepository.find({
      skip: offset,
      take: limit,
    });
  }
}



