import React, { useEffect, useState } from "react";
import { VscTriangleDown } from "react-icons/vsc";
import { VscTriangleUp } from "react-icons/vsc";
import { FaRegCircle } from "react-icons/fa";
import { PiTriangleBold } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import MenteeSubmitList from "./MenteeSubmitList";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetMenteeAssignmentStatus } from "../../../../../hooks/useMentee";
import { useContext } from "react";
import { Context } from "../../../../../AppProvider";

const FeedbackPageAssignment = ({
  type,
  assignmentTitle = "",
  description = "",
  assignmentId,
}) => {
  const { token } = useContext(Context);
  const [showDescription, setShowDescription] = useState(false);
  const navigate = useNavigate();
  const pathname = useLocation().pathname.split("/")[1];
  const getMenteeAssignmentStatusMutation = useGetMenteeAssignmentStatus();
  const [menteeFeedbackData, setMenteeFeedbackData] = useState([]);

  useEffect(() => {
    getMenteeAssignmentStatusMutation.mutate(
      { token, assignmentId },
      {
        onSuccess: (data) => {
          console.log("멘티 피드백 리스트 연결해야함!!!", data);
          setMenteeFeedbackData(data);
        },
      }
    );
  }, []);

  const calculateScore = (detailedResult) => {
    if (!Array.isArray(detailedResult) || detailedResult.length === 0) return 0; // 배열이 아니거나 항목이 없으면 0점
    const totalCases = detailedResult.length; // 전체 항목 수
    const passedCases = detailedResult.filter(
      (item) => item.result === "Pass"
    ).length; // Pass된 항목 수
    return Math.round((passedCases / totalCases) * 100); // 100점 만점으로 계산
  };

  const dct = {
    done: <FaRegCircle color="#54CEA6" size={20} />,
    undone: <IoClose color="#FF6E6E" size={28} />,
    halfDone: <PiTriangleBold color="#FF6E6E" size={23} />,
    gotFeedback: <FaBookmark color="#FF6E6E" size={25} />,
    gaveFeedbackAll: <FaCheck color="#54CEA6" size={23} />,
    notGaveFeedbackAll: <PiTriangleBold color="#FF6E6E" size={23} />,
    gaveFeedbackFew: <IoClose color="#FF6E6E" size={28} />,
  };

  const icon = dct[type];

  return (
    <div
      className={`border-2 rounded-xl w-[50rem] py-[0.7rem] px-3 cursor-pointer ${
        type === "gotFeedback"
          ? "border-darkRed bg-lightRed"
          : showDescription
          ? "border-lightMint bg-white"
          : "border-gray bg-[#F5F5F5]"
      }`}
      onClick={(e) => {
        if (!e.defaultPrevented) {
          // 이벤트가 preventDefault로 막히지 않은 경우에만 navigate 실행
          navigate(`/${pathname}/read`, { state: { assignmentId } });
        }
      }}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 flex justify-center">{icon}</div>
        <div className="text-lightBlack font-semibold text-lg">
          {assignmentTitle}
        </div>
        <div className="flex-grow flex justify-end items-center">
          <button
            onClick={(e) => {
              e.stopPropagation(); // 이벤트 버블링 방지
              setShowDescription((prev) => !prev);
            }}
          >
            {showDescription ? (
              <VscTriangleUp
                color={type === "gotFeedback" ? "#FF8B8B" : "#a8e6cf"}
                size={25}
              />
            ) : (
              <VscTriangleDown
                color={type === "gotFeedback" ? "#FF8B8B" : "#c4c4c4"}
                size={25}
              />
            )}
          </button>
        </div>
      </div>
      {showDescription && (
        <>
          <div className="text-lightBlack pt-3 pb-1 px-3 line-clamp-2">
            {description}
          </div>
          <div className="flex flex-col gap-3 pt-3 pb-6">
            {/* <MenteeSubmitList
              name={"김효정"}
              date={"2024.01.09"}
              isSubmitted={true}
            /> */}
            {menteeFeedbackData && menteeFeedbackData.submissions.length > 0 ? (
              menteeFeedbackData.submissions.map((menteeFeedback) => {
                const score = calculateScore(menteeFeedback.detailed_result); // 점수 계산

                // isSubmitted 값 계산
                const isSubmitted =
                  menteeFeedback.status === false
                    ? false
                    : menteeFeedback.status !== false;

                return (
                  <MenteeSubmitList
                    key={menteeFeedback.user_id}
                    name={menteeFeedback.user_id}
                    date={menteeFeedback.submitted_at || ""}
                    isSubmitted={isSubmitted}
                    score={score} // 점수 전달
                    code={menteeFeedback.code || ""}
                    assignmentId={assignmentId}
                  />
                );
              })
            ) : (
              <div className="flex items-center justify-center h-[35px]">
                <div className="text-[#D9D9D9] font-semibold text-[16px]">
                  멘티 없음
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FeedbackPageAssignment;
