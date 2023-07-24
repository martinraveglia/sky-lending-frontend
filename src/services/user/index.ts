import axios from "axios";

import { User } from "@/types/user";

import axiosInterceptorInstance, { endpoint } from "../config";
import {
  GetUserResponse,
  ModifyInformationResponse,
  UserInformationPayload,
} from "./types";

export const getUserInformationService = async (): Promise<GetUserResponse> => {
  try {
    const response = await axiosInterceptorInstance.get<GetUserResponse>(
      endpoint.user.get,
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

export const getUserInformationListService = async (): Promise<
  GetUserResponse[]
> => {
  try {
    const response = await axiosInterceptorInstance.get<GetUserResponse[]>(
      endpoint.user.getAll,
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

export const createUserInformationService = async (
  payload: UserInformationPayload,
): Promise<ModifyInformationResponse> => {
  try {
    const response =
      await axiosInterceptorInstance.post<ModifyInformationResponse>(
        endpoint.user.create,
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

export const updateUserInformationService = async (
  payload: Partial<UserInformationPayload>,
): Promise<ModifyInformationResponse> => {
  try {
    const response =
      await axiosInterceptorInstance.patch<ModifyInformationResponse>(
        endpoint.user.update,
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
