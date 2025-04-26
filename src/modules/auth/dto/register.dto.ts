import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ required: true, default: 'john@mail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true, default: '12345678' })
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({ required: false, default: 'USER' })
  @IsEnum(['USER', 'GUEST'])
  @IsOptional()
  role?: 'USER' | 'GUEST' = 'USER';
}
