import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EMensagem } from '../../shared/enums/mensagem.enum';
import { handleFilter } from '../../shared/helpers/sql.helper';
import { IFindAllFilter } from '../../shared/interfaces/find-all-filter.interface';
import { IFindAllOrder } from '../../shared/interfaces/find-all-order.interface';
import { VendaItem } from './entities/venda-item.entity';
import { Venda } from './entities/venda.entity';
import { UpdateVendaDto } from './dto/update-venda.dto';
import { CreateVendaDto } from './dto/create-venda.dto';
import { IResponse } from '../../shared/interfaces/response.interface';

@Injectable()
export class VendaService {
  private readonly logger = new Logger(VendaService.name);

  @InjectRepository(Venda)
  private repository: Repository<Venda>;

  @InjectRepository(VendaItem)
  private repositoryVendaItem: Repository<VendaItem>;

  async create(createVendaDto: CreateVendaDto): Promise<Venda> {
    const created = this.repository.create(new Venda(createVendaDto));

    return await this.repository.save(created);
  }

  async findAll(
    page: number,
    size: number,
    order: IFindAllOrder,
    filter?: IFindAllFilter | IFindAllFilter[],
  ): Promise<IResponse<Venda[]>> {
    const where = handleFilter(filter);

    const [data, count] = await this.repository.findAndCount({
      loadEagerRelations: false,
      order: { [order.column]: order.sort },
      where,
      skip: size * page,
      take: size,
    });

    return { data, count, message: null };
  }

  async findOne(id: number): Promise<Venda> {
    return await this.repository.findOne({
      loadEagerRelations: true,
      where: { id: id },
    });
  }

  async update(id: number, updateVendaDto: UpdateVendaDto): Promise<Venda> {
    if (id !== updateVendaDto.id) {
      throw new HttpException(
        EMensagem.IDS_DIFERENTES,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const finded = await this.repository.findOne({
      select: ['id'],
      where: { id: updateVendaDto.id },
    });

    if (!finded) {
      throw new HttpException(
        EMensagem.IMPOSSIVEL_ALTERAR,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    await this.repositoryVendaItem.delete({ idVenda: id });

    for (const item in updateVendaDto.vendaitem) {
      Object.assign(updateVendaDto.vendaitem[item], { idVenda: id });
    }

    return await this.repository.save(updateVendaDto);
  }

  async delete(id: number): Promise<boolean> {
    const finded = await this.repository.findOne({
      where: { id: id },
    });

    if (!finded) {
      throw new HttpException(
        EMensagem.IMPOSSIVEL_EXCLUIR,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    return await this.repository
      .delete(id)
      .then((result) => result.affected === 1);
  }
}
