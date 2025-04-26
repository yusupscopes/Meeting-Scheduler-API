import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { LoginDto, LoginResponseDto, RegisterDto, RegisterResponseDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async register(dto: RegisterDto): Promise<RegisterResponseDto> {
    try {
      const hashed = await bcrypt.hash(dto.password, 10);
      return this.prisma.user.create({
        data: { ...dto, password: hashed },
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException();
    }

    const token = this.jwtService.sign({ sub: user.id, username: user.email });
    return { access_token: token };
  }
}
