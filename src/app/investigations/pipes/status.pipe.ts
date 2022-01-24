import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'status'
})
@Injectable()
export class StatusPipe implements PipeTransform {

  transform(items: any[], param: string): any {
    // filter items array, items which match and return true will be kept, false will be filtered out
    if (param === 'All Status') {
      return items;
    }

    if (items) {
      return items.filter((item, index) => item.investigationStatus.includes(param));
    }
  }

}
