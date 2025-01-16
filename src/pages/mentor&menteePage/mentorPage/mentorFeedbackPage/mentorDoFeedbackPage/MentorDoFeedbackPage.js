import React, { useRef, useState, useEffect } from "react";
import Highlight from "react-highlight";
import { HiMiniUsers } from "react-icons/hi2";
import { useGetMenteeAssignmentStatus } from "../../../../../hooks/useMentee";
import { useSendFeedback } from "../../../../../hooks/useMentor";
import { useContext } from "react";
import { Context } from "../../../../../AppProvider";
import { useLocation, useNavigate } from "react-router-dom";

const MentorDoFeedbackPage = () => {
  const navigate = useNavigate();
  const { token } = useContext(Context); // Context에서 token 가져오기
  const { state } = useLocation(); // navigate로 전달된 데이터 받기
  const { assignmentId, menteeName } = state || {}; // assignmentId와 menteeName 가져오기
  const sendFeedbackMutation = useSendFeedback();

  const getMenteeAssignmentStatusMutation = useGetMenteeAssignmentStatus();
  const [menteeFeedbackData, setAllMenteeFeedbackData] = useState(null);
  const [selectedMenteeData, setSelectedMenteeData] = useState(null);
  const [otherMentees, setOtherMentees] = useState([]); // menteeName 제외한 멘티 저장

  const [feedback, setFeedback] = useState(""); // 입력 값 상태 관리
  const textareaRef = useRef(null);

  const [showMembers, setShowMembers] = useState(false);
  const highlightRef = useRef(null);
  const hideScrollbar = (element) => {
    if (element) {
      element.style.scrollbarWidth = "none"; // Firefox
      element.style.msOverflowStyle = "none"; // IE, Edge
      element.classList.add("hide-scrollbar");
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setFeedback(input);

    const textarea = textareaRef.current;

    // 최대 높이 600px로 제한
    textarea.style.height = "auto"; // 높이 초기화
    const newHeight = textarea.scrollHeight > 500 ? 500 : textarea.scrollHeight;
    textarea.style.height = `${newHeight}px`; // 높이 설정
  };

  useEffect(() => {
    if (assignmentId && menteeName) {
      getMenteeAssignmentStatusMutation.mutate(
        { token, assignmentId },
        {
          onSuccess: (data) => {
            console.log("멘티 피드백 리스트 연결함!!!", data);
            setAllMenteeFeedbackData(data);

            const menteeData = data.submissions.find(
              (submission) => submission.user_id === menteeName
            );

            if (menteeData) {
              setSelectedMenteeData(menteeData); // 선택된 멘티 데이터 저장
            }
            // menteeName을 제외한 나머지 user_id들 필터링
            const filteredMentees = data.submissions
              .filter(
                (submission) =>
                  submission.user_id !== menteeName &&
                  (submission.status !== false ||
                    submission.status === undefined)
              )
              .map((submission) => submission.user_id); // user_id만 추출
            setOtherMentees(filteredMentees); // 상태로 저장
          },
        }
      );
    }
  }, [assignmentId, menteeName]);

  const handleSaveFeedback = () => {
    // API 호출
    sendFeedbackMutation.mutate(
      {
        token,
        assignmentId,
        menteeId: menteeName, // menteeName을 menteeId로 사용
        feedback,
      },
      {
        onSuccess: (response) => {
          console.log("피드백 전송 성공:", response);
          alert("피드백이 성공적으로 저장되었습니다!");
        },
        onError: (error) => {
          console.error("피드백 전송 실패:", error);
          alert("피드백 전송 중 오류가 발생했습니다.");
        },
      }
    );
  };

  // 로딩 상태 처리
  if (!menteeFeedbackData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  // 선택된 멘티 데이터가 없는 경우 처리
  if (!selectedMenteeData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>선택된 멘티 데이터를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-65px)]">
      {/* 왼쪽 섹션 */}
      <div className="flex-grow bg-white border-r border-[#D9D9D9] flex flex-col">
        {/* 코드 보기 섹션 */}
        <div className="flex-grow overflow-hidden relative">
          <div
            ref={(ref) => {
              highlightRef.current = ref;
              hideScrollbar(ref); // 스크롤바 숨기기 함수 호출
            }}
            className="bg-[#2B2B2B] absolute w-full h-full inset-0 overflow-y-scroll pointer-events-auto"
          >
            <Highlight
              className="h-full python text-[1rem] leading-[1.5] p-4"
              style={{
                fontFamily: "Monaco, Consolas, monospace",
                whiteSpace: "pre",
              }}
            >
              {selectedMenteeData.code || "코드가 없습니다."}
            </Highlight>
          </div>
        </div>
        <div className="h-px bg-[#D9D9D9]"></div>
        {/* 멤버 버튼 */}
        <div className="relative">
          <button
            onClick={() => setShowMembers((prev) => !prev)}
            className="h-10 flex items-center gap-2 px-6 w-full bg-white hover:bg-gray-100"
          >
            <HiMiniUsers color="#54CEA6" size={24} />
            <span className="text-[#54CEA6] font-semibold">{menteeName}</span>
          </button>

          {/* 멤버 리스트 */}
          {showMembers && (
            <div className="absolute bottom-full mb-2 left-6 flex flex-col items-center gap-2">
              {otherMentees.length > 0 ? (
                otherMentees.map((mentee) => (
                  <button
                    key={mentee}
                    className="w-auto px-[15px] py-[5px] flex items-center justify-center border-2 border-[#54CEA6] text-[#54CEA6] font-semibold rounded-full bg-white shadow-md hover:bg-[#54CEA6] hover:text-white transition-colors"
                    onClick={() =>
                      navigate("/mentor/doFeedback", {
                        state: {
                          assignmentId: assignmentId,
                          menteeName: mentee,
                        },
                      })
                    }
                  >
                    {mentee}
                  </button>
                ))
              ) : (
                <p className="text-gray-500">다른 멘티가 없습니다.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 오른쪽 섹션 */}
      <div className="flex flex-col items-center  w-[400px] bg-white">
        <div className="mb-[15px] flex items-center justify-center h-[40px] w-full border-b border-[#D9D9D9] bg-white">
          <span className="text-[16px] font-bold text-[#525252]">
            과제 코드 총평
          </span>
        </div>

        <textarea
          ref={textareaRef}
          value={feedback}
          onChange={handleInputChange}
          className="w-[calc(100%-30px)] mx-[15px] p-[15px] border-2 border-[#54CEA6] bg-[#F8FFF9] rounded-md text-[16px] text-gray-700 leading-[24px] focus:outline-none mb-4 resize-none overflow-y-scroll scrollbar-hide"
          placeholder="총평을 입력하세요..."
          rows={10} // 기본 행 수 설정
          style={{
            maxHeight: "500px", // 최대 높이 제한
            overflowY: "scroll", // 스크롤 활성화
            scrollbarWidth: "none", // Firefox 스크롤바 숨기기
            msOverflowStyle: "none", // IE 스크롤바 숨기기
          }}
        ></textarea>

        {/* 저장하기 버튼 */}
        <button
          className="absolute bottom-[20px]  px-[30px] py-[10px] bg-[#54CEA6] text-white text-[21px] font-semibold rounded-[10px] hover:bg-[#3ebd94]"
          onClick={handleSaveFeedback}
        >
          저장하기
        </button>
      </div>
    </div>
  );
};

export default MentorDoFeedbackPage;
