import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard, User } from '../../../core/utility';
import { UserEntity } from '../../user/entities';
import { PasswordResolver } from './password.resolver';
import { PasswordService } from './password.service';

describe('PasswordResolver', () => {
  let resolver: PasswordResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PasswordResolver,
        {
          provide: PasswordService,
          useValue: {
            changePassword: jest.fn().mockResolvedValue({
              success: true,
            }),
          },
        },
      ],
    }).compile();

    resolver = module.get<PasswordResolver>(PasswordResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  // ref: https://stackoverflow.com/questions/59767377/how-can-i-unit-test-that-a-guard-is-applied-on-a-controller-in-nestjs
  it('should ensure the JwtAuthGuard is applied to the changePassword method', async () => {
    const guards = Reflect.getMetadata('__guards__', resolver.changePassword);
    const guard = new guards[0]();

    expect(guard).toBeInstanceOf(JwtAuthGuard);
  });

  it('should be able to change password', async () => {
    expect(
      await resolver.changePassword(
        {
          oldPassword: 'vicky3600',
          newPassword: 'vicky1234',
        },
        {} as any,
      ),
    ).toEqual({
      success: true,
    });
  });
});
