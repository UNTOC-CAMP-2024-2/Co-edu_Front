import React, { useContext, useEffect } from "react";
import CommonMainComponent from "../../components/CommonMainComponent";
import MainPageAssignment from "../../components/MainPageAssignment";
import CommonComponent from "../../components/CommonComponent";
import { useLocation } from "react-router-dom";
import { Context } from "../../../../AppProvider";

import { useFetchMentorTopThreeAssignments } from "../../../../hooks/useMentor";

// 멘토 페이지에서의 Assignment컴포넌트의 type
// 전체 과제 -> done / undone / halfDone (멘티들이 다 했는지에 따라)
// 패드백 모아보기 -> gaveFeedbackAll / gaveFeedbackFew / notGaveFeedbackAll (모든 멘티에게 피드백을 주었는지에 따라)

const MentorMainPage = () => {
  const data = useLocation().state;

  const { token, setClassCode } = useContext(Context);
  const {
    data: topThreeData,
    isLoading,
    isError,
  } = useFetchMentorTopThreeAssignments(data.class_code, token);

  useEffect(() => {
    setClassCode(data.class_code);
  }, []);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>데이터를 가져오는 데 실패했습니다.</div>;

  const assignments = topThreeData?.["상위 3개 과제"] || [];

  const feedbacks = topThreeData?.["상위 3개 과제 및 피드백 상태"] || [];

  return (
    <div className="mx-14 mb-10">
      <CommonMainComponent classroomData={data} />
      <div className="flex gap-5 mt-3">
        <CommonComponent componentTitle={"전체 과제"}>
          {isLoading ? (
            <div className="font-semibold text-darkMint">로딩 중...</div>
          ) : assignments.length === 0 ? (
            <div className="font-semibold text-darkMint">
              최근 과제가 없습니다.
            </div>
          ) : (
            assignments.map((assignment, index) => (
              <MainPageAssignment
                key={index}
                type={assignment.assignment_status}
                title={assignment.title}
                assignmentId={assignment.assignment_id}
              />
            ))
          )}
        </CommonComponent>
        <CommonComponent componentTitle={"과제 생성"} />
        <CommonComponent componentTitle={"과제 피드백"}>
          {isLoading ? (
            <div className="font-semibold text-darkMint">로딩 중...</div>
          ) : feedbacks.length === 0 ? (
            <div className="font-semibold text-darkMint">
              최근 과제가 없습니다.
            </div>
          ) : (
            feedbacks.map((feedback, index) => (
              <MainPageAssignment
                key={index}
                type={feedback.feedback_status}
                title={feedback.title}
                assignmentId={feedback.assignment_id}
              />
            ))
          )}
        </CommonComponent>
      </div>
    </div>
  );
};

export default MentorMainPage;
