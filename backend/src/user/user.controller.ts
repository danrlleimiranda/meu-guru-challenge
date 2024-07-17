import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/role/role.enum';
import { Roles } from 'src/auth/role/roles.decorator';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  async getAllUsers() {
    return this.userService.findAll();
  }

  @Post()
  @HttpCode(201)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/:id')
  async findUserById(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch('/:id')
  @Roles(Role.Admin)
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('/:id')
  @Roles(Role.Admin)
  @HttpCode(204)
  removeUser(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
