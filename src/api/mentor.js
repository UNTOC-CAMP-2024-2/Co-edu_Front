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
