import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Injector } from '@angular/core';
import { BaseResourceService } from './base-resource.service';
import { IResponse } from '../../interfaces/response.interface';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { environment } from '../../../../enviroments/enviroment';

class MockService extends BaseResourceService<any> {
  constructor(injector: Injector) {
    super(injector, 'test');
  }
}

describe('BaseResourceService', () => {
  let service: MockService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        Injector,
        {
          provide: HttpClient,
          useClass: HttpClient,
        },
      ],
    });

    const injector = TestBed.inject(Injector);
    service = new MockService(injector);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call findAll and return data', () => {
    const page: PageEvent = { pageIndex: 0, pageSize: 10, length: 100 } as PageEvent;
    const sort: Sort = { active: 'name', direction: 'asc' };
    const filter = { search: 'test' };
    const filterQuery = JSON.stringify([{ column: 'search', value: filter.search }]);
    const mockResponse: IResponse<any[]> = { message: 'Success', data: [], count: 100 };

    service.findAll(page, sort, filter).subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(response.message).toBe('Success');
      expect(response.count).toBe(100);
      expect(response.data).toEqual([]);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/test/0/10/${JSON.stringify({ column: 'name', sort: 'asc' })}?filter=${filterQuery}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });


  it('should call create and return created data', () => {
    const mockData = { name: 'test' };
    const mockResponse: IResponse<any> = { message: 'Created', data: mockData };

    service.create(mockData).subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(response.message).toBe('Created');
      expect(response.data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/test`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should call updateById and return updated data', () => {
    const id = 1;
    const mockData = { name: 'updated test' };
    const mockResponse: IResponse<any> = { message: 'Updated', data: mockData };

    service.updateById(id, mockData).subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(response.message).toBe('Updated');
      expect(response.data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/test/${id}`);
    expect(req.request.method).toBe('PATCH');
    req.flush(mockResponse);
  });

  it('should call findOneById and return data', () => {
    const id = 1;
    const mockResponse: IResponse<any> = { message: 'Found', data: { name: 'test' } };

    service.findOneById(id).subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(response.message).toBe('Found');
      expect(response.data).toEqual({ name: 'test' });
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/test/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
