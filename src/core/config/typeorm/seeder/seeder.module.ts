import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../index';
import { CountryEntity } from 'src/app/country/entities';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([CountryEntity]),
  ],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
