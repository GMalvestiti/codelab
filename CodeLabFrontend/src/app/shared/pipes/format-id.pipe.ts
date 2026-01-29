import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatId',
  standalone: true,
})
export class FormatIdPipe implements PipeTransform {
  transform(value: string | number | null): string {
    if (value == null) {
      return '';
    }
    return value.toString().padStart(6, '0');
  }
}
