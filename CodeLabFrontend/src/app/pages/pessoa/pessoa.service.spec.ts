import { TestBed } from '@angular/core/testing';
import { Injector } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PessoaService } from './pessoa.service';
import { BaseResourceService } from '../../shared/classes/base-resource/base-resource.service';

describe('PessoaService', () => {
  let service: PessoaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        Injector,
        PessoaService,
        { provide: BaseResourceService, useClass: PessoaService }
      ]
    });
    service = TestBed.inject(PessoaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
