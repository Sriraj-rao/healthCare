/**
 * API Response Generic
 */
export class ApiResponseT<T> {
    /**
     * Data
     */
    data: T;
    /**
     * Is Success
     */
    isSuccess: boolean;
}
