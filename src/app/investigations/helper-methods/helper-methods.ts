import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Claim } from 'src/app/policy-account/claims/Models/claim';
import { PendCodesModel } from '../models/pend-codes.model';

export class HelperMethods {
    static isHeaderSelectDisabled(claimDetails: Claim[]) {
        const index = claimDetails.findIndex(x => x.isCheckboxClicked === true);
        if (index === -1) {
            return true;
        }
        else {
            return false;
        }
    }

    public getPendCodeTooltip(value: PendCodesModel) {
        if (value) {
            return value.pendCode + ' - ' + value.description;
        }
        else {
            return 'Select Pend Code';
        }
    }

    public onKeyPressinSearch($event: KeyboardEvent) {
        if ($event.code === 'Space') {
            $event.stopPropagation();
        }
    }
}

export const CHARACTER_PATTERN = '';

export function characterValidator(control: AbstractControl): ValidationErrors | null  {
    if (control.value !== '') { 
      const isValid = (/^(?=[^A-Za-z]*[A-Za-z])[\x00-\x7F]*$/g).test(control.value)
      return isValid ? null : { customValidator: true };
    } else {
      return null;
    }
}