import axios from "axios";

import { User } from "@/types/user";

import { endpoint } from "../config";
import { ModifyInformationResponse } from "./types";

export const getUserInformationService = async (): Promise<User> => {
  const response = await axios.get<User>(endpoint.user.get);

  return response.data;
};

export const getUserInformationListService = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(endpoint.user.getAll);

  return response.data;
};

export const createUserInformationService =
  async (): Promise<ModifyInformationResponse> => {
    const response = await axios.post<ModifyInformationResponse>(
      endpoint.user.create,
    );

    return response.data;
  };

export const updateUserInformationService =
  async (): Promise<ModifyInformationResponse> => {
    const response = await axios.patch<ModifyInformationResponse>(
      endpoint.user.update,
    );

    return response.data;
  };
