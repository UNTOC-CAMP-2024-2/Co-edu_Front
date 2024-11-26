import React from "react";
import { GiCheckMark } from "react-icons/gi";

const MenteeSubmitList = ({ name, date, isSubmitted }) => {
  return (
    <div className="flex gap-10 justify-evenly">
      <div className="text-feedbackTextColor font-semibold text-sm">{name}</div>
      <div className="text-feedbackTextColor font-semibold text-sm">{date}</div>
      <div
        className={`font-semibold text-sm w-16 flex justify-center ${
          isSubmitted ? "text-feedbackTextColor" : "text-notSubmittedRed"
        }`}
      >
        {isSubmitted ? "제출 완료" : "미제출"}
      </div>
      <button
        className={`text-feedbackTextColor font-semibold text-sm flex gap-1 ${
          isSubmitted || "text-cantClickGray cursor-not-allowed"
        }`}
        disabled={!isSubmitted}
      >
        <GiCheckMark size={15} />
        <div>피드백 하기</div>
      </button>
    </div>
  );
};

export default MenteeSubmitList;
