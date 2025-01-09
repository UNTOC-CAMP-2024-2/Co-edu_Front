import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const defaultProblem = {
  title: "별 찍기",
  description:
    "입력은 첫째 줄에 N(1 <= N <= 100)이 주어지며, 출력은 첫째 줄부터 차례대로 별을 출력한다. 아래의 예제와 출력을 참고하여 규칙을 유추한 뒤 별을 찍어보시오.",
  examples: [
    { input: "안녕하세요", output: "줄바꿈\n예제\n출력" },
    { input: "2", output: "*\n* *" },
    { input: "3", output: "안ㅕㅇ \n 하세요*\n* * *" },
  ],
};

const MenteeReadingAssignmentPage = ({ initialProblem = defaultProblem }) => {
  const assignmentId = useLocation().state.assignmentId;
  console.log(assignmentId);

  return (
    <div className="px-20 pt-[60px] pb-[30px]">
      <div className="flex items-center justify-between mb-[35px]">
        <h1 className="text-[35px] font-bold ml-[30px] text-[#525252]">
          {initialProblem.title}
        </h1>
        <button
          className="px-[15px] py-[12px] bg-[#54CEA6] mr-[35px] text-[22px] font-semibold text-white rounded-xl hover:bg-[#43A484]"
          onClick={() => alert("코드 수정 페이지로 이동")}
        >
          바로 가기
        </button>
      </div>

      <p className="text-[#525252] mx-[5px] mb-[70px] text-[21px]">
        {initialProblem.description}
      </p>

      <div className="grid grid-cols-2 gap-x-[40px] gap-y-[30px]">
        {initialProblem.examples.map((example, index) => (
          <React.Fragment key={index}>
            {/* 예제 입력 */}
            <div>
              <h2 className="text-[19px] ml-[10px] mb-[10px]">
                예제 입력 {index + 1}
              </h2>
              <div className="relative mt-1 mb-5">
                <div className="absolute w-full h-[1px] rounded bg-[#D9D9D9] top-[1px]"></div>
                <div className="absolute w-[125px] h-[3px] rounded bg-[#A8E6CF]"></div>
              </div>
              <textarea
                value={example.input}
                readOnly
                className="w-full px-[25px] border-[1px] border-[#969696] rounded-xl text-[#525252] resize-none text-[18px] overflow-hidden focus:outline-none focus:ring-0"
                style={{
                  lineHeight: "30px",
                  padding: "10px",
                  height: `${30 * example.input.split("\n").length + 20}px`,
                }}
              ></textarea>
            </div>

            {/* 예제 출력 */}
            <div>
              <h2 className="text-[19px] ml-[10px] mb-[10px]">
                예제 출력 {index + 1}
              </h2>
              <div className="relative mt-1 mb-5">
                <div className="absolute w-full h-[1px] rounded bg-[#D9D9D9] top-[1px]"></div>
                <div className="absolute w-[125px] h-[3px] rounded bg-[#A8E6CF]"></div>
              </div>
              <textarea
                value={example.output}
                readOnly
                className="w-full px-[25px] border-[1px] border-[#969696] rounded-xl text-[#525252] resize-none text-[18px] overflow-hidden focus:outline-none focus:ring-0"
                style={{
                  lineHeight: "30px",
                  padding: "10px",
                  height: `${30 * example.output.split("\n").length + 20}px`,
                }}
              ></textarea>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MenteeReadingAssignmentPage;
