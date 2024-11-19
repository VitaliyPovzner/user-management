import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './group.entity';
import { DEFAULT_PAGINATION_OPTIONS } from 'src/common/constants';
import { PaginationOffsetDTO } from 'src/common/pagination-offset.dto';
@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
  ) { }




 async findAll({offset = DEFAULT_PAGINATION_OPTIONS.offset, limit =DEFAULT_PAGINATION_OPTIONS.limit}: PaginationOffsetDTO): Promise<Group[]> {
    return this.groupsRepository.find({
      skip: offset,
      take: limit,
    });
  }
}



