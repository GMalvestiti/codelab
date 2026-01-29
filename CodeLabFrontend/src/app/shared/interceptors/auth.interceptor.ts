import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginService } from '../../login/login.service';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { EMensagem } from '../enums/mensagem.enum';
import { ESnackbarType } from '../enums/snackbar-type.enum';
import { ISnackBarData } from '../interfaces/snackbar-data.interface';

const KONG_MESSAGES = [
  `No credentials found for given 'iss'`,
  `Invalid Signature`,
  `Invalid signature`,
  `token expired`,
];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);
  const loginService = inject(LoginService);
  const jwt = loginService.getJWT();

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      return checkError(loginService, snackBar, error);
    }),
  );
};

function checkError(
  loginService: LoginService,
  snackBar: MatSnackBar,
  error: HttpErrorResponse,
): Observable<never> {
  const errorObject = error.error;

  if (KONG_MESSAGES.includes(errorObject.message || errorObject.exp)) {
    const data: ISnackBarData = {
      message: EMensagem.SESSAO_EXPIRADA,
      buttonText: EMensagem.FECHAR,
      type: ESnackbarType.warning,
    };
    openSnackBar(snackBar, data);
    loginService.logout();
  } else {
    const data: ISnackBarData = {
      message: errorObject.message || error.message,
      buttonText: EMensagem.FECHAR,
      type: ESnackbarType.error,
    };
    openSnackBar(snackBar, data);
  }

  return throwError(() => error);
}

function openSnackBar(
  snackBar: MatSnackBar,
  data: ISnackBarData,
  duration = 5000,
) {
  snackBar.openFromComponent<SnackbarComponent, ISnackBarData>(
    SnackbarComponent,
    {
      duration,
      data,
      panelClass: data.type,
      horizontalPosition: 'end',
    },
  );
}
