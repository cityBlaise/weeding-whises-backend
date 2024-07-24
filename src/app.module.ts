import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './controllers/auth/auth.controller';
import { PostController } from './controllers/post/post.controller';
import { UserController } from './controllers/user/user.controller';
import { AuthenticationGuard } from './guards/auth/authentication/authentication.guard';
import { Post } from './schemas/Post/Post.entity';
import { User } from './schemas/User/User.entity';
import { AuthService } from './services/auth/auth.service';
import jwtConfig from './services/auth/config/jwt.config';
import { BcryptService } from './services/hashing/bcrypt.service';
import { HasingService } from './services/hashing/hasing.service';
import { PostService } from './services/post/post.service';
import { UserService } from './services/user/user.service';
import { typeOrmConfig } from './typeOrm.config';
import { AccessTokenGuard } from './guards/auth/access-token/access-token.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [jwtConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    TypeOrmModule.forFeature([User, Post]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AppController, PostController, AuthController, UserController],
  providers: [
    AppService,
    PostService,
    {
      provide: HasingService,
      useClass: BcryptService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    UserService,
    AccessTokenGuard,
    AuthService,
  ],
})
export class AppModule {}
