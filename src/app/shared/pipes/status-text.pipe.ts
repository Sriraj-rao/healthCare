import {
  Pipe,
  PipeTransform
} from '@angular/core';
import {
  Status
} from '../models/status.model';
/**
 * Status text pipe
 */
@Pipe({
  name: 'statusText'
})
export class StatusTextPipe implements PipeTransform {
  /**
   * @ingore
   */
  transform(statuses: Status[]): string {
    let result = '';

    if (statuses.length > 0) {
      statuses.forEach(status => {
        result = result.concat('\n', status.Text);
      });
    }
    return result.trim();
  }

}
