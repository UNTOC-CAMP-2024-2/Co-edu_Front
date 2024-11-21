import React from "react";
import AssignmentsListPageAssignment from "../../components/AssignmentsListPageAssignment";

// 멘토 과제 목록 페이지에서의 Assignment컴포넌트의 type
// done / undone / halfDone (멘티들이 과제를 했는지에 따라)

const MentorAssignmentsListPage = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-5 mb-10">
      <div className="text-lightBlack text-3xl p-14">과제</div>
      <div className="flex flex-col gap-5">
        <AssignmentsListPageAssignment type={"done"} />
        <AssignmentsListPageAssignment type={"undone"} />
        <AssignmentsListPageAssignment type={"halfDone"} />
        <AssignmentsListPageAssignment type={"undone"} />
      </div>
    </div>
  );
};

export default MentorAssignmentsListPage;
