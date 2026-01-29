import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VendaItem } from './venda-item.entity';
import { CreateVendaDto } from '../dto/create-venda.dto';
import { UpdateVendaDto } from '../dto/update-venda.dto';

@Entity('venda')
export class Venda {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'pk_venda' })
  id: number;

  @Column({ nullable: false })
  idPessoa: number;

  @Column({ nullable: false })
  idUsuarioLancamento: number;

  @Column({ type: 'numeric', precision: 13, scale: 2, nullable: false })
  valorTotal: number;

  @CreateDateColumn()
  dataHora: Date;

  @Column({ nullable: false })
  formaPagamento: number;

  @OneToMany(() => VendaItem, (vendaitem) => vendaitem.venda, {
    eager: true,
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
    orphanedRowAction: 'delete',
  })
  vendaitem: VendaItem[];

  constructor(createVendaDto: CreateVendaDto | UpdateVendaDto) {
    Object.assign(this, createVendaDto);
  }
}
