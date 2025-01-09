import React, { useContext } from "react";
import AssignmentsListPageAssignment from "../../components/AssignmentsListPageAssignment";
import { useGetAssignmentList } from "../../../../hooks/useMentee";
import { Context } from "../../../../AppProvider";

// 멘티 과제 목록 페이지에서의 Assignment컴포넌트의 type
// done / undone / gotFeedback

const MenteeAssignmentsListPage = () => {
  const getAssignmentListMutation = useGetAssignmentList();

  const { classCode } = useContext(Context);
  console.log(classCode);

  return (
    <div className="flex flex-col items-center justify-center mt-5 mb-10">
      <div className="text-lightBlack text-3xl p-14">과제</div>
      <div className="flex flex-col gap-5">
        <AssignmentsListPageAssignment type={"done"} />
        <AssignmentsListPageAssignment type={"undone"} />
        <AssignmentsListPageAssignment type={"gotFeedback"} />
        <AssignmentsListPageAssignment type={"undone"} />
      </div>
    </div>
  );
};

export default MenteeAssignmentsListPage;
