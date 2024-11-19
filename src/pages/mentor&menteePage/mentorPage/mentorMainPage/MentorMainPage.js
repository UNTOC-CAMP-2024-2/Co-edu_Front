import React from "react";
import CommonMainComponent from "../../components/CommonManTitle";
import studyIcon2 from "../../../../images/studyIcon2-1.png";
import studyIcon3 from "../../../../images/studyIcon3.png";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Assignment from "./components/Assignment";
import CommonComponent from "../../components/CommonComponent";

const MentorMainPage = () => {
  return (
    <div className="mx-14 mb-10">
      <CommonMainComponent />
      <div className="flex gap-5 mt-3">
        <CommonComponent componentTitle={"전체 과제"}>
          <Assignment />
          <Assignment />
          <Assignment />
        </CommonComponent>
        <CommonComponent componentTitle={"과제 생성"}>
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

export default MentorMainPage;
