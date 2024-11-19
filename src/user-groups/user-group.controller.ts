import { Controller, Delete, Param, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { UserGroupService } from './user-group.service';

@Controller('user-groups')
export class UserGroupController {
  constructor(private readonly groupsService: UserGroupService) {}

  @Delete(':userId/:groupId')
  async deleteUserFromGroup(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('groupId', ParseIntPipe) groupId: number,
  ) {
    try {
      await this.groupsService.removeUserFromGroup(groupId, userId);
      return { message: 'User removed from group successfully.' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'There was a problem on our end. Please try again later.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
