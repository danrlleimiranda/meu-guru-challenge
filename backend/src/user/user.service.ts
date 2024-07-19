import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { Role } from '../auth/role/role.enum';
import logger from '../log/logger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { createUserSchema } from './schemas/createUser.schema';
import { loginSchema } from './schemas/login.schema';

type LoginToken = {
  token: string;
};
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { error } = createUserSchema.validate(createUserDto);

    if (error) throw new BadRequestException(error.message);

    const hashedPassword = bcrypt.hashSync(createUserDto.password);
    logger.info('User created');
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

  async findAll({ page, offset, filters }) {
    const pageNumber = parseInt(page);
    const take = parseInt(offset);
    const skip = pageNumber * take;
    logger.info('Users searched');
    const total = await this.prisma.user.count();
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        document: true,
        role: true,
        phone: true,
        password: false,
      },
      skip: skip || 0,
      take: take || 3,
      where: {
        name: {
          contains: filters,
          mode: 'insensitive',
        },
      },
    });
    return { ...users, total };
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
    logger.info('User founded');
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    logger.info('User updated');
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: { password: false },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    logger.info('User removed');
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
      logger.error('User not found');
      throw new NotFoundException('User not found');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      logger.error('Unauthorized user');
      throw new UnauthorizedException('Unauthorized user');
    }
    const payload = {
      sub: user.id,
      role: user.role === 'admin' ? Role.Admin : Role.User,
    };
    const token = await this.jwtService.signAsync(payload);
    logger.info(`Logged user: ${JSON.stringify(payload)}`);
    return { token };
  }
}
