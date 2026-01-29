import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Injector } from '@angular/core';
import { RecebimentoService } from './recebimento.service';
import { IContaReceberBaixa } from './recebimento.interface';
import { EAPIPath } from '../../shared/enums/api-info.enum';
import { IResponse } from '../../shared/interfaces/response.interface';

describe('RecebimentoService', () => {
  let service: RecebimentoService;
  let httpTestingController: HttpTestingController;
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RecebimentoService]
    });

    service = TestBed.inject(RecebimentoService);
    httpTestingController = TestBed.inject(HttpTestingController);
    injector = TestBed.inject(Injector);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('baixar', () => {
    it('should send a PUT request to the correct URL and return response', () => {
      const data: IContaReceberBaixa = {
        id: 1,
        idContaReceber: 1,
        idUsuarioBaixa: 1,
        valorPago: 100,
        dataHora: new Date()
      };
      const expectedResponse: IResponse<boolean> = {
        message: 'Baixa realizada com sucesso',
        data: true
      };

      service.baixar(data).subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });

      const req = httpTestingController.expectOne(`${service.apiUrl}/baixar`);
      expect(req.request.method).toEqual('PUT');
      req.flush(expectedResponse);
    });
  });
});
