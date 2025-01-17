import React, { useContext, useEffect, useState } from "react";
import AssignmentsListPageAssignment from "../../components/AssignmentsListPageAssignment";
import { useGetAssignmentList } from "../../../../hooks/useMentee";
import { Context } from "../../../../AppProvider";

// 멘티 과제 목록 페이지에서의 Assignment컴포넌트의 type
// done / undone / gotFeedback

const MenteeAssignmentsListPage = () => {
  const getAssignmentListMutation = useGetAssignmentList();
  const [assignmentList, setAssignmentList] = useState();

  const { token, classCode } = useContext(Context);

  useEffect(() => {
    getAssignmentListMutation.mutate(
      { token, classCode },
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
            return (
              <AssignmentsListPageAssignment
                type={
                  !assignment.status
                    ? "undone"
                    : assignment.feedback
                    ? "gotFeedback"
                    : "done"
                }
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
