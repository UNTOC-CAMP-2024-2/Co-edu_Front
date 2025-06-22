import React, { useRef, useEffect, useState, useContext } from "react";
import { HiSpeakerphone } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import Editor from "@monaco-editor/react";
import {
  useGetFeedback,
  useSubmitCode,
  useTestCode,
  useGetMenteeCodeData,
} from "../../../../hooks/useMentee";
import { Context } from "../../../../AppProvider";
import TestResultModal from "./TestResultModal";
import { setupMonacoEditorDesign } from "../../components/EditorDesign";
// 테스트 중 모달
const TestingModal = ({ isOpen }) => {
  if (!isOpen) return null;
  return (
    <div className="z-40 bg-black bg-opacity-45 fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="rounded-2xl bg-white shadow-lg shadow-[#575757] h-[10rem] w-[22rem] flex flex-col justify-center items-center">
        <div className="text-[22px] text-[#54CEA6] font-bold mb-4">테스트 중...</div>
        <div
          className="mb-2"
          style={{
            width: "40px",
            height: "40px",
            borderWidth: "4px",
            borderStyle: "solid",
            borderRadius: "50%",
            borderColor: "#e0e0e0",
            borderTopColor: "#54CEA6",
            animation: "spin 1s linear infinite",
          }}
        />
        <div className="text-[16px] text-[#686868]">잠시만 기다려주세요</div>
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const MenteeDetailAssignmentPage = () => {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState('print("hello world")');
  const [menteeSubmitCode, setMenteeSubmitCode] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState({ passed: 0, total: 0, score: 0 });
  const [feedbackData, setFeedbackData] = useState({ feedback: "" });

  const data = useLocation().state.problem;
  const { title, description, testcases } = data;

  const { token } = useContext(Context);

  const getMenteeCodeDataMutation = useGetMenteeCodeData();
  const submitCodeMutatation = useSubmitCode();
  const testCodeMutation = useTestCode();
  const getFeedbackMutation = useGetFeedback();

  const defaultCodes = {
    python: 'print("Hello, World!")',
    java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
    c: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
    cpp: `#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}`,
  };
  useEffect(() => {
    setupMonacoEditorDesign();
  }, []);
  
  useEffect(() => {
    getMenteeCodeDataMutation.mutate(
      { token, assignmentId: data.assignment_id },
      {
        onSuccess: (response) => {
          if (response.code && response.code.trim() !== "") {
            setMenteeSubmitCode(response.code);
            setCode(response.code);
            setLanguage(response.language || "python");
          } else {
            setCode(defaultCodes[language]);
          }
        },
      }
    );
  }, [data.assignment_id, token]);

  useEffect(() => {
    if (menteeSubmitCode === "") {
      setCode(defaultCodes[language]);
    }
  }, [language, menteeSubmitCode]);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setMenteeSubmitCode("");
    setCode(defaultCodes[newLanguage]);
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
    setIsTesting(true);
    testCodeMutation.mutate(
      { token, assignmentId: data.assignment_id, code, language },
      {
        onSuccess: (response) => {
          const passedCount = response.results.filter((test) => test.result === "Pass").length;
          const totalCount = response.results.length;
          const score = response.total_score;

          setTestResult({
            ...response,
            passed: passedCount,
            total: totalCount,
            score,
          });

          setIsModalOpen(true);
          setIsTesting(false);
        },
        onError: () => setIsTesting(false),
      }
    );
    setShowResult(true);
  };

  const handleGetFeedback = () => {
    getFeedbackMutation.mutate(
      { token, assignmentId: data.assignment_id },
      {
        onSuccess: (data) => setFeedbackData(data?.feedback || ""),
      }
    );
  };

  const leftPanelRef = useRef(null);
  const feedbackTextareaRef = useRef(null);

  const handleWheel = (event) => {
    if (leftPanelRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = leftPanelRef.current;
      if (
        (event.deltaY < 0 && scrollTop === 0) ||
        (event.deltaY > 0 && scrollTop + clientHeight >= scrollHeight)
      ) {
        return;
      }
      leftPanelRef.current.scrollTop += event.deltaY;
    }
  };

  useEffect(() => {
    const updateHeight = () => {
      if (feedbackTextareaRef.current) {
        feedbackTextareaRef.current.style.height = "auto";
        feedbackTextareaRef.current.style.height = `${Math.max(
          feedbackTextareaRef.current.scrollHeight,
          300
        )}px`;
      }
    };

    if (showFeedback) updateHeight();

    const observer = new MutationObserver(updateHeight);
    if (feedbackTextareaRef.current) {
      observer.observe(feedbackTextareaRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => observer.disconnect();
  }, [feedbackData.feedback, showFeedback]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="relative flex flex-row h-[calc(100vh-65px)]">
      {/* Left Panel */}
      <div
        ref={leftPanelRef}
        onWheel={handleWheel}
        className="w-[400px] py-[35px] bg-white overflow-hidden relative"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <h1 className="text-[30px] px-[30px] font-bold text-gray-800 mb-[15px]">{title}</h1>
        <p className="px-[25px] text-[18px] text-[#525252] mb-[25px] whitespace-pre-wrap break-words">
          {description}
        </p>

        {showFeedback ? (
          <div className="mb-[30px] flex flex-col items-center">
            <h2 className="text-[16px] font-semibold text-[#525252] mb-[10px]">과제 코드 총평</h2>
            <div className="w-full border-t-[1px] border-[#D9D9D9] mb-[10px]"></div>
            <textarea
              ref={feedbackTextareaRef}
              readOnly
              value={feedbackData.feedback}
              className="w-[calc(100%-40px)] px-[15px] py-[10px] border-[2px] border-[#54CEA6] bg-[#F8FFF9] rounded-[10px] text-[16px] text-[#525252] leading-[24px] resize-none focus:outline-none"
              style={{
                height: feedbackTextareaRef.current?.scrollHeight
                  ? `${Math.max(feedbackTextareaRef.current.scrollHeight, 300)}px`
                  : "300px",
                overflow: "hidden",
              }}
            />
          </div>
        ) : (
          testcases.slice(0, 3).map((example, index) => (
            <div key={index} className="mb-3">
              <div className="mb-4 mx-[28px]">
                <h2 className="mx-[5px] text-[20px] text-black mb-2 pl-[5px]">예제 {index + 1}</h2>
                <div className="relative mt-1 mb-5">
                  <div className="absolute w-full h-[1px] rounded bg-[#D9D9D9] top-[1px]"></div>
                  <div className="absolute w-[80px] h-[3px] rounded bg-[#A8E6CF]"></div>
                </div>
              </div>

              <div className="mx-[30px] mb-[10px] flex items-center space-x-[10px]">
                <h3 className="text-[18px] text-[#525252]">입력</h3>
                <textarea
                  value={example.input}
                  readOnly
                  className="flex-1 px-[20px] py-[5px] border-[2px] border-[#969696] rounded-[10px] text-[#525252] resize-none text-[18px] overflow-hidden focus:outline-none"
                  style={{
                    lineHeight: "30px",
                    height: `${Math.max(30 * example.input.split("\n").length + 10, 45)}px`,
                  }}
                />
              </div>

              <div className="mx-[30px] mb-[10px] flex items-center space-x-[10px]">
                <h3 className="text-[18px] text-[#525252]">출력</h3>
                <textarea
                  value={example.expected_output}
                  readOnly
                  className="flex-1 px-[20px] py-[5px] border-[2px] border-[#969696] rounded-[10px] text-[#525252] resize-none text-[18px] overflow-hidden focus:outline-none"
                  style={{
                    lineHeight: "30px",
                    height: `${Math.max(30 * example.expected_output.split("\n").length + 10, 45)}px`,
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Divider */}
      <div className="w-[1px] bg-[#D9D9D9]"></div>

      {/* Right Panel */}
      <div className="flex-1 relative">
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between h-[50px] px-4">
          <button
            className="rounded-full focus:outline-none"
            onClick={() => {
              if (!showFeedback) handleGetFeedback();
              setShowFeedback(!showFeedback);
            }}
            disabled={isTesting}
          >
            <HiSpeakerphone style={{ width: "30px", height: "30px", color: "#FF6E6E" }} />
          </button>

          <select
            className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            disabled={isTesting}
          >
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
          </select>

          <div className="flex space-x-2">
            <button
              className="px-[15px] py-[4px] border-3 border-[#54CEA6] text-[#54CEA6] rounded-full text-[16px] font-extrabold hover:bg-[#e6f8f2] hover:border-[#43A484] hover:text-[#43A484]"
              onClick={handleTestCode}
              disabled={isTesting}
            >
              테스트
            </button>
            <button
              className="px-[15px] py-[4px] border-3 border-[#54CEA6] text-[#54CEA6] rounded-full text-[16px] font-extrabold hover:bg-[#e6f8f2] hover:border-[#43A484] hover:text-[#43A484]"
              onClick={handleSubmitCode}
              disabled={isTesting}
            >
              제출
            </button>
          </div>
        </div>

        <div className="absolute top-[50px] left-0 w-full h-[1px] bg-[#D9D9D9]"></div>

        <div className="flex flex-col h-full mt-[50px]">
          <Editor
            height="100%"
            width="100%"
            language={language}
            value={code}
            onChange={(value) => setCode(value || "")}
            theme="myDarkTheme"
            options={{
              fontSize: 18,
              minimap: { enabled: false },
              automaticLayout: true,
              scrollBeyondLastLine: false,
              tabSize: 4,
            }}
          />
        </div>
      </div>

      <TestResultModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} result={testResult} />
      <TestingModal isOpen={isTesting} />
    </div>
  );
};

export default MenteeDetailAssignmentPage;
