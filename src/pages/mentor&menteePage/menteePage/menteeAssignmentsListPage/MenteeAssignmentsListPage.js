import React, { useContext, useEffect, useState } from "react";
import AssignmentsListPageAssignment from "../../components/AssignmentsListPageAssignment";
import { useGetAssignmentList } from "../../../../hooks/useMentee";
import { Context } from "../../../../AppProvider";

// 멘티 과제 목록 페이지에서의 Assignment컴포넌트의 type
// done / undone / gotFeedback

const MenteeAssignmentsListPage = () => {
  const getAssignmentListMutation = useGetAssignmentList();
  const [assignmentList, setAssignmentList] = useState();

  const { classCode } = useContext(Context);

  useEffect(() => {
    console.log(classCode);
    getAssignmentListMutation.mutate(
      { classCode },
      {
        onSuccess: (data) => {
          setAssignmentList(data);
        },
      }
    );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-5 mb-10">
      <div className="text-lightBlack text-3xl p-14">과제</div>
      <div className="flex flex-col gap-5">
        {assignmentList &&
          assignmentList.map((assignment) => {
            console.log(assignment);
            return (
              <AssignmentsListPageAssignment
                type={"done"}
                assignmentTitle={assignment.title}
                description={assignment.description}
                assignmentId={assignment.assignment_id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default MenteeAssignmentsListPage;
