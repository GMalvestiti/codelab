import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { FormFieldComponent } from '../shared/components/form-field/form-field.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IFormField } from '../shared/interfaces/form-field.interface';
import { EFieldType } from '../shared/enums/field-type.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISnackBarData } from '../shared/interfaces/snackbar-data.interface';
import { SnackbarComponent } from '../shared/components/snackbar/snackbar.component';
import { EMensagem } from '../shared/enums/mensagem.enum';
import { ESnackbarType } from '../shared/enums/snackbar-type.enum';
import { RecuperacaoSenhaService } from './recuperacao-senha.service';
import { IRecuperacaoSenha } from './recuperacao-senha.interface';

const components = [
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatSlideToggleModule,
  FormFieldComponent,
];

@Component({
  selector: 'cl-recuperacao-senha',
  standalone: true,
  imports: [...components],
  templateUrl: './recuperacao-senha.component.html',
  styleUrl: './recuperacao-senha.component.scss',
})
export class RecuperacaoSenhaComponent implements OnInit {
  protected email: string = '';
  protected token: string = '';

  constructor(
    protected readonly _router: Router,
    protected readonly _activatedRoute: ActivatedRoute,
    protected readonly _snackBar: MatSnackBar,
    protected readonly _recuperacaoSenhaService: RecuperacaoSenhaService,
  ) {}

  recuperarSenhaForm = new FormGroup({
    email: new FormControl<string | null>(this.email, [
      Validators.required,
      Validators.email,
    ]),
    senha: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
    token: new FormControl<string | null>(this.token, [Validators.required]),
  });

  senhaInput: IFormField = {
    type: EFieldType.INPUT,
    label: 'Nova Senha',
    formControlName: 'senha',
    placeholder: '******',
    class: '',
    password: true,
  };

  ngOnInit(): void {
    this.carregarParametros();
  }

  carregarParametros(): void {
    this._activatedRoute.queryParams.subscribe((params) => {
      this.email = params['email'];
      this.token = params['token'];

      this.recuperarSenhaForm.patchValue({
        email: this.email,
        token: this.token,
      });
    });
  }

  recuperarSenha($event: Event): void {
    $event.preventDefault();

    this.recuperarSenhaForm.markAllAsTouched();

    if (!this.recuperarSenhaForm.valid) {
      this.openSnackBar({
        message: EMensagem.CAMPOS_NAO_PREENCHIDOS,
        buttonText: EMensagem.FECHAR,
        type: ESnackbarType.warning,
      });
      return;
    }

    const data: IRecuperacaoSenha =
      this.recuperarSenhaForm.getRawValue() as IRecuperacaoSenha;

    if (!data.email || !data.token) {
      this.openSnackBar({
        message: EMensagem.ALGO_DEU_ERRADO,
        buttonText: EMensagem.FECHAR,
        type: ESnackbarType.warning,
      });
      return;
    }

    this._recuperacaoSenhaService.recuperarSenha(data).subscribe((response) => {
      if (response?.data) {
        this._router.navigate(['/login']);
        this.openSnackBar({
          message: EMensagem.SENHA_ALTERADA_SUCESSO,
          buttonText: EMensagem.FECHAR,
          type: ESnackbarType.success,
        });
      } else {
        this.openSnackBar({
          message: EMensagem.ALGO_DEU_ERRADO,
          buttonText: EMensagem.FECHAR,
          type: ESnackbarType.error,
        });
      }
    });
  }

  protected openSnackBar(data: ISnackBarData, duration = 5000): void {
    this._snackBar.openFromComponent<SnackbarComponent, ISnackBarData>(
      SnackbarComponent,
      {
        duration,
        data,
        panelClass: data.type,
        horizontalPosition: 'end',
      },
    );
  }
}
