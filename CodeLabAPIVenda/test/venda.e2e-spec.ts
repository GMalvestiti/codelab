import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { VendaController } from '../src/core/venda/venda.controller';
import { VendaService } from '../src/core/venda/venda.service';
import { CreateVendaDto } from '../src/core/venda/dto/create-venda.dto';
import { UpdateVendaDto } from '../src/core/venda/dto/update-venda.dto';
import { IResponse } from '../src/shared/interfaces/response.interface';
import { Venda } from '../src/core/venda/entities/venda.entity';
import { EMensagem } from '../src/shared/enums/mensagem.enum';
import { IFindAllOrder } from 'src/shared/interfaces/find-all-order.interface';
import { IFindAllFilter } from 'src/shared/interfaces/find-all-filter.interface';

describe('VendaController (e2e)', () => {
  let controller: VendaController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: VendaService;

  const mockVendaService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VendaController],
      providers: [
        {
          provide: VendaService,
          useValue: mockVendaService,
        },
      ],
    }).compile();

    controller = module.get<VendaController>(VendaController);
    service = module.get<VendaService>(VendaService);
  });

  it('should create a venda', async () => {
    const createVendaDto: CreateVendaDto = {
      idPessoa: 1,
      idUsuarioLancamento: 1,
      valorTotal: 100,
      formaPagamento: 1,
      vendaitem: [
        { idProduto: 1, quantidade: 2, precoVenda: 50, valorTotal: 100 },
      ],
    };

    const expectedResponse: IResponse<Venda> = {
      message: null,
      data: {
        id: 1,
        idPessoa: createVendaDto.idPessoa,
        idUsuarioLancamento: createVendaDto.idUsuarioLancamento,
        valorTotal: createVendaDto.valorTotal,
        formaPagamento: createVendaDto.formaPagamento,
        vendaitem: createVendaDto.vendaitem.map((item) => ({
          ...item,
          id: 1,
          idVenda: 1,
          venda: null,
        })),
        dataHora: undefined,
      },
      count: undefined,
    };
    mockVendaService.create.mockResolvedValue(expectedResponse.data);

    await controller.create(createVendaDto);
    expect(mockVendaService.create).toHaveBeenCalledWith(createVendaDto);
  });

  it('should find all vendas', async () => {
    const page = 0;
    const size = 10;
    const order: IFindAllOrder = { column: 'id', sort: 'asc' };
    const filter: IFindAllFilter = { column: 'id', value: 1 };

    const expectedResponse: IResponse<Venda[]> = {
      message: null,
      data: [],
      count: 0,
    };
    mockVendaService.findAll.mockResolvedValue(expectedResponse);

    controller.findAll(page, size, order, filter);
    expect(mockVendaService.findAll).toHaveBeenCalledWith(
      page,
      size,
      order,
      filter,
    );
  });

  it('should find a venda by id', async () => {
    const id = 1;
    const expectedResponse: IResponse<Venda> = {
      message: null,
      data: {
        id,
        idPessoa: 1,
        idUsuarioLancamento: 1,
        valorTotal: 100,
        formaPagamento: 1,
        dataHora: new Date(),
        vendaitem: [],
      },
      count: undefined,
    };
    mockVendaService.findOne.mockResolvedValue(expectedResponse.data);

    await controller.findOne(id);
    expect(mockVendaService.findOne).toHaveBeenCalledWith(id);
  });

  it('should update a venda', async () => {
    const id = 1;
    const updateVendaDto: UpdateVendaDto = {
      id,
      idPessoa: 1,
      idUsuarioLancamento: 1,
      valorTotal: 150,
      formaPagamento: 1,
      vendaitem: [
        { idProduto: 1, quantidade: 3, precoVenda: 50, valorTotal: 150 },
      ],
    };
    const expectedResponse: IResponse<Venda> = {
      message: null,
      data: {
        id,
        idPessoa: updateVendaDto.idPessoa!,
        idUsuarioLancamento: updateVendaDto.idUsuarioLancamento!,
        valorTotal: updateVendaDto.valorTotal!,
        formaPagamento: updateVendaDto.formaPagamento!,
        vendaitem: [],
        dataHora: new Date(),
      },
      count: undefined,
    };
    mockVendaService.update.mockResolvedValue(expectedResponse.data);

    await controller.update(id, updateVendaDto);
    expect(mockVendaService.update).toHaveBeenCalledWith(id, updateVendaDto);
  });

  it('should delete a venda', async () => {
    const id = 1;
    mockVendaService.delete.mockResolvedValue(true);

    const expectedResponse: IResponse<boolean> = {
      message: EMensagem.DESATIVADO_SUCESSO,
      data: true,
      count: undefined,
    };
    const result = await controller.delete(id);
    expect(result).toEqual(expectedResponse);
    expect(mockVendaService.delete).toHaveBeenCalledWith(id);
  });

  it('should throw an error if venda not found', async () => {
    const id = 1;
    mockVendaService.findOne.mockRejectedValue(
      new HttpException('Venda not found', HttpStatus.NOT_FOUND),
    );

    await expect(controller.findOne(id)).rejects.toThrow(HttpException);
  });
});
