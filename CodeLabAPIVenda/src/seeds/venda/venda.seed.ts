import { Factory, Seeder } from 'typeorm-seeding';
import { Venda } from '../../core/venda/entities/venda.entity';

export class VendaSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Venda)().createMany(10);
  }
}
