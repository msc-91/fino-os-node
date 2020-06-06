export interface AuthenticationResponse {
    accessToken: string;
    expiresIn: number;
    refreshExpiresIn: number;
    refreshToken: string;
}

export interface CreateUserResponse {
    id: string;
}