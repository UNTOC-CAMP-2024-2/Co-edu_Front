import axiosInstance from ".";

export const getAssignmentList = async ({ classCode }) => {
  const response = await axiosInstance.get("/assign/class_assignments", {
    params: {
      class_id: classCode,
    },
  });
  return response.data;
};

export const getAssignmentDetail = async ({ assignmentId }) => {
  const response = await axiosInstance.get("/assign/info", {
    params: {
      assignment_id: assignmentId,
    },
  });
  return response.data;
};
