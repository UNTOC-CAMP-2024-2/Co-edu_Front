import React from "react";

const StudyComponent = ({ detail, onClick }) => {
  return (
    <div
      className="min-w-[15rem] flex flex-col gap-2 cursor-pointer min-h-[15rem]"
      onClick={onClick}
    >
      <div className="bg-black h-[9rem] rounded-lg"></div>
      <div className="text-[13px] text-black mb-[2px]">
        {detail.title || "제목 없음"}
      </div>
      <div className="flex justify-center items-center text-[12px] text-[#525252]">
        <div className="mx-[1px]">{detail.name || "스터디장 없음"}</div>
        <span className="mx-[2px] ">|</span>
        <div className="flex flex-wrap">
          <div className="mr-[4px] ">{detail.day || "요일 정보 없음"}</div>
          <div>{detail.time || "시간 정보 없음"}</div>
        </div>
      </div>
    </div>
  );
};

export default StudyComponent;
