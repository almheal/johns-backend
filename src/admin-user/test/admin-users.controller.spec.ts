import { AdminUsersController } from '../admin-users.controller';
import { AdminUsersService } from '../admin-users.service';
import { Test } from '@nestjs/testing';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { adminUsersMockService } from './__mocks__/admin-users.mock.service';

describe('AdminUsersController', () => {
  let controller: AdminUsersController;
  let service: AdminUsersService;

  const mockAdminUsersService = {
    ...adminUsersMockService(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule,
        JwtModule.register({
          signOptions: { expiresIn: '2h' },
        }),
      ],
      controllers: [AdminUsersController],
      providers: [AdminUsersService],
    })
      .overrideProvider(AdminUsersService)
      .useValue(mockAdminUsersService)
      .compile();

    controller = moduleRef.get<AdminUsersController>(AdminUsersController);
    service = moduleRef.get<AdminUsersService>(AdminUsersService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('testing methods controller', () => {
    it('getAll should return array data', async () => {
      expect(await controller.getAll()).toBeInstanceOf(Array);
    });

    it('getAll should return data called service method', async () => {
      const adminUsers = await service.getAll();
      expect(await controller.getAll()).toEqual(
        expect.arrayContaining(adminUsers),
      );
    });

    it('getByName should return object', async () => {
      expect(await controller.getByName({ name: 'Dmitry' })).toBeInstanceOf(
        Object,
      );
    });

    it('getByName should return data called service method', async () => {
      const adminUserByName = await service.findByName('Dmitry');
      expect(await controller.getByName({ name: 'Dmitry' })).toEqual(
        expect.objectContaining(adminUserByName),
      );
    });

    it('getByName should return object where property name equal param', async () => {
      const adminUser = await controller.getByName({ name: 'Dmitry' });
      expect(adminUser).toHaveProperty('name', 'Dmitry');
    });
  });
});
