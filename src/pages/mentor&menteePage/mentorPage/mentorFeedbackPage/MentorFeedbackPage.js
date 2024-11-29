import React from "react";
import FeedbackPageAssignment from "../../components/FeedbackPageAssignment";

const MentorFeedbackPage = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-5 mb-10">
      <div className="text-lightBlack text-3xl p-14">피드백 모아보기</div>
      <div className="flex flex-col gap-5">
        <FeedbackPageAssignment type={"gaveFeedbackAll"} />
        <FeedbackPageAssignment type={"gaveFeedbackFew"} />
        <FeedbackPageAssignment type={"notGaveFeedbackAll"} />
        <FeedbackPageAssignment type={"gaveFeedbackAll"} />
      </div>
    </div>
  );
};

export default MentorFeedbackPage;
