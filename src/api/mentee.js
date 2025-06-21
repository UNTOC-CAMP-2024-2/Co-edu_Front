import axiosInstance from ".";

export const getAssignmentList = async ({ token, classCode }) => {
  const response = await axiosInstance.get("/assign/status/mentee/all", {
    params: {
      class_id: classCode,
    },
    headers: {
      Authorization: `Bearer ${token}`,
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

export const submitCode = async ({ token, assignmentId, code, language }) => {
  const response = await axiosInstance.post(
    "/assign/submit",
    {
      assignment_id: assignmentId,
      code: code,
      language: language,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 0,
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
      timeout: 0,
    }
  );

  return response.data;
};

export const getFeedback = async ({ token, assignmentId }) => {
  const response = await axiosInstance.get("/assign/status/mentee", {
    params: {
      assignment_id: assignmentId,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getAllFeedback = async ({ token, classCode }) => {
  const response = await axiosInstance.get("/assign/myfeedbacks", {
    params: {
      class_id: classCode,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getSubmittedList = async ({ token, classCode }) => {
  const response = await axiosInstance.get("/assign/mysubmission", {
    params: {
      class_id: classCode,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getMenteeAssignmentStatus = async ({ token, assignmentId }) => {
  const response = await axiosInstance.get("/assign/status/maker", {
    params: {
      assignment_id: assignmentId,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const leave = async ({ token, class_code }) => {
  const response = await axiosInstance.delete("/classroom/leave", {
    data: {
      class_code: class_code,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getMenteeCodeData = async ({ token, assignmentId }) => {
  const response = await axiosInstance.get(
    `/assign/code_data/${assignmentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const runCodeAPI = async ({ token, code, language, input }) => {
  const response = await axiosInstance.post(
    "/live_classroom/runcode",
    {
      code,
      language,
      input,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
