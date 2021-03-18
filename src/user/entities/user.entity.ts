import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryColumn({
    generated: 'uuid',
  })
  id: string;

  @Column('text')
  email: string;

  @Column('text', { nullable: true })
  password?: string;

  @Column('text', {
    nullable: true,
  })
  firstname?: string;

  @Column('text', {
    nullable: true,
  })
  lastname?: string;

  @Column('text', {
    nullable: true,
  })
  phone?: string;

  @Column('text')
  role: string;

  @Column('text', { nullable: true })
  reset_password_token?: string;

  @Column('boolean')
  active: boolean;

  @Column('text', { nullable: true })
  profile_photo_url?: string;
}
