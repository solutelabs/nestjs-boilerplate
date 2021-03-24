import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
import { ENVIRONMENT } from '../../environment';

class TypeOrmService {
  private getValue(key: string, throwOnMissing = true): string {
    const value = process.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`Config error - missing env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getDefaultTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: this.getValue('DATABASE_URL'),
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
      // ssl: {
      //   rejectUnauthorized: false,
      // },
      logging: ENVIRONMENT === 'local',
    };
  }
}

const databaseConfigService = new TypeOrmService().ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
]);
export { databaseConfigService };
