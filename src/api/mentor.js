import axiosInstance from ".";

export const createAssignment = async ({ token, assignment }) => {
  const { class_id, category_id, title, description, testcase } = assignment;

  const response = await axiosInstance.post(
    "/assign/create",
    {
      class_id,
      category_id,
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
  const { assignment_id, description, title, testcase, category_id } = assignment;

  const response = await axiosInstance.post(
    "/assign/modify",
    {
      assignment_id,
      description,
      title,
      testcase,
      category_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const fetchMentorTopThreeAssignments = async (class_id, token) => {
  const response = await axiosInstance.get("/assign/mentor_return_three", {
    headers: {
      Authorization: `Bearer ${token}`, // 토큰 추가
    },
    params: { class_id }, // Query parameter
  });
  return response.data;
};

export const fetchMenteeTopThreeAssignments = async (class_id, token) => {
  const response = await axiosInstance.get("/assign/mentee_return_three", {
    headers: {
      Authorization: `Bearer ${token}`, // 토큰 추가
    },
    params: { class_id }, // Query parameter
  });
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

export const sendFeedback = async ({
  token,
  assignmentId,
  menteeId,
  feedback,
}) => {
  const response = await axiosInstance.post(
    "/assign/feedback",
    {
      assignment_id: assignmentId,
      mentee_id: menteeId,
      feedback,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const createCategory = async ({ token, class_id, name, description }) => {
  const response = await axiosInstance.post(
    "/assign/category",
    {
      class_id,
      name,
      description,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getCategoryList = async ({ token, classCode }) => {
  const response = await axiosInstance.get("/assign/categories", {
    params: {
      class_id: classCode,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAssignmentsByCategory = async ({ token, categoryId }) => {
  const response = await axiosInstance.get(`/assign/status/mentee/category/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
