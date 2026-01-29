import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { HttpResponse } from '../../shared/classes/http-response';
import { IFindAllFilter } from '../../shared/interfaces/find-all-filter.interface';
import { IFindAllOrder } from '../../shared/interfaces/find-all-order.interface';
import { IResponse } from '../../shared/interfaces/response.interface';
import { ParseFindAllFilterPipe } from '../../shared/pipes/parse-find-all-filter.pipe';
import { ParseFindAllOrderPipe } from '../../shared/pipes/parse-find-all-order.pipe';
import { VendaService } from './venda.service';
import { CreateVendaDto } from './dto/create-venda.dto';
import { Venda } from './entities/venda.entity';
import { UpdateVendaDto } from './dto/update-venda.dto';

@Controller('')
export class VendaController {
  private readonly logger = new Logger(VendaController.name);

  constructor(private readonly vendaService: VendaService) {}

  @Post()
  async create(
    @Body() createVendaDto: CreateVendaDto,
  ): Promise<IResponse<Venda>> {
    const data = await this.vendaService.create(createVendaDto);

    return new HttpResponse<Venda>(data).onCreated();
  }

  @Get(':page/:size/:order')
  async findAll(
    @Param('page') page: number,
    @Param('size') size: number,
    @Param('order', ParseFindAllOrderPipe) order: IFindAllOrder,
    @Query('filter', ParseFindAllFilterPipe)
    filter: IFindAllFilter | IFindAllFilter[],
  ): Promise<IResponse<Venda[]>> {
    const { data, count } = await this.vendaService.findAll(
      page,
      size,
      order,
      filter,
    );

    return new HttpResponse<Venda[]>(data, undefined, count);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<IResponse<Venda>> {
    const data = await this.vendaService.findOne(id);

    return new HttpResponse<Venda>(data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateVendaDto: UpdateVendaDto,
  ): Promise<IResponse<Venda>> {
    const data = await this.vendaService.update(id, updateVendaDto);

    return new HttpResponse<Venda>(data).onUpdate();
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<IResponse<boolean>> {
    const data = await this.vendaService.delete(id);

    return new HttpResponse<boolean>(data).onUnactivated();
  }
}
