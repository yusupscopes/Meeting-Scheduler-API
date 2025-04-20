import { Body, Controller, Get, Patch, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  getProfile(@Req() req: { user: { id: string } }) {
    return this.usersService.getProfile(req.user.id);
  }

  @Patch('me')
  updateProfile(@Req() req: { user: { id: string } }, @Body() dto: Partial<UpdateUserDto>) {
    return this.usersService.updateProfile(req.user.id, dto);
  }
}
