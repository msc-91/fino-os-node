
export interface AuthenticationRequest {
    name: string;
    secret: string;
}

export interface RefreshAuthenticationRequest {
    name: string;
    refreshToken: string;
    secret: string;
}

export interface CreateUserRequest {
    type: "person" | "company";
}