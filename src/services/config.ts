export const baseURL =
  process.env.APP_API_URL ?? "https://sky-lending-backend.onrender.com/";

const paths = {
  user: {
    getPersonalInformation: "api/user/personal-information",
    createPersonalInformation: "api/user/personal-information",
    updatePersonalInformation: "api/user/personal-information",
    getAllPersonalInformation: "api/user/",
  },
  credential: {
    logIn: "api/auth/log-in",
    signUp: "api/auth/sign-up",
  },
};

export const endpoint = {
  user: {
    get: baseURL + paths.user.getPersonalInformation,
    getAll: baseURL + paths.user.getAllPersonalInformation,
    create: baseURL + paths.user.createPersonalInformation,
    update: baseURL + paths.user.updatePersonalInformation,
  },
  auth: {
    logIn: baseURL + paths.credential.logIn,
    signUp: baseURL + paths.credential.signUp,
  },
};
