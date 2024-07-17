import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  document: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  role: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  name: string;

  constructor(user: {
    id: string;
    document: string;
    email: string;
    role: string;
    phone: string;
    name: string;
  }) {
    this.id = user.id;
    this.document = user.document;
    this.email = user.email;
    this.role = user.role;
    this.phone = user.phone;
    this.name = user.name;
  }
}
