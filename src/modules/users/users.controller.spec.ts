import { UsersController } from './users.controller';
import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: Partial<UsersService>;

  beforeEach(async () => {
    service = {
      getProfile: jest.fn().mockResolvedValue({ id: '1', email: 'test@mail.com' }),
      updateProfile: jest.fn().mockResolvedValue({ timezone: 'Asia/Jakarta' }),
    };

    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: service }],
    }).compile();

    controller = module.get(UsersController);
  });

  it('should return user profile', async () => {
    const result = await controller.getProfile({ user: { id: '1' } });
    expect(result?.email).toBe('test@mail.com');
  });

  it('should update profile', async () => {
    const result = await controller.updateProfile(
      { user: { id: '1' } },
      { timezone: 'Asia/Jakarta' },
    );
    expect(result.timezone).toBe('Asia/Jakarta');
  });
});
