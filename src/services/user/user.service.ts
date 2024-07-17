import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { itemPerPage } from 'src/common/constants/const';
import { CreateUserDto } from 'src/schemas/User/User.create.dto';
import { User } from 'src/schemas/User/User.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userdto: CreateUserDto) {
    const duplicate = await this.userRepository.findOneBy({
      userName: userdto.userName,
    });
    if (duplicate) {
      throw new HttpException(
        `userName: '${userdto.userName}' already taken`,
        HttpStatus.CONFLICT,
      );
    }
    const user = this.userRepository.create(userdto);
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    await this.userRepository.save(user);
    return user.userId;
  }

  findAll(page: number) {
    const offset = --page * itemPerPage;
    return this.userRepository.find({
      skip: offset,
      take: itemPerPage,
      order:{
        createdAt:'ASC'
      }
    });
  }

  async findById(userId: string) {
    const user = await this.userRepository.findOneBy({ userId });
    if (!user) {
      throw new NotFoundException({
        message: 'user not found',
      });
    }
    return user;
  }
  async findByUserName(userName: string) {
    const user = await this.userRepository.findOneBy({ userName });
    if (!user) {
      throw new NotFoundException({
        message: 'user not found',
      });
    }
    return user;
  }
}
