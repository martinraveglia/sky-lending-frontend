export enum Role {
  user = "USER",
  admin = "ADMIN",
}

export interface User {
  firstName: string;
  lastName: string;
  phone: string;
  SSN: number;
  DoB: Date;
}
