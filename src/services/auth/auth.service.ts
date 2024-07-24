import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { UserService } from '../user/user.service';
import { HasingService } from '../hashing/hasing.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/schemas/User/User.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
    private readonly hasingService: HasingService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async signIn(signInDto: SignInDto) {
    const user = await this.userRepository.findOne({
      select: {
        password: true,
      },
      where: {
        userName: signInDto.userName,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Incorrect login or password');
    }
    const isEqual = await this.hasingService.compare(
      signInDto.password,
      user.password,
    );
    if (!isEqual) {
      throw new UnauthorizedException('Incorrect login or password');
    }
    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.userId,
        userName: user.userName,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
        secret: this.jwtConfiguration.secret,
      },
    );
    return { accessToken };
  }
}
