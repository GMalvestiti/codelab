import { Test, TestingModule } from '@nestjs/testing';
import { HttpResponse } from '../../shared/classes/http-response';
import { EMensagem } from '../../shared/enums/mensagem.enum';
import { IFindAllFilter } from '../../shared/interfaces/find-all-filter.interface';
import { IFindAllOrder } from '../../shared/interfaces/find-all-order.interface';
import { VendaController } from './venda.controller';
import { VendaService } from './venda.service';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import { Venda } from './entities/venda.entity';

const mockCreateVendaDto: CreateVendaDto = {
  idPessoa: 1,
  idUsuarioLancamento: 1,
  valorTotal: 100.0,
  formaPagamento: 1,
  vendaitem: [
    {
      idProduto: 1,
      quantidade: 2,
      precoVenda: 50.0,
      valorTotal: 100.0,
    },
  ],
};

const mockUpdateVendaDto: UpdateVendaDto = Object.assign(mockCreateVendaDto, {
  id: 1,
});

const mockVenda: Venda = new Venda(mockUpdateVendaDto);

const mockFindAllOrder: IFindAllOrder = {
  column: 'id',
  sort: 'asc',
};

const mockFindAllFilter: IFindAllFilter = {
  column: 'id',
  value: 1,
};

describe('VendaController', () => {
  let controller: VendaController;
  let service: VendaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VendaController],
      providers: [
        {
          provide: VendaService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<VendaController>(VendaController);
    service = module.get<VendaService>(VendaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new venda', async () => {
      const spyServiceCreate = jest
        .spyOn(service, 'create')
        .mockReturnValue(Promise.resolve(mockVenda) as any);

      const response = await controller.create(mockCreateVendaDto);

      expect(response).toBeInstanceOf(HttpResponse);
      expect(response.message).toEqual(EMensagem.SALVO_SUCESSO);
      expect(response.data).toEqual(mockVenda);
      expect(spyServiceCreate).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return a list of vendas', async () => {
      const mockListaVendas: Venda[] = [mockVenda];

      const spyServiceFindAll = jest.spyOn(service, 'findAll').mockReturnValue(
        Promise.resolve({
          data: mockListaVendas,
          count: mockListaVendas.length,
        }) as any,
      );

      const response = await controller.findAll(
        0,
        10,
        mockFindAllOrder,
        mockFindAllFilter,
      );

      expect(response.data).toEqual(mockListaVendas);
      expect(response.count).toEqual(mockListaVendas.length);
      expect(spyServiceFindAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a venda', async () => {
      const spyServiceFindOne = jest
        .spyOn(service, 'findOne')
        .mockReturnValue(Promise.resolve(mockVenda) as any);

      const response = await controller.findOne(1);

      expect(spyServiceFindOne).toHaveBeenCalled();
      expect(response.data).toEqual(mockVenda);
    });
  });

  describe('update', () => {
    it('should update a venda', async () => {
      const spyServiceUpdate = jest
        .spyOn(service, 'update')
        .mockReturnValue(Promise.resolve(mockVenda) as any);

      const response = await controller.update(
        mockUpdateVendaDto.id,
        mockUpdateVendaDto,
      );

      expect(spyServiceUpdate).toHaveBeenCalled();
      expect(response.message).toEqual(EMensagem.ATUALIZADO_SUCESSO);
      expect(response.data).toEqual(mockVenda);
    });
  });

  describe('delete', () => {
    it('should delete a venda', async () => {
      const spyServiceDelete = jest
        .spyOn(service, 'delete')
        .mockReturnValue(Promise.resolve(true) as any);

      const response = await controller.delete(1);

      expect(spyServiceDelete).toHaveBeenCalled();
      expect(response.message).toEqual(EMensagem.DESATIVADO_SUCESSO);
      expect(response.data).toEqual(true);
    });
  });
});
