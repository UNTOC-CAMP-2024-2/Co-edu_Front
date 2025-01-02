import React from "react";
import { useParams } from "react-router-dom";
import announcements from "./announcementData";

const AnnouncementDetailPage = () => {
  const { id } = useParams();
  const announcement = announcements.find((a) => a.id === parseInt(id));

  if (!announcement) {
    return (
      <div className="p-6 mx-[330px] border rounded-[20px] bg-white">
        해당 공지를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-gray-100">
      <div className="p-6 w-[960px] border rounded-[20px] bg-white text-center">
        <h1 className="text-[30px] font-extrabold mb-4">
          {announcement.title}
        </h1>
        <p className="text-[20px] leading-[1.8]">{announcement.content}</p>
      </div>
    </div>
  );
};

export default AnnouncementDetailPage;
