import React from "react";
import CommonMainComponent from "../../components/CommonMainTitle";
import CommonComponent from "../../components/CommonComponent";
import Assignment from "../../components/MainPageAssignment";

// 멘티 페이지에서의 Assignment컴포넌트의 type
// 전체 과제 -> done / undone
// 내가 제출한 과제 -> done
// 패드백 모아보기 -> gotFeedback

const MenteeMainPage = () => {
  return (
    <div className="mx-14 mb-10">
      <CommonMainComponent />
      <div className="flex gap-5 mt-3">
        <CommonComponent componentTitle={"전체 과제"}>
          <Assignment type={"done"} />
          <Assignment type={"undone"} />
          <Assignment type={"done"} />
        </CommonComponent>
        <CommonComponent componentTitle={"내가 제출한 과제"}>
          <Assignment type={"done"} />
          <Assignment type={"done"} />
          <Assignment type={"done"} />
        </CommonComponent>
        <CommonComponent componentTitle={"과제 피드백하기"}>
          <Assignment type={"gotFeedback"} />
          <Assignment type={"gotFeedback"} />
          <Assignment type={"gotFeedback"} />
        </CommonComponent>
      </div>
    </div>
  );
};

export default MenteeMainPage;
