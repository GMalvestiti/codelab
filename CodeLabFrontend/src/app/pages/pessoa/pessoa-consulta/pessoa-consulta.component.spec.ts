import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PessoaConsultaComponent } from './pessoa-consulta.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BackActionComponent } from '../../../shared/components/action-bar/back-action/back-action.component';
import { AddActionComponent } from '../../../shared/components/action-bar/add-action/add-action.component';
import { EmptyRowComponent } from '../../../shared/components/empty-row/empty-row.component';
import { FormFieldsListComponent } from '../../../shared/components/form-fields-list/form-fields-list.component';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { BoolToTextPipe } from '../../../shared/pipes/bool-to-text.pipe';
import { FormatIdPipe } from '../../../shared/pipes/format-id.pipe';
import { PessoaService } from '../pessoa.service';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressLoadingComponent } from '../../../shared/components/progress-loading/progress-loading/progress-loading.component';

describe('PessoaConsultaComponent', () => {
  let component: PessoaConsultaComponent;
  let fixture: ComponentFixture<PessoaConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        BackActionComponent,
        AddActionComponent,
        EmptyRowComponent,
        FormFieldsListComponent,
        PageLayoutComponent,
        ProgressLoadingComponent,
        NoopAnimationsModule,
        BoolToTextPipe,
        FormatIdPipe,
      ],
      providers: [
        PessoaService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PessoaConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply sorting', () => {
    const event: Sort = { active: 'nome', direction: 'asc' };
    const applySortSpy = jest.spyOn(component, 'applySort');
    component.applySort(event);
    expect(applySortSpy).toHaveBeenCalledWith(event);
  });

  it('should apply pagination', () => {
    const event: PageEvent = { pageIndex: 1, pageSize: 10, length: 100 };
    const applyPageSpy = jest.spyOn(component, 'applyPage');
    component.applyPage(event);
    expect(applyPageSpy).toHaveBeenCalledWith(event);
  });
});
