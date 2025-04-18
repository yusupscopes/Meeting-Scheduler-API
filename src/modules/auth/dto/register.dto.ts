import { PickType } from '@nestjs/mapped-types';
import { LoginDto } from './login.dto';

export class RegisterDto extends PickType(LoginDto, ['email', 'password'] as const) {}
