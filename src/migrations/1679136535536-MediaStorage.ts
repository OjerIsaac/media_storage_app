import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class MediaStorage1679136535536 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "media" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "type" varchar NOT NULL,
          "name" varchar NOT NULL,
          "description" varchar,
          "url" varchar NOT NULL,
          "status" varchar NOT NULL DEFAULT 'Active',
          "created_at" timestamp NOT NULL DEFAULT now(),
          "updated_at" timestamp NOT NULL DEFAULT now(),
          "deleted_at" timestamp,
          CONSTRAINT "PK_123456789abcdef" PRIMARY KEY ("id")
      )
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "media"`);
  }
}
