import { useMutation } from "@tanstack/react-query";
import {
  checkEmailVertificationCode,
  login,
  register,
  sendEmailVertificationCode,
} from "../api/auth";

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

export const useSendEmailVertificationCode = () => {
  return useMutation({
    mutationFn: sendEmailVertificationCode,
    onSuccess: (data) => {
      console.log("이메일 인증코드 전송 성공", data);
    },
    onError: (error) => {
      console.log("이메일 인증코드 전송 실패", error);
    },
  });
};

export const useCheckEmailVertificationCode = () => {
  return useMutation({
    mutationFn: checkEmailVertificationCode,
    onSuccess: (data) => {
      console.log("이메일 인증코드 확인 성공", data);
    },
    onError: (error) => {
      console.log("이메일 인증코드 확인 실패", error);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      console.log("회원가입 성공", data);
    },
    onError: (error) => {
      console.log("회원가입 실패", error);
    },
  });
};
