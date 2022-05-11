import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

describe('AuthResolver', () => {
  let resolver: AuthResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          useFactory: () => ({
            login: jest.fn(() => ({
              accessToken: 'dfdbfdsfb',
              data: {
                user_id: '1',
                role: 'admin',
              },
            })),
          }),
        },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should be able to call login', async () => {
    expect(
      await resolver.login({
        email: 'vmp9905@gmail.com',
        password: 'vicky3600',
      }),
    ).toEqual({
      accessToken: 'dfdbfdsfb',
      data: {
        user_id: '1',
        role: 'admin',
      },
    });
  });
});
