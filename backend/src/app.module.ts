import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import AuthMiddleware from './middlewares/auth.middleware';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [],
  controllers: [AuthController, UserController],
  providers: [UserService],
})
export class AppModule implements NestModule {
  constructor() {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/users');
  }
}
