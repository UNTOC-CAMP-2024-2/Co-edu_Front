import axiosInstance from ".";

export const createClassroom = async ({ token, isButtonPressed }) => {
  const {
    studyName,
    introduction,
    selectedDay,
    time,
    studyNumber,
    visibility,
    joinType,
    link,
  } = isButtonPressed;
  const dayInKorean = {
    Mon: "월",
    Tue: "화",
    Wed: "수",
    Thu: "목",
    Fri: "금",
    Sat: "토",
    Sun: "일",
  };
  const day = Object.entries(selectedDay)
    .filter(([day, value]) => value)
    .map(([day, value]) => dayInKorean[day])
    .join(", ");
  const response = await axiosInstance.post(
    "/classroom/create",
    {
      class_name: studyName,
      description: introduction,
      max_member: parseInt(studyNumber),
      current_member: 1,
      day,
      start_time: time.start,
      end_time: time.end,
      link,
      is_access: visibility === "public",
      is_free: joinType === "free",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const submitClassroomCode = async ({ token, class_code }) => {
  const response = await axiosInstance.put(
    "/classroom/join",
    {
      class_code,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const searchClassroom = async ({ search }) => {
  const response = await axiosInstance.get("/classroom/search_classroom", {
    params: {
      search,
    },
  });
  return response.data;
};

export const getMyClassroom = async ({ token }) => {
  if (!token) {
    throw new Error("토큰이 필요합니다.");
  }

  const response = await axiosInstance.get("/classroom/myclassroom", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const AmIbelongtoClassroom = async ({ token, class_code }) => {
  const response = await axiosInstance.get("/classroom/class_info", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      class_code,
    },
  });
  return response.data;
};

export const getClassroomInfo = async ({ token, class_code }) => {
  const response = await axiosInstance.get("/classroom/show_edit", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      class_code,
    },
  });
  return response.data;
};

export const approveMember = async ({ user_id, class_code, token }) => {
  const response = await axiosInstance.post(
    "/classroom/approve",
    { user_id, class_code },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const denyMember = async ({ user_id, class_code, token }) => {
  const response = await axiosInstance.delete("/classroom/deny", {
    data: { user_id, class_code },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const kickMember = async ({ kick_user, class_code, token }) => {
  const response = await axiosInstance.delete("/classroom/kick_user", {
    data: { class_code, kick_user },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const editClassInfo = async ({
  class_code,
  class_name,
  description,
  max_member,
  day,
  start_time,
  end_time,
  is_access,
  is_free,
  link,
  token,
}) => {
  const response = await axiosInstance.patch(
    "/classroom/edit_classinfo",
    {
      class_code,
      class_name,
      description,
      max_member,
      day,
      start_time,
      end_time,
      is_access,
      is_free,
      link,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
