import React, { useState } from "react";

const defaultProblem = {
  title: "별 찍기",
  description:
    "입력은 첫째 줄에 N(1 <= N <= 100)이 주어지며, 출력은 첫째 줄부터 차례대로 별을 출력한다. 아래의 예제와 출력을 참고하여 규칙을 유추한 뒤 별을 찍어보시오.",
  examples: [
    { input: "1", output: "*" },
    { input: "2", output: "*\n* *" },
    { input: "3", output: "*\n* *\n* * *" },
  ],
};

const MentorMakingAssignmentsPage = ({ initialProblem = defaultProblem }) => {
  const [problem, setProblem] = useState(initialProblem);

  return (
    <div className="px-20 pt-[60px]">
        <div className="flex items-center justify-between mb-[35px]">
        <h1 className="text-[35px] font-bold ml-[30px] text-[#525252]">{problem.title}</h1>
        <button
            className="px-[15px] py-[12px] bg-[#54CEA6] mr-[35px] text-[22px] font-semibold text-white rounded-xl hover:bg-[#43A484]"
            onClick={() => alert("수정 페이지로 이동")}
        >
            수정 하기
        </button>
        </div>

      <p className="text-[#525252] mx-[5px] mb-[70px] text-[21px]">{problem.description}</p>

      {problem.examples.map((example, index) => (
        <div key={index} className="flex items-start mb-[35px]">
            {/* 예제 입력 */}
            <div className="w-1/2 pr-[25px]">
            <h2 className="text-[19px] ml-[10px] mb-[10px] ">예제 입력 {index + 1}</h2>
            <div className="relative mt-1 mb-5">
              <div className="absolute w-[125px] h-[3px] rounded bg-[#A8E6CF]"></div>
              <div className="absolute w-full h-[1px] rounded bg-[#D9D9D9] top-[1px]"></div>
            </div>
            <textarea
                value={example.input}
                readOnly
                className="w-full px-[25px] border-[1px] border-[#969696] rounded-xl text-[#525252] resize-none text-[18px] min-h-[40px]"
             ></textarea>
            </div>

            {/* 예제 출력 */}
            <div className="w-1/2 pl-[25px]">
            <h2 className="text-[19px] ml-[10px] mb-[10px]">예제 출력 {index + 1}</h2>
            <div className="relative mt-1 mb-5">
              <div className="absolute w-[125px] h-[3px] rounded bg-[#A8E6CF]"></div>
              <div className="absolute w-full h-[1px] rounded bg-[#D9D9D9] top-[1px]"></div>
            </div>
            <textarea
                value={example.output}
                readOnly
                className="w-full px-[25px] border-[1px] border-[#969696] rounded-xl text-[#525252] resize-none text-[18px] min-h-[40px]"
            ></textarea>
            </div>
        </div>
        ))}

    </div>
  );
};

export default MentorMakingAssignmentsPage;
