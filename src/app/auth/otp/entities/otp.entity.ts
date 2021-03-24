import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('otp')
export class OtpEntity {
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column('text')
  otp_secret: string;

  @Column({ nullable: true })
  otp_verified_at?: Date;

  @Column('text')
  mobile_number: string;
}
