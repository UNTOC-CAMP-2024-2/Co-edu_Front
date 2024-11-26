import React from "react";
import { GiCheckMark } from "react-icons/gi";

const MenteeSubmitList = () => {
  return (
    <div className="flex gap-10 justify-evenly">
      <div className="text-feedbackTextColor font-semibold text-sm">김효정</div>
      <div className="text-feedbackTextColor font-semibold text-sm">
        2024.01.09
      </div>
      <div className="text-feedbackTextColor font-semibold text-sm">
        제출완료
      </div>
      <button className="text-feedbackTextColor font-semibold text-sm flex gap-1">
        <GiCheckMark size={15} />
        <div>피드백 하기</div>
      </button>
    </div>
  );
};

export default MenteeSubmitList;
