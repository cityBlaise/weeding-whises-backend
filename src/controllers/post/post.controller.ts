import {
  Body,
  Controller,
  Get,
  Post,
  Query
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/paginationQuery.dto';
import { CreatePostDto } from 'src/schemas/Post/Post.create.dto';
import { PostService } from 'src/services/post/post.service';
import { PostQuery } from './post.query';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(@Query() query: PaginationQueryDto&PostQuery) { 
    return await this.postService.findAll(query);
  }

  @Post()
  async create(@Body() body: CreatePostDto) {
    return await this.postService.create(body);
  }
}
