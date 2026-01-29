import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EMensagem } from '../../shared/enums/mensagem.enum';
import { IFindAllFilter } from '../../shared/interfaces/find-all-filter.interface';
import { IFindAllOrder } from '../../shared/interfaces/find-all-order.interface';
import { IUsuario } from '../../shared/interfaces/usuario.interface';
import { ExportPdfService } from '../../shared/services/export-pdf.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';
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

const mockUsuario: IUsuario = {
  id: 1,
  nome: 'Usuário Teste',
  email: 'usuario@gmail.com',
};

describe('ProdutoService', () => {
  let service: ProdutoService;
  let repository: Repository<Produto>;
  let grpcUsuarioService: ClientGrpc;
  let mailService: ClientProxy;
  let exportPdfService: ExportPdfService;

  beforeEach(async () => {
    grpcUsuarioService = {
      getService: jest.fn().mockReturnValue({
        FindOne: jest.fn(),
      }),
    } as unknown as ClientGrpc;

    mailService = {
      emit: jest.fn(),
    } as unknown as ClientProxy;

    exportPdfService = {
      export: jest.fn(),
    } as unknown as ExportPdfService;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutoService,
        {
          provide: getRepositoryToken(Produto),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            findAndCount: jest.fn(),
          },
        },
        {
          provide: 'GRPC_USUARIO',
          useValue: grpcUsuarioService,
        },
        {
          provide: 'MAIL_SERVICE',
          useValue: mailService,
        },
        {
          provide: ExportPdfService,
          useValue: exportPdfService,
        },
      ],
    }).compile();

    service = module.get<ProdutoService>(ProdutoService);

    repository = module.get<Repository<Produto>>(getRepositoryToken(Produto));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('create new produto', async () => {
      const spyRepositorySave = jest
        .spyOn(repository, 'save')
        .mockReturnValue(Promise.resolve(mockProduto) as any);

      const response = await service.create(mockCreateProdutoDto);

      expect(response).toEqual(mockProduto);
      expect(spyRepositorySave).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return a list of produto', async () => {
      const mockListaProduto = [mockProduto];

      const spyRepositoryFind = jest
        .spyOn(repository, 'findAndCount')
        .mockReturnValue(
          Promise.resolve([mockListaProduto, mockListaProduto.length]) as any,
        );

      const response = await service.findAll(
        0,
        10,
        mockFindAllOrder,
        mockFindAllFilter,
      );

      expect(response.data).toEqual(mockListaProduto);
      expect(response.count).toEqual(mockListaProduto.length);
      expect(spyRepositoryFind).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a produto', async () => {
      const spyRepositoryFindOne = jest
        .spyOn(repository, 'findOne')
        .mockReturnValue(Promise.resolve(mockProduto) as any);

      const response = await service.findOne(mockProduto.id);

      expect(response).toEqual(mockProduto);
      expect(spyRepositoryFindOne).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('update a produto', async () => {
      const spyRepositorySave = jest
        .spyOn(repository, 'save')
        .mockReturnValue(Promise.resolve(mockProduto) as any);

      const response = await service.update(
        mockUpdateProdutoDto.id,
        mockUpdateProdutoDto,
      );

      expect(response).toEqual(mockUpdateProdutoDto);
      expect(spyRepositorySave).toHaveBeenCalled();
    });

    it('should throw an error when ids are different', async () => {
      try {
        await service.update(2, mockUpdateProdutoDto);
      } catch (error: any) {
        expect(error.message).toBe(EMensagem.IDS_DIFERENTES);
      }
    });

    it('should throw an error when email is already in use', async () => {
      const mockProdutoFindOne = Object.assign(mockProduto, {
        id: 2,
        descricao: 'Produto de Teste',
        precoCusto: 10.5,
        precoVenda: 15.5,
        imagem: 'iVBORw0KGgoAAAANSUhEUgAAAAUA',
        ativo: true,
        codigoBarras: ['1234567890123'],
      });

      const spyRepositoryFindOne = jest
        .spyOn(repository, 'findOne')
        .mockReturnValue(Promise.resolve(mockProdutoFindOne) as any);

      try {
        await service.update(mockProduto.id, mockUpdateProdutoDto);
      } catch (error: any) {
        expect(error.message).toBe('Impossível alterar');
        expect(spyRepositoryFindOne).toHaveBeenCalled();
      }
    });
  });

  describe('unactivate', () => {
    it('unactivate a produto', async () => {
      const mockProdutoFindOne = Object.assign(mockProduto, {
        ativo: true,
      });

      const spyRepositoryFindOne = jest
        .spyOn(repository, 'findOne')
        .mockReturnValue(Promise.resolve(mockProdutoFindOne) as any);

      const spyRepositorySave = jest
        .spyOn(repository, 'save')
        .mockReturnValue(Promise.resolve(mockProdutoFindOne) as any);

      const response = await service.unactivate(mockProduto.id);

      expect(response).toEqual(false);
      expect(spyRepositoryFindOne).toHaveBeenCalled();
      expect(spyRepositorySave).toHaveBeenCalled();
    });

    it('should throw an error when produto is not found', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockReturnValue(Promise.resolve(null) as any);

      try {
        await service.unactivate(mockProduto.id);
      } catch (error: any) {
        expect(error.message).toBe(EMensagem.IMPOSSIVEL_DESATIVAR);
      }
    });
  });

  describe('exportPdf', () => {
    it('should export PDF and send email', async () => {
      jest
        .spyOn(service, 'getUsuarioFromGrpc')
        .mockReturnValue(Promise.resolve(mockUsuario));

      const mockListaProdutos = [mockProduto];
      jest
        .spyOn(repository, 'find')
        .mockReturnValue(Promise.resolve(mockListaProdutos));

      const mockFilePath = '/tmp/export';
      jest
        .spyOn(exportPdfService, 'export')
        .mockReturnValue(Promise.resolve(mockFilePath));

      jest
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        .spyOn(require('fs'), 'readFileSync')
        .mockReturnValue(Buffer.from('dummy base64 content'));

      const result = await service.exportPdf(
        1,
        mockFindAllOrder,
        mockFindAllFilter,
      );

      expect(result).toBe(true);
      expect(exportPdfService.export).toHaveBeenCalled();
      expect(mailService.emit).toHaveBeenCalled();
    });

    it('should throw an error when user is not found', async () => {
      const mockUsuarioNotFound = Object.assign(mockUsuario, { id: 0 });

      jest
        .spyOn(service, 'getUsuarioFromGrpc')
        .mockReturnValue(Promise.resolve(mockUsuarioNotFound));

      try {
        await service.exportPdf(1, mockFindAllOrder, mockFindAllFilter);
      } catch (error: any) {
        expect(error.message).toBe(EMensagem.ERRO_EXPORTAR_PDF);
      }
    });

    it('should throw an error when there is an error exporting PDF', async () => {
      jest
        .spyOn(service, 'getUsuarioFromGrpc')
        .mockReturnValue(Promise.resolve(mockUsuario));

      jest
        .spyOn(repository, 'find')
        .mockReturnValue(Promise.resolve([mockProduto]));

      jest
        .spyOn(exportPdfService, 'export')
        .mockRejectedValue(new Error('Export error'));

      try {
        await service.exportPdf(1, mockFindAllOrder, mockFindAllFilter);
      } catch (error: any) {
        expect(error.message).toBe(EMensagem.ERRO_EXPORTAR_PDF);
      }
    });
  });
});
