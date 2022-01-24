/**
 * API Response Generic Collection
 */
export class ApiResponseTObject<T> {
    /**
     * Data
     */
    data: T;
    /**
     * Is Success
     */
    isSuccess: boolean;
}
