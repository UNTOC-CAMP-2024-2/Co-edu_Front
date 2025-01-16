import React, { useContext, useEffect } from "react";
import CommonMainComponent from "../../components/CommonMainComponent";
import CommonComponent from "../../components/CommonComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../../../AppProvider";
import { useFetchMenteeTopThreeAssignments } from "../../../../hooks/useMentor";
import MainPageAssignment from "../../components/MainPageAssignment";

// 멘티 페이지에서의 Assignment컴포넌트의 type
// 전체 과제 -> done / undone
// 내가 제출한 과제 -> done
// 패드백 모아보기 -> gotFeedback

const MenteeMainPage = () => {
  const data = useLocation().state;
  console.log(data);

  const { token, setClassCode } = useContext(Context);
  const {
    data: topThreeData,
    isLoading,
    isError,
  } = useFetchMenteeTopThreeAssignments(data.class_code, token);

  useEffect(() => {
    setClassCode(data.class_code);
  }, []);
  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>데이터를 가져오는 데 실패했습니다.</div>;

  console.log("Top 3 Data:", topThreeData); // 데이터 출력

  const assignments = topThreeData?.["상위 3개 과제"] || [];

  const feedbacks = topThreeData?.["상위 3개 과제 및 피드백 상태"] || [];

  const submits = topThreeData?.["제출한 상위 3개 과제"] || [];

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
            assignments.map((assignment, index) => {
              console.log(assignment);
              return (
                <MainPageAssignment
                  key={index}
                  type={assignment.status}
                  title={assignment.title}
                  assignmentId={assignment.assignment_id}
                />
              );
            })
          )}
        </CommonComponent>
        <CommonComponent componentTitle={"내가 제출한 과제"}>
          {isLoading ? (
            <div className="font-semibold text-darkMint">로딩 중...</div>
          ) : submits.length === 0 ? (
            <div className="font-semibold text-darkMint">
              제출한 과제가 없습니다.
            </div>
          ) : (
            submits.map((submit, index) => (
              <MainPageAssignment
                key={index}
                type={submit.status}
                title={submit.title}
                assignmentId={submit.assignment_id}
              />
            ))
          )}
        </CommonComponent>
        <CommonComponent componentTitle={"과제 피드백"}>
          {isLoading ? (
            <div className="font-semibold text-darkMint">로딩 중...</div>
          ) : feedbacks.length === 0 ? (
            <div className="font-semibold text-darkMint">
              피드백 받은 과제가 없습니다.
            </div>
          ) : (
            feedbacks.map((feedback, index) => (
              <MainPageAssignment
                key={index}
                type={feedback.status}
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

export default MenteeMainPage;
