import { Test } from '@nestjs/testing';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthModule } from '../../src/auth/auth.module';
import { UserController } from '../../src/user/user.controller';
import { UserService } from '../../src/user/user.service';
import {
  createdDtoUser,
  updateDtoUser,
  userServiceCreated,
  userServiceFindAll,
  userServiceFindById,
  userServiceUpdated,
} from '../mocks/mockResults';

describe('AssignorService', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PrismaModule, AuthModule],
      controllers: [AuthController, UserController],
      providers: [UserService],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userController = moduleRef.get<UserController>(UserController);
  });

  describe('Verifica se o controller está funcionando corretamente.', () => {
    it('Deve retornar um array de Assignors', async () => {
      jest.spyOn(userService, 'findAll').mockResolvedValue(userServiceFindAll);
      const page = '0';
      const offset = '2';
      const filters = '';

      expect(await userController.getAllUsers(page, offset, filters)).toBe(
        userServiceFindAll,
      );
    });

    it('Deve retornar um único assignor', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(userServiceFindById);

      expect(await userController.findUserById('2')).toBe(userServiceFindById);
    });

    it('Deve retornar o assignor criado.', async () => {
      jest.spyOn(userService, 'create').mockResolvedValue(userServiceCreated);

      expect(await userController.createUser(createdDtoUser)).toBe(
        userServiceCreated,
      );
    });

    it('Deve retornar o assignor atualizado.', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(userServiceFindById);

      jest.spyOn(userService, 'update').mockResolvedValue(userServiceUpdated);

      expect(await userController.updateUser('3', updateDtoUser)).toBe(
        userServiceUpdated,
      );
    });
  });
});
