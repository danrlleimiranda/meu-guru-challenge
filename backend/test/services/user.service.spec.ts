import { Test } from '@nestjs/testing';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaService } from '../../prisma/prisma.service';
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
  let userService: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PrismaModule, AuthModule],
      controllers: [AuthController, UserController],
      providers: [UserService],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  describe('Verifica se o serviço está funcionando corretamente.', () => {
    it('Deve retornar um array de Assignors', async () => {
      jest
        .spyOn(prismaService.user, 'findMany')
        .mockResolvedValue(userServiceFindAll);
      const page = 0 * 1;
      const offset = 2;
      const filters = '';

      expect(await userService.findAll({ page, offset, filters })).toBe(
        userServiceFindAll,
      );
    });

    it('Deve retornar um único assignor', async () => {
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue(userServiceFindById);

      expect(await userService.findOne('2')).toBe(userServiceFindById);
    });

    it('Deve retornar o assignor criado.', async () => {
      jest
        .spyOn(prismaService.user, 'create')
        .mockResolvedValue(userServiceCreated);

      expect(await userService.create(createdDtoUser)).toBe(userServiceCreated);
    });

    it('Deve retornar o assignor atualizado.', async () => {
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue(userServiceFindById);

      jest
        .spyOn(prismaService.user, 'update')
        .mockResolvedValue(userServiceUpdated);

      expect(await userService.update('3', updateDtoUser)).toBe(
        userServiceUpdated,
      );
    });
  });
});
