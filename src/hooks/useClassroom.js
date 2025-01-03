import { useMutation } from "@tanstack/react-query";
import {
  createClassroom,
  getMyClassroom,
  searchClassroom,
  submitClassroomCode,
} from "../api/classroom";

export const useCreateClassroom = () => {
  return useMutation({
    mutationFn: createClassroom,
    onSuccess: (data) => {
      console.log("스터디룸 생성 성공", data);
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
