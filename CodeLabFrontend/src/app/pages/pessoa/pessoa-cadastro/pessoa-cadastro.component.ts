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
import { PessoaService } from '../pessoa.service';
import { IPessoa } from '../pessoa.interface';
import { ERegex } from '../../../shared/enums/regex.enum';

const actions = [
  BackActionComponent,
  SaveActionComponent,
  SaveAddActionComponent,
];

@Component({
  selector: 'cl-pessoa-cadastro',
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
  templateUrl: './pessoa-cadastro.component.html',
  styleUrl: './pessoa-cadastro.component.scss',
})
export class PessoaCadastroComponent extends BaseCadastroComponent<IPessoa> {
  constructor(
    private readonly _pessoaService: PessoaService,
    protected override readonly _injector: Injector,
  ) {
    super(_pessoaService, _injector);
  }

  cadastroFormGroup = new FormGroup({
    id: new FormControl({ value: null, disabled: true }),
    nome: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
    documento: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(14),
    ]),
    cep: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(10)]),
    endereco: new FormControl<string | null>(null, [Validators.required]),
    telefone: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern(ERegex.TELEFONE),
    ]),
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
      label: 'Nome',
      formControlName: 'nome',
      placeholder: 'Ex.: José',
      class: 'grid-2',
    },
    {
      type: EFieldType.INPUT,
      label: 'Documento',
      formControlName: 'documento',
      placeholder: 'Ex.: 123.456.789-00',
      class: 'grid-2',
    },
    {
      type: EFieldType.INPUT,
      label: 'CEP',
      formControlName: 'cep',
      placeholder: 'Ex.: 12345-678',
      class: 'grid-1',
    },
    {
      type: EFieldType.INPUT,
      label: 'Endereço',
      formControlName: 'endereco',
      placeholder: 'Ex.: Rua João Oliveira, 123',
      class: 'grid-2',
    },
    {
      type: EFieldType.INPUT,
      label: 'Telefone',
      formControlName: 'telefone',
      placeholder: 'Ex.: 199 18521516',
      class: 'grid-2',
    },
  ];
}
