import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1727644355870 implements MigrationInterface {
    name = 'Initial1727644355870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vendaitem" ("id" SERIAL NOT NULL, "idVenda" integer NOT NULL, "idProduto" integer NOT NULL, "quantidade" numeric(13,2) NOT NULL, "precoVenda" numeric(13,2) NOT NULL, "valorTotal" numeric(13,2) NOT NULL, CONSTRAINT "pk_venda_item" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "venda" ("id" SERIAL NOT NULL, "idPessoa" integer NOT NULL, "idUsuarioLancamento" integer NOT NULL, "valorTotal" numeric(13,2) NOT NULL, "dataHora" TIMESTAMP NOT NULL DEFAULT now(), "formaPagamento" integer NOT NULL, CONSTRAINT "pk_venda" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vendaitem" ADD CONSTRAINT "fk_venda_item" FOREIGN KEY ("idVenda") REFERENCES "venda"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vendaitem" DROP CONSTRAINT "fk_venda_item"`);
        await queryRunner.query(`DROP TABLE "venda"`);
        await queryRunner.query(`DROP TABLE "vendaitem"`);
    }

}
