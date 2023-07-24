import axios from "axios";

import { endpoint } from "../config";
import { LogInResponse, SignUpResponse } from "./types";

export const logInService = async (): Promise<LogInResponse> => {
  const response = await axios.get<LogInResponse>(endpoint.auth.logIn);

  return response.data;
};

export const signUpService = async (): Promise<SignUpResponse> => {
  const response = await axios.get<SignUpResponse>(endpoint.auth.signUp);

  return response.data;
};
