export class GetUserDto {
  readonly id: string;
  readonly email: string;
  readonly password: string;
  readonly role: string;
  readonly timezone?: string;
  readonly workingHours?: object;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
