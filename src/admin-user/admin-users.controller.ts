import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AdminUsersService } from './admin-users.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AdminUsers')
@Controller('admin-users')
export class AdminUsersController {
  constructor(private adminUsersService: AdminUsersService) {}
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get()
  async getAll() {
    return this.adminUsersService.getAll();
  }

  @Get(':name')
  async getByName(@Param() { name }) {
    return this.adminUsersService.findByName(name);
  }
}
