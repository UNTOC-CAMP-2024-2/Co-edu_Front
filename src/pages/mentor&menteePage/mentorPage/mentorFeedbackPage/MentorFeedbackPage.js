import React, { useContext, useEffect, useState } from "react";
import FeedbackPageAssignment from "./components/FeedbackPageAssignment";
import { Context } from "../../../../AppProvider";
import { useGetMentorFeedbackList } from "../../../../hooks/useMentor";

const MentorFeedbackPage = () => {
  const { token, classCode } = useContext(Context);
  const [feedbackData, setFeedbackData] = useState();
  const getMentorFeedbackListMutation = useGetMentorFeedbackList();

  useEffect(() => {
    getMentorFeedbackListMutation.mutate(
      { token, classCode },
      {
        onSuccess: (data) => {
          console.log("피드백 리스트", data);
          setFeedbackData(data);
        },
      }
    );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-5 mb-10">
      <div className="text-lightBlack text-3xl p-14">피드백 모아보기</div>
      <div className="flex flex-col gap-5">
        {/* <FeedbackPageAssignment type={"gaveFeedbackAll"} />
        <FeedbackPageAssignment type={"gaveFeedbackFew"} />
        <FeedbackPageAssignment type={"notGaveFeedbackAll"} />
        <FeedbackPageAssignment type={"gaveFeedbackAll"} /> */}
        {feedbackData &&
          feedbackData.map((feedback) => {
            console.log(feedback);
            return (
              <FeedbackPageAssignment
                type={feedback.assignment_status}
                assignmentTitle={feedback.title}
                description={feedback.description}
                assignmentId={feedback.assignment_id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default MentorFeedbackPage;
