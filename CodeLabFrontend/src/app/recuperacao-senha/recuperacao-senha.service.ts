import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { EAPIPath } from '../shared/enums/api-info.enum';
import { IResponse } from '../shared/interfaces/response.interface';
import { IRecuperacaoSenha } from './recuperacao-senha.interface';

@Injectable({
  providedIn: 'root',
})
export class RecuperacaoSenhaService {
  private url = `${environment.baseUrl}/${EAPIPath.USUARIO}/alterar-senha`;

  constructor(private readonly _http: HttpClient) {}

  recuperarSenha(payload: IRecuperacaoSenha) {
    console.log(this.url);
    return this._http
      .put<IResponse<boolean>>(`${this.url}`, payload)
      .pipe(take(1));
  }
}
