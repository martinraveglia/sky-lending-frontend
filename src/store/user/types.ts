import { type SerializedError } from "@reduxjs/toolkit";

import { GetUserResponse } from "@/services/user/types";
import { Role, User } from "@/types/user";

export interface UserState {
  isLoading: boolean;
  personalInformation?: User;
  username?: string;
  role?: Role;
  token?: string;
  userList: GetUserResponse[];
  personalInformationCreated: boolean;
  error?: SerializedError;
  signingOut: boolean;
}

export enum ACTIONS {
  GET_USER = "user/getUser",
  GET_USER_LIST = "user/getUserList",
  CREATE_PERSONAL_INFORMATION = "user/createPersonalInformation",
  UPDATE_PERSONAL_INFORMATION = "user/updatePersonalInformation",
  LOG_IN = "user/logIn",
  SIGN_UP = "user/signUp",
}
