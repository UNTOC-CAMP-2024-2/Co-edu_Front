import React from "react";
import untocImg from "../../../images/untocImg.png";

const StudyComponent = ({ detail, onClick }) => {
  return (
    <div
      className="min-w-[15rem] flex flex-col gap-2 cursor-pointer min-h-[15rem]"
      onClick={onClick}
    >
      <div className="bg-black h-[9rem] rounded-lg">
        <img
          src={untocImg}
          alt="untocImg"
          className="object-cover h-full w-full rounded-lg"
        />
      </div>
      <div className="text-sm">{detail.title}</div>
      <div className="flex gap-2 text-[#525252] text-sm">
        <div className="min-w-[3rem]">{detail.name}</div>
        <div>|</div>
        <div className="flex flex-wrap">
          <div>{detail.day}</div>
          <div>&nbsp;</div>
          <div>{detail.time}</div>
        </div>
      </div>
    </div>
  );
};

export default StudyComponent;
