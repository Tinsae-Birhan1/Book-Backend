import { MigrationInterface, QueryRunner } from "typeorm";

export class Book1698321500514 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      --Table Definition
      CREATE TABLE "books"  (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "title" character varying NOT NULL,
        "tags" character varying NOT NULL,
        "writer" character varying NOT NULL,
        "price" integer NOT NULL,
        "image" character varying NOT NULL DEFAULT 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "books"`);
  }
}
