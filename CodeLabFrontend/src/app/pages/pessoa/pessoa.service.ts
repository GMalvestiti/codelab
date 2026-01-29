import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from '../../shared/classes/base-resource/base-resource.service';
import { EAPIPath } from '../../shared/enums/api-info.enum';
import { IPessoa } from './pessoa.interface';

@Injectable({
  providedIn: 'root',
})
export class PessoaService extends BaseResourceService<IPessoa> {
  constructor(protected readonly _injectorLocal: Injector) {
    super(_injectorLocal, EAPIPath.PESSOA);
  }
}
