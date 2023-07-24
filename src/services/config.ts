import axios from "axios";

import { store } from "@/store";
import { signOut } from "@/store/user/actions";

const baseURL =
  process.env.APP_API_URL ?? "https://sky-lending-backend.onrender.com/api";

const paths = {
  user: {
    getPersonalInformation: "/user/personal-information",
    createPersonalInformation: "/user/personal-information",
    updatePersonalInformation: "/user/personal-information",
    getAllPersonalInformation: "/user/",
  },
  credential: {
    logIn: "/auth/log-in",
    signUp: "/auth/sign-up",
  },
};

export const endpoint = {
  user: {
    get: paths.user.getPersonalInformation,
    getAll: paths.user.getAllPersonalInformation,
    create: paths.user.createPersonalInformation,
    update: paths.user.updatePersonalInformation,
  },
  auth: {
    logIn: paths.credential.logIn,
    signUp: paths.credential.signUp,
  },
};

const axiosInterceptorInstance = axios.create({
  baseURL,
});

axiosInterceptorInstance.interceptors.request.use(
  async (req) => {
    const {
      user: { token },
    } = store.getState();
    if (token) {
      req.headers.Authorization = "Bearer " + token;
    }
    return req;
  },
  (error) => {
    Promise.reject(error);
  },
);

axiosInterceptorInstance.interceptors.response.use(
  (res) => {
    if (res.data.statusCode === 401 || res.data.error === "Unauthorized") {
      store.dispatch(signOut());
    }
    return res;
  },
  (err) => {
    if (
      err &&
      err.response &&
      (err.response.data.statusCode === 401 ||
        err.response.data.error === "Unauthorized")
    ) {
      return store.dispatch(signOut());
    }
    if (err?.response?.data?.message)
      return Promise.reject(err.response.data.message);
    return Promise.reject(err.message);
  },
);

export default axiosInterceptorInstance;
