import { IsInt, IsOptional, IsPositive,Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetUsersQueryDto {
  @IsOptional() 
  @IsInt() 
  @IsPositive()
  @Transform(({ value }) => parseInt(value, 10)) 
  limit?: number;

  @IsOptional() 
  @IsInt() 
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10)) 
  offset?: number;
}