import { MigrationInterface, QueryRunner } from 'typeorm';

export class OtpEntity1617356403146 implements MigrationInterface {
  name = 'OtpEntity1617356403146';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "otp" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "otp_secret" text NOT NULL, "otp_verified_at" TIMESTAMP, "mobile_number" text NOT NULL, CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "country"`);
  }
}
