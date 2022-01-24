import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(items: any[], param: string): any {
    // filter items array, items which match and return true will be kept, false will be filtered out
    if (param === 'All Users') {
      return items;
    }

    if (items) {
      return items.filter((item, index) => (item.createdByUser === param) || (item.updatedByUser === param));
    }
  }

}
