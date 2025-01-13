import { type } from "@testing-library/user-event/dist/type";
import React, { useState, useContext } from "react";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { Context } from "../../../../AppProvider";
import { useCreateAssignment } from "../../../../hooks/useMentor";
import { useNavigate } from "react-router-dom";

const MentorMakingAssignmentPage = () => {
  const navigate = useNavigate();
  const { token, classCode } = useContext(Context);
  const createAssignmentMutations = useCreateAssignment();

  const [title, setTitle] = useState(""); //과제 제목목
  const [description, setDescription] = useState(""); //과제 설명명
  const [examples, setsExamples] = useState([
    { input: "", output: "" },
    { input: "", output: "" },
    { input: "", output: "" },
  ]);

  const addExample = () => {
    if (examples.length < 10) {
      setsExamples([...examples, { input: "", output: "" }]);
    } else {
      alert("최대 10개까지 추가 가능합니다.");
    }
  };

  const removeExample = (index) => {
    if (examples.length > 3) {
      setsExamples(examples.filter((_, i) => i !== index));
    } else {
      alert("최소 3개의 예제가 필요합니다.");
    }
  };

  const handleInputChange = (index, value, type) => {
    const newExamples = [...examples];
    newExamples[index] = { ...newExamples[index], [type]: value || "" }; // 빈 문자열로 초기화 보장
    setsExamples(newExamples);
  };

  const handleUpload = async () => {
    if (!token) {
      alert("로그인이 필요합니다. 다시 로그인해주세요.");
      return;
    }

    if (!title || !description) {
      alert("과제 명과 설명을 입력해주세요.");
      return;
    }

    if (examples.some((example) => !example.input || !example.output)) {
      alert("예제를 모두 입력해주세요.");
      return;
    }

    const testcases = examples.map((example) => ({
      input_data: example.input,
      expected_output: example.output,
    }));

    console.log("Request Data:", {
      class_id: classCode,
      title,
      description,
      testcase: testcases,
    });

    createAssignmentMutations.mutate({
      token,
      assignment: {
        class_id: classCode,
        title,
        description,
        testcase: testcases,
      },
    });
  };

  return (
    <div className="mx-[195px] mt-10 mb-20">
      {/* 제목 */}
      <div className="text-center mt-[80px] mb-[60px]">
        <h1 className="text-[35px]">과제 생성</h1>
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

          {/* 업로드하기 버튼 */}
          <button
            className="h-[45px] px-[25px] bg-[#54CEA6] text-white text-[20px] font-bold rounded-lg hover:bg-[#43A484]"
            onClick={() => {
              handleUpload();
              navigate("/mentor/assignments");
            }}
          >
            업로드 하기
          </button>
        </div>
        <input
          type="text"
          id="assignmentTitle"
          placeholder="과제 명을 여기에 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          placeholder="과제에 대하여 설명을 입력하여 주세요."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-[15px] py-[12px] border-[3x] bg-[#E3F7EF] border-[#E3F7EF] rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] placeholder:font-bold placeholder:text-[14px] placeholder-[#9C9C9C] text-[#525252] text-[18px] resize-none overflow-hidden"
          style={{ lineHeight: "30px", minHeight: "120px" }}
          onInput={(e) => {
            e.target.style.height = "auto"; // 높이 초기화
            e.target.style.height = `${e.target.scrollHeight}px`; // 내용에 맞게 높이 조정
          }}
        ></textarea>
      </div>

      <div className="grid grid-cols-2 gap-x-[40px] gap-y-[30px]">
        {examples.map((example, index) => (
          <React.Fragment key={index}>
            {/* 예제 입력 */}
            <div>
              <label
                htmlFor={`exampleInput${index}`}
                className="block text-[18px] mb-[5px] ml-[15px]"
              >
                예제 입력 {index + 1}
              </label>
              <div className="relative mt-1 mb-[20px]">
                <div className="absolute w-full h-[1px] rounded bg-[#D9D9D9] top-[1px]"></div>
                <div className="absolute w-[125px] h-[3px] rounded bg-[#A8E6CF]"></div>
              </div>
              <textarea
                id={`exampleInput${index}`}
                value={example.input}
                onChange={(e) =>
                  handleInputChange(index, e.target.value, "input")
                }
                rows={1}
                className="w-full px-[15px] py-[10px] border-[1px] border-[#969696] rounded-xl text-[#525252] focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] text-[18px] resize-none overflow-hidden"
                style={{ lineHeight: "30px", minHeight: "40px" }}
                onInput={(e) => {
                  e.target.style.height = "auto"; // 높이 초기화
                  e.target.style.height = `${e.target.scrollHeight}px`; // 내용에 맞게 높이 조정
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
              <div className="relative mt-1 mb-[20px]">
                <div className="absolute w-full h-[1px] rounded bg-[#D9D9D9] top-[1px]"></div>
                <div className="absolute w-[125px] h-[3px] rounded bg-[#A8E6CF]"></div>
              </div>
              <textarea
                id={`exampleOutput${index}`}
                value={example.output}
                onChange={(e) =>
                  handleInputChange(index, e.target.value, "output")
                }
                rows={1}
                className="w-full px-[15px] py-[10px] border-[1px] border-[#969696] rounded-xl text-[#525252] focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] text-[18px] resize-none overflow-hidden"
                style={{ lineHeight: "30px", minHeight: "40px" }}
                onInput={(e) => {
                  e.target.style.height = "auto"; // 높이 초기화
                  e.target.style.height = `${e.target.scrollHeight}px`; // 내용에 맞게 높이 조정
                }}
              ></textarea>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* 예제 추가/삭제 버튼 */}
      <div className="flex justify-end mt-[20px]">
        <button
          onClick={() => removeExample(examples.length - 1)}
          disabled={examples.length <= 3} // 예제 개수가 3개 이하이면 비활성화
          className={`mr-4 h-[40px] w-[40px] ${
            examples.length <= 3
              ? "bg-gray-400 cursor-not-allowed" // 비활성화 상태
              : "bg-[#FF6B6B] hover:bg-[#D64545]" // 활성화 상태
          } text-white text-[24px] rounded-full flex items-center justify-center`}
        >
          <FiMinus className="w-[20px] h-[20px]" />
        </button>
        <button
          onClick={addExample}
          disabled={examples.length >= 10} // 예제 개수가 10개 이상이면 비활성화
          className={` h-[40px] w-[40px] ${
            examples.length >= 10
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

export default MentorMakingAssignmentPage;
