import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Venda } from './venda.entity';
import { CreateVendaItemDto } from '../dto/create-venda-item.dto';
import { UpdateVendaItemDto } from '../dto/update-venda-item.dto';

@Entity('vendaitem')
export class VendaItem {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'pk_venda_item',
  })
  id: number;

  @Column({ nullable: false })
  idVenda: number;

  @Column({ nullable: false })
  idProduto: number;

  @Column({ type: 'numeric', precision: 13, scale: 2, nullable: false })
  quantidade: number;

  @Column({ type: 'numeric', precision: 13, scale: 2, nullable: false })
  precoVenda: number;

  @Column({ type: 'numeric', precision: 13, scale: 2, nullable: false })
  valorTotal: number;

  @ManyToOne(() => Venda, (venda) => venda.id)
  @JoinColumn({
    name: 'idVenda',
    foreignKeyConstraintName: 'fk_venda_item',
  })
  venda: Venda;

  constructor(createVendaItemDto: CreateVendaItemDto | UpdateVendaItemDto) {
    Object.assign(this, createVendaItemDto);
  }
}
