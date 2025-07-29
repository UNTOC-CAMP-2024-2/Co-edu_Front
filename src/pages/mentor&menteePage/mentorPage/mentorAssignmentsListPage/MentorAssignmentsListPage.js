import React, { useContext, useEffect, useState } from "react";
import AssignmentsListPageAssignment from "../../components/AssignmentsListPageAssignment";
import { useGetAssignmentList, useCreateCategory, useGetCategoryList, useGetAssignmentsByCategory } from "../../../../hooks/useMentor";
import { Context } from "../../../../AppProvider";
import { FaPlus } from "react-icons/fa";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";

// 멘토 과제 목록 페이지에서의 Assignment컴포넌트의 type
// done / undone / halfDone (멘티들이 과제를 했는지에 따라)

const MentorAssignmentsListPage = () => {
  const createCategoryMutation = useCreateCategory();
  const getCategoryListMutation = useGetCategoryList();
  const getAssignmentsByCategoryMutation = useGetAssignmentsByCategory();
  const [categoryName, setCategoryName] = useState("");
  const [categoryDesc, setCategoryDesc] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [openCategoryIds, setOpenCategoryIds] = useState([]); // 펼쳐진 카테고리 id 목록
  const [assignmentsByCategory, setAssignmentsByCategory] = useState({}); // { categoryId: [과제목록] }

  const { classCode, token } = useContext(Context);

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
  }, [token, classCode, showModal]);

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

  // 카테고리 생성 핸들러
  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (!categoryName) {
      alert("카테고리명을 입력하세요.");
      return;
    }
    createCategoryMutation.mutate({
      token,
      class_id: classCode,
      name: categoryName,
      description: categoryDesc,
    });
    setCategoryName("");
    setCategoryDesc("");
    setShowModal(false);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5 mb-10">
      <div className="relative w-full max-w-3xl mb-6 flex items-center justify-center">
        <div className="absolute left-0 -translate-x-full top-1/2 -translate-y-1/2">
          <button
            className="flex items-center justify-center bg-emerald-500 text-white rounded-full w-12 h-12 shadow-lg transition-colors duration-150 text-2xl focus:outline-none border-2 border-emerald-500 hover:bg-emerald-500 hover:text-white"
            onClick={() => setShowModal(true)}
            title="카테고리 추가"
          >
            <FaPlus />
          </button>
        </div>
        <div className="text-lightBlack text-3xl text-center w-full">과제</div>
      </div>
      {/* 카테고리 생성 모달 */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-2xl shadow-2xl p-8 min-w-[340px] flex flex-col items-center relative animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold focus:outline-none"
              onClick={() => setShowModal(false)}
              aria-label="모달 닫기"
            >
              ×
            </button>
            <div className="text-2xl font-bold mb-6 text-gray-800">카테고리 생성</div>
            <form onSubmit={handleCreateCategory} className="flex flex-col gap-4 w-full">
              <input
                type="text"
                placeholder="카테고리명"
                value={categoryName}
                onChange={e => setCategoryName(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mint text-gray-900 placeholder-gray-400 bg-gray-50"
              />
              <input
                type="text"
                placeholder="설명(선택)"
                value={categoryDesc}
                onChange={e => setCategoryDesc(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mint text-gray-900 placeholder-gray-400 bg-gray-50"
              />
              <div className="flex gap-2 mt-2 justify-end">
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-500 transition-colors px-5 py-2 rounded-lg text-white font-semibold shadow"
                >
                  생성
                </button>
                <button
                  type="button"
                  className="bg-gray-200 hover:bg-gray-300 transition-colors px-5 py-2 rounded-lg text-gray-700 font-semibold shadow"
                  onClick={() => setShowModal(false)}
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* 카테고리(주차) 목록 나열 및 토글 */}
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
                  <VscTriangleUp size={24} color="#54CEA6" />
                ) : (
                  <VscTriangleDown size={24} color="#c4c4c4" />
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
      {/* 모달 애니메이션 */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.25s ease; }
      `}</style>
    </div>
  );
};

export default MentorAssignmentsListPage;
