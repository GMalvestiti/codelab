import { fakerPT_BR as faker } from '@faker-js/faker';
import { CreateVendaDto } from 'src/core/venda/dto/create-venda.dto';
import { Venda } from 'src/core/venda/entities/venda.entity';
import { define } from 'typeorm-seeding';

define(Venda, () => {
  const venda = new CreateVendaDto();

  venda.idPessoa = faker.number.int({ max: 20 });
  venda.idUsuarioLancamento = faker.number.int({ max: 20 });
  venda.valorTotal = faker.number.float({ min: 0, max: 1000 });
  venda.formaPagamento = faker.number.int({ min: 1, max: 8 });
  venda.vendaitem = [];

  return new Venda(venda);
});
