import { Controller, Get, Query } from '@nestjs/common';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  async getAllGroups(@Query('limit') limit: number, @Query('offset') offset: number) {
    return this.groupsService.findAll(limit, offset);
  }
}