import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1727644358136 implements MigrationInterface {
    name = 'Initial1727644358136'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "produto" ("id" SERIAL NOT NULL, "descricao" character varying(60) NOT NULL, "precoCusto" numeric(13,2) NOT NULL, "precoVenda" numeric(13,2) NOT NULL, "imagem" bytea, "ativo" boolean NOT NULL, "codigoBarras" character varying array, CONSTRAINT "pk_produto" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "produto"`);
    }

}
