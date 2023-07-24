import { Role } from "@/types/user";

export interface LogInEndpointResponse {
  token: string;
  role: Role;
  userCreated: string | false;
}

export interface LogInResponse extends LogInEndpointResponse {
  username: string;
}

export interface SignUpEndpointResponse {
  token: string;
}

export interface SignUpResponse extends SignUpEndpointResponse {
  username: string;
}

export interface CredentialPayload {
  username: string;
  password: string;
}
