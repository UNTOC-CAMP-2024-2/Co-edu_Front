import React from "react";
import AssignmentsListPageAssignment from "../../components/AssignmentsListPageAssignment";
import FeedbackPageAssignment from "../../components/FeedbackPageAssignment";

const MenteeFeedbackPage = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-5 mb-10">
      <div className="text-lightBlack text-3xl p-14">피드백 모아보기</div>
      <div className="flex flex-col gap-5">
        <FeedbackPageAssignment type={"gotFeedback"} />
        <FeedbackPageAssignment type={"gotFeedback"} />
        <FeedbackPageAssignment type={"gotFeedback"} />
        <FeedbackPageAssignment type={"gotFeedback"} />
      </div>
    </div>
  );
};

export default MenteeFeedbackPage;
