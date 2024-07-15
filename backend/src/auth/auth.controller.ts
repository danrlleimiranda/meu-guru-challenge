import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/signIn.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: UserService) {}

  @Post()
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.login(signInDto);
  }
}
