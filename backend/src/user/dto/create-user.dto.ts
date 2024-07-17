import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  document: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  role: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  name: string;

  constructor(user: {
    document: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    name: string;
  }) {
    this.document = user.document;
    this.role = user.role;
    this.email = user.email;
    this.phone = user.phone;
    this.name = user.name;
    this.password = user.password;
  }
}
