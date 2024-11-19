import { IsInt, IsOptional, IsPositive,Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationOffsetDTO {
  @IsOptional()
  @IsInt() 
  @IsPositive()
  @Transform(({ value }) =>parseInt(value, 10))
  limit: number;

  @IsInt() 
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10)) 
  offset: number;
}