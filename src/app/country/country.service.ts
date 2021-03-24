import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryEntity } from './entities';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(CountryEntity)
    private countriesRepository: Repository<CountryEntity>,
  ) {}

  async findByName(name: string): Promise<CountryEntity> {
    return this.countriesRepository.findOne({ name: name });
  }

  async findAll(): Promise<CountryEntity[]> {
    return this.countriesRepository.find();
  }

  async findByID(id: string): Promise<CountryEntity> {
    return this.countriesRepository.findOne({ id: id });
  }
}
