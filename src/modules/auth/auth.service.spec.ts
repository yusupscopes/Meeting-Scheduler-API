import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../shared/prisma/prisma.service';

describe('AuthService', () => {
  let authService: AuthService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mocked-token'),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should register a user with hashed password', async () => {
    const dto = { email: 'a@mail.com', password: '123456', role: 'USER' };
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed' as never);
    mockPrismaService.user.create.mockResolvedValue({ id: '1', ...dto });

    const result = await authService.register(dto);
    expect(result).toHaveProperty('id');
    expect(mockPrismaService.user.create).toHaveBeenCalledWith({
      data: { ...dto, password: 'hashed' },
    });
  });

  it('should return token on valid login', async () => {
    const user = { id: '1', email: 'a@mail.com', password: 'hashed', role: 'USER' };
    mockPrismaService.user.findUnique.mockResolvedValue(user);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

    const result = await authService.login({ email: user.email, password: '123' });
    expect(result.access_token).toBe('mocked-token');
  });
});
