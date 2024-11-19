import React from "react";
import { FaArrowCircleRight } from "react-icons/fa";

const CommonMainComponent = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="mx-5 mt-10 flex flex-col gap-2">
        <div className="text-3xl text-lightBlack font-semibold">
          이것은 스터디인가 토크쇼인가 C++ 이해하기
        </div>
        <div className="flex justify-end">
          <div className="w-[20rem] flex flex-col justify-center items-center gap-3">
            <div className="inline-block">
              <div className="text-studyBlack">👑김태우</div>
              <div className="text-studyBlack">월, 수 16 : 30 ~ 18 : 30 ✏️</div>
            </div>
            <button className="flex gap-3 border-3 border-lightMint rounded-full px-4 py-3">
              <div className="text-darkMint tracking-tighter text-xl font-semibold">
                스터디 방으로 이동
              </div>
              <FaArrowCircleRight color="#54CEA6" size={30} />
            </button>
          </div>
        </div>
      </div>
      <hr className="my-2 bg-darkMint h-[3px] border-0 opacity-100" />
    </div>
  );
};

export default CommonMainComponent;
