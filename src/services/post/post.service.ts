import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { itemPerPage } from 'src/common/constants/const';
import { CreatePostDto } from 'src/schemas/Post/Post.create.dto';
import { Post } from 'src/schemas/Post/Post.entity';
import { User } from 'src/schemas/User/User.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { PostQuery } from 'src/controllers/post/post.query';
import { PaginationQueryDto } from 'src/common/dto/paginationQuery.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @Inject()
    private readonly userService: UserService,
  ) {}

  async findAll(query?: PaginationQueryDto & PostQuery) {
    const { page = 1, userName } = query;
    const offset = (page - 1) * itemPerPage;
    let [posts, number] = [[], 0];
    if (!userName) {
      [posts, number] = await this.postRepository.findAndCount({
        skip: offset,
        take: itemPerPage,
        relations: {
          user: false,
        },
        order: { createdAt: 'asc' },
      });
    } else {
      [posts, number] = await this.postRepository.findAndCount({
        where: {
          user: {
            userName,
          },
        },
        relations: {
          user: false,
        },
        skip: offset,
        take: itemPerPage,
        order: { createdAt: 'asc' },
      });
    } 
    return {
      data:posts,
      pages: Math.ceil(number / itemPerPage),
    };
  }
  async create(postDto: CreatePostDto) {
    const post = this.postRepository.create(postDto);
    const user = await this.userService.findByUserName('namaboushi');
    if (!user) {
      throw new HttpException(
        `the user for whish this message is destinated does not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    post.user = user;
    return this.postRepository.save(post);
  }
}
