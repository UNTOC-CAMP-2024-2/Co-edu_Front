import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("로그인 성공", data);
    },
    onError: (error) => {
      console.log("로그인 실패", error);
    },
  });
};
