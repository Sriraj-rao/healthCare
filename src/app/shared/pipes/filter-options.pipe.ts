import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOptions'
})
export class FilterOptionsPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) { return []; }
    if (!searchText) { return items; }
    const filterStart = items.filter(item => {
      return Object.keys(item).some(key => {
        return String(item[key]).toLowerCase().startsWith(searchText.toLowerCase());
      });
    });
    const filterContains = items.filter(item => {
      return Object.keys(item).some(key => {
        return String(item[key]).toLowerCase().includes(searchText.toLowerCase());
      });
    });
    const finalArray = [...filterStart];
    for (const x of filterContains){
      if (!finalArray.some(y => y.type === x.type)){
        finalArray.push(x);
      }
    }
    return finalArray;
   }

}
