import * as rm from 'typed-rest-client/RestClient';
import { AuthenticationRequest, RefreshAuthenticationRequest, CreateUserRequest } from './requests';
import { AuthenticationResponse, CreateUserResponse } from './responses';
import HttpError from './httpError';

export class FinoOSClient {
    client: rm.RestClient;

    /**
     * Creates a new finoOS client instance
     * @param userAgent the name of the client
     * @param baseUrl the base-URL of the finoOS API
     * @param timeout the socket timeout für each request in seconds
     */
    constructor(userAgent: string | undefined, baseUrl: string, timeout: number) {
        this.client = new rm.RestClient(userAgent, baseUrl, undefined, {
            socketTimeout: timeout
        });
    }

    /**
     * Authenticate this client against finoOS
     * @param data the required credentials
     */
    async authenticate(data: AuthenticationRequest): Promise<AuthenticationResponse> {
        const response = await this.client.create<AuthenticationResponse>(`/auth`, data)
        if (response.statusCode > 200) {
            const body = <any>response.result || {};
            throw new HttpError(body.message, response.statusCode)
        }
        return response.result;
    }

    /**
     * Refreshes the authentication
     * @param data  the required credentials
     */
    async refreshAuthentication(data: RefreshAuthenticationRequest): Promise<AuthenticationResponse> {
        const response = await this.client.create<AuthenticationResponse>(`/refresh-auth`, data);
        if (response.statusCode > 200) {
            const body = <any>response.result || {};
            throw new HttpError(body.message, response.statusCode)
        }
        return response.result;
    }

    /**
     * Creates a new user
     * @param data
     * @param accessToken the authentication token
     */
    async createUser(data: CreateUserRequest, accessToken: string): Promise<CreateUserResponse> {
        const response = await this.client.create<CreateUserResponse>(`/users`, data, {
            additionalHeaders: {
                Authorization: accessToken
            }
        });
        if (response.statusCode > 200) {
            const body = <any>response.result || {};
            throw new HttpError(body.message, response.statusCode)
        }
        return response.result;
    }

    /**
     * Deletes an user
     * @param userID the id of the user
     * @param accessToken the authentication token
     */
    async deleteUser(userID: string, accessToken: string): Promise<void> {
        const response = await this.client.del(`/users/${userID}`, {
            additionalHeaders: {
                Authorization: accessToken
            }
        });
        if (response.statusCode > 200) {
            const body = <any>response.result || {};
            throw new HttpError(body.message, response.statusCode)
        }
    }
}