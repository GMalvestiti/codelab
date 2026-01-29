import { Test, TestingModule } from '@nestjs/testing';
import { EMensagem } from '../../shared/enums/mensagem.enum';
import { IFindAllFilter } from '../../shared/interfaces/find-all-filter.interface';
import { IFindAllOrder } from '../../shared/interfaces/find-all-order.interface';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produto.service';

const mockCreateProdutoDto: CreateProdutoDto = {
  descricao: 'Produto de Teste',
  precoCusto: 10.5,
  precoVenda: 15.5,
  imagem: 'iVBORw0KGgoAAAANSUhEUgAAAAUA',
  ativo: true,
  codigoBarras: ['1234567890123'],
};

const mockUpdateProdutoDto: UpdateProdutoDto = Object.assign(
  mockCreateProdutoDto,
  { id: 1 },
);

const mockProduto: Produto = Object.assign(mockCreateProdutoDto, { id: 1 });

const mockFindAllOrder: IFindAllOrder = {
  column: 'id',
  sort: 'asc',
};

const mockFindAllFilter: IFindAllFilter = {
  column: 'id',
  value: 1,
};

describe('ProdutoController', () => {
  let controller: ProdutoController;
  let service: ProdutoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutoController],
      providers: [
        {
          provide: ProdutoService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            unactivate: jest.fn(),
            exportPdf: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProdutoController>(ProdutoController);
    service = module.get<ProdutoService>(ProdutoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('create new produto', async () => {
      const spyServiceCreate = jest
        .spyOn(service, 'create')
        .mockReturnValue(Promise.resolve(mockProduto) as any);

      const response = await controller.create(mockCreateProdutoDto);

      expect(response.message).toEqual(EMensagem.SALVO_SUCESSO);
      expect(response.data).toEqual(mockProduto);
      expect(spyServiceCreate).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return a list of produto', async () => {
      const mockListaProduto: Produto[] = [mockProduto];

      const spyServiceFindAll = jest.spyOn(service, 'findAll').mockReturnValue(
        Promise.resolve({
          data: mockListaProduto,
          count: mockListaProduto.length,
        }) as any,
      );

      const response = await controller.findAll(
        0,
        10,
        mockFindAllOrder,
        mockFindAllFilter,
      );

      expect(response.data).toEqual(mockListaProduto);
      expect(response.count).toEqual(mockListaProduto.length);
      expect(spyServiceFindAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return Produto', async () => {
      const spyServiceFindOne = jest
        .spyOn(service, 'findOne')
        .mockReturnValue(Promise.resolve(mockProduto) as any);

      const response = await controller.findOne(1);

      expect(spyServiceFindOne).toHaveBeenCalled();
      expect(response.message).toEqual(undefined);
      expect(response.data).toEqual(mockProduto);
    });
  });

  describe('update', () => {
    it('should update Produto', async () => {
      const spyServiceUpdate = jest
        .spyOn(service, 'update')
        .mockReturnValue(Promise.resolve(mockProduto) as any);

      const response = await controller.update(
        mockUpdateProdutoDto.id,
        mockUpdateProdutoDto,
      );

      expect(spyServiceUpdate).toHaveBeenCalled();
      expect(response.message).toEqual(EMensagem.ATUALIZADO_SUCESSO);
      expect(response.data).toEqual(mockProduto);
    });
  });

  describe('delete', () => {
    it('should delete Produto', async () => {
      const spyServiceUnactivate = jest
        .spyOn(service, 'unactivate')
        .mockReturnValue(Promise.resolve(true) as any);

      const response = await controller.unactivate(mockUpdateProdutoDto.id);

      expect(spyServiceUnactivate).toHaveBeenCalled();
      expect(response.message).toEqual(EMensagem.DESATIVADO_SUCESSO);
      expect(response.data).toEqual(true);
    });
  });

  describe('exportPdf', () => {
    it('should export pdf', async () => {
      const spyServiceExportPdf = jest
        .spyOn(service, 'exportPdf')
        .mockReturnValue(Promise.resolve(true) as any);

      const response = await controller.exportPdf(
        1,
        mockFindAllOrder,
        mockFindAllFilter,
      );

      expect(spyServiceExportPdf).toHaveBeenCalled();
      expect(response.message).toEqual(EMensagem.INICIADA_GERACAO_PDF);
      expect(response.data).toEqual(true);
    });
  });
});
