import {MigrationInterface, QueryRunner} from "typeorm";

export class UserEntity1617355569332 implements MigrationInterface {
    name = 'UserEntity1617355569332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "email" text NOT NULL, "password" text, "firstname" text, "lastname" text, "phone" text, "role" text NOT NULL, "reset_password_token" text, "active" boolean NOT NULL, "profile_photo_url" text, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
