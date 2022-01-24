import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'investigationType'
})
@Injectable()
export class InvestigationTypePipe implements PipeTransform {

  transform(items: any[], param: string): any {
    // filter items array, items which match and return true will be kept, false will be filtered out
    if (param === 'All Inv Types') {
      return items;
    }

    if (items) {
      return items.filter((item, index) => item.investigationSubCategory === param);
    }
  }

}
