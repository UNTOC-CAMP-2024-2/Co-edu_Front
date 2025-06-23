import React, { useContext, useEffect, useState } from "react";
import FeedbackPageAssignment from "./components/FeedbackPageAssignment";
import { Context } from "../../../../AppProvider";
import { useGetCategoryList, useGetAssignmentsByCategory } from "../../../../hooks/useMentor";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";

const MentorFeedbackPage = () => {
  const { token, classCode } = useContext(Context);
  const getCategoryListMutation = useGetCategoryList();
  const getAssignmentsByCategoryMutation = useGetAssignmentsByCategory();
  const [categories, setCategories] = useState([]);
  const [openCategoryIds, setOpenCategoryIds] = useState([]);
  const [assignmentsByCategory, setAssignmentsByCategory] = useState({});

  useEffect(() => {
    getCategoryListMutation.mutate(
      { token, classCode },
      {
        onSuccess: (data) => {
          setCategories(data);
        },
      }
    );
  }, [token, classCode]);

  const handleToggleCategory = (categoryId) => {
    if (openCategoryIds.includes(categoryId)) {
      setOpenCategoryIds(openCategoryIds.filter((id) => id !== categoryId));
    } else {
      setOpenCategoryIds([...openCategoryIds, categoryId]);
      if (!assignmentsByCategory[categoryId]) {
        getAssignmentsByCategoryMutation.mutate(
          { token, categoryId },
          {
            onSuccess: (data) => {
              setAssignmentsByCategory((prev) => ({ ...prev, [categoryId]: data }));
            },
          }
        );
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5 mb-10">
      <div className="text-lightBlack text-3xl p-14">피드백 모아보기</div>
      <div className="flex flex-col gap-2 w-full max-w-4xl">
        {categories.map((cat) => (
          <div key={cat.id} className="border rounded-xl bg-white shadow p-3 min-h-[50px] min-w-[600px] flex flex-col justify-center">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => handleToggleCategory(cat.id)}>
              <div className="font-semibold text-lg text-gray-800">{cat.name}</div>
              <button className="ml-2 focus:outline-none">
                {openCategoryIds.includes(cat.id) ? (
                  <VscTriangleUp size={24} color='#54CEA6' />
                ) : (
                  <VscTriangleDown size={24} color='#c4c4c4' />
                )}
              </button>
            </div>
            {openCategoryIds.includes(cat.id) && (
              <div className="flex flex-col gap-2 mt-2">
                {assignmentsByCategory[cat.id] && assignmentsByCategory[cat.id].length > 0 ? (
                  assignmentsByCategory[cat.id].map((assignment) => (
                    <FeedbackPageAssignment
                      key={assignment.assignment_id}
                      type={assignment.assignment_status}
                      assignmentTitle={assignment.title}
                      description={assignment.description}
                      assignmentId={assignment.assignment_id}
                    />
                  ))
                ) : (
                  <div className="text-gray-400 text-center py-2 text-sm">과제가 없습니다.</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorFeedbackPage;
