import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { SignInDto } from './dto/signIn.dto';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: UserService) {}

  @Post()
  @HttpCode(200)
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.login(signInDto);
  }
}
