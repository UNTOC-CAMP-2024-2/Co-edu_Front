import React, { useRef, useEffect, useState } from "react";
import { HiSpeakerphone } from "react-icons/hi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useLocation } from "react-router-dom";

const assignmentData = {
  title: "별 찍기",
  description:
    "입력은 첫째 줄에 N(1 <= N <= 100)이 주어지며, 출력은 첫째 줄부터 차례대로 별을 출력한다. 아래의 예제와 출력을 참고하여 규칙을 유추한 뒤 별을 찍어보시오.",
  examples: [
    { input: "1", output: "*" },
    { input: "2", output: "*\n**" },
    {
      input: "3",
      output: "안녕\n안녕\n안녕\n안녕\n안녕\n안녕\n안녕\n안녕\n안녕",
    },
  ],
};

const feedbackData = {
  feedback: `impordddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddt pandas as sns 난 sns에 pandas를 올려버릴 거야 라는 말은 안되겠지 하지만 총평으로 뭘 적어야할 지 모르겠단 말이야 일단 아무말이나 적고 검토 받아야지 지금 시각은 3시 16분 어 배고파 진짜 짜증의 김치찌개 스트레스 모두가 벗어났으면 그럼 나만 이렇게 배고프진 않았겠지 ㅠㅠ 이번 주 다음 주 너무 바쁘고요 ,, 나는 아무것도 몰라 하지만 벌써 2학년 인걸 힘내야지 뭐 어쩌겠어 내년엔 또 뭐하지 ? 어 배고파 진짜 야 바보가 지피티한테 총평 써달라 할걸 ,,,`,
};

const MenteeDetailAssignmentPage = () => {
  const data = useLocation().state.problem;

  const { title, description, testcases } = data;
  const { feedback } = feedbackData;

  const [showResult, setShowResult] = useState(false);

  const [showFeedback, setShowFeedback] = useState(false);

  // Ref for the left panel
  const leftPanelRef = useRef(null);

  const feedbackTextareaRef = useRef(null);

  // Custom scroll handler
  const handleWheel = (event) => {
    if (leftPanelRef.current) {
      leftPanelRef.current.scrollTop += event.deltaY; // Scroll vertically
      event.preventDefault(); // Prevent default scrolling behavior
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
  }, [feedback, showFeedback]);

  // Disable global scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = ""; // Restore scrolling on component unmount
    };
  }, []);

  return (
    <div className="flex flex-row h-[calc(100vh-65px)]">
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
        <p className="px-[25px] text-[18px] text-[#525252] mb-[25px] leading-relaxed">
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
              value={feedback}
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
          testcases.map((example, index) => (
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
            onClick={() => setShowFeedback(!showFeedback)}
          >
            <HiSpeakerphone
              style={{ width: "30px", height: "30px", color: "#FF6E6E" }}
            />
          </button>

          {/* 실행 및 제출 버튼 */}
          <div className="flex space-x-2">
            {/* 실행 버튼 */}
            <button
              className="px-[15px] py-[4px] border-3 border-[#54CEA6] text-[#54CEA6] rounded-full text-[16px] font-extrabold hover:bg-[#e6f8f2] hover:border-[#43A484] hover:text-[#43A484]"
              onClick={() => setShowResult(true)}
            >
              실행
            </button>

            {/* 제출 버튼 */}
            <button className="px-[15px] py-[4px] border-3 border-[#54CEA6] text-[#54CEA6] rounded-full text-[16px] font-extrabold hover:bg-[#e6f8f2] hover:border-[#43A484] hover:text-[#43A484]">
              제출
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="absolute top-[50px] left-0 w-full h-[1px] bg-[#D9D9D9]"></div>

        {/* 코드 작성 섹션 */}
        <div className="flex flex-col h-full">
          <div className="flex-none h-[420px] flex items-center justify-center overflow-y-auto">
            <p className="text-gray-500 text-lg">코드 작성 섹션</p>
          </div>

          {/* 실행 결과 섹션 */}
          {showResult && ( // showResult가 true일 때만 렌더링
            <div className="bg-white border-t-[1px] border-[#D9D9D9]">
              <div className="flex items-center justify-between px-[15px] my-[8px]">
                <h3 className="text-[16px] text-[#525252]">실행 결과</h3>
                <button
                  onClick={() => setShowResult(false)}
                  className="text-[#525252] hover:text-black focus:outline-none"
                >
                  <IoIosCloseCircleOutline
                    style={{ width: "25px", height: "25px", color: "#969696" }}
                  />
                </button>
              </div>
              <div className="border-t-[1px] border-[#D9D9D9] mb-2"></div>
              <p className="text-gray-600 ml-[10px]">
                실행 결과가 여기에 표시됩니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenteeDetailAssignmentPage;
