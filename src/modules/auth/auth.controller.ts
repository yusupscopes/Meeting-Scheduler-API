import { Controller, Body, Post, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginDto, LoginResponseDto, RegisterDto, RegisterResponseDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(201)
  async register(@Body() dto: RegisterDto): Promise<RegisterResponseDto> {
    return await this.authService.register(dto);
  }

  @Public()
  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    return await this.authService.login(dto);
  }
}
