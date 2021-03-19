import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'country' })
export class CountryEntity {
  @PrimaryColumn('text')
  id?: string;

  @Column()
  name: string;

  @Column()
  code: string;
}
