import { IsOptional, IsString, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { WorkingHoursDto } from './working-hours.dto';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  timezone?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => WorkingHoursDto)
  workingHours?: WorkingHoursDto;
}
