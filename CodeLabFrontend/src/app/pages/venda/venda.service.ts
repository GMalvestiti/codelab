import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from '../../shared/classes/base-resource/base-resource.service';
import { EAPIPath } from '../../shared/enums/api-info.enum';
import { IVenda } from './venda.interface';

@Injectable({
  providedIn: 'root',
})
export class VendaService extends BaseResourceService<IVenda> {
  constructor(protected readonly _injectorLocal: Injector) {
    super(_injectorLocal, EAPIPath.VENDA);
  }
}
