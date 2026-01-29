import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from '../../shared/classes/base-resource/base-resource.service';
import { EAPIPath } from '../../shared/enums/api-info.enum';
import { IContaReceber, IContaReceberBaixa } from './recebimento.interface';
import { Observable, take } from 'rxjs';
import { IResponse } from '../../shared/interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class RecebimentoService extends BaseResourceService<IContaReceber> {
  constructor(protected readonly _injectorLocal: Injector) {
    super(_injectorLocal, EAPIPath.RECEBIMENTO);
  }

  protected urlBaixar = `${this.url}/baixar`;

  baixar(data: IContaReceberBaixa): Observable<IResponse<boolean>> {
    return this._http
      .put<IResponse<boolean>>(this.urlBaixar, data)
      .pipe(take(1));
  }
}
