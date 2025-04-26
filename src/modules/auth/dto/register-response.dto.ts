import { OmitType } from '@nestjs/mapped-types';
import { RegisterDto } from './register.dto';

export class RegisterResponseDto extends OmitType(RegisterDto, ['password'] as const) {}
