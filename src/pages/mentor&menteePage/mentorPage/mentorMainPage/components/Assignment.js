import React from "react";
import { FaRegCircle } from "react-icons/fa";
import { VscTriangleRight } from "react-icons/vsc";

const Assignment = () => {
  return (
    <div className="flex items-center gap-3 border-2 border-gray rounded-xl bg-[#F5F5F5] w-[18rem] py-[0.7rem] px-3 cursor-pointer">
      <FaRegCircle color="#54CEA6" size={20} />
      <div className="text-lightBlack font-semibold text-lg">별 찍기 과제</div>
      <div className="flex-grow flex justify-end items-center">
        <VscTriangleRight color="#c4c4c4" size={25} />
      </div>
    </div>
  );
};

export default Assignment;
