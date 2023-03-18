import { MigrationInterface, QueryRunner } from "typeorm"

export class updateMedia1679144922867 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" ADD CONSTRAINT "UQ_media_name" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "UQ_123456789abcdef"`);
    }

}
