import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createAssignment,
  getAssignmentDetail,
  getAssignmentList,
  editAssignment,
  fetchMentorTopThreeAssignments,
  fetchMenteeTopThreeAssignments,
  getMentorFeedbackList,
  sendFeedback,
  createCategory,
  getCategoryList,
  getAssignmentsByCategory,
} from "../api/mentor";

export const useCreateAssignment = () => {
  return useMutation({
    mutationFn: createAssignment,
    onSuccess: (data) => {
      alert("과제가 생성되었습니다.");
    },
    onError: (error) => {
      alert(
        `과제 생성에 실패했습니다: ${
          error.response?.data?.detail || error.message
        }`
      );
    },
  });
};

export const useGetAssignmentList = () => {
  return useMutation({
    mutationFn: getMentorFeedbackList,
    onSuccess: (data) => {},
    onError: (error) => {},
  });
};

export const useGetAssignmentDetail = () => {
  return useMutation({
    mutationFn: getAssignmentDetail,
    onSuccess: (data) => {},
    onError: (error) => {},
  });
};

export const useEditAssignment = () => {
  return useMutation({
    mutationFn: editAssignment,
    onSuccess: (data) => {
      alert("과제 수정이 완료되었습니다.");
    },
    onError: (error) => {
      alert("과제 수정에 실패했습니다.");
    },
  });
};

export const useFetchMentorTopThreeAssignments = (class_id, token) => {
  return useQuery({
    queryKey: ["topThreeData", class_id], // Query key
    queryFn: () => fetchMentorTopThreeAssignments(class_id, token), // API 호출 함수
    enabled: Boolean(class_id) && Boolean(token), // class_id가 있을 때만 호출
  });
};

export const useFetchMenteeTopThreeAssignments = (class_id, token) => {
  return useQuery({
    queryKey: ["topThreeData", class_id], // Query key
    queryFn: () => fetchMenteeTopThreeAssignments(class_id, token), // API 호출 함수
    enabled: Boolean(class_id) && Boolean(token), // class_id가 있을 때만 호출
  });
};

export const useGetMentorFeedbackList = () => {
  return useMutation({
    mutationFn: getMentorFeedbackList,
    onSuccess: (data) => {},
    onError: (error) => {},
  });
};

export const useSendFeedback = () => {
  return useMutation({
    mutationFn: sendFeedback,
    onSuccess: (data) => {
      alert("피드백이 전송되었습니다.");
    },
    onError: (error) => {
      alert("피드백 전송에 실패했습니다.");
    },
  });
};

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      alert("카테고리가 생성되었습니다.");
    },
    onError: (error) => {
      alert(
        `카테고리 생성에 실패했습니다: ${
          error.response?.data?.detail || error.message
        }`
      );
    },
  });
};

export const useGetCategoryList = () => {
  return useMutation({
    mutationFn: getCategoryList,
    onSuccess: (data) => {},
    onError: (error) => {},
  });
};

export const useGetAssignmentsByCategory = () => {
  return useMutation({
    mutationFn: getAssignmentsByCategory,
    onSuccess: (data) => {},
    onError: (error) => {},
  });
};
