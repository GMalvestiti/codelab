import { CommonModule } from '@angular/common';
import { Component, Injector } from '@angular/core';
import {
  FormArray,
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
import { menuPermissao } from '../../../shared/constants/menu-permissao';
import { EFieldType } from '../../../shared/enums/field-type.enum';
import { EMenuPermissao } from '../../../shared/enums/menu-permissao.enum';
import { IFormField } from '../../../shared/interfaces/form-field.interface';
import { IPermissao, IUsuario } from '../usuario.interface';
import { UsuarioService } from '../usuario.service';

const actions = [
  BackActionComponent,
  SaveActionComponent,
  SaveAddActionComponent,
];

@Component({
  selector: 'cl-usuario-cadastro',
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
  templateUrl: './usuario-cadastro.component.html',
  styleUrl: './usuario-cadastro.component.scss',
})
export class UsuarioCadastroComponent extends BaseCadastroComponent<IUsuario> {
  constructor(
    private readonly _usuarioService: UsuarioService,
    protected override readonly _injector: Injector,
  ) {
    super(_usuarioService, _injector);
  }

  cadastroFormGroup = new FormGroup({
    id: new FormControl({ value: null, disabled: true }),
    nome: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    admin: new FormControl(false),
    senha: new FormControl('temporario'),
    ativo: new FormControl(true),
    permissao: new FormArray(this.buildPermissaoFormArrayFromEnum()),
  });

  get permissaoFormArray(): FormArray {
    return this.cadastroFormGroup.get('permissao') as FormArray;
  }

  get permissaoFormArrayControls(): FormGroup[] {
    return this.permissaoFormArray.controls as FormGroup[];
  }

  get permissaoFormArrayValue(): IPermissao[] {
    return this.permissaoFormArray.getRawValue() as IPermissao[];
  }

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
      label: 'Email',
      formControlName: 'email',
      placeholder: 'Ex.: jose@gmail.com',
      class: 'grid-2',
    },
    {
      type: EFieldType.CHECKBOX,
      label: 'Admin',
      formControlName: 'admin',
      placeholder: '',
      class: 'grid-1',
    },
  ];

  override get cadastroFormValues(): IUsuario {
    const formValues = super.cadastroFormValues;
    const permissao = this.formatPermissaoForSave();

    return { ...formValues, permissao };
  }

  private buildPermissaoFormArrayFromEnum(): FormGroup[] {
    const permissoes = [];

    for (const menuPermissaoItem of menuPermissao) {
      const form = new FormGroup({
        id: new FormControl<number | null>(null),
        idUsuario: new FormControl<number | null>(null),
        modulo: new FormControl<EMenuPermissao>(menuPermissaoItem.modulo),
        label: new FormControl<string>(menuPermissaoItem.label),
        checked: new FormControl<boolean>(false),
      });

      permissoes.push(form);
    }

    return permissoes;
  }

  private formatPermissaoForSave() {
    return this.permissaoFormArrayValue.filter((item) => item.checked);
  }

  protected override buildPatchValuesFormEdit(payload: IUsuario): IUsuario {
    return {
      ...payload,
      permissao: payload.permissao.map((item) => ({ ...item, checked: true })),
    };
  }
}
