import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PostQuery {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  userName: string;
}
