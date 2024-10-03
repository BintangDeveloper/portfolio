import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

export class ApiClient {
    private client: AxiosInstance;
    private bearerToken?: string;
    private csrfEnabled: boolean;

    constructor(baseURL: string, bearerToken?: string, csrfEnabled: boolean = true) {
        this.bearerToken = bearerToken;
        this.csrfEnabled = csrfEnabled;
        this.client = axios.create({
            baseURL,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                ...(bearerToken ? { Authorization: `Bearer ${bearerToken}` } : {}),
            },
        });

        if (this.csrfEnabled) {
            this.initializeCsrfToken();
        }
    }

    private async initializeCsrfToken(): Promise<void> {
        try {
            await this.client.get('/sanctum/csrf-cookie');
        } catch (error) {
            console.error('Error fetching CSRF cookie:', error);
        }
    }

    public setBearerToken(token: string) {
        this.bearerToken = token;
        this.client.defaults.headers['Authorization'] = `Bearer ${token}`;
    }

    public setCsrfEnabled(enabled: boolean) {
        this.csrfEnabled = enabled;
        if (enabled) {
            this.initializeCsrfToken();
        } else {
            this.client.defaults.headers['X-XSRF-TOKEN'] = '';
        }
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.client.get<T>(url, config);
            return response.data;
        } catch (error: any) {
            this.handleRequestError(error as AxiosError); // Type assertion here
            throw error;
        }
    }

    public async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.client.post<T>(url, data, config);
            return response.data;
        } catch (error: any) {
            this.handleRequestError(error as AxiosError); // Type assertion here
            throw error;
        }
    }

    public async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.client.put<T>(url, data, config);
            return response.data;
        } catch (error: any) {
            this.handleRequestError(error as AxiosError); // Type assertion here
            throw error;
        }
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.client.delete<T>(url, config);
            return response.data;
        } catch (error: any) {
            this.handleRequestError(error as AxiosError); // Type assertion here
            throw error;
        }
    }

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
