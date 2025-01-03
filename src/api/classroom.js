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
      is_access: joinType === "public",
      is_free: visibility === "free",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
