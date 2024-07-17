import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@example.com',
  })
  login: string;
  @ApiProperty({
    description: 'Password for the user account',
    example: 'password123',
  })
  password: string;

  constructor(userInfo: { login: string; password: string }) {
    this.login = userInfo.login;
    this.password = userInfo.password;
  }
}
