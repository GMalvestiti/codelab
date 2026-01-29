import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Injector, ViewChild } from '@angular/core';
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
import {
  IFormField,
  ILabelValue,
} from '../../../shared/interfaces/form-field.interface';
import { VendaService } from '../venda.service';
import { IVenda, IVendaItem } from '../venda.interface';
import {
  EFormaPagamento,
  EFormaPagamentoDescricao,
} from '../../../shared/enums/forma-pagamento.enum';
import { LoginService } from '../../../login/login.service';
import { ERegex } from '../../../shared/enums/regex.enum';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { FormatIdPipe } from '../../../shared/pipes/format-id.pipe';
import { FormatRealPipe } from '../../../shared/pipes/format-real.pipe';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { EmptyRowComponent } from '../../../shared/components/empty-row/empty-row.component';
import { MatButtonModule } from '@angular/material/button';
import { getPaginatorIntl } from '../../../shared/helpers/paginator.intl.helper';
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
const components = [MatButtonModule];

@Component({
  selector: 'cl-template-cadastro',
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
    MatCheckboxModule,
  ],
  templateUrl: './venda-cadastro.component.html',
  styleUrl: './venda-cadastro.component.scss',
})
export class VendaCadastroComponent
  extends BaseCadastroComponent<IVenda>
  implements AfterViewInit
{
  @ViewChild(MatPaginator) paginatorEl!: MatPaginator;

  protected displayedColumns: string[] = [
    'id',
    'idProduto',
    'quantidade',
    'precoVenda',
    'valorTotal',
  ];

  dataSource = new MatTableDataSource<IVendaItem>([]);
  sort: Sort = { active: 'id', direction: 'asc' };
  page: PageEvent = { pageIndex: 0, pageSize: 5, length: 0 };
  count: number = 0;

  protected loading = false;

  constructor(
    private readonly _vendaService: VendaService,
    private readonly _loginService: LoginService,
    protected override readonly _injector: Injector,
  ) {
    super(_vendaService, _injector);
  }

  cadastroFormGroup = new FormGroup({
    id: new FormControl<number | null>({ value: null, disabled: true }),
    idPessoa: new FormControl<number | null>(null, [
      Validators.required,
      Validators.pattern(ERegex.INTEIRO_POSITIVO),
    ]),
    idUsuarioLancamento: new FormControl<number | null>(
      this._loginService.currentUser!.id,
      [Validators.required, Validators.pattern(ERegex.INTEIRO_POSITIVO)],
    ),
    valorTotal: new FormControl<number | null>(null, [
      Validators.required,
      Validators.pattern(ERegex.NUMERICO),
    ]),
    formaPagamento: new FormControl<number | null>(EFormaPagamento.DINHEIRO, [
      Validators.required,
      Validators.pattern(ERegex.INTEIRO_POSITIVO),
    ]),
    dataHora: new FormControl<Date | null>(null),
    vendaitem: new FormControl<IVendaItem[]>([]),
  });

  vendaItemFormGroup: FormGroup = new FormGroup({
    id: new FormControl<number | null>({ value: null, disabled: true }),
    idVenda: new FormControl<number | null>(null),
    idProduto: new FormControl<number | null>(null, [
      Validators.required,
      Validators.pattern(ERegex.INTEIRO_POSITIVO),
    ]),
    quantidade: new FormControl<number | null>(null, [
      Validators.required,
      Validators.pattern(ERegex.NUMERICO),
    ]),
    precoVenda: new FormControl<number | null>(null, [
      Validators.required,
      Validators.pattern(ERegex.NUMERICO),
    ]),
    valorTotal: new FormControl<number | null>(0, [
      Validators.required,
      Validators.pattern(ERegex.NUMERICO),
    ]),
  });

  formaPagamentoOptions: ILabelValue[] = [
    {
      label: EFormaPagamentoDescricao.DINHEIRO,
      value: EFormaPagamento.DINHEIRO,
    },
    {
      label: EFormaPagamentoDescricao.CARTAO_DEBITO,
      value: EFormaPagamento.CARTAO_DEBITO,
    },
    {
      label: EFormaPagamentoDescricao.CARTAO_CREDITO,
      value: EFormaPagamento.CARTAO_CREDITO,
    },
    {
      label: EFormaPagamentoDescricao.PIX,
      value: EFormaPagamento.PIX,
    },
    {
      label: EFormaPagamentoDescricao.BOLETO,
      value: EFormaPagamento.BOLETO,
    },
    {
      label: EFormaPagamentoDescricao.CHEQUE,
      value: EFormaPagamento.CHEQUE,
    },
    {
      label: EFormaPagamentoDescricao.TRANSFERENCIA,
      value: EFormaPagamento.TRANSFERENCIA,
    },
    {
      label: EFormaPagamentoDescricao.OUTROS,
      value: EFormaPagamento.OUTROS,
    },
  ];

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
      label: 'Pessoa',
      formControlName: 'idPessoa',
      placeholder: 'Ex.: 10',
      class: 'grid-1',
    },
    {
      type: EFieldType.INPUT,
      label: 'Valor Total',
      formControlName: 'valorTotal',
      placeholder: 'Ex.: 10.00',
      class: 'grid-2',
    },
    {
      type: EFieldType.SELECT,
      label: 'Forma de Pagamento',
      formControlName: 'formaPagamento',
      placeholder: 'Ex.: Dinheiro',
      class: 'grid-2',
      options: Promise.resolve(this.formaPagamentoOptions),
    },
  ];

  vendaItemFields: IFormField[] = [
    {
      type: EFieldType.INPUT,
      label: 'Código',
      formControlName: 'id',
      placeholder: '',
      class: 'grid-1',
    },
    {
      type: EFieldType.INPUT,
      label: 'Código de Produto',
      formControlName: 'idProduto',
      placeholder: 'Ex.: 10',
      class: 'grid-2',
    },
    {
      type: EFieldType.INPUT,
      label: 'Quantidade',
      formControlName: 'quantidade',
      placeholder: 'Ex.: 10',
      class: 'grid-2',
    },
    {
      type: EFieldType.INPUT,
      label: 'Preço de Venda',
      formControlName: 'precoVenda',
      placeholder: 'Ex.: 10.00',
      class: 'grid-2',
    },
  ];

  override ngOnInit(): void {
    this.handleEdit();
    this.setIdVenda();
    this.loadVendaItem();
  }

  ngAfterViewInit(): void {
    this.paginatorEl._intl = getPaginatorIntl(this.paginatorEl._intl);
  }

  search(): void {
    this.loading = true;

    this.dataSource.data = this.cadastroFormGroup.get('vendaitem')
      ?.value as IVendaItem[];

    const idColumn = this.sort.active;
    const direction = this.sort.direction === 'asc' ? 1 : -1;

    this.dataSource.data = this.dataSource.data.sort((a: any, b: any) => {
      const valueA = a[idColumn];
      const valueB = b[idColumn];

      if (valueA == null && valueB != null) {
        return -1 * direction;
      }
      if (valueA != null && valueB == null) {
        return 1 * direction;
      }
      if (valueA == null && valueB == null) {
        return 0;
      }

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

  loadVendaItem(): void {
    if (!this.idEdit) {
      return;
    }

    this._vendaService.findOneById(this.idEdit).subscribe((response) => {
      const itens: IVendaItem[] = response.data.vendaitem as IVendaItem[];
      this.cadastroFormGroup.patchValue({ vendaitem: itens });

      this.count = itens.length;
      this.search();
    });
  }

  setIdVenda(): void {
    if (this.idEdit) {
      this.vendaItemFormGroup.patchValue({ idVenda: this.idEdit });
    }
  }

  private calcularValorTotal(): void {
    const quantidade = this.vendaItemFormGroup.get('quantidade')?.value;
    const precoVenda = this.vendaItemFormGroup.get('precoVenda')?.value;

    if (quantidade && precoVenda) {
      this.vendaItemFormGroup.patchValue({
        valorTotal: quantidade * precoVenda,
      });
    }
  }

  adicionarItem(): void {
    this.vendaItemFormGroup.markAllAsTouched();

    if (!this.vendaItemFormGroup.valid) {
      this.openSnackBar({
        message: EMensagem.CAMPOS_NAO_PREENCHIDOS,
        buttonText: EMensagem.FECHAR,
        type: ESnackbarType.warning,
      });
      return;
    }

    this.calcularValorTotal();

    const vendaItem: IVendaItem = this.vendaItemFormGroup.value as IVendaItem;

    if (this.cadastroFormGroup.value.vendaitem == null) {
      this.cadastroFormGroup.patchValue({ vendaitem: [vendaItem] });
    } else {
      this.cadastroFormGroup.patchValue({
        vendaitem: [...this.cadastroFormGroup.value.vendaitem, vendaItem],
      });
    }

    this.count++;
    this.search();
  }

  protected override shouldSave(): boolean {
    if (this.cadastroFormValues.vendaitem.length === 0) {
      this.openSnackBar({
        message: EMensagem.ADICIONAR_VENDA_ITEM,
        buttonText: EMensagem.FECHAR,
        type: ESnackbarType.warning,
      });
      return false;
    }
    return true;
  }

  /*override get cadastroFormValuesForSave() {
    let venda: IVenda = this.cadastroFormGroup.getRawValue() as IVenda;
    let vendaItem: IVendaItem[] = venda.vendaitem as IVendaItem[];

    vendaItem = vendaItem.map((item) => {
      const idVenda = (item.idVenda) ? Number(item.idVenda) : item.idVenda;

      return {
        ...item,
        idVenda,
        idProduto: Number(item.idProduto),
        quantidade: Number(item.quantidade),
        precoVenda: Number(item.precoVenda),
        valorTotal: Number(item.valorTotal),
      };
    });

    return {
      ...venda,
      idPessoa: Number(venda.idPessoa),
      idUsuarioLancamento: Number(venda.idUsuarioLancamento),
      valorTotal: Number(venda.valorTotal),
      formaPagamento: Number(venda.formaPagamento),
      vendaitem: vendaItem,
    };
  }*/
}
