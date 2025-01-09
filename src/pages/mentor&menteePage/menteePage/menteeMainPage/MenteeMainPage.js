import React, { useContext, useEffect } from "react";
import CommonMainComponent from "../../components/CommonMainTitle";
import CommonComponent from "../../components/CommonComponent";
import MainPageAssignment from "../../components/MainPageAssignment";
import { useLocation } from "react-router-dom";
import { Context } from "../../../../AppProvider";

// 멘티 페이지에서의 Assignment컴포넌트의 type
// 전체 과제 -> done / undone
// 내가 제출한 과제 -> done
// 패드백 모아보기 -> gotFeedback

const MenteeMainPage = () => {
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
          <MainPageAssignment type={"done"} />
        </CommonComponent>
        <CommonComponent componentTitle={"내가 제출한 과제"}>
          <MainPageAssignment type={"done"} />
          <MainPageAssignment type={"done"} />
          <MainPageAssignment type={"done"} />
        </CommonComponent>
        <CommonComponent componentTitle={"과제 피드백"}>
          <MainPageAssignment type={"gotFeedback"} />
          <MainPageAssignment type={"gotFeedback"} />
          <MainPageAssignment type={"gotFeedback"} />
        </CommonComponent>
      </div>
    </div>
  );
};

export default MenteeMainPage;
