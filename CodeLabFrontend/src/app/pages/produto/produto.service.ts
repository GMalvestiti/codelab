import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from '../../shared/classes/base-resource/base-resource.service';
import { EAPIPath } from '../../shared/enums/api-info.enum';
import { IProduto } from './produto.interface';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService extends BaseResourceService<IProduto> {
  constructor(protected readonly _injectorLocal: Injector) {
    super(_injectorLocal, EAPIPath.PRODUTO);
  }
}
