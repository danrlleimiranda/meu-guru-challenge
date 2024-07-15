import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [UserService],
})
export class AuthModule {}
