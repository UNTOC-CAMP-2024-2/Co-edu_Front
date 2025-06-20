import React from "react";
import { IoCloseSharp } from "react-icons/io5";

const TestResultModal = ({ isOpen, onClose, result }) => {
  if (!isOpen) return null;

  // 각 케이스별 결과 해석 함수
  const getCaseStatus = (test) => {
    if (test.result === "Pass") return { label: "정답", color: "#54CEA6" };
    if (
      test.details && (
        test.details.includes("시간초과") ||
        test.details === "Execution timed out."
      )
    ) {
      return { label: "시간초과", color: "#FFB800" };
    }
    return { label: "틀렸습니다.", color: "#FF6E6E" };
  };

  return (
    <div className="z-30 bg-black bg-opacity-45 fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="rounded-2xl bg-white shadow-lg shadow-[#575757] min-h-[18rem] w-[32rem] flex flex-col">
        <div className="rounded-t-2xl h-[2.5rem] bg-lightMint flex justify-start items-center px-2 gap-1 mb-[1rem]">
          <button
            className="bg-[#FF9780] rounded-full flex justify-center items-center p-1"
            onClick={onClose}
          >
            <IoCloseSharp color="white" size="16" />
          </button>
        </div>
        <div className="py-[10px] px-[18px] flex flex-col items-center">
          <p className="pb-[10px] text-[20px] text-[#686868] font-bold">
            TESTCASE : <span className="text-[#FF6E6E]">{result.total}</span>개 중 <span className="text-[#54CEA6]">{result.passed}</span>개 통과
          </p>
          <p className="text-[18px] text-[#686868] font-bold mb-2">
            점수 : {result.score}점
          </p>
          <div className="w-full mt-2">
            <table className="w-full text-center border-separate border-spacing-y-1">
              <thead>
                <tr className="text-[16px] text-[#525252]">
                  <th className="pb-1">테스트케이스</th>
                  <th className="pb-1">결과</th>
                </tr>
              </thead>
              <tbody>
                {result.results && result.results.map((test, idx) => {
                  const status = getCaseStatus(test);
                  return (
                    <tr key={idx} className="bg-[#F8FFF9] rounded">
                      <td className="py-1 font-semibold">#{test.case_number}</td>
                      <td className="py-1 font-bold" style={{ color: status.color }}>{status.label}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResultModal;
