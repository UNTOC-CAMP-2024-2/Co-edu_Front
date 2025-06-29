import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGetAssignmentDetail } from "../../../../hooks/useMentee";
import { Context } from "../../../../AppProvider";

const MenteeReadingAssignmentPage = () => {
  const location = useLocation();
  const { token } = useContext(Context);
  const [problem, setProblem] = useState(null);
  const assignmentId = useLocation().state.assignmentId;

  const getAssignmentDetailMutation = useGetAssignmentDetail();

  useEffect(() => {
    if (location.state?.updatedAssignment) {
      // 수정된 데이터가 있다면 바로 반영
      setProblem(location.state.updatedAssignment);
    } else {
      // 수정된 데이터가 없다면 API 호출
      getAssignmentDetailMutation.mutate(
        { assignmentId, token },
        {
          onSuccess: (data) => {
            setProblem(data);
          },
        }
      );
    }
  }, [assignmentId]);

  return (
    <div className="px-20 pt-[60px] pb-[30px]">
      <div className="flex items-center justify-between mb-[35px]">
        <h1 className="text-[35px] font-bold ml-[30px] text-[#525252]">
          {problem && problem.title}
        </h1>
        <Link
          to="/mentee/detail"
          state={{ problem }}
          className="px-[15px] py-[12px] bg-[#54CEA6] mr-[35px] text-[22px] font-semibold text-white rounded-xl hover:bg-[#43A484] cursor-pointer"
        >
          바로 가기
        </Link>
      </div>
      <p className="text-[#525252] mx-[5px] mb-[70px] text-[21px] whitespace-pre-wrap break-words">
        {problem && problem.description}
      </p>
      {problem && (problem.time_limit || problem.timelimit) && (
        <div className="ml-[5px] mb-[20px] text-[18px] text-[#43A484] font-semibold">
          실행 시간 제한: {problem.time_limit ?? problem.timelimit}초
        </div>
      )}

      <div className="grid grid-cols-2 gap-x-[40px] gap-y-[30px]">
        {problem &&
          problem.testcases.slice(0, 3).map((example, index) => (
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
                  value={example.expected_output}
                  readOnly
                  className="w-full px-[25px] border-[1px] border-[#969696] rounded-xl text-[#525252] resize-none text-[18px] overflow-hidden focus:outline-none focus:ring-0"
                  style={{
                    lineHeight: "30px",
                    padding: "10px",
                    height: `${
                      30 * example.expected_output.split("\n").length + 20
                    }px`,
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
