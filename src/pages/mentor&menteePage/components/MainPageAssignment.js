import React from "react";
import { FaRegCircle } from "react-icons/fa";
import { VscTriangleRight } from "react-icons/vsc";
import { PiTriangleBold } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";

const Assignment = ({ type }) => {
  const dct = {
    done: <FaRegCircle color="#54CEA6" size={20} />,
    undone: <IoClose color="#FF6E6E" size={28} />,
    halfDone: <PiTriangleBold color="#FF6E6E" size={23} />,
    gotFeedback: <FaBookmark color="#FF6E6E" size={25} />,
    gaveFeedbackAll: <FaCheck color="#54CEA6" size={23} />,
    notGaveFeedbackAll: <PiTriangleBold color="#FF6E6E" size={23} />,
  };

  const icon = dct[type];

  return (
    <div className="flex items-center gap-3 border-2 border-gray rounded-xl bg-[#F5F5F5] w-[18rem] py-[0.7rem] px-3 cursor-pointer">
      {icon}
      <div className="text-lightBlack font-semibold text-lg">별 찍기 과제</div>
      <div className="flex-grow flex justify-end items-center">
        <VscTriangleRight color="#c4c4c4" size={25} />
      </div>
    </div>
  );
};

export default Assignment;
