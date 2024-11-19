import { ConfigModule, ConfigService } from '@nestjs/config';
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
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User, Group, UserGroup],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Group, UserGroup]),
  ],
  controllers: [GroupsController, UsersController, UserGroupController],
  providers: [GroupsService, UsersService, UserGroupService],
})
export class AppModule {}
