import axiosInstance from "./index";

export const login = async ({ user_id, password }) => {
  const response = await axiosInstance.post("/user/login", {
    user_id,
    password,
  });
  return response.data;
};
