import { User } from "@/types/user";

export interface ModifyInformationResponse {
  message: string;
}

export interface UserInformationPayload {
  firstName: string;
  lastName: string;
  phone: string;
  SSN: number;
  DoB: Date;
}

export interface GetUserResponse extends User {
  username: string;
}
