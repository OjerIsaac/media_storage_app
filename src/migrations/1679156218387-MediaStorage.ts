import { MigrationInterface, QueryRunner } from "typeorm"

export class MediaStorage1679156218387 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `CREATE TABLE "media" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "type" varchar NOT NULL,
            "name" varchar NOT NULL UNIQUE,
            "description" varchar NOT NULL,
            "url" varchar NOT NULL,
            "status" varchar NOT NULL DEFAULT 'Active',
            "createdAt" timestamp NOT NULL DEFAULT now(),
            "updatedAt" timestamp NOT NULL DEFAULT now(),
            "deletedAt" timestamp,
            PRIMARY KEY ("id")
          )`
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "media"`);
      }

}
