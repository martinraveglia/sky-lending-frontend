import axios from "axios";

import { endpoint } from "../config";
import { CredentialPayload, LogInResponse, SignUpResponse } from "./types";

export const logInService = async (
  payload: CredentialPayload,
): Promise<LogInResponse> => {
  try {
    const response = await axios.post<LogInResponse>(
      endpoint.auth.logIn,
      payload,
    );

    return response.data;
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
    const response = await axios.post<SignUpResponse>(
      endpoint.auth.signUp,
      payload,
    );

    return response.data;
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
