/**
 * API Response Generic Collection
 */
export class ApiResponseTCollection<T> {
    /**
     * Data
     */
    data: T[];
    /**
     * Is Success
     */
    isSuccess: boolean;
}
