import { IsInt } from 'class-validator';

export class RemoveUserGroupDto {
  @IsInt({ message: 'User ID must be an integer' })
  userId: number;

  @IsInt({ message: 'Group ID must be an integer' })
  groupId: number;
}
