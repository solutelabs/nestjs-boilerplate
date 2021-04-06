import { Injectable } from '@nestjs/common';
import { countries } from './data/countries';
import { CountryEntity } from 'src/app/country/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SeederService {
  private countriesData;

  constructor(
    @InjectRepository(CountryEntity)
    private countriesRepository: Repository<CountryEntity>,
  ) {
    this.countriesData = countries;
  }
  async seed() {
    await this.countries();
  }

  async countries() {
    for (const country of this.countriesData) {
      const dbCountry = await this.countriesRepository.findOne({
        where: { name: country.name },
      });

      if (!dbCountry) {
        const newCountry = await this.countriesRepository.create(country);
        await this.countriesRepository.save(newCountry);
      }
    }
  }
}
