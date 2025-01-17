import React from "react";
import { GiCheckMark } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const MenteeSubmitList = ({
  name,
  date,
  isSubmitted,
  score,
  assignmentId,
  code,
}) => {
  const navigate = useNavigate();
  const handleFeedbackClick = (e) => {
    e.preventDefault(); // 부모 컴포넌트의 onClick 이벤트 방지
    if (isSubmitted) {
      navigate("/mentor/doFeedback", {
        state: {
          assignmentId: assignmentId,
          menteeName: name,
        },
      });
    }
  };

  return (
    <div className="grid grid-cols-4 items-center gap-4 py-2 px-4 ">
      <div className="text-feedbackTextColor font-semibold text-sm truncate">
        {name}
      </div>
      <div className="text-feedbackTextColor font-semibold text-sm">{date}</div>
      <div
        className={`font-semibold text-sm w-32 flex justify-center ${
          isSubmitted ? "text-feedbackTextColor" : "text-notSubmittedRed"
        } whitespace-nowrap overflow-hidden text-ellipsis`}
      >
        {isSubmitted ? `제출 완료${score ? `(${score}점)` : ""}` : "미제출"}
      </div>

      <button
        className={`font-semibold text-sm flex gap-1 items-center px-2 py-1 rounded ${
          isSubmitted
            ? "text-feedbackTextColor bg-white cursor-pointer"
            : "text-[#D9D9D9] bg-[#F5F5F5] cursor-not-allowed"
        }`}
        onClick={handleFeedbackClick}
        disabled={!isSubmitted} // 비활성화 상태일 때 클릭 불가
      >
        <GiCheckMark size={15} />
        <div>피드백 하기</div>
      </button>
    </div>
  );
};

export default MenteeSubmitList;
