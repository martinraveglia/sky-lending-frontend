import { type SerializedError } from "@reduxjs/toolkit";

import { Role, User } from "@/types/user";

export interface UserState {
  isLoading: boolean;
  personalInformation?: User;
  username?: string;
  role?: Role;
  token?: string;
  userList: User[];
  personalInformationCreated: boolean;
  error?: SerializedError;
}

export enum ACTIONS {
  GET_USER = "user/getUser",
  GET_USER_LIST = "user/getUserList",
  CREATE_PERSONAL_INFORMATION = "user/createPersonalInformation",
  UPDATE_PERSONAL_INFORMATION = "user/updatePersonalInformation",
}
