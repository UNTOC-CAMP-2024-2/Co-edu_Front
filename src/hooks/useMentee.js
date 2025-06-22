import { useMutation } from "@tanstack/react-query";
import {
  getAllFeedback,
  getAssignmentDetail,
  getAssignmentList,
  getFeedback,
  getSubmittedList,
  submitCode,
  testCode,
  getMenteeAssignmentStatus,
  leave,
  getMenteeCodeData,
  getCategoryList,
  getAssignmentsByCategory,
} from "../api/mentee";

export const useGetAssignmentList = () => {
  return useMutation({
    mutationFn: getAssignmentList,
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

export const useSubmitCode = () => {
  return useMutation({
    mutationFn: submitCode,
    onSuccess: (data) => {
      alert(data.status);
    },
    onError: (error) => {},
  });
};

export const useTestCode = () => {
  return useMutation({
    mutationFn: testCode,
    onSuccess: (data) => {},
    onError: (error) => {},
  });
};

export const useGetFeedback = () => {
  return useMutation({
    mutationFn: getFeedback,
    onSuccess: (data) => {},
    onError: (error) => {},
  });
};

export const useGetAllFeedback = () => {
  return useMutation({
    mutationFn: getAllFeedback,
    onSuccess: (data) => {},
    onError: (error) => {},
  });
};

export const useGetSubmittedList = () => {
  return useMutation({
    mutationFn: getSubmittedList,
    onSuccess: (data) => {},
    onError: (error) => {},
  });
};

export const useGetMenteeAssignmentStatus = () => {
  return useMutation({
    mutationFn: getMenteeAssignmentStatus,
    onSuccess: (data) => {},
    onError: (error) => {},
  });
};

export const useLeave = () => {
  return useMutation({
    mutationFn: leave,
    onSuccess: (data) => {},
    onError: (error) => {},
  });
};

export const useGetMenteeCodeData = () => {
  return useMutation({
    mutationFn: getMenteeCodeData,
    onSuccess: (data) => {},
    onError: (error) => {},
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
