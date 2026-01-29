import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Injector } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { BaseConsultaComponent } from './base-consulta.component';
import { BaseResourceService } from '../base-resource/base-resource.service';
import { of } from 'rxjs';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { By } from '@angular/platform-browser';

class MockResourceService {
  findAll() {
    return of({ data: [{ id: 1, name: 'Test' }], count: 1 });
  }
}

@Component({
  template: `
    <mat-paginator
      [length]="length"
      [pageSize]="pageSize"
      [pageIndex]="pageIndex"
      (page)="applyPage($event)">
    </mat-paginator>
    <table mat-table [dataSource]="dataSource">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef> ID </th>
        <td mat-cell *matCellDef="let element"> {{element.id}} </td>
      </ng-container>
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef> Name </th>
        <td mat-cell *matCellDef="let element"> {{element.name}} </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  `
})
class TestComponent extends BaseConsultaComponent<any> {
  displayedColumns = ['id', 'name'];
  length = 0;
  pageSize = 5;
  pageIndex = 0;
  filterFormGroup: FormGroup;
  filterFields = [];

  constructor(service: BaseResourceService<any>, injector: Injector) {
    super(service, injector);
    this.filterFormGroup = new FormBuilder().group({
      search: [''],
    });
  }
}


describe('BaseConsultaComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let paginatorEl: MatPaginator;
  let mockService: MockResourceService;

  beforeEach(() => {
    mockService = new MockResourceService();

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatPaginatorModule],
      declarations: [TestComponent],
      providers: [
        { provide: BaseResourceService, useValue: mockService },
        {
          provide: Router,
          useValue: { navigate: jest.fn() },
        },
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    paginatorEl = fixture.debugElement.query(By.directive(MatPaginator)).componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call search on ngOnInit', () => {
    const searchSpy = jest.spyOn(component, 'search');
    component.ngOnInit();
    expect(searchSpy).toHaveBeenCalled();
  });

  it('should update dataSource and paginator length on search', () => {
    const mockResponse = { data: [{ id: 1, name: 'Test' }], count: 1 };
    jest.spyOn(mockService, 'findAll').mockReturnValue(of(mockResponse));

    component.search();

    expect(component.dataSource.data).toEqual(mockResponse.data);
  });

  it('should apply sorting and call search', () => {
    const sort: Sort = { active: 'name', direction: 'asc' };
    const searchSpy = jest.spyOn(component, 'search');
    component.applySort(sort);
    expect(component.sort).toEqual(sort);
    expect(searchSpy).toHaveBeenCalled();
  });

  it('should apply pagination and call search', () => {
    const page: PageEvent = { pageIndex: 1, pageSize: 5, length: 10 };
    const searchSpy = jest.spyOn(component, 'search');
    component.applyPage(page);
    expect(component.page).toEqual(page);
    expect(searchSpy).toHaveBeenCalled();
  });

  it('should navigate to edit route', () => {
    const id = 1;
    const router = TestBed.inject(Router);
    component.editar(id);
    expect(router.navigate).toHaveBeenCalledWith([`../editar/${id}`], { relativeTo: component['_route'] });
  });
});
