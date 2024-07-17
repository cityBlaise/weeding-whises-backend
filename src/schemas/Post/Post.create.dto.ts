import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePostDto { 

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsDateString()
  @IsOptional()
  createdAt: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userId: string;
}
