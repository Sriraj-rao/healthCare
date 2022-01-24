import {
  Pipe,
  PipeTransform
} from '@angular/core';

/**
 * Formats zipcodes
 */
@Pipe({
  name: 'zipcode'
})
export class ZipcodePipe implements PipeTransform {
  /**
   * @ignore
   */
  transform(zipcode: string = ''): string {
    let formattedZipcode = zipcode;
    const zipcodePattern: RegExp = /(^\d{5}$)|(^\d{5}-\d{4}$)/g;
    const all9DigitsPattern: RegExp = /\d{9}/g;

    if (zipcodePattern.test(zipcode)) {
      return zipcode;
    }

    if (all9DigitsPattern.test(zipcode)) {
      formattedZipcode = `${zipcode.substr(0, 5)}-${zipcode.substr(5)}`;
    }

    return formattedZipcode;
  }

}
