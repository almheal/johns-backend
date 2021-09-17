import { AdminUser } from '../../schemas/admin-user.schema';
import { Roles } from '../../roles.enum';
import { adminUsersStub } from '../stubs/admin-users.stub';

export const adminUsersMockService = () => ({
  create: (dto: AdminUser): AdminUser => {
    return {
      ...dto,
    };
  },
  findByName: (name: string) => {
    return { ...adminUsersStub(), name };
  },
  getAll: () => {
    return [
      { ...adminUsersStub() },
      {
        name: 'Alex',
        password: 'superPassword',
        roles: [Roles.Employee, Roles.Developer],
      },
    ];
  },
  get: (id: string) => {
    return {
      ...adminUsersStub(),
      _id: id,
    };
  },
});
