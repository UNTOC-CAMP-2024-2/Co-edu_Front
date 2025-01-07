import React, { useState, useRef } from "react";
import { BsSend } from "react-icons/bs";

const ChattingPage = () => {
  const [messages, setMessages] = useState([
    { type: "mentee", text: "별 찍기의 고수가 되는 방법을 아나 ?" },
    { type: "mentor", text: "백준의 별 찍기를 열심히 해봐" },
    { type: "mentee", text: "실어어" },
    { type: "mentor", text: "시간 날 때마다 꾸준히 해" },
    { type: "mentor", text: "시간 날 때마다 꾸준히 해" },
    { type: "mentor", text: "시간 날 때마다 꾸준히 해" },
    { type: "mentor", text: "시간 날 때마다 꾸준히 해" },
    { type: "mentor", text: "시간 날 때마다 꾸준히 해" },
    { type: "mentor", text: "시간 날 때마다 꾸준히 해" },
    { type: "mentor", text: "시간 날 때마다 꾸준히 해" },
    { type: "mentor", text: "시간 날 때마다 꾸준히 해" },
    { type: "mentor", text: "시간 날 때마다 꾸준히 해" },
    { type: "mentor", text: "시간 날 때마다 꾸준히 해" },
    { type: "mentor", text: "시간 날 때마다 꾸준히 해" },
    { type: "mentor", text: "시간 날 때마다 꾸준히 해" },
    { type: "mentor", text: "시간 날 때마다 꾸준히 해" },
  ]);

  const [input, setInput] = useState("");
  const [currentUser, setCurrentUser] = useState("mentee"); // 현재 사용자를 멘티로 설정
  const chatRef = useRef(null);

  const sendMessage = () => {
    if (input.trim()) {
      // 메시지 추가
      setMessages([...messages, { type: currentUser, text: input }]);
      setInput("");

      setCurrentUser((prev) => (prev === "mentee" ? "mentee" : "mentor"));
    }
  };

  const handleWheel = (event) => {
    if (chatRef.current) {
      chatRef.current.scrollTop += event.deltaY;
      event.preventDefault();
    }
  };

  return (
    <div className="flex h-[calc(100vh-65px)]">
      {/* Left Section: Code Input */}
      <div className="flex-grow bg-gray-50 p-4 ">
        <h2 className="text-lg font-bold mb-4">코드 입력 섹션</h2>
      </div>

      {/* Right Section: Chat */}
      <div className="w-[400px] flex flex-col border-l border-[#D9D9D9]">
        {/* Title Section */}
        <div className="flex items-center justify-center flex-shrink-0 h-[40px] border-b border-[#D9D9D9] bg-white">
          <h2 className="text-[16px] font-bold text-[#525252]">스터디 채팅</h2>
        </div>

        {/* Chat Section */}
        <div
          ref={chatRef}
          onWheel={handleWheel}
          className="flex-grow px-[15px] pt-[10px] pb-[10px] overflow-hidden"
          style={{ scrollBehavior: "smooth" }}
        >
          {messages.map((msg, index) => {
            const showName =
              msg.type === "mentor" &&
              (index === 0 || messages[index - 1]?.type !== "mentor");

            return (
              <div key={index} className="mb-[7px]">
                {showName && (
                  <div className="px-[10px] text-[#969696] font-extrabold text-[12px] mb-[2px]">
                    스터디장 김태우
                  </div>
                )}
                <div
                  className={`flex ${
                    msg.type === "mentee" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`${
                      msg.type === "mentee"
                        ? "bg-[#F8F8F9] border-[3px] border-[#CFCFCF] text-black"
                        : "bg-white border-[3px] border-[#A8E6CF] text-black"
                    } px-[13px] py-[5px] rounded-[12px] max-w-[75%]`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Section */}
        <div className="sticky bottom-0 left-0 right-0 p-[2px] border-t border-[#D9D9D9] bg-white flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="여기에 입력해주세요."
            className="flex-grow border-none text-[#A3A3A3] placeholder-[#A3A3A3] px-4 py-2 focus:outline-none"
          />
          <button
            onClick={sendMessage}
            className="text-[#3CC88E] p-2 flex items-center justify-center"
          >
            <BsSend className="w-6 h-6 transform scale-x-[-1]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChattingPage;
