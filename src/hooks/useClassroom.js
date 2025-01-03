import { useMutation } from "@tanstack/react-query";
import { createClassroom } from "../api/classroom";

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
