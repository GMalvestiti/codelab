import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ProdutoController } from '../src/core/produto/produto.controller';
import { ProdutoService } from '../src/core/produto/produto.service';
import { CreateProdutoDto } from '../src/core/produto/dto/create-produto.dto';
import { UpdateProdutoDto } from '../src/core/produto/dto/update-produto.dto';
import { Produto } from '../src/core/produto/entities/produto.entity';
import { IFindAllOrder } from '../src/shared/interfaces/find-all-order.interface';
import { IFindAllFilter } from '../src/shared/interfaces/find-all-filter.interface';
import { EMensagem } from '../src/shared/enums/mensagem.enum';

describe('ProdutoController (e2e)', () => {
  let controller: ProdutoController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: ProdutoService;

  const mockProdutoService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    unactivate: jest.fn(),
    exportPdf: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutoController],
      providers: [
        {
          provide: ProdutoService,
          useValue: mockProdutoService,
        },
      ],
    }).compile();

    controller = module.get<ProdutoController>(ProdutoController);
    service = module.get<ProdutoService>(ProdutoService);
  });

  it('should create a product', async () => {
    const createProdutoDto: CreateProdutoDto = {
      descricao: 'Sample Product',
      precoCusto: 100,
      precoVenda: 150,
      ativo: true,
      codigoBarras: ['1234567890123'],
      imagem: 'base64string',
    };

    const expectedResponse: Produto = { id: 1, ...createProdutoDto };
    mockProdutoService.create.mockResolvedValue(expectedResponse);

    await controller.create(createProdutoDto);
    expect(mockProdutoService.create).toHaveBeenCalledWith(createProdutoDto);
  });

  it('should find all products', async () => {
    const page = 0;
    const size = 10;
    const order: IFindAllOrder = { column: 'id', sort: 'asc' };
    const filter: IFindAllFilter = { column: 'ativo', value: true };

    const expectedResponse = { data: [], count: 0 };
    mockProdutoService.findAll.mockResolvedValue(expectedResponse);

    const result = await controller.findAll(page, size, order, filter);
    expect(result).toEqual(expectedResponse);
    expect(mockProdutoService.findAll).toHaveBeenCalledWith(
      page,
      size,
      order,
      filter,
    );
  });

  it('should find a product by id', async () => {
    const id = 1;
    const expectedResponse: Produto = {
      id,
      descricao: 'Sample Product',
      precoCusto: 100,
      precoVenda: 150,
      ativo: true,
      codigoBarras: ['1234567890123'],
      imagem: null,
    };
    mockProdutoService.findOne.mockResolvedValue(expectedResponse);

    const result = await controller.findOne(id);
    expect(result).toEqual({ data: expectedResponse });
    expect(mockProdutoService.findOne).toHaveBeenCalledWith(id);
  });

  it('should update a product', async () => {
    const id = 1;
    const updateProdutoDto: UpdateProdutoDto = {
      id,
      descricao: 'Updated Product',
      precoCusto: 110,
      precoVenda: 160,
      ativo: true,
      codigoBarras: ['1234567890123'],
      imagem: 'base64string',
    };
    const expectedResponse: Produto = new Produto(updateProdutoDto);
    mockProdutoService.update.mockResolvedValue(expectedResponse);

    const result = await controller.update(id, updateProdutoDto);
    expect(result).toEqual({
      data: expectedResponse,
      message: EMensagem.ATUALIZADO_SUCESSO,
    });
    expect(mockProdutoService.update).toHaveBeenCalledWith(
      id,
      updateProdutoDto,
    );
  });

  it('should deactivate a product', async () => {
    const id = 1;
    mockProdutoService.unactivate.mockResolvedValue(true);

    const result = await controller.unactivate(id);
    expect(result).toEqual({
      data: true,
      message: EMensagem.DESATIVADO_SUCESSO,
      count: undefined,
    });
    expect(mockProdutoService.unactivate).toHaveBeenCalledWith(id);
  });

  it('should export PDF successfully', async () => {
    const idUsuario = 1;
    const order: IFindAllOrder = { column: 'id', sort: 'asc' };
    const filter: IFindAllFilter = { column: 'ativo', value: true };
    mockProdutoService.exportPdf.mockResolvedValue(true);

    const result = await controller.exportPdf(idUsuario, order, filter);
    expect(result).toEqual({
      data: true,
      message: EMensagem.INICIADA_GERACAO_PDF,
    });
    expect(mockProdutoService.exportPdf).toHaveBeenCalledWith(
      idUsuario,
      order,
      filter,
    );
  });

  it('should throw error if product not found', async () => {
    const id = 1;
    mockProdutoService.findOne.mockRejectedValue(
      new HttpException('Product not found', HttpStatus.NOT_FOUND),
    );

    await expect(controller.findOne(id)).rejects.toThrow(HttpException);
  });
});
