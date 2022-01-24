import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  /**
   * Number regex
   */
  private numberRegEx = /[0-9]/g;
  /**
   * Letter regex
   */
  private letterRegEx = /[A-Za-z]/g;

 public isControlNumber(controlNo: string): boolean {
   let ctrlNumber = controlNo || '';

   if (ctrlNumber !== '') {
     ctrlNumber = ctrlNumber.trim();

     const firstChar = ctrlNumber.substr(0, 1);
     const lastChar = ctrlNumber.substr(ctrlNumber.length - 1, 1);

     const firstCharNumberResult: any = Number(firstChar);
     const lastCharNumberResult: any = Number(lastChar);

     if (firstCharNumberResult >= 0 && lastCharNumberResult === 0 && ctrlNumber.length === 10) {
       return true;
     }

     return false;
   }
   return false;
 }

 /**
  * Determines if value is a valid policy number
  * @param policyNumber string
  */
 public isPolicyNumber(policyNumber: string): boolean {
   let policyNo = policyNumber || '';

   if (policyNo !== '') {
     policyNo = policyNo.trim();

     const firstChar = policyNo.substr(0, 1);
     const lastChar = policyNo.substr(policyNo.length - 1, 1);

     const firstCharNumberResult: any = Number(firstChar);
     const lastCharLetterResult: string[] = lastChar.match(this.letterRegEx);
     const nineDigitsResult: string[] = policyNo.match(/\d{9}/g);
     const tenDigitsResults: string[] = policyNo.match(/\d{10}/g);

     if (firstCharNumberResult >= 0) {
       if ((firstCharNumberResult >= 0 && lastCharLetterResult !== null && policyNo.length === 10) ||
         nineDigitsResult !== null || tenDigitsResults !== null) {
         return true;
       }

       if (policyNo.length >= 9 && policyNo.length <= 10) {
         // Assuming User is typing in a policy or control number.
         return true;
       }
       // Assuming User is typing in a policy or control number.
       return true;

     } else if (policyNo.match(this.numberRegEx) !== null) {
       if (policyNo.length >= 9 && policyNo.length <= 10) {
         // If the search value has a digit in it, assume its a policy number entry
         return true;
       }

       // Assuming User is typing in a policy or control number.
       return true;
     } else {
       return false;
     }
   }
   return false;
 }

 /**
  * Converts Policy Numbers to Control Numbers
  * Not applicable in all cases
  * @param accountNumber string
  */
 public toControlNumber(accountNumber: string): string {
   if (this.isPolicyNumber(accountNumber)) {
     return `${accountNumber.substr(0, 9)}0`;
   }
   if (this.isControlNumber(accountNumber)) {
     return accountNumber;
   }
   return null;
 }

 /**
  * Determines whether the search text is considered a
  * member search request.
  * @param searchValue Search text
  */
 public isMemberSearch(searchValue: string): boolean {
   if (searchValue) {
     if (searchValue.trim().toLowerCase().startsWith('m-')) {
       return true;
     }
   }

   return false;
 }

  constructor() { }
}
