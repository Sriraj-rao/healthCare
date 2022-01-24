import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pendCode'
})
export class PendCodePipe implements PipeTransform {

  transform(items: any[], param: string): any {
    // filter items array, items which match and return true will be kept, false will be filtered out
    if (param === null || param === undefined || param === '') {
      return items;
    }

    if (items) {
      return items.filter((item, index) => item.pendCode.toString().includes(param));
    }
  }

}
