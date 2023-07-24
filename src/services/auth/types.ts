import { Role } from "@/types/user";

export interface LogInResponse {
  token: string;
  role: Role;
  userCreated: string | false;
}

export interface SignUpResponse {
  token: string;
}

export interface CredentialPayload {
  username: string;
  password: string;
}
