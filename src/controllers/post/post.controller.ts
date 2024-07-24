import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/paginationQuery.dto';
import { CreatePostDto } from 'src/schemas/Post/Post.create.dto';
import { PostService } from 'src/services/post/post.service';
import { PostQuery } from './post.query';
import { Auth } from 'src/common/decorators/auth-decorator';
import { AuthType } from 'src/common/enums/auth-type.enum';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @Auth(AuthType.None)
  async findAll(@Query() query: PaginationQueryDto & PostQuery) {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
    return await this.postService.findAll(query);
  }

  @Auth(AuthType.None)
  @Post()
  async create(@Body() body: CreatePostDto) {
    return await this.postService.create(body);
  }
}
