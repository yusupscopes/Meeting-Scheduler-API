import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { UpdateUserDto } from './dto';
import { User } from '@prisma/client';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateProfile(id: string, dto: Partial<UpdateUserDto>): Promise<User> {
    const data = {
      ...dto,
      workingHours: dto.workingHours ? instanceToPlain(dto.workingHours) : undefined,
    };

    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
