import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth-decorator';
import { AuthType } from 'src/common/enums/auth-type.enum';
import { AuthService } from 'src/services/auth/auth.service';
import { SignInDto } from 'src/services/auth/dto/sign-in.dto';

@Auth(AuthType.None)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }
}
