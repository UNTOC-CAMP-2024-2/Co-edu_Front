import React from "react";
import FeedbackAssignment from "./components/FeedbackAssignment";

const MentorFeedbackPage = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-5 mb-10">
      <div className="text-lightBlack text-3xl p-14">피드백 모아보기</div>
      <div className="flex flex-col gap-5">
        <FeedbackAssignment type={"gaveFeedbackAll"} />
        <FeedbackAssignment type={"gaveFeedbackFew"} />
        <FeedbackAssignment type={"notGaveFeedbackAll"} />
        <FeedbackAssignment type={"gaveFeedbackAll"} />
      </div>
    </div>
  );
};

export default MentorFeedbackPage;
