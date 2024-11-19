import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { UserGroup } from './user-group.entity';
import { Group } from '../groups/group.entity';

@Injectable()
export class UserGroupService {
  constructor(
    @InjectRepository(UserGroup)
    private readonly userGroupRepository: Repository<UserGroup>,

    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>, 
  ) {}

  async removeUserFromGroup(groupId: number, userId: number): Promise<{ message: string }> {
    return await this.userGroupRepository.manager.transaction(
      async (entityManager: EntityManager) => {
        // Remove the user from the group
        await entityManager.query(
          `DELETE FROM user_groups WHERE user_id = ? AND group_id = ?`,
          [userId, groupId],
        );

        // Check if the group has any remaining members
        const result = await entityManager.query(
            `SELECT COUNT(*) as count FROM user_groups WHERE group_id = ?`,
            [groupId],
          );
          
          const count = result[0]?.count || 0;
        
        // Determine the new group status
        const newStatus = count > 0 ? 'notEmpty' : 'empty';

        // Update the group status
        await entityManager.update(Group, groupId, { status: newStatus });

        return { message: `User removed from group, group status updated to ${newStatus}` };
      },
    );
  }
}
