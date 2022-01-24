import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'headerFilter'
})
export class HeaderFilterPipe implements PipeTransform {

  transform(items: any[], param: string): any {
    // filter items array, items which match and return true will be kept, false will be filtered out
    if (param === '') {
      return items;
    }

    if (items) {
      param = param.toUpperCase();
      let itemsToReturn = [];
      itemsToReturn = items.filter((item, index) => (item.title.toUpperCase().startsWith(param)));
      const itemsIncludingParams = items.filter((item, index) => (item.title.toUpperCase().includes(param))
        && !(item.title.toUpperCase().startsWith(param)));
      itemsToReturn = [...itemsToReturn, ...itemsIncludingParams];
      return itemsToReturn;
    }
  }

}
