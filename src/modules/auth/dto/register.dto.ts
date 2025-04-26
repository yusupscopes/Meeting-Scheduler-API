import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsEnum(['USER', 'GUEST'])
  @IsOptional()
  role?: 'USER' | 'GUEST' = 'USER';
}
