import React from "react";
import CommonMainComponent from "../../components/CommonMainTitle";
import Assignment from "../../components/MainPageAssignment";
import CommonComponent from "../../components/CommonComponent";

// 멘토 페이지에서의 Assignment컴포넌트의 type
// 전체 과제 -> done / undone / halfDone (멘티들이 다 했는지에 따라)
// 패드백 모아보기 -> gaveFeedbackAll / gaveFeedbackFew / notGaveFeedbackAll (모든 멘티에게 피드백을 주었는지에 따라)

const MentorMainPage = () => {
  return (
    <div className="mx-14 mb-10">
      <CommonMainComponent />
      <div className="flex gap-5 mt-3">
        <CommonComponent componentTitle={"전체 과제"}>
          <Assignment type={"done"} />
          <Assignment type={"undone"} />
          <Assignment type={"halfDone"} />
        </CommonComponent>
        <CommonComponent componentTitle={"과제 생성"} />
        <CommonComponent componentTitle={"과제 피드백하기"}>
          <Assignment type={"gaveFeedbackAll"} />
          <Assignment type={"notGaveFeedbackAll"} />
          <Assignment type={"gaveFeedbackFew"} />
        </CommonComponent>
      </div>
    </div>
  );
};

export default MentorMainPage;
