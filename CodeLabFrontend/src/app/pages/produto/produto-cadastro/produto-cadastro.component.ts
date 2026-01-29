import { CommonModule } from '@angular/common';
import { Component, Injector } from '@angular/core';
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
import { IProduto } from '../produto.interface';
import { ProdutoService } from '../produto.service';
import { ERegex } from '../../../shared/enums/regex.enum';

const actions = [
  BackActionComponent,
  SaveActionComponent,
  SaveAddActionComponent,
];

@Component({
  selector: 'cl-produto-cadastro',
  standalone: true,
  imports: [
    ...actions,
    CommonModule,
    PageLayoutComponent,
    FormsModule,
    FormFieldsListComponent,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  templateUrl: './produto-cadastro.component.html',
  styleUrl: './produto-cadastro.component.scss',
})
export class ProdutoCadastroComponent extends BaseCadastroComponent<IProduto> {
  constructor(
    private readonly _produtoService: ProdutoService,
    protected override readonly _injector: Injector,
  ) {
    super(_produtoService, _injector);
  }

  displayedColumns: string[] = [
    'id',
    'descricao',
    'precoCusto',
    'precoVenda',
    'codigoBarras',
    'acoes',
  ];

  cadastroFormGroup = new FormGroup({
    id: new FormControl({ value: null, disabled: true }),
    descricao: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
    precoCusto: new FormControl(null, [
      Validators.required,
      Validators.pattern(ERegex.NUMERICO),
    ]),
    precoVenda: new FormControl(null, [
      Validators.required,
      Validators.pattern(ERegex.NUMERICO),
    ]),
    codigoBarras: new FormControl(null, [
      Validators.required,
      Validators.pattern(ERegex.CODIGO_BARRAS),
    ]),
    imagem: new FormControl(null),
    ativo: new FormControl(true),
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
      label: 'Descrição',
      formControlName: 'descricao',
      placeholder: 'Ex.: Arroz',
      class: 'grid-2',
    },
    {
      type: EFieldType.INPUT,
      label: 'Preço de Custo',
      formControlName: 'precoCusto',
      placeholder: 'Ex.: 10.00',
      class: 'grid-2',
    },
    {
      type: EFieldType.INPUT,
      label: 'Preço de Venda',
      formControlName: 'precoVenda',
      placeholder: 'Ex.: 10.00',
      class: 'grid-2',
    },
    {
      type: EFieldType.INPUT,
      label: 'Código de Barras',
      formControlName: 'codigoBarras',
      placeholder: 'Ex.: 1234567890123',
      class: 'grid-2',
    },
  ];

  override get cadastroFormValuesForSave() {
    return {
      ...this.cadastroFormGroup.getRawValue(),
      codigoBarras: [this.cadastroFormValues.codigoBarras.toString()],
    } as unknown as IProduto;
  }
}
