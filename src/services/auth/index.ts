import axios from "axios";

import axiosInterceptorInstance, { endpoint } from "../config";
import {
  CredentialPayload,
  LogInEndpointResponse,
  LogInResponse,
  SignUpEndpointResponse,
  SignUpResponse,
} from "./types";

export const logInService = async (
  payload: CredentialPayload,
): Promise<LogInResponse> => {
  try {
    const response = await axiosInterceptorInstance.post<LogInEndpointResponse>(
      endpoint.auth.logIn,
      payload,
    );

    return { ...response.data, username: payload.username };
  } catch (ex) {
    let error = ex;
    if (axios.isAxiosError(ex)) {
      if (ex.response) {
        error = `${ex.message} - ${
          (ex.response.data as { message: string }).message
        }`;
      }
    }
    throw error;
  }
};

export const signUpService = async (
  payload: CredentialPayload,
): Promise<SignUpResponse> => {
  try {
    const response =
      await axiosInterceptorInstance.post<SignUpEndpointResponse>(
        endpoint.auth.signUp,
        payload,
      );

    return { ...response.data, username: payload.username };
  } catch (ex) {
    let error = ex;
    if (axios.isAxiosError(ex)) {
      if (ex.response) {
        error = `${ex.message} - ${
          (ex.response.data as { message: string }).message
        }`;
      }
    }
    throw error;
  }
};
