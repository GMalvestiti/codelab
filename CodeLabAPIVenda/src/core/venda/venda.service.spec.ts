import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EMensagem } from '../../shared/enums/mensagem.enum';
import { IFindAllFilter } from '../../shared/interfaces/find-all-filter.interface';
import { IFindAllOrder } from '../../shared/interfaces/find-all-order.interface';
import { VendaItem } from './entities/venda-item.entity';
import { Venda } from './entities/venda.entity';
import { VendaService } from './venda.service';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';

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

describe('VendaService', () => {
  let service: VendaService;
  let repository: Repository<Venda>;
  let repositoryVendaItem: Repository<VendaItem>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VendaService,
        {
          provide: getRepositoryToken(Venda),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            findAndCount: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(VendaItem),
          useValue: {
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<VendaService>(VendaService);
    repository = module.get<Repository<Venda>>(getRepositoryToken(Venda));
    repositoryVendaItem = module.get<Repository<VendaItem>>(
      getRepositoryToken(VendaItem),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new venda', async () => {
      jest.spyOn(repository, 'save').mockResolvedValue(mockVenda);
      const response = await service.create(mockCreateVendaDto);
      expect(response).toEqual(mockVenda);
    });
  });

  describe('findAll', () => {
    it('should return a list of vendas', async () => {
      const mockListaVendas = [mockVenda];
      jest
        .spyOn(repository, 'findAndCount')
        .mockResolvedValue([mockListaVendas, mockListaVendas.length]);

      const response = await service.findAll(
        0,
        10,
        mockFindAllOrder,
        mockFindAllFilter,
      );

      expect(response.data).toEqual(mockListaVendas);
      expect(response.count).toEqual(mockListaVendas.length);
    });
  });

  describe('findOne', () => {
    it('should return a venda', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockVenda);
      const response = await service.findOne(mockVenda.id);
      expect(response).toEqual(mockVenda);
    });
  });

  describe('update', () => {
    it('should update a venda', async () => {
      jest.spyOn(repository, 'save').mockResolvedValue(mockVenda);
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockVenda);
      const response = await service.update(
        mockUpdateVendaDto.id,
        mockUpdateVendaDto,
      );
      expect(response).toEqual(mockVenda);
    });

    it('should throw an error when ids are different', async () => {
      await expect(service.update(2, mockUpdateVendaDto)).rejects.toThrow(
        new HttpException(EMensagem.IDS_DIFERENTES, HttpStatus.NOT_ACCEPTABLE),
      );
    });

    it('should delete venda items before updating', async () => {
      jest.spyOn(repositoryVendaItem, 'delete').mockResolvedValue(null);
      jest.spyOn(repository, 'save').mockResolvedValue(mockVenda);
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockVenda);

      const response = await service.update(
        mockUpdateVendaDto.id,
        mockUpdateVendaDto,
      );

      expect(repositoryVendaItem.delete).toHaveBeenCalledWith({
        idVenda: mockUpdateVendaDto.id,
      });
      expect(response).toEqual(mockVenda);
    });

    it('should throw an error when venda is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.update(mockUpdateVendaDto.id, mockUpdateVendaDto),
      ).rejects.toThrow(
        new HttpException(
          EMensagem.IMPOSSIVEL_ALTERAR,
          HttpStatus.NOT_ACCEPTABLE,
        ),
      );
    });
  });

  describe('delete', () => {
    it('should delete a venda', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockVenda);
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 1 } as any);

      const result = await service.delete(mockVenda.id);
      expect(result).toBe(true);
    });

    it('should throw an error when venda is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.delete(mockVenda.id)).rejects.toThrow(
        new HttpException(
          EMensagem.IMPOSSIVEL_EXCLUIR,
          HttpStatus.NOT_ACCEPTABLE,
        ),
      );
    });
  });
});
