import { useMutation } from "@tanstack/react-query";
import {
  AmIbelongtoClassroom,
  createClassroom,
  getMyClassroom,
  searchClassroom,
  submitClassroomCode,
  getClassroomInfo,
  approveMember,
  denyMember,
  kickMember,
  editClassInfo,
} from "../api/classroom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../AppProvider";

export const useCreateClassroom = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createClassroom,
    onSuccess: (data) => {
      navigate("/mentor", { state: data });
    },
    onError: (error) => {},
  });
};

export const useSubmitClassroomCode = () => {
  return useMutation({
    mutationFn: submitClassroomCode,
    onSuccess: (data) => {},
    onError: (error) => {},
  });
};

export const useSearchClassroom = () => {
  return useMutation({
    mutationFn: searchClassroom,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {},
  });
};

export const useGetMyClassroom = () => {
  return useMutation({
    mutationFn: getMyClassroom,
    onSuccess: (data) => {},
    onError: (error) => {},
  });
};

export const useAmIbelongtoClassroom = () => {
  const { setClassName } = useContext(Context);
  return useMutation({
    mutationFn: AmIbelongtoClassroom,
    onSuccess: (data) => {
      setClassName(data[0].class_name);
      return data;
    },
    onError: (error) => {},
  });
};

export const useGetClassroomInfo = () => {
  return useMutation({
    mutationFn: getClassroomInfo,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {},
  });
};

export const useApproveMember = () =>
  useMutation({
    mutationFn: approveMember,
  });

export const useDenyMember = () =>
  useMutation({
    mutationFn: denyMember,
  });

export const useKickMember = () =>
  useMutation({
    mutationFn: kickMember,
  });

export const useEditClassInfo = () =>
  useMutation({
    mutationFn: editClassInfo,
    onSuccess: (data) => {},
    onError: (error) => {},
  });
