import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useEditAssignment,
  useGetAssignmentDetail,
  useGetCategoryList,
} from "../../../../hooks/useMentor";
import { Context } from "../../../../AppProvider";
import { FiPlus, FiMinus } from "react-icons/fi";

const MentorEditAssignmentPage = () => {
  const { token, classCode } = useContext(Context);
  const { assignmentId } = useLocation().state;
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const getAssignmentDetailMutation = useGetAssignmentDetail();
  const editAssignmentMutation = useEditAssignment();
  const getCategoryListMutation = useGetCategoryList();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [timeLimit, setTimeLimit] = useState("");

  useEffect(() => {
    if (!assignmentId) {
      alert("과제 ID가 없습니다. 다시 시도해주세요.");
      navigate(-1); // 이전 페이지로 이동
      return;
    }

    if (assignmentId) {
      getAssignmentDetailMutation.mutate(
        { assignmentId },
        {
          onSuccess: (data) => {
            setAssignment({
              title: data.title,
              description: data.description,
              examples: data.testcases.map((testcase) => ({
                input: testcase.input || "",
                output: testcase.expected_output,
              })),
              category_id: String(data.category_id || ""),
            });
            setSelectedCategory(String(data.category_id || ""));
            setTimeLimit(data.time_limit ? String(data.time_limit) : "");
          },
          onError: (error) => {
            alert("과제 데이터를 불러오는 데 실패했습니다.");
          },
        }
      );
    }
  }, [assignmentId, token, navigate]);

  useEffect(() => {
    if (!token || !classCode) return;
    getCategoryListMutation.mutate(
      { token, classCode },
      {
        onSuccess: (data) => {
          setCategories(data);
        },
      }
    );
  }, [token, classCode]);

  // 카테고리 목록이나 assignment가 바뀔 때 드롭다운을 현재 과제 카테고리로 맞춤
  useEffect(() => {
    if (categories.length > 0) {
      if (assignment && assignment.category_id) {
        const found = categories.find(cat => String(cat.id) === String(assignment.category_id));
        if (found) {
          setSelectedCategory(String(found.id));
          return;
        }
      }
      // assignment.category_id가 없거나 목록에 없으면 첫 번째 카테고리로 자동 선택
      setSelectedCategory(String(categories[0].id));
    }
  }, [categories, assignment]);

  // 데이터 업데이트 핸들러
  const handleChange = (field, value) => {
    setAssignment((prev) => ({ ...prev, [field]: value }));
  };

  const handleExampleChange = (index, field, value) => {
    setAssignment((prev) => {
      const updatedExamples = [...prev.examples];
      updatedExamples[index][field] = value;
      return { ...prev, examples: updatedExamples };
    });
  };

  const handleSave = () => {
    if (!token) {
      alert("로그인이 필요합니다.");
      // navigate("/login");
      return;
    }

    if (!assignment.title || !assignment.description) {
      alert("과제 명과 설명을 입력해주세요.");
      return;
    }

    if (!selectedCategory) {
      alert("카테고리를 선택해주세요.");
      return;
    }

    if (
      assignment.examples.some((example) => !example.input || !example.output)
    ) {
      alert("예제 입력과 출력을 모두 입력해주세요.");
      return;
    }

    if (!timeLimit || isNaN(Number(timeLimit)) || Number(timeLimit) <= 0) {
      alert("실행 시간 제한(초)을 올바르게 입력해주세요.");
      return;
    }

    const testcases = assignment.examples.map((example) => ({
      input_data: example.input,
      expected_output: example.output,
    }));

    editAssignmentMutation.mutate(
      {
        token,
        assignment: {
          assignment_id: String(assignmentId),
          description: assignment.description,
          title: assignment.title,
          testcase: testcases,
          category_id: selectedCategory ? Number(selectedCategory) : undefined,
          time_limit: Number(timeLimit),
        },
      },
      {
        onSuccess: (updatedData) => {
          // 수정된 데이터와 함께 이전 페이지로 이동
          navigate(-1, { state: { updatedAssignment: updatedData } });
        },
        onError: (error) => {
          alert("수정에 실패했습니다.");
        },
      }
    );
  };

  const addExample = () => {
    if (assignment.examples.length >= 10) {
      alert("최대 10개까지 추가 가능합니다.");
      return;
    }

    setAssignment((prev) => ({
      ...prev,
      examples: [...prev.examples, { input: "", output: "" }],
    }));
  };

  const removeExample = (index) => {
    if (assignment.examples.length <= 3) {
      alert("최소 3개의 예제가 필요합니다.");
      return;
    }

    setAssignment((prev) => ({
      ...prev,
      examples: prev.examples.filter((_, i) => i !== index),
    }));
  };

  if (!assignment) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="mx-[195px] mt-10 mb-20">
      {/* 제목 */}
      <div className="text-center mt-[80px] mb-[60px]">
        <h1 className="text-[35px]">과제 수정</h1>
      </div>

      {/* 취소/저장 버튼 - 카테고리 선택 위로 이동 */}
      <div className="flex items-center justify-end gap-4 mb-[35px]">
        <button
          className="h-[45px] px-[25px] border-2 border-[#54CEA6] text-[#54CEA6] text-[20px] font-bold rounded-lg hover:shadow-lg hover:shadow-[#43A484]/50 transition-shadow duration-200"
          onClick={() => navigate(-1)}
        >
          취소 하기
        </button>
        <button
          className="h-[45px] px-[25px] bg-[#54CEA6] text-white text-[20px] font-bold rounded-lg hover:bg-[#43A484]"
          onClick={handleSave}
        >
          저장 하기
        </button>
      </div>

      {/* 카테고리 선택 */}
      <div className="mb-[35px]">
        <label className="block text-[20px] ml-[15px] mb-[8px] text-[#525252]">카테고리(주차) 선택</label>
        <select
          className="w-full h-[45px] px-[20px] border-[3px] border-[#E3F7EF] rounded-full focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] text-[#525252] text-[18px] mb-2"
          value={selectedCategory}
          onChange={e => setSelectedCategory(String(e.target.value))}
        >
          {categories.map(cat => (
            <option key={cat.id} value={String(cat.id)}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* 과제 명 */}
      <div className="mb-[35px]">
        <div className="flex items-end justify-between mb-[8px]">
          {/* Label */}
          <label
            htmlFor="assignmentTitle"
            className="block text-[20px] ml-[15px] text-[#525252]"
          >
            과제 명
          </label>
        </div>
        <input
          type="text"
          id="assignmentTitle"
          value={assignment.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="w-full h-[45px] px-[20px] border-[3px] border-[#E3F7EF] rounded-full focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] placeholder:font-bold placeholder:text-[14px] placeholder-[#9C9C9C] text-[#525252] text-[18px]"
        />
      </div>

      {/* 과제 설명 */}
      <div className="mb-[50px]">
        <label
          htmlFor="assignmentDescription"
          className="block text-[20px] ml-[15px] mb-[8px] text-[#525252]"
        >
          과제 설명
        </label>
        <textarea
          id="assignmentDescription"
          value={assignment.description}
          rows={Math.max(3, assignment.description.split("\n").length)}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full px-[15px] py-[12px] border-[3px] bg-[#E3F7EF] border-[#E3F7EF] rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] placeholder:font-bold placeholder:text-[14px] placeholder-[#9C9C9C] text-[#525252] text-[18px] resize-none overflow-hidden"
          style={{ lineHeight: "30px", minHeight: "120px" }}
        ></textarea>
      </div>

      {/* 실행 시간 제한 입력 */}
      <div className="mb-[35px]">
        <label htmlFor="timeLimit" className="block text-[20px] ml-[15px] mb-[8px] text-[#525252]">
          실행 시간 제한(초)
        </label>
        <input
          type="number"
          id="timeLimit"
          min="0.01"
          placeholder="예: 2"
          value={timeLimit}
          onChange={e => setTimeLimit(e.target.value)}
          className="w-full h-[45px] px-[20px] border-[3px] border-[#E3F7EF] rounded-full focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] placeholder:font-bold placeholder:text-[14px] placeholder-[#9C9C9C] text-[#525252] text-[18px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-x-[40px] gap-y-[30px]">
        {assignment.examples.map((example, index) => (
          <React.Fragment key={index}>
            {/* 예제 입력 */}
            <div>
              <label
                htmlFor={`exampleInput${index}`}
                className="block text-[18px] mb-[5px] ml-[15px]"
              >
                예제 입력 {index + 1}
              </label>
              <textarea
                id={`exampleInput${index}`}
                value={example.input}
                onChange={(e) =>
                  handleExampleChange(index, "input", e.target.value)
                }
                className="w-full px-[15px] py-[10px] border-[1px] border-[#969696] rounded-xl text-[#525252] focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] text-[18px] resize-none overflow-hidden"
                style={{
                  lineHeight: "30px",
                }}
                rows={example.input.split("\n").length}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
              ></textarea>
            </div>

            {/* 예제 출력 */}
            <div>
              <label
                htmlFor={`exampleOutput${index}`}
                className="block text-[18px] mb-[5px] ml-[15px]"
              >
                예제 출력 {index + 1}
              </label>
              <textarea
                id={`exampleOutput${index}`}
                value={example.output}
                onChange={(e) =>
                  handleExampleChange(index, "output", e.target.value)
                }
                className="w-full px-[15px] py-[10px] border-[1px] border-[#969696] rounded-xl text-[#525252] focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] text-[18px] resize-none overflow-hidden"
                style={{
                  lineHeight: "30px",
                }}
                rows={example.output.trimEnd().split("\n").length}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
              ></textarea>
            </div>
          </React.Fragment>
        ))}
      </div>
      {/* 예제 추가/삭제 버튼 */}
      <div className="flex justify-end mt-[20px]">
        <button
          onClick={() => removeExample(assignment.examples.length - 1)}
          disabled={assignment.examples.length <= 3} // 예제 개수가 3개 이하이면 비활성화
          className={`mr-4 h-[40px] w-[40px] ${
            assignment.examples.length <= 3
              ? "bg-gray-400 cursor-not-allowed" // 비활성화 상태
              : "bg-[#FF6B6B] hover:bg-[#D64545]" // 활성화 상태
          } text-white text-[24px] rounded-full flex items-center justify-center`}
        >
          <FiMinus className="w-[20px] h-[20px]" />
        </button>
        <button
          onClick={addExample}
          disabled={assignment.examples.length >= 10} // 예제 개수가 10개 이상이면 비활성화
          className={` h-[40px] w-[40px] ${
            assignment.examples.length >= 10
              ? "bg-gray-400 cursor-not-allowed" // 비활성화 상태
              : "bg-[#54CEA6] hover:bg-[#43A484]" // 활성화 상태
          } text-white text-[24px] rounded-full flex items-center justify-center`}
        >
          <FiPlus className="w-[20px] h-[20px]" />
        </button>
      </div>
    </div>
  );
};

export default MentorEditAssignmentPage;
