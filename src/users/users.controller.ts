import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUsersQueryDto } from './get-users.dto';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async getAllUsers(@Query() query: GetUsersQueryDto) {
        try {
            const { limit, offset } = query;
            return await this.usersService.findAll(limit, offset);
        } catch (error) {
                if (error instanceof HttpException && error.getStatus() === HttpStatus.BAD_REQUEST) {
                    throw new HttpException({
                        status: HttpStatus.BAD_REQUEST,
                        error: error.getResponse(),
                    }, HttpStatus.BAD_REQUEST);
                }
                throw new HttpException({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'There was a problem on our end. Please try again later.',
                }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}