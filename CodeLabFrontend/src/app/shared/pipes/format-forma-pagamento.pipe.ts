import { Pipe, PipeTransform } from '@angular/core';
import {
  EFormaPagamento,
  EFormaPagamentoDescricao,
} from '../enums/forma-pagamento.enum';

@Pipe({
  name: 'formatFormaPagamento',
  standalone: true,
})
export class FormatFormaPagamentoPipe implements PipeTransform {
  transform(value: number): string {
    return (
      EFormaPagamentoDescricao[
        EFormaPagamento[value] as keyof typeof EFormaPagamentoDescricao
      ] || 'Erro'
    );
  }
}
