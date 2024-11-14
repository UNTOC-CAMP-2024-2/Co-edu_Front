import React from "react";

const StudyComponent = () => {
  return (
    <div className="min-w-[15rem] flex flex-col gap-2 cursor-pointer min-h-[15rem]">
      <div className="bg-black h-[9rem] rounded-lg"></div>
      <div className="text-sm">이것은 스터디인가 토크쇼인가 C++ 이해하기</div>
      <div className="flex gap-2 text-[#525252] text-sm">
        <div className="min-w-[3rem]">김태우</div>
        <div>|</div>
        <div className="flex flex-wrap">
          <div>월, 화, 수</div>
          <div>&nbsp;</div>
          <div>16 : 30 ~ 18 : 30</div>
        </div>
      </div>
    </div>
  );
};

export default StudyComponent;
