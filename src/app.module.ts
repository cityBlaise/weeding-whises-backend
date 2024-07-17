import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostController } from './controllers/post/post.controller';
import { AuthController } from './controllers/auth/auth.controller';
import { PostService } from './services/post/post.service';
import { AuthService } from './services/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './schemas/User/User.entity';
import { Post } from './schemas/Post/Post.entity';
import { join } from 'path';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './typeOrm.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    TypeOrmModule.forFeature([User,Post]),
  ],
  controllers: [AppController, PostController, AuthController, UserController],
  providers: [AppService, PostService, AuthService, UserService],
})
export class AppModule {}
