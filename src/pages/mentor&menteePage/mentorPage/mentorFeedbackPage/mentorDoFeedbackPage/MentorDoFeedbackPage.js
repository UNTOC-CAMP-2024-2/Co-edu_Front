import React, { useRef, useState, useEffect, useContext } from "react";
import { HiMiniUsers } from "react-icons/hi2";
import { useGetMenteeAssignmentStatus } from "../../../../../hooks/useMentee";
import { useSendFeedback } from "../../../../../hooks/useMentor";
import { Context } from "../../../../../AppProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { setupMonacoEditorDesign } from "../../../components/EditorDesign"; 

const MentorDoFeedbackPage = () => {
  const navigate = useNavigate();
  const { token } = useContext(Context);
  const { state } = useLocation();
  const { assignmentId, menteeName } = state || {};
  const sendFeedbackMutation = useSendFeedback();
  const getMenteeAssignmentStatusMutation = useGetMenteeAssignmentStatus();

  const [menteeFeedbackData, setAllMenteeFeedbackData] = useState(null);
  const [selectedMenteeData, setSelectedMenteeData] = useState(null);
  const [otherMentees, setOtherMentees] = useState([]);
  const [feedback, setFeedback] = useState("");
  const textareaRef = useRef(null);
  const [showMembers, setShowMembers] = useState(false);


  useEffect(() => {
    setupMonacoEditorDesign();
  }, []);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setFeedback(input);
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    const newHeight = textarea.scrollHeight > 500 ? 500 : textarea.scrollHeight;
    textarea.style.height = `${newHeight}px`;
  };

  useEffect(() => {
    if (assignmentId && menteeName) {
      getMenteeAssignmentStatusMutation.mutate(
        { token, assignmentId },
        {
          onSuccess: (data) => {
            setAllMenteeFeedbackData(data);
            const menteeData = data.submissions.find(
              (submission) => submission.user_id === menteeName
            );
            if (menteeData) setSelectedMenteeData(menteeData);

            const feedbackEntry = data.feedbacks?.find(f => f.user_id === menteeName);
            setFeedback(feedbackEntry?.feedback || "");

            const filteredMentees = data.submissions
              .filter((submission) => submission.user_id !== menteeName)
              .map((submission) => submission.user_id);

            setOtherMentees(filteredMentees);
          },
        }
      );
    }
  }, [assignmentId, menteeName]);

  const handleSaveFeedback = () => {
    sendFeedbackMutation.mutate(
      { token, assignmentId, menteeId: menteeName, feedback },
      {
        onSuccess: () => alert("피드백이 성공적으로 저장되었습니다!"),
        onError: () => alert("피드백 전송 중 오류가 발생했습니다."),
      }
    );
  };

  if (!menteeFeedbackData) {
    return <div className="flex items-center justify-center h-screen">데이터를 불러오는 중입니다...</div>;
  }

  if (!selectedMenteeData) {
    return <div className="flex items-center justify-center h-screen">선택된 멘티 데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex h-[calc(100vh-65px)]">
      {/* 왼쪽: 코드 보기 */}
      <div className="flex-grow bg-white border-r border-[#D9D9D9] flex flex-col">
        <div className="flex-grow overflow-hidden relative">
          <Editor
            language="python"
            value={selectedMenteeData.code || "코드가 없습니다."}
            theme="myDarkTheme"
            options={{
              readOnly: true,
              fontSize: 15,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              fontFamily: "Monaco, Consolas, monospace",
              lineNumbers: "on",
              automaticLayout: true,
            }}
            height="100%"
            width="100%"
          />
        </div>

        {/* 하단 바 */}
        <div className="h-px bg-[#D9D9D9]"></div>

        {/* 멘티 선택 버튼 */}
        <div className="relative">
          <button
            onClick={() => setShowMembers((prev) => !prev)}
            className="h-10 flex items-center gap-2 px-6 w-full bg-white hover:bg-gray-100"
          >
            <HiMiniUsers color="#54CEA6" size={24} />
            <span className="text-[#54CEA6] font-semibold">{menteeName}</span>
          </button>

          {showMembers && (
            <div className="absolute bottom-full mb-2 left-6 flex flex-col items-center gap-2">
              {otherMentees.length > 0 ? (
                otherMentees.map((mentee) => (
                  <button
                    key={mentee}
                    className="w-auto px-[15px] py-[5px] flex items-center justify-center border-2 border-[#54CEA6] text-[#54CEA6] font-semibold rounded-full bg-white shadow-md hover:bg-[#54CEA6] hover:text-white transition-colors"
                    onClick={() =>
                      navigate("/mentor/doFeedback", {
                        state: { assignmentId, menteeName: mentee },
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

      {/* 오른쪽: 피드백 입력 */}
      <div className="flex flex-col items-center w-[400px] bg-white">
        <div className="mb-[15px] flex items-center justify-center h-[40px] w-full border-b border-[#D9D9D9] bg-white">
          <span className="text-[16px] font-bold text-[#525252]">과제 코드 총평</span>
        </div>

        <textarea
          ref={textareaRef}
          value={feedback}
          onChange={handleInputChange}
          className="w-[calc(100%-30px)] mx-[15px] p-[15px] border-2 border-[#54CEA6] bg-[#F8FFF9] rounded-md text-[16px] text-gray-700 leading-[24px] focus:outline-none mb-4 resize-none overflow-y-scroll scrollbar-hide"
          placeholder="총평을 입력하세요..."
          rows={10}
          style={{
            maxHeight: "500px",
            overflowY: "scroll",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        />

        <button
          className="absolute bottom-[20px] px-[30px] py-[10px] bg-[#54CEA6] text-white text-[21px] font-semibold rounded-[10px] hover:bg-[#3ebd94]"
          onClick={handleSaveFeedback}
        >
          저장하기
        </button>
      </div>
    </div>
  );
};

export default MentorDoFeedbackPage;
