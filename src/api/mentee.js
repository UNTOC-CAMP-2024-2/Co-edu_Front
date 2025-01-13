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

export const submitCode = async ({ token, assignmentId, code }) => {
  const response = await axiosInstance.post(
    "/assign/submit",
    {
      assignment_id: assignmentId,
      code: code,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const testCode = async ({ token, assignmentId, code, language }) => {
  const response = await axiosInstance.post(
    "/assign/test_assignment",
    {
      assignment_id: assignmentId,
      code,
      language,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
