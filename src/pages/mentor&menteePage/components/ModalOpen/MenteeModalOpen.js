import React from "react";
import { IoCloseSharp, IoBookmark } from "react-icons/io5";
import { FaRegCircle } from "react-icons/fa";
import { RiCloseLargeFill } from "react-icons/ri";

const MenteeModalOpen = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="bg-black bg-opacity-45 fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="rounded-2xl bg-white shadow-lg shadow-[#575757] h-[15rem] w-[30rem] flex flex-col">
        <div className="rounded-t-2xl h-[2.5rem] bg-lightMint flex justify-start items-center px-2 gap-1 mb-[1rem]">
          <button
            className="bg-[#FF9780] rounded-full flex justify-center items-center p-1"
            onClick={onClose}
          >
            <IoCloseSharp color="white" size="16" />
          </button>
        </div>
        <div className="p-4">
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <IoBookmark className="text-[#FF8B8B] " size={30} />
              <span className="pl-[10px] text-[18px] text-[#525252] font-bold">
                완료된 과제에 대하여 멘토의 피드백이 달렸음
              </span>
            </li>
            <li className="flex items-center gap-2">
              <FaRegCircle className="text-[#54CEA6] " size={30} />
              <span className="pl-[10px] text-[18px] text-[#525252] font-bold">
                과제 완료
              </span>
            </li>
            <li className="flex items-center gap-2">
              <RiCloseLargeFill className="text-[#FF6E6E]" size={30} />
              <span className="pl-[10px] text-[18px] text-[#525252] font-bold">
                과제 미완료
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MenteeModalOpen;
