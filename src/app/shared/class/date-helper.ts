/**
 * Date Helper
 */
export class DateHelper {

    /**
     * Determines if the value is a date
     * @param value Date string
     */
    public static isDate(value: string = null): boolean {
      const parsedDate: number = Date.parse(value) || null;

      return parsedDate !== null;
    }

    /**
     * Convert date string to JS Date
     */
    public static toDate(value: string = null): Date {
      if (value === null) {
        return null;
      }

      const isDate: boolean = DateHelper.isDate(value);

      return isDate ? new Date(value) : null;
    }

    /**
     * isWeekendDay
     */
    public static isWeekendDay(dateValue: string): boolean {
      let isWeekendDay = false;
      const inputDate: Date = DateHelper.toDate(dateValue);

      if (inputDate !== null) {
        isWeekendDay = inputDate.getDay() === 0 /* Sunday */ || inputDate.getDay() === 6 /** Saturday */ ;

      } else {
        isWeekendDay = false;
        // appInsights.trackException(new Error(`The provided value is not a Date: ${dateValue}.`));
      }

      return isWeekendDay;
    }

    /**
     * Changes date to a date with leading zeros on the month and day
     * @param dateValue Date to process
     * @param stripSlashes Specifies whether to strip out the date string slashes
     */
    public static toDateString(dateValue: Date, stripSlashes: boolean = false): string {
      let month = (dateValue.getMonth() + 1).toString();
      let day = dateValue.getDate().toString();
      const year = dateValue.getFullYear().toString();

      month = DateHelper.addLeadingZero(month);
      day = DateHelper.addLeadingZero(day);

      if (stripSlashes) {
        return `${month}${day}${year}`;
      }

      return `${month}/${day}/${year}`;
    }

    /** Adds leading zero to month or day value */
    private static addLeadingZero(value: string): string {
      let finalValue = value;

      if (value.length === 1) {
        finalValue = `0${value}`;
      }

      return finalValue;
    }

    public static verifyDatesEqual(date1, date2): boolean {
      const newDate = new Date(date1);
      if (newDate.getFullYear() === date2.getFullYear()
        && newDate.getMonth() === date2.getMonth()
        && newDate.getDate() === date2.getDate()) {
        return true;
      }
      else {
        return false;
      }
    }
  }
