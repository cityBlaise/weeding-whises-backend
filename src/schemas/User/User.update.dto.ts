import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './User.create.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
