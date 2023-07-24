import { createReducer } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { cookies } from "next/dist/client/components/headers";

import { Role } from "@/types/user";

import {
  createUserInformation,
  getUser,
  getUserList,
  logIn,
  signOut,
  signUp,
  updateUserInformation,
} from "./actions";
import { type UserState } from "./types";

export const initialState = {
  isLoading: false,
  userList: [],
  personalInformation: undefined,
  username: undefined,
  token: undefined,
  role: undefined,
  personalInformationCreated: false,
  error: undefined,
};

export const userReducer = createReducer<UserState>(initialState, (builder) => {
  builder.addCase(getUser.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(getUser.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.error;
  });
  builder.addCase(getUser.fulfilled, (state, action) => {
    state.isLoading = false;
    const { username, ...personalInformation } = action.payload;
    state.personalInformation = personalInformation;
    state.username = username;
  });
  builder.addCase(getUserList.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(getUserList.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.error;
  });
  builder.addCase(getUserList.fulfilled, (state, action) => {
    state.isLoading = false;
    state.userList = action.payload;
  });
  builder.addCase(createUserInformation.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(createUserInformation.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.error;
  });
  builder.addCase(createUserInformation.fulfilled, (state) => {
    state.isLoading = false;
  });
  builder.addCase(updateUserInformation.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(updateUserInformation.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.error;
  });
  builder.addCase(updateUserInformation.fulfilled, (state) => {
    state.isLoading = false;
  });
  builder.addCase(logIn.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(logIn.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.error;
  });
  builder.addCase(logIn.fulfilled, (state, action) => {
    state.isLoading = false;
    state.token = action.payload.token;
    state.role = action.payload.role;
    state.personalInformationCreated = !!action.payload.userCreated;
    Cookies.set("currentUserToken", action.payload.token);
    Cookies.set("currentUserRole", action.payload.role);
  });
  builder.addCase(signUp.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(signUp.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.error;
  });
  builder.addCase(signUp.fulfilled, (state, action) => {
    state.isLoading = false;
    state.token = action.payload.token;
    state.role = Role.user;
    Cookies.set("currentUserToken", action.payload.token);
    Cookies.set("currentUserRole", Role.user);
  });
  builder.addCase(signOut, (state) => {
    state = initialState;
    Cookies.remove("currentUserToken");
    Cookies.remove("currentUserRole");
  });
});
