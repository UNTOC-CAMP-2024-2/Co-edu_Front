import React from "react";
import CommonMainComponent from "../../components/CommonMainTitle";
import CommonComponent from "../../components/CommonComponent";
import Assignment from "../../components/MainPageAssignment";

const MenteeMainPage = () => {
  return (
    <div className="mx-14 mb-10">
      <CommonMainComponent />
      <div className="flex gap-5 mt-3">
        <CommonComponent componentTitle={"전체 과제"}>
          <Assignment />
          <Assignment />
          <Assignment />
        </CommonComponent>
        <CommonComponent componentTitle={"내가 제출한 과제"}>
          <Assignment />
          <Assignment />
          <Assignment />
        </CommonComponent>
        <CommonComponent componentTitle={"과제 피드백하기"}>
          <Assignment />
          <Assignment />
          <Assignment />
        </CommonComponent>
      </div>
    </div>
  );
};

export default MenteeMainPage;
