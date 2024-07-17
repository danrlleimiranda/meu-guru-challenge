import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Document number of the user',
    example: '123456789',
  })
  document: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'password123',
  })
  password: string;

  @ApiProperty({
    description: 'Role assigned to the user',
    example: 'admin',
  })
  role: string;

  @ApiProperty({
    description: 'Phone number of the user',
    example: '+1234567890',
  })
  phone: string;

  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
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
