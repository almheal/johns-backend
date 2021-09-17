import { AdminUser } from '../../schemas/admin-user.schema';
import { Roles } from '../../roles.enum';

export const adminUsersStub = (): AdminUser => ({
  name: 'Dmitry',
  password: '123456',
  roles: [Roles.Admin, Roles.Developer, Roles.Employee],
});
