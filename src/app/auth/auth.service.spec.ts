import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

const user: UserEntity = {
  email: 'vmp9905@gmail.com',
  password: 'vicky3600',
  firstname: 'vicky',
  lastname: 'panchal',
  phone: '6354517968',
  role: 'admin',
  active: true,
  created_at: Date(),
  updated_at: Date(),
};

describe('AuthService', () => {
  let service: Partial<AuthService>;
  let repo: Repository<UserEntity>;
  let usersService: UserService;
  let jwtService: Partial<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn().mockResolvedValue(user),
            findById: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            signAsync: jest.fn(),
            verify: jest.fn(),
            verifyAsync: jest.fn(),
            decode: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(user),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repo = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    usersService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to login', async () => {
    const userOne = await usersService.findByEmail('vmp9905@gmail.com');
    const payload = service.generatePayload(userOne.id, userOne.role);
    const token = jwtService.sign(payload);
    expect(jwtService.sign).toBeCalledTimes(1);
    expect(userOne.email).toEqual(user.email);
    // expect(service.validateUser).toBeCalledTimes(1);
    expect(
      await service.login({
        email: 'vmp9905@gmail.com',
        password: 'vicky3600',
      }),
    ).toEqual({
      accessToken: token,
      data: {
        user_id: 'cc3e4526-44ec-4d79-a592-28a0e110de75',
        role: 'admin',
      },
    });
  });
});
