import axiosInstance from "./index";

export const login = async ({ user_id, password }) => {
  const response = await axiosInstance.post("/user/login", {
    user_id,
    password,
  });
  return response.data;
};

export const sendEmailVertificationCode = async ({ user_id, email }) => {
  const response = await axiosInstance.post("/user/email/send", {
    user_id,
    email,
    code: "asdfasd",
  });
  return response.data;
};

export const checkEmailVertificationCode = async ({ user_id, email, code }) => {
  const response = await axiosInstance.post("/user/email/verification", {
    user_id,
    email,
    code,
  });
  return response.data;
};

export const register = async ({
  user_id,
  password,
  name,
  email,
  is_mentor,
}) => {
  const response = await axiosInstance.post("/user/signin", {
    user_id,
    password,
    name,
    email,
    is_mentor,
  });
  return response.data;
};
