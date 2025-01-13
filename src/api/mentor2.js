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

export const editAssignment = async ({ token, assignment }) => {
  const { assignment_id, description, title, testcase } = assignment;

  const response = await axiosInstance.post(
    "/assign/modify",
    {
      assignment_id,
      description,
      title,
      testcase,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
