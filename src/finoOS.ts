import * as rm from 'typed-rest-client/RestClient';
import HttpError from './httpError';
import { AuthenticationData } from './models/authentication';
import { AuthenticationRequest, RefreshAuthenticationRequest, CreateUserRequest } from './models/request';
import { CreateUserData } from './models/user';
import { Contract } from './models/contract';

export class FinoOSClient {
    private client: rm.RestClient;

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
      * @param name the name for this client
      * @param secret the secret for this client
      */
    async authenticate(name: string, secret: string): Promise<AuthenticationData> {
        const data: AuthenticationRequest = {
            name: name,
            secret: secret
        }
        const response = await this.client.create<AuthenticationData>(`/auth`, data)
        if (response.statusCode > 200) {
            const body = <any>response.result || {};
            throw new HttpError(body.message, response.statusCode)
        }
        return response.result;
    }

     /**
      * Refreshes the authentication
      * @param name the name for this client 
      * @param secret the secret for this client
      * @param refreshToken the refreshToken
      */
    async refreshAuthentication(name: string, secret: string, refreshToken: string): Promise<AuthenticationData> {
        const data: RefreshAuthenticationRequest = {
            name: name,
            refreshToken: refreshToken,
            secret: secret
        }
        const response = await this.client.create<AuthenticationData>(`/refresh-auth`, data);
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
    async createUser(data: CreateUserRequest, accessToken: string): Promise<CreateUserData> {
        const response = await this.client.create<CreateUserData>(`/users`, data, {
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

    /**
     * Fetches all contracts for the user
     * @param accessToken the authentication token
     */
    async fetchContracts(accessToken: string): Promise<Contract[]> {
        const response = await this.client.get<Contract[]>(`/contracts`, {
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
     * Adds a custom contract
     * @param userID the id of the user
     * @param accessToken the authentication token
     * @param contract the custom contract
     */
    async addContract(userID: string, accessToken: string, contract: Contract): Promise<void> {
        const response = await this.client.create(`/users/${userID}/contracts`, contract, {
            additionalHeaders: {
                Authorization: accessToken
            }
        });
        if (response.statusCode > 200) {
            const body = <any>response.result || {};
            throw new HttpError(body.message, response.statusCode)
        }
    }

    /**
     * Updates an existing contract
     * @param userID the id of the user
     * @param contractID the id of the contract to update
     * @param accessToken the authentication token
     * @param contract the data to be updated.
     */
    async updateContract(userID: string, contractID: string, accessToken: string, contract: Contract): Promise<void> {
        const response = await this.client.replace(`/users/${userID}/contracts/${contractID}`, contract, {
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