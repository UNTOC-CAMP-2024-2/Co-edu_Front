import { useMutation } from "@tanstack/react-query";
import {
  checkEmailVertificationCode,
  login,
  register,
  sendEmailVertificationCode,
} from "../api/auth";
import { useContext } from "react";
import { Context } from "../AppProvider";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const { setToken, setUsername } = useContext(Context);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data.access_token);
      setUsername(data.name);
      navigate("/");
    },
    onError: (error) => {
      alert("아이디와 비밀번호를 확인해주세요.");
    },
  });
};

export const useSendEmailVertificationCode = () => {
  return useMutation({
    mutationFn: sendEmailVertificationCode,
    onSuccess: (data) => {},
    onError: (error) => {},
  });
};

export const useCheckEmailVertificationCode = () => {
  return useMutation({
    mutationFn: checkEmailVertificationCode,
    onSuccess: (data) => {},
    onError: (error) => {},
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      navigate("/login");
    },
    onError: (error) => {},
  });
};
