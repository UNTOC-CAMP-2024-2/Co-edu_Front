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
      console.log("스터디룸 생성 성공", data);
      navigate("/mentor", { state: data });
    },
    onError: (error) => {
      console.log("스터디룸 생성 실패", error);
    },
  });
};

export const useSubmitClassroomCode = () => {
  return useMutation({
    mutationFn: submitClassroomCode,
    onSuccess: (data) => {
      console.log("스터디룸 입장하고 싶어요", data);
    },
    onError: (error) => {
      console.log("스터디룸 입장 실패", error);
    },
  });
};

export const useSearchClassroom = () => {
  return useMutation({
    mutationFn: searchClassroom,
    onSuccess: (data) => {
      console.log("스터디룸 검색 성공", data);
      return data;
    },
    onError: (error) => {
      console.log("스터디룸 검색 실패", error);
    },
  });
};

export const useGetMyClassroom = () => {
  return useMutation({
    mutationFn: getMyClassroom,
    onSuccess: (data) => {
      console.log("내 스터디룸 조회 성공", data);
    },
    onError: (error) => {
      console.log("내 스터디룸 조회 실패", error);
    },
  });
};

export const useAmIbelongtoClassroom = () => {
  const { setClassName } = useContext(Context);
  return useMutation({
    mutationFn: AmIbelongtoClassroom,
    onSuccess: (data) => {
      console.log("스터디룸 소속 확인 혹은 가입신청 성공", data);
      setClassName(data[0].class_name);
      return data;
    },
    onError: (error) => {
      console.log("스터디룸 소속 확인 혹은 가입신청 실패", error);
    },
  });
};

export const useGetClassroomInfo = () => {
  return useMutation({
    mutationFn: getClassroomInfo,
    onSuccess: (data) => {
      console.log("스터디룸 설정 정보 조회 성공", data);
      return data;
    },
    onError: (error) => {
      console.log("스터디룸 설정 정보 조회 실패", error);
    },
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
    onSuccess: (data) => {
      console.log("클래스 정보 수정 성공", data);
    },
    onError: (error) => {
      console.error("클래스 정보 수정 실패", error);
    },
  });
