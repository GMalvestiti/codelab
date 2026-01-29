import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCodigoBarras',
  standalone: true,
})
export class FormatCodigoBarras implements PipeTransform {
  transform(value: string | number): string {
    const codigoBarras = value.toString().trim();

    const codigoFormatado = `${codigoBarras.slice(0, 3)}.${codigoBarras.slice(3, 6)}.${codigoBarras.slice(6, 12)}-${codigoBarras.slice(12)}`;

    return codigoFormatado;
  }
}
