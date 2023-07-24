import axios from "axios";

import { User } from "@/types/user";

import { endpoint } from "../config";
import { ModifyInformationResponse } from "./types";

export const getUserInformationService = async (): Promise<User> => {
  try {
    const response = await axios.get<User>(endpoint.user.get);

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

export const getUserInformationListService = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(endpoint.user.getAll);

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

export const createUserInformationService =
  async (): Promise<ModifyInformationResponse> => {
    try {
      const response = await axios.post<ModifyInformationResponse>(
        endpoint.user.create,
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

export const updateUserInformationService =
  async (): Promise<ModifyInformationResponse> => {
    try {
      const response = await axios.patch<ModifyInformationResponse>(
        endpoint.user.update,
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
