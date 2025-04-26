import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/shared/prisma/prisma.service';
import { App } from 'supertest/types';
import { LoginResponseDto } from 'src/modules/auth/dto/login-response.dto';
import { User } from '@prisma/client';

describe('App E2E', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  let server: App;
  let access_token: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    server = app.getHttpServer();
    prisma = app.get(PrismaService);
    await prisma.user.deleteMany(); // clean test db
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await app.close();
  });

  const userDto = {
    email: 'e2e@mail.com',
    password: 'password123',
  };

  it('should register a new user', async () => {
    const res: request.Response = await request(server).post('/auth/register').send(userDto);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should login and return access token', async () => {
    const res: request.Response = await request(server).post('/auth/login').send(userDto);
    expect(res.statusCode).toBe(200);
    const _body = res.body as LoginResponseDto;
    expect(_body.access_token).toBeDefined();
    access_token = _body.access_token;
  });

  it('should get user profile', async () => {
    const res: request.Response = await request(server)
      .get('/users/me')
      .set('Authorization', `Bearer ${access_token}`);
    expect(res.statusCode).toBe(200);
    const _body = res.body as User;
    expect(_body.email).toBe(userDto.email);
  });

  it('should update user profile timezone and working hours', async () => {
    const res: request.Response = await request(server)
      .patch('/users/me')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        timezone: 'Asia/Jakarta',
        workingHours: {
          monday: { start: '09:00', end: '17:00' },
          friday: { start: '10:00', end: '16:00' },
        },
      });

    expect(res.statusCode).toBe(200);
    const _body = res.body as User;
    expect(_body.timezone).toBe('Asia/Jakarta');
    expect(_body.workingHours).toEqual({
      monday: { start: '09:00', end: '17:00' },
      friday: { start: '10:00', end: '16:00' },
    });
  });
});
