import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  document: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  isAdmin: boolean;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  name: string;

  constructor(user: {
    id: string;
    document: string;
    email: string;
    isAdmin: boolean;
    phone: string;
    name: string;
  }) {
    this.id = user.id;
    this.document = user.document;
    this.email = user.email;
    this.isAdmin = user.isAdmin;
    this.phone = user.phone;
    this.name = user.name;
  }
}
