import { UsersService } from './users.service';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { Test } from '@nestjs/testing';

describe('UsersService', () => {
  let userService: UsersService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UsersService, { provide: PrismaService, useValue: mockPrismaService }],
    }).compile();

    userService = module.get<UsersService>(UsersService);
  });

  it('should get profile by id', async () => {
    const mockProfile = { id: '1', email: 'test@mail.com' };
    mockPrismaService.user.findUnique.mockResolvedValue(mockProfile);

    const result = await userService.getProfile('1');
    expect(result).toEqual(mockProfile);
    expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('should update user profile', async () => {
    mockPrismaService.user.update.mockResolvedValue({ id: '1', timezone: 'Asia/Jakarta' });

    const result = await userService.updateProfile('1', { timezone: 'Asia/Jakarta' });
    expect(result.timezone).toBe('Asia/Jakarta');
  });
});
