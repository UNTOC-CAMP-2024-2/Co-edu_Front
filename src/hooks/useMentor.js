import { useMutation } from "@tanstack/react-query";
import { createAssignment } from "../api/mentor";
import { useContext } from "react";
import { Context } from "../AppProvider";

export const useCreateAssignment = () => {
  return useMutation({
    mutationFn: createAssignment,
    onSuccess: (data) => {
      console.log("과제 생성 성공", data);
      alert("과제가 생성되었습니다.");
    },
    onError: (error) => {
      console.log("과제 생성 실패", error);
      alert(
        `과제 생성에 실패했습니다: ${
          error.response?.data?.detail || error.message
        }`
      );
    },
  });
};
