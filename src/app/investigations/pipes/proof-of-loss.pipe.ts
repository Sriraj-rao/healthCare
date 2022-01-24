import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'proofOfLoss'
})
export class ProofOfLossPipe implements PipeTransform {

  transform(items: any[], param: string): any {
    // filter items array, items which match and return true will be kept, false will be filtered out
    if (param === null || param === undefined || param === '') {
      return items;
    }

    if (items) {
      const itemDate = new Date();
      return items.filter((item, index) => this.verifyDatesEqual(new Date(item.proofOfLoss), param));
    }
  }

  verifyDatesEqual(date1, date2) {
    if (date1.getFullYear() === date2.getFullYear()
        && date1.getMonth() === date2.getMonth()
        && date1.getDate() === date2.getDate()) {
        return true;
    }
    else {
        return false;
    }
}

}
