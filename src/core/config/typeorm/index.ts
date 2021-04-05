import path from 'path';
import { OtpEntity } from 'src/app/auth/otp/entities';
import { CountryEntity } from 'src/app/country/entities';
import { UserEntity } from 'src/app/user/entities';
import { ConnectionOptions } from 'typeorm';
import { ENVIRONMENT } from '../../environment';

const getValue = (key: string, throwOnMissing = true): string => {
  const value = process.env[key];
  if (!value && throwOnMissing) {
    throw new Error(`Config error - missing env.${key}`);
  }
  return value;
};

const config: ConnectionOptions = {
  type: 'postgres',
  url: getValue('DATABASE_URL'),
  entities: [UserEntity, OtpEntity, CountryEntity],

  logging: ENVIRONMENT === 'local',
  // We are using migrations, synchronize should be set to false.
  synchronize: false,

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: true,

  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: [path.join(__dirname, '../../../migrations/*{.ts,.js}')],
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'src/migrations',
    entitiesDir: 'src/app/**/entities/*.entity{.ts,.js}',
  },
};

export = config;
