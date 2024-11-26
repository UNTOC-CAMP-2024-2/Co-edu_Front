import React, { useState } from "react";

const MentorEditAssignmentPage = () => {
  const [assignment, setAssignment] = useState({
    title: "별 찍기",
    description:
      "입력은 첫째 줄에 N(1 <= N <= 100)이 주어지며, 출력은 첫째 줄부터 차례대로 별을 출력한다. 아래의 예제와 출력을 참고하여 규칙을 유추한 뒤 별을 찍어보시오.",
    examples: [
      { input: "안녕하세요", output: "줄바꿈\n예제\n출력" },
      { input: "2", output: "*\n* *" },
      { input: "3", output: "안ㅕㅇ \n 하세요*\n* * *" },
    ],
  });

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

  return (
    <div className="mx-[195px] mt-10 mb-20">
      {/* 제목 */}
      <div className="text-center mt-[80px] mb-[60px]">
        <h1 className="text-[35px]">과제 수정</h1>
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

          <div className="flex items-center justify-end gap-4 mb-[35px]">
            {/* 취소하기 버튼 */}
            <button
              className="h-[45px] px-[25px] border-2 border-[#54CEA6] text-[#54CEA6] text-[20px] font-bold rounded-lg hover:shadow-lg hover:shadow-[#43A484]/50 transition-shadow duration-200"
              onClick={() => alert("취소되었습니다!")}
            >
              취소 하기
            </button>

            {/* 수정하기 버튼 */}
            <button
              className="h-[45px] px-[25px] bg-[#54CEA6] text-white text-[20px] font-bold rounded-lg hover:bg-[#43A484]"
              onClick={() => alert("수정 되었습니다!")}
            >
              수정 하기
            </button>
          </div>
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
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full px-[15px] py-[12px] border-[3px] bg-[#E3F7EF] border-[#E3F7EF] rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] placeholder:font-bold placeholder:text-[14px] placeholder-[#9C9C9C] text-[#525252] text-[18px] resize-none overflow-hidden"
          style={{ lineHeight: "30px", minHeight: "120px" }}
        ></textarea>
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
                rows={example.output.split("\n").length}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
              ></textarea>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MentorEditAssignmentPage;
