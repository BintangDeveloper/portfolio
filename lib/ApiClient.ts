import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

/**
 * ApiClient class is a wrapper around Axios to make API requests with support for:
 * - CSRF token retrieval (from Laravel Sanctum)
 * - Bearer token authentication
 * - Error handling
 * 
 * Features:
 * - Automatically fetches CSRF token from Laravel's /sanctum/csrf-cookie.
 * - Option to enable/disable CSRF protection.
 * - Supports Bearer token for authentication.
 * - Provides methods for GET, POST, PUT, DELETE requests.
 */
export class ApiClient {
    private client: AxiosInstance;
    private bearerToken?: string;
    private csrfEnabled: boolean;

    /**
     * Constructor to create an instance of ApiClient.
     * 
     * @param baseURL - The base URL for API requests.
     * @param bearerToken - Optional Bearer token for authentication.
     * @param csrfEnabled - Optional flag to enable/disable CSRF protection. Defaults to true.
     */
    constructor(baseURL: string, bearerToken?: string, csrfEnabled: boolean = true) {
        this.bearerToken = bearerToken;
        this.csrfEnabled = csrfEnabled;
        this.client = axios.create({
            baseURL,
            withCredentials: true, // Required to include cookies for CSRF token
            headers: {
                'Content-Type': 'application/json',
                ...(bearerToken ? { Authorization: `Bearer ${bearerToken}` } : {}), // Add Bearer token if available
            },
        });

        // Conditionally initialize the CSRF token based on the flag
        if (this.csrfEnabled) {
            this.initializeCsrfToken();
        }
    }

    /**
     * Fetches the CSRF token from Laravel's /sanctum/csrf-cookie endpoint.
     * This method is automatically called during initialization if CSRF is enabled.
     */
    private async initializeCsrfToken(): Promise<void> {
        try {
            await this.client.get('/sanctum/csrf-cookie');
            console.log('CSRF token initialized successfully');
        } catch (error) {
            console.error('Error fetching CSRF cookie:', error);
        }
    }

    /**
     * Set or update the Bearer token for future requests.
     * 
     * @param token - The Bearer token to be used in the Authorization header.
     */
    public setBearerToken(token: string) {
        this.bearerToken = token;
        this.client.defaults.headers['Authorization'] = `Bearer ${token}`;
    }

    /**
     * Enable or disable CSRF token usage.
     * When enabled, it will fetch the CSRF token. When disabled, it will remove the CSRF token header.
     * 
     * @param enabled - Boolean flag to enable or disable CSRF token handling.
     */
    public setCsrfEnabled(enabled: boolean) {
        this.csrfEnabled = enabled;
        if (enabled) {
            this.initializeCsrfToken();
        } else {
            // Remove CSRF-related headers when disabled
            this.client.defaults.headers['X-XSRF-TOKEN'] = '';
        }
    }

    /**
     * Make a GET request to the API.
     * 
     * @param url - The endpoint to make the GET request to.
     * @param config - Optional Axios configuration for the request.
     * @returns The data from the response.
     */
    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.client.get<T>(url, config);
            return response.data;
        } catch (error) {
            this.handleRequestError(error);
            throw error;
        }
    }

    /**
     * Make a POST request to the API.
     * 
     * @param url - The endpoint to make the POST request to.
     * @param data - The data to send in the request body.
     * @param config - Optional Axios configuration for the request.
     * @returns The data from the response.
     */
    public async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.client.post<T>(url, data, config);
            return response.data;
        } catch (error) {
            this.handleRequestError(error);
            throw error;
        }
    }

    /**
     * Make a PUT request to the API.
     * 
     * @param url - The endpoint to make the PUT request to.
     * @param data - The data to send in the request body.
     * @param config - Optional Axios configuration for the request.
     * @returns The data from the response.
     */
    public async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.client.put<T>(url, data, config);
            return response.data;
        } catch (error) {
            this.handleRequestError(error);
            throw error;
        }
    }

    /**
     * Make a DELETE request to the API.
     * 
     * @param url - The endpoint to make the DELETE request to.
     * @param config - Optional Axios configuration for the request.
     * @returns The data from the response.
     */
    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.client.delete<T>(url, config);
            return response.data;
        } catch (error) {
            this.handleRequestError(error);
            throw error;
        }
    }

    /**
     * Handles errors for API requests.
     * Logs detailed error information depending on the type of failure (response, request, or setup error).
     * 
     * @param error - The AxiosError object from the failed request.
     */
    private handleRequestError(error: AxiosError): void {
        if (error.response) {
            console.error('Request failed with status:', error.response.status);
            console.error('Response data:', error.response.data);
        } else if (error.request) {
            console.error('No response from server:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
    }
}