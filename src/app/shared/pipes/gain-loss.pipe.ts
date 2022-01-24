import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gainLoss'
})
export class GainLossPipe implements PipeTransform {

  transform(currency: string = ''): string {
    if (currency != null) {
      if (currency.startsWith('-')) {
        const absCurrency = currency.replace('-$', '');
        return `($${absCurrency})`;
      }


      return currency.toString();
    }

    return currency;

  }

}
