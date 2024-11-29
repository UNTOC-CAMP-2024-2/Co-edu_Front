import axiosInstance from "./index";

export const login = async ({ user_id, password }) => {
  const response = await axiosInstance.post("/user/login", {
    user_id,
    password,
  });
  return response.data;
};

export const sendEmailVertificationCode = async ({ user_id, email, code }) => {
  const response = await axiosInstance.post("/user/email/send", {
    user_id,
    email,
    code: "asdfasd",
  });
  return response.data;
};
