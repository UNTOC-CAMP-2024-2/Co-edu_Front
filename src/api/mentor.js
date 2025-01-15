import axiosInstance from ".";

export const createAssignment = async ({ token, assignment }) => {
  const { class_id, title, description, testcase } = assignment;

  const response = await axiosInstance.post(
    "/assign/create",
    {
      class_id,
      title,
      description,
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

export const getMentorFeedbackList = async ({ token, classCode }) => {
  const response = await axiosInstance.get("/assign/status/maker/all", {
    params: {
      class_id: classCode,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
