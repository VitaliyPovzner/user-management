import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Group } from './groups/group.entity';
import { UserGroup } from './user-groups/user-group.entity';
import { GroupsController } from './groups/groups.controller';
import { GroupsService } from './groups/groups.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UserGroupService } from './user-groups/user-group.service';
import { UserGroupController } from './user-groups/user-group.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'password',
      database: 'mydatabase',
      entities: [User, Group, UserGroup],
      synchronize: false, 
    }),
    TypeOrmModule.forFeature([User, Group, UserGroup]),
  ],
  controllers: [GroupsController,UsersController,UserGroupController],
  providers: [GroupsService,UsersService,UserGroupService],
})


export class AppModule {}
