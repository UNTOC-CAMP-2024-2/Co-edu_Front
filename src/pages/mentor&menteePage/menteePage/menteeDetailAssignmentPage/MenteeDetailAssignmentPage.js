import React, { useRef, useEffect, useState, useContext } from "react";
import Highlight from "react-highlight";
import { HiSpeakerphone } from "react-icons/hi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useLocation } from "react-router-dom";
import "../../../../../node_modules/highlight.js/styles/a11y-dark.css";
import {
  useGetFeedback,
  useSubmitCode,
  useTestCode,
  useGetMenteeCodeData,
} from "../../../../hooks/useMentee";
import { Context } from "../../../../AppProvider";
import TestResultModal from "./TestResultModal";

const MenteeDetailAssignmentPage = () => {
  const [language, setLanguage] = useState("python");
  const data = useLocation().state.problem;

  const { title, description, testcases } = data;

  const textareaRef = useRef(null);
  const highlightRef = useRef(null);
  const { token } = useContext(Context);
  const [menteeSubmitCode, setMenteeSubmitCode] = useState("");

  const [code, setCode] = useState('print("hello world")');

  const getMenteeCodeDataMutation = useGetMenteeCodeData();
  useEffect(() => {
    // 제출된 코드 가져오기
    getMenteeCodeDataMutation.mutate(
      {
        token,
        assignmentId: data.assignment_id,
      },
      {
        onSuccess: (response) => {
          if (response.code && response.code.trim() !== "") {
            // 제출된 코드가 있는 경우
            setMenteeSubmitCode(response.code);
            setCode(response.code);
            setLanguage(response.language || "python");
          } else {
            // 제출된 코드가 없는 경우
            setCode(defaultCodes[language]);
          }
        },
      }
    );
  }, [data.assignment_id, token]);

  const defaultCodes = {
    python: 'print("Hello, World!")',
    java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
    c: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
  };

  useEffect(() => {
    if (menteeSubmitCode === "") {
      setCode(defaultCodes[language]);
    }
  }, [language, menteeSubmitCode]);
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);

    // 언어 변경 시 기본 코드로 설정
    setMenteeSubmitCode(""); // 제출된 코드 초기화
    setCode(defaultCodes[newLanguage]); // 선택된 언어의 기본 코드로 초기화
  };

  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testResult, setTestResult] = useState({
    passed: 0,
    total: 0,
    score: 0,
  });
  const [feedbackData, setFeedbackData] = useState({ feedback: "" });
  // const { feedback } = feedbackData;/

  const submitCodeMutatation = useSubmitCode();
  const testCodeMutation = useTestCode();
  const getFeedbackMutation = useGetFeedback();

  const handleGetFeedback = () => {
    getFeedbackMutation.mutate(
      {
        token,
        assignmentId: data.assignment_id,
      },
      {
        onSuccess: (data) => {
          setFeedbackData(data?.feedback || "");
        },
      }
    );
  };

  const handleSubmitCode = () => {
    submitCodeMutatation.mutate({
      token,
      assignmentId: data.assignment_id,
      code,
      language,
    });
  };

  const handleTestCode = () => {
    testCodeMutation.mutate(
      {
        token,
        assignmentId: data.assignment_id,
        code,
        language,
      },
      {
        onSuccess: (response) => {
          const passedCount = response.results.filter(
            (test) => test.result === "Pass"
          ).length;
          const totalCount = response.results.length;
          const score = response.total_score;

          setTestResult({
            passed: passedCount,
            total: totalCount,
            score,
          });

          setIsModalOpen(true);
        },
      }
    );
    setShowResult(true);
  };

  // Ref for the left panel
  const leftPanelRef = useRef(null);
  const feedbackTextareaRef = useRef(null);

  // Custom scroll handler
  const handleWheel = (event) => {
    if (leftPanelRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = leftPanelRef.current;

      // 위로 스크롤하려 할 때 (deltaY < 0) 이고 이미 맨 위라면 (scrollTop === 0)
      // 또는
      // 아래로 스크롤하려 할 때 (deltaY > 0) 이고 이미 맨 아래라면 (scrollTop + clientHeight === scrollHeight)
      if (
        (event.deltaY < 0 && scrollTop === 0) ||
        (event.deltaY > 0 && scrollTop + clientHeight >= scrollHeight)
      ) {
        return; // 기본 스크롤 동작 허용
      }

      leftPanelRef.current.scrollTop += event.deltaY;
      // event.preventDefault();
    }
  };

  // 스크롤 동기화를 위한 핸들러
  const handleScroll = (e) => {
    if (highlightRef.current) {
      highlightRef.current.scrollTop = e.target.scrollTop;
      // highlightRef.current.scrollLeft = e.target.scrollLeft;
    }
  };

  useEffect(() => {
    const updateHeight = () => {
      if (feedbackTextareaRef.current) {
        feedbackTextareaRef.current.style.height = "auto"; // 높이를 초기화
        feedbackTextareaRef.current.style.height = `${Math.max(
          feedbackTextareaRef.current.scrollHeight,
          300 // 최소 높이
        )}px`; // 콘텐츠에 맞게 높이 설정
      }
    };

    // 상태 변경 시 높이 업데이트
    if (showFeedback) {
      updateHeight();
    }

    // DOM 변경 시 자동 업데이트를 위해 MutationObserver 추가
    const observer = new MutationObserver(updateHeight);
    if (feedbackTextareaRef.current) {
      observer.observe(feedbackTextareaRef.current, {
        childList: true,
        subtree: true,
      });
    }

    // Cleanup
    return () => observer.disconnect();
  }, [feedbackData.feedback, showFeedback]);

  // Disable global scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = ""; // Restore scrolling on component unmount
    };
  }, []);

  return (
    <div className="relative flex flex-row h-[calc(100vh-65px)]">
      {/* Left Panel */}
      <div
        ref={leftPanelRef}
        onWheel={handleWheel}
        className="w-[400px] py-[35px] bg-white overflow-hidden relative"
        style={{ WebkitOverflowScrolling: "touch" }} // For smooth scrolling on touch devices
      >
        {/* Assignment Title */}
        <h1 className="text-[30px] px-[30px] font-bold text-gray-800 mb-[15px]">
          {title}
        </h1>

        {/* Assignment Description */}
        <p className="px-[25px] text-[18px] text-[#525252] mb-[25px] whitespace-pre-wrap break-words">
          {description}
        </p>

        {/* Content Switching */}
        {showFeedback ? (
          /* 과제 코드 총평 */
          <div className="mb-[30px] flex flex-col items-center">
            <h2 className="text-[16px] font-semibold text-[#525252] mb-[10px]">
              과제 코드 총평
            </h2>
            <div className="w-full border-t-[1px] border-[#D9D9D9] mb-[10px]"></div>
            <textarea
              ref={feedbackTextareaRef}
              readOnly
              value={feedbackData.feedback}
              className="w-[calc(100%-40px)] px-[15px] py-[10px] border-[2px] border-[#54CEA6] bg-[#F8FFF9] rounded-[10px] text-[16px] text-[#525252] leading-[24px] resize-none focus:outline-none"
              style={{
                height: feedbackTextareaRef.current?.scrollHeight
                  ? `${Math.max(
                      feedbackTextareaRef.current.scrollHeight,
                      300
                    )}px`
                  : "300px",
                overflow: "hidden",
              }}
            ></textarea>
          </div>
        ) : (
          /* Examples Section */
          testcases.slice(0, 3).map((example, index) => (
            <div key={index} className="mb-3">
              <div className="mb-4 mx-[28px]">
                <h2 className="mx-[5px] text-[20px] text-black mb-2 pl-[5px]">
                  예제 {index + 1}
                </h2>
                <div className="relative mt-1 mb-5">
                  <div className="absolute w-full h-[1px] rounded bg-[#D9D9D9] top-[1px]"></div>
                  <div className="absolute w-[80px] h-[3px] rounded bg-[#A8E6CF]"></div>
                </div>
              </div>

              {/* 입력 */}
              <div className="mx-[30px] mb-[10px] flex items-center space-x-[10px]">
                <h3 className="text-[18px] text-[#525252]">입력</h3>
                <textarea
                  value={example.input}
                  readOnly
                  className="flex-1 px-[20px] py-[5px] border-[2px] border-[#969696] rounded-[10px] text-[#525252] resize-none text-[18px] overflow-hidden focus:outline-none focus:ring-0"
                  style={{
                    lineHeight: "30px",
                    height: `${Math.max(
                      30 * example.input.split("\n").length + 10,
                      45
                    )}px`,
                  }}
                ></textarea>
              </div>

              {/* 출력 */}
              <div className="mx-[30px] mb-[10px] flex items-center space-x-[10px]">
                <h3 className="text-[18px] text-[#525252]">출력</h3>
                <textarea
                  value={example.expected_output}
                  readOnly
                  className="flex-1 px-[20px] py-[5px] border-[2px] border-[#969696] rounded-[10px] text-[#525252] resize-none text-[18px] overflow-hidden focus:outline-none focus:ring-0"
                  style={{
                    lineHeight: "30px",
                    height: `${Math.max(
                      30 * example.expected_output.split("\n").length + 10,
                      45
                    )}px`,
                  }}
                ></textarea>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Divider */}
      <div className="w-[1px] bg-[#D9D9D9]"></div>

      {/* Right Panel */}
      <div className="flex-1 relative">
        {/* 확성기와 버튼 섹션 */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between h-[50px] px-4">
          {/* 확성기 아이콘 */}
          <button
            className=" rounded-full focus:outline-none"
            onClick={() => {
              !showFeedback && handleGetFeedback();
              setShowFeedback(!showFeedback);
            }}
          >
            <HiSpeakerphone
              style={{ width: "30px", height: "30px", color: "#FF6E6E" }}
            />
          </button>
          {/* 언어 선택 드롭다운 */}
          <select
            className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c">C</option>
          </select>

          {/* 실행 및 제출 버튼 */}
          <div className="flex space-x-2">
            {/* 실행 버튼 */}
            <button
              className="px-[15px] py-[4px] border-3 border-[#54CEA6] text-[#54CEA6] rounded-full text-[16px] font-extrabold hover:bg-[#e6f8f2] hover:border-[#43A484] hover:text-[#43A484]"
              onClick={handleTestCode}
            >
              테스트
            </button>

            {/* 제출 버튼 */}
            <button
              className="px-[15px] py-[4px] border-3 border-[#54CEA6] text-[#54CEA6] rounded-full text-[16px] font-extrabold hover:bg-[#e6f8f2] hover:border-[#43A484] hover:text-[#43A484]"
              onClick={handleSubmitCode}
            >
              제출
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="absolute top-[50px] left-0 w-full h-[1px] bg-[#D9D9D9]"></div>

        {/* 코드 작성 섹션 */}
        <div className="flex flex-col h-full mt-[50px]">
          <div className="flex-none h-full flex relative items-center justify-center overflow-y-auto">
            <textarea
              onKeyDown={(event) => {
                if (event.key === "Tab") {
                  event.preventDefault();
                  setCode(code + "\t");
                }
              }}
              value={code}
              onScroll={handleScroll}
              ref={textareaRef}
              className="h-full w-full absolute inset-0 p-4 text-transparent font-mono resize-none bg-transparent z-10 focus:outline-none selection:bg-blue-500/50 leading-[1.5] text-[1rem]"
              style={{
                caretColor: "white",
                fontFamily: "Monaco, Consolas, monospace", // 동일한 폰트 패밀리 사용
              }}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
            />
            <div
              ref={highlightRef}
              className="bg-[#2B2B2B] absolute w-full h-full inset-0 overflow-auto pointer-events-none"
            >
              <Highlight
                className="h-full python text-[1rem] leading-[1.5] p-4"
                style={{
                  fontFamily: "Monaco, Consolas, monospace",
                  whiteSpace: "pre",
                }}
              >
                {code}
              </Highlight>
            </div>
          </div>
        </div>
      </div>
      <TestResultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        result={testResult}
      />
    </div>
  );
};

export default MenteeDetailAssignmentPage;
