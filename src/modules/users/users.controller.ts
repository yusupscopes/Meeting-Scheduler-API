import { Body, Controller, Get, Patch, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  async getProfile(@Req() req: { user: { id: string } }): Promise<User | null> {
    return await this.usersService.getProfile(req.user.id);
  }

  @Patch('me')
  async updateProfile(
    @Req() req: { user: { id: string } },
    @Body() dto: Partial<UpdateUserDto>,
  ): Promise<User> {
    return await this.usersService.updateProfile(req.user.id, dto);
  }
}
