import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../auth/role/role.enum';
import { Roles } from '../auth/role/roles.decorator';
import { RolesGuard } from '../auth/role/roles.guard';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@ApiTags('Users')
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard, RolesGuard)
  async getAllUsers(
    @Query('page') page: string,
    @Query('offset') offset: string,
    @Query('filters') filters?: string,
  ) {
    return this.userService.findAll({ page, offset, filters });
  }

  @Post()
  @HttpCode(201)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/:id')
  @UseGuards(AuthGuard, RolesGuard)
  async findUserById(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @HttpCode(200)
  removeUser(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
