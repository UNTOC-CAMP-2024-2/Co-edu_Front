import React, { useContext, useEffect, useState } from "react";
import AssignmentsListPageAssignment from "../../components/AssignmentsListPageAssignment";
import { useGetAssignmentsByCategory, useGetCategoryList } from "../../../../hooks/useMentee";
import { Context } from "../../../../AppProvider";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";

// 멘티 과제 목록 페이지에서의 Assignment컴포넌트의 type
// done / undone / gotFeedback

const MenteeAssignmentsListPage = () => {
  const getAssignmentsByCategoryMutation = useGetAssignmentsByCategory();
  const getCategoryListMutation = useGetCategoryList();
  const [categories, setCategories] = useState([]);
  const [openCategoryIds, setOpenCategoryIds] = useState([]); // 펼쳐진 카테고리 id 목록
  const [assignmentsByCategory, setAssignmentsByCategory] = useState({}); // { categoryId: [과제목록] }

  const { token, classCode } = useContext(Context);

  // 카테고리 목록 불러오기
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

  // 카테고리 토글 핸들러
  const handleToggleCategory = (categoryId) => {
    if (openCategoryIds.includes(categoryId)) {
      setOpenCategoryIds(openCategoryIds.filter((id) => id !== categoryId));
    } else {
      setOpenCategoryIds([...openCategoryIds, categoryId]);
      // 과제 목록이 없으면 불러오기
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
      <div className="text-lightBlack text-3xl p-14">과제</div>
      <div className="flex flex-col gap-2 w-full max-w-4xl">
        {categories.map((cat) => (
          <div key={cat.id} className="border rounded-xl bg-white shadow p-3 min-h-[50px] min-w-[600px] flex flex-col justify-center">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => handleToggleCategory(cat.id)}>
              <div className="flex items-center gap-4">
                <div className="font-semibold text-lg text-gray-800">{cat.name}</div>
                {cat.completion_stats && (
                  <div className="flex gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-gray-600">개인:</span>
                      <span className="font-medium text-blue-600">{cat.completion_stats.personal_completion_rate}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-600">전체:</span>
                      <span className="font-medium text-green-600">{cat.completion_stats.total_completion_rate}%</span>
                    </div>
                  </div>
                )}
              </div>
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
                    <AssignmentsListPageAssignment
                      key={assignment.assignment_id}
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

export default MenteeAssignmentsListPage;
