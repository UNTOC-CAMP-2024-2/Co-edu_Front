import { useMutation } from "@tanstack/react-query";
import {
  getAssignmentDetail,
  getAssignmentList,
  editAssignment,
} from "../api/mentor";

export const useGetAssignmentList = () => {
  return useMutation({
    mutationFn: getAssignmentList,
    onSuccess: (data) => {
      console.log("과제 리스트 조회 성공", data);
    },
    onError: (error) => {
      console.log("과제 리스트 조회 실패", error);
    },
  });
};

export const useGetAssignmentDetail = () => {
  return useMutation({
    mutationFn: getAssignmentDetail,
    onSuccess: (data) => {
      console.log("과제 상세 조회 성공", data);
    },
    onError: (error) => {
      console.log("과제 상세 조회 실패", error);
    },
  });
};

export const useEditAssignment = () => {
  return useMutation({
    mutationFn: editAssignment,
    onSuccess: (data) => {
      console.log("과제 수정 성공", data);
      alert("과제 수정이 완료되었습니다.");
    },
    onError: (error) => {
      console.log("과제 수정 실패", error);
      alert("과제 수정에 실패했습니다.");
    },
  });
};
