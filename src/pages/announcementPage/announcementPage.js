import React from "react";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import announcements from "./announcementData";

const AnnouncementPage = () => {
  return (
    <div className="p-6">
      {announcements.map((announcement) => (
        <div
          key={announcement.id}
          className="relative mx-[330px] mb-4 border rounded-[20px] p-[25px] bg-white flex flex-col justify-between"
          style={{ height: "150px" }}
        >
          <div className="flex justify-between items-start">
            <h3 className="text-[22px] mb-[10px] font-extrabold text-black">
              {announcement.title}
            </h3>
            <IoCloseSharp className="text-[#D9D9D9] cursor-pointer" size={25} />
          </div>
          <p
            className="text-[18px] mt-2 flex-grow overflow-hidden text-ellipsis"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
            }}
          >
            {announcement.content}
          </p>
          <Link
            to={`/detailannouncement/${announcement.id}`}
            className="absolute bottom-[10px] right-[20px] text-[#C4C4C4] cursor-pointer text-[14px] font-extrabold"
          >
            더보기
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AnnouncementPage;
