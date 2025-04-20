import { AuthController } from './auth.controller';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: Partial<AuthService>;

  beforeEach(async () => {
    service = {
      register: jest.fn().mockResolvedValue({ id: '1', email: 'a@mail.com' }),
      login: jest.fn().mockResolvedValue({ access_token: 'token' }),
    };

    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: service }],
    }).compile();

    controller = module.get(AuthController);
  });

  it('should register and return user', async () => {
    const dto = { email: 'a@mail.com', password: '123' };
    const result = await controller.register(dto);
    expect(result.email).toBe(dto.email);
  });

  it('should login and return token', async () => {
    const dto = { email: 'a@mail.com', password: '123' };
    const result = await controller.login(dto);
    expect(result.access_token).toBe('token');
  });
});
