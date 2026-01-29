import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BaseCadastroComponent } from '../../../shared/classes/base-cadastro/base-cadastro.component';
import { BackActionComponent } from '../../../shared/components/action-bar/back-action/back-action.component';
import { SaveActionComponent } from '../../../shared/components/action-bar/save-action/save-action.component';
import { SaveAddActionComponent } from '../../../shared/components/action-bar/save-add-action/save-add-action.component';
import { FormFieldsListComponent } from '../../../shared/components/form-fields-list/form-fields-list.component';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { EFieldType } from '../../../shared/enums/field-type.enum';
import { IFormField } from '../../../shared/interfaces/form-field.interface';
import { RecebimentoService } from '../recebimento.service';
import { IContaReceber, IContaReceberBaixa } from '../recebimento.interface';
import { LoginService } from '../../../login/login.service';
import { ERegex } from '../../../shared/enums/regex.enum';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { getPaginatorIntl } from '../../../shared/helpers/paginator.intl.helper';
import { EmptyRowComponent } from '../../../shared/components/empty-row/empty-row.component';
import { FormatIdPipe } from '../../../shared/pipes/format-id.pipe';
import { FormatRealPipe } from '../../../shared/pipes/format-real.pipe';
import { MatButtonModule } from '@angular/material/button';
import { EMensagem } from '../../../shared/enums/mensagem.enum';
import { ESnackbarType } from '../../../shared/enums/snackbar-type.enum';

const actions = [
  BackActionComponent,
  SaveActionComponent,
  SaveAddActionComponent,
];
const pipes = [FormatIdPipe, FormatRealPipe];
const table = [
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  EmptyRowComponent,
];
const components = [MatButtonModule, MatCheckboxModule];

@Component({
  selector: 'cl-recebimento-cadastro',
  standalone: true,
  imports: [
    ...actions,
    ...table,
    ...pipes,
    ...components,
    CommonModule,
    PageLayoutComponent,
    FormsModule,
    FormFieldsListComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './recebimento-cadastro.component.html',
  styleUrl: './recebimento-cadastro.component.scss',
})
export class RecebimentoCadastroComponent
  extends BaseCadastroComponent<IContaReceber>
  implements AfterViewInit
{
  @ViewChild(MatPaginator) paginatorEl!: MatPaginator;

  protected displayedColumns: string[] = [
    'id',
    'idContaReceber',
    'idUsuarioBaixa',
    'valorPago',
    'dataHora',
  ];

  dataSource = new MatTableDataSource<IContaReceberBaixa>([]);
  sort: Sort = { active: 'id', direction: 'asc' };
  page: PageEvent = { pageIndex: 0, pageSize: 5, length: 0 };
  count: number = 0;

  protected loading = false;

  constructor(
    private readonly _recebimentoService: RecebimentoService,
    private readonly _loginService: LoginService,
    protected override readonly _injector: Injector,
  ) {
    super(_recebimentoService, _injector);
  }

  cadastroFormGroup = new FormGroup({
    id: new FormControl<number | null>({ value: null, disabled: true }),
    idPessoa: new FormControl<number | null>(null, [
      Validators.required,
      Validators.pattern(ERegex.INTEIRO_POSITIVO),
    ]),
    pessoa: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
    idUsuarioLancamento: new FormControl<number | null>(
      this._loginService.currentUser!.id,
      [Validators.required, Validators.pattern(ERegex.INTEIRO_POSITIVO)],
    ),
    valorTotal: new FormControl<number | null>(null, [
      Validators.required,
      Validators.pattern(ERegex.NUMERICO),
    ]),
    dataHora: new FormControl<Date | null>(null),
    pago: new FormControl<boolean>(false),
    baixa: new FormControl<IContaReceberBaixa[]>([]),
  });

  baixaFormGroup: FormGroup = new FormGroup({
    id: new FormControl<number | null>({ value: null, disabled: true }),
    idContaReceber: new FormControl<number | null>(null),
    idUsuarioBaixa: new FormControl<number | null>(
      this._loginService.currentUser!.id,
    ),
    valorPago: new FormControl<number | null>(null, [
      Validators.required,
      Validators.pattern(ERegex.NUMERICO),
    ]),
    dataHora: new FormControl<Date | null>(null),
  });

  cadastroFields: IFormField[] = [
    {
      type: EFieldType.INPUT,
      label: 'Código',
      formControlName: 'id',
      placeholder: '',
      class: 'grid-1',
    },
    {
      type: EFieldType.INPUT,
      label: 'Código de Pessoa',
      formControlName: 'idPessoa',
      placeholder: 'Ex.: 10',
      class: 'grid-2',
    },
    {
      type: EFieldType.INPUT,
      label: 'Nome de Pessoa',
      formControlName: 'pessoa',
      placeholder: 'Ex.: João',
      class: 'grid-2',
    },
    {
      type: EFieldType.INPUT,
      label: 'Valor Total',
      formControlName: 'valorTotal',
      placeholder: 'Ex.: 10.00',
      class: 'grid-2',
    },
    {
      type: EFieldType.CHECKBOX,
      label: 'Pago',
      formControlName: 'pago',
      placeholder: '',
      class: 'grid-1',
    },
  ];

  baixaFields: IFormField[] = [
    {
      type: EFieldType.INPUT,
      label: 'Código',
      formControlName: 'id',
      placeholder: '',
      class: 'grid-1',
    },
    {
      type: EFieldType.INPUT,
      label: 'Valor Pago',
      formControlName: 'valorPago',
      placeholder: 'Ex.: 10.00',
      class: 'grid-2',
    },
  ];

  override ngOnInit(): void {
    this.handleEdit();
    if (this.idEdit) {
      this.setIdContaReceber();
      this.loadBaixas();
    }
  }

  ngAfterViewInit(): void {
    if (this.idEdit) {
      this.paginatorEl._intl = getPaginatorIntl(this.paginatorEl._intl);
    }
  }

  search(): void {
    this.loading = true;

    this.dataSource.data = this.cadastroFormGroup.get('baixa')
      ?.value as IContaReceberBaixa[];

    const idColumn = this.sort.active;
    const direction = this.sort.direction === 'asc' ? 1 : -1;

    this.dataSource.data = this.dataSource.data.sort((a: any, b: any) => {
      const valueA = a[idColumn];
      const valueB = b[idColumn];

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return (valueA - valueB) * direction;
      } else {
        return valueA.toString().localeCompare(valueB.toString()) * direction;
      }
    });

    const start = this.page.pageIndex * this.page.pageSize;
    this.dataSource.data = this.dataSource.data.slice(
      start,
      start + this.page.pageSize,
    );

    this.paginatorEl.length = this.count;

    this.loading = false;
  }

  applySort(sort: Sort): void {
    this.sort = sort;
    this.search();
  }

  applyPage(page: PageEvent): void {
    this.page = page;
    this.search();
  }

  loadBaixas(): void {
    this._recebimentoService.findOneById(this.idEdit).subscribe((response) => {
      const baixas: IContaReceberBaixa[] = response.data
        .baixa as IContaReceberBaixa[];
      this.cadastroFormGroup.patchValue({ baixa: baixas });

      this.count = baixas.length;
      this.search();
    });
  }

  setIdContaReceber(): void {
    this.baixaFormGroup.patchValue({ idContaReceber: this.idEdit });
  }

  baixar(): void {
    this.baixaFormGroup.markAllAsTouched();

    if (!this.baixaFormGroup.valid) {
      this.openSnackBar({
        message: EMensagem.CAMPOS_NAO_PREENCHIDOS,
        buttonText: EMensagem.FECHAR,
        type: ESnackbarType.warning,
      });
      return;
    }

    this._recebimentoService
      .baixar(this.baixaFormGroup.value)
      .subscribe((response) => {
        this.openSnackBar({
          message: response.message,
          buttonText: EMensagem.FECHAR,
          type: ESnackbarType.success,
        });

        this.loadBaixas();
      });
  }
}
