import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormFieldComponent } from '../shared/components/form-field/form-field.component';
import { SnackbarComponent } from '../shared/components/snackbar/snackbar.component';
import { EFieldType } from '../shared/enums/field-type.enum';
import { EMensagem } from '../shared/enums/mensagem.enum';
import { ESnackbarType } from '../shared/enums/snackbar-type.enum';
import { IFormField } from '../shared/interfaces/form-field.interface';
import { ISnackBarData } from '../shared/interfaces/snackbar-data.interface';
import { ILogin } from './login.interface';
import { LoginService } from './login.service';

const components = [
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatSlideToggleModule,
  FormFieldComponent,
];

@Component({
  selector: 'cl-login',
  standalone: true,
  imports: [...components],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email,
    ]),
    senha: new FormControl<string | null>(null, [Validators.required]),
    lembrar: new FormControl<boolean>(false),
  });

  emailInput: IFormField = {
    type: EFieldType.INPUT,
    label: 'Email',
    formControlName: 'email',
    placeholder: 'Ex.: jose@gmail.com',
    class: '',
  };

  senhaInput: IFormField = {
    type: EFieldType.INPUT,
    label: 'Senha',
    formControlName: 'senha',
    placeholder: '******',
    class: '',
    password: true,
  };

  lembrarInput: IFormField = {
    type: EFieldType.SLIDE,
    label: 'Lembrar meu usuário',
    formControlName: 'lembrar',
    placeholder: '',
    class: '',
  };

  constructor(
    private readonly _snackBar: MatSnackBar,
    private readonly _loginService: LoginService,
  ) {}

  login($event: Event): void {
    $event.preventDefault();

    this.loginForm.markAllAsTouched();

    if (!this.loginForm.valid) {
      this.openSnackBar({
        message: EMensagem.CAMPOS_LOGIN_INVALIDOS,
        buttonText: EMensagem.FECHAR,
        type: ESnackbarType.warning,
      });
      return;
    }

    const payload: ILogin = {
      email: this.loginForm.value.email as string,
      senha: this.loginForm.value.senha as string,
    };

    this._loginService.login(payload).subscribe();
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
