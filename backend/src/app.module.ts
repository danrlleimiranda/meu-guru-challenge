import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/role/roles.guard';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
// export class AppModule implements NestModule {
//   constructor() {}
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(AuthMiddleware).forRoutes('/users');
//   }
// }
