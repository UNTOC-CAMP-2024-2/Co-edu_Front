import React, { useContext, useEffect } from "react";
import CommonMainComponent from "../../components/CommonMainTitle";
import MainPageAssignment from "../../components/MainPageAssignment";
import CommonComponent from "../../components/CommonComponent";
import { useLocation } from "react-router-dom";
import { Context } from "../../../../AppProvider";

// 멘토 페이지에서의 Assignment컴포넌트의 type
// 전체 과제 -> done / undone / halfDone (멘티들이 다 했는지에 따라)
// 패드백 모아보기 -> gaveFeedbackAll / gaveFeedbackFew / notGaveFeedbackAll (모든 멘티에게 피드백을 주었는지에 따라)

const MentorMainPage = () => {
  const data = useLocation().state;
  console.log(data);

  const { setClassCode } = useContext(Context);
  useEffect(() => {
    setClassCode(data.class_code);
  }, []);

  return (
    <div className="mx-14 mb-10">
      <CommonMainComponent classroomData={data} />
      <div className="flex gap-5 mt-3">
        <CommonComponent componentTitle={"전체 과제"}>
          <MainPageAssignment type={"done"} />
          <MainPageAssignment type={"undone"} />
          <MainPageAssignment type={"halfDone"} />
        </CommonComponent>
        <CommonComponent componentTitle={"과제 생성"} />
        <CommonComponent componentTitle={"과제 피드백"}>
          <MainPageAssignment type={"gaveFeedbackAll"} />
          <MainPageAssignment type={"notGaveFeedbackAll"} />
          <MainPageAssignment type={"gaveFeedbackFew"} />
        </CommonComponent>
      </div>
    </div>
  );
};

export default MentorMainPage;
