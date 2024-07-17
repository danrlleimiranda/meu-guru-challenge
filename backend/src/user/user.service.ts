import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/auth/role/role.enum';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { createUserSchema } from './schemas/createUser.schema';
import { loginSchema } from './schemas/login.schema';

type LoginToken = {
  token: string;
};
@Injectable()
export class UserService {
  private logger = new Logger();

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { error } = createUserSchema.validate(createUserDto);

    if (error) throw new BadRequestException(error.message);

    const hashedPassword = bcrypt.hashSync(createUserDto.password);
    return this.prisma.user.create({
      data: { ...createUserDto, password: hashedPassword },
      select: {
        id: true,
        email: true,
        name: true,
        document: true,
        role: true,
        phone: true,
        password: false,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        document: true,
        role: true,
        phone: true,
        password: false,
      },
    });
  }
  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        document: true,
        role: true,
        phone: true,
        password: false,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: { password: false },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.user.delete({
      where: { id },
      select: { password: false },
    });
  }

  async validateLogin({
    login,
    password,
  }: {
    login: string;
    password: string;
  }) {
    const { error } = loginSchema.validate({ login, password });
    if (error) return error;
  }

  async login({
    login,
    password,
  }: {
    login: string;
    password: string;
  }): Promise<LoginToken> {
    const error = await this.validateLogin({ login, password });
    if (error) throw new BadRequestException(error.message);
    const user = await this.prisma.user.findUnique({
      where: { email: login },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Unauthorized user');
    }
    const payload = {
      sub: user.id,
      role: user.role === 'admin' ? Role.Admin : Role.User,
    };
    const token = await this.jwtService.signAsync(payload);
    this.logger.log(payload);
    return { token };
  }
}
