import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth-decorator';
import { PaginationQueryDto } from 'src/common/dto/paginationQuery.dto';
import { AuthType } from 'src/common/enums/auth-type.enum';
import { CreateUserDto } from 'src/schemas/User/User.create.dto';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth(AuthType.None)
  @Post()
  create(@Body() userdto: CreateUserDto) {
    return this.userService.create(userdto);
  }

  @Get()
  async findAll(@Query() query: PaginationQueryDto) {
    const { page } = query;
    return await this.userService.findAll(page ?? 1);
  }

  @Get(':id')
  async findById(@Param('id') userId: string) {
    return this.userService.findById(userId);
  }
}
