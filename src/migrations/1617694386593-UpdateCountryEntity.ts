import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateCountryEntity1617694386593 implements MigrationInterface {
    name = 'UpdateCountryEntity1617694386593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "country" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "country" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "country" DROP CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269"`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "country" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "country" ADD CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" DROP CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269"`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "country" ADD "id" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "country" ADD CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "created_at"`);
    }

}
