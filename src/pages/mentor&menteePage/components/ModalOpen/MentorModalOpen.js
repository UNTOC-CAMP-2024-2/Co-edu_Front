import React from "react";

import { IoCloseSharp, IoBookmark } from "react-icons/io5";
import { FaRegCircle } from "react-icons/fa";
import { FiTriangle } from "react-icons/fi";
import { RiCloseLargeFill } from "react-icons/ri";

const MentorModalOpen = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="bg-black bg-opacity-45 fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="rounded-2xl bg-white shadow-lg shadow-[#575757] h-[30rem] w-[35rem] flex flex-col">
        <div className="rounded-t-2xl h-[2.5rem] bg-lightMint flex justify-start items-center px-2 gap-1 mb-[1rem]">
          <button
            className="bg-[#FF9780] rounded-full flex justify-center items-center p-1"
            onClick={onClose}
          >
            <IoCloseSharp color="white" size="16" />
          </button>
        </div>
        <ul className="py-[25px] px-[50px]">
          {/* 모달 내용 */}
          <div className="space-y-4">
            {/* 전체 과제 섹션 */}
            <div className="pb-[20px]">
              <h3 className="pl-[5px] pb-[8px] text-[22px] text-[#525252] font-bold mb-2">
                전체 과제
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <FaRegCircle className="text-[#54CEA6] " size={25} />
                  <span className="pl-[10px] text-[18px] text-[#525252] font-bold">
                    모든 멘티들의 과제 완료를 뜻함
                  </span>
                </li>
                <li className="flex items-center">
                  <FiTriangle className="text-[#FF6E6E]" size={25} />
                  <span className="pl-[10px] text-[18px] text-[#525252] font-bold">
                    일부 멘티들의 과제 완료를 뜻함
                  </span>
                </li>
                <li className="flex items-center">
                  <RiCloseLargeFill className="text-[#FF6E6E]" size={25} />
                  <span className="pl-[10px] text-[18px] text-[#525252] font-bold">
                    모든 멘티들의 과제 미완료를 뜻함
                  </span>
                </li>
              </ul>
            </div>

            {/* 과제 피드백 섹션 */}
            <div>
              <h3 className="pl-[5px] pb-[8px] text-[22px] text-[#525252] font-bold mb-2">
                과제 피드백 하기
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <FaRegCircle className="text-[#54CEA6]" size={25} />
                  <span className="pl-[10px] text-[18px] text-[#525252] font-bold">
                    모든 멘티들에게 피드백 완료를 뜻함
                  </span>
                </li>
                <li className="flex items-center">
                  <FiTriangle className="text-[#FF6E6E]" size={25} />
                  <span className="pl-[10px] text-[18px] text-[#525252] font-bold">
                    일부 멘티들에게 피드백 완료를 뜻함
                  </span>
                </li>
                <li className="flex items-center">
                  <RiCloseLargeFill className="text-[#FF6E6E]" size={25} />
                  <span className="pl-[10px] text-[18px] text-[#525252] font-bold">
                    모든 멘티들에게 피드백 미완료를 뜻함
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default MentorModalOpen;
