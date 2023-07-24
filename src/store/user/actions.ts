import { createAsyncThunk } from "@reduxjs/toolkit";

import { logInService, signUpService } from "@/services/auth";
import {
  CredentialPayload,
  LogInResponse,
  SignUpResponse,
} from "@/services/auth/types";
import {
  createUserInformationService,
  getUserInformationListService,
  getUserInformationService,
  updateUserInformationService,
} from "@/services/user";
import { ModifyInformationResponse } from "@/services/user/types";
import { User } from "@/types/user";

import { ACTIONS } from "./types";

export const getUser = createAsyncThunk<User>(
  ACTIONS.GET_USER,
  getUserInformationService,
);

export const getUserList = createAsyncThunk<User[]>(
  ACTIONS.GET_USER_LIST,
  getUserInformationListService,
);

export const createUserInformation =
  createAsyncThunk<ModifyInformationResponse>(
    ACTIONS.CREATE_PERSONAL_INFORMATION,
    createUserInformationService,
  );

export const updateUserInformation =
  createAsyncThunk<ModifyInformationResponse>(
    ACTIONS.UPDATE_PERSONAL_INFORMATION,
    updateUserInformationService,
  );

export const logIn = createAsyncThunk<LogInResponse, CredentialPayload>(
  ACTIONS.LOG_IN,
  logInService,
);

export const signUp = createAsyncThunk<SignUpResponse, CredentialPayload>(
  ACTIONS.SIGN_UP,
  signUpService,
);
