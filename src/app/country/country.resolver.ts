import { Resolver, Query } from '@nestjs/graphql';
import { CountryResponse } from './models';
import { CountryService } from './country.service';

@Resolver(() => CountryResponse)
export class CountryResolver {
  constructor(private readonly countryService: CountryService) {}

  @Query(() => [CountryResponse])
  async allCountries() {
    return this.countryService.findAll();
  }
}
