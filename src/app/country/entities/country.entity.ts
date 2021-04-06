import { BaseEntity } from 'src/app/utility/entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'country' })
export class CountryEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  code: string;
}
