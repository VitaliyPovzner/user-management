import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { PaginationOffsetDTO } from 'src/common/pagination-offset.dto';
@Controller('groups')
export class GroupsController {
    constructor(private readonly groupsService: GroupsService) { }
    @Get()
    async getAllGroups(@Query() query: PaginationOffsetDTO) {
        try {
            return await this.groupsService.findAll(query);
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
