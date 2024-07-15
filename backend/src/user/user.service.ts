import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as Joi from 'joi';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

type LoginToken = {
  token: string;
};
@Injectable()
export class UserService {
  private _secret = process.env.JWT_SECRET ?? 'secret';
  private _invalidMessage = 'Invalid email or password';
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const filled = 'All fields must be filled';
    const createAssignor = Joi.object({
      email: Joi.string()
        .pattern(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)
        .max(140)
        .required()
        .messages({
          'any.required': filled,
          'string.empty': filled,
          'string.pattern.base':
            "email must follow this pattern 'example@example.com'",
        }),
      document: Joi.string().max(30).required().messages({
        'any.required': filled,
        'string.empty': filled,
      }),
      phone: Joi.string().max(20).required(),
      name: Joi.string().max(140).required(),
      password: Joi.string().min(6).required().messages({
        'any.required': filled,
        'string.min': this._invalidMessage,
        'string.empty': filled,
      }),
    });

    const { error } = createAssignor.validate(createUserDto);

    if (error) throw new BadRequestException(error.message);

    const hashedPassword = bcrypt.hashSync(createUserDto.password);
    return this.prisma.user.create({
      data: { ...createUserDto, password: hashedPassword },
      select: {
        id: true,
        email: true,
        name: true,
        document: true,
        isAdmin: true,
        phone: true,
        password: false,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        document: true,
        isAdmin: true,
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
        isAdmin: true,
        phone: true,
        password: false,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(id: string, updateAssignorDto: UpdateUserDto) {
    await this.findOne(id);
    return this.prisma.user.update({
      where: { id },
      data: updateAssignorDto,
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
    const filled = 'All fields must be filled';
    const loginSchema = Joi.object({
      login: Joi.string()
        .pattern(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)
        .required()
        .messages({
          'any.required': filled,
          'string.empty': filled,
          'string.pattern.base': this._invalidMessage,
        }),
      password: Joi.string().min(6).required().messages({
        'any.required': filled,
        'string.min': this._invalidMessage,
        'string.empty': filled,
      }),
    });

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
      throw new UnauthorizedException('Não autorizado');
    }
    const payload = { sub: user.id, role: user.isAdmin ? 'admin' : 'user' };
    const jwtConfig: jwt.SignOptions = { expiresIn: '3000s' };

    const token = jwt.sign(payload, this._secret, jwtConfig);
    return { token };
  }
}
