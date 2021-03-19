import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryService } from './country.service';
import { CountryEntity } from './entities';
import { CountryResolver } from './country.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity])],
  providers: [CountryService, CountryResolver],
  exports: [CountryService, TypeOrmModule, CountryResolver],
})
export class CountryModule {}
