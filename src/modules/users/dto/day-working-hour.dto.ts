import { IsString, Matches } from 'class-validator';

export class DayWorkingHourDto {
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Start time must be in HH:mm format' })
  start: string;

  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'End time must be in HH:mm format' })
  end: string;
}
