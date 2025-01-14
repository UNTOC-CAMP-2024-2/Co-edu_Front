import React, { useState, useEffect, useContext } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { CTimePicker } from "@coreui/react-pro";
import { IoCaretDownOutline } from "react-icons/io5";

const MentorSettingPage = () => {
  const initialState = {
    studyName: "",
    introduction: "",
    selectedDay: {
      Mon: false,
      Tue: false,
      Wed: false,
      Thu: false,
      Fri: false,
      Sat: false,
      Sun: false,
    },
    time: {
      start: "",
      end: "",
    },
    studyNumber: "",
    visibility: "",
    // pulbic -> 전체 공개
    // private -> 비공개
    joinType: "",
    // free -> 자유 가입제
    // approval -> 승인 가입제
    link: "",
  };
  const days = {
    월: "Mon",
    화: "Tue",
    수: "Wed",
    목: "Thu",
    금: "Fri",
    토: "Sat",
    일: "Sun",
  };
  const [state, setState] = useState(initialState);
  const [isButtonPressed, setIsButtonPressed] = useState(initialState);
  const [studentNumDropdown, setStudentNumDropdown] = useState(false);

  const handleChange = (field, value) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="mx-[195px] mt-10 mb-20">
      {/* 제목 */}
      <div className="text-center mt-[80px] mb-[60px]">
        <h1 className="text-[35px]">설정</h1>
      </div>

      {/* 스터디 명 */}
      <div className="mb-[35px]">
        <div className="flex items-end justify-between mb-[8px]">
          {/* Label */}
          <label
            htmlFor="Title"
            className="block text-[20px] ml-[15px] text-[#525252]"
          >
            스터디 명
          </label>

          <div className="flex items-center justify-end gap-4 mb-[35px]">
            {/* 저장하기 버튼 */}
            <button
              className="h-[45px] px-[25px] bg-[#54CEA6] text-white text-[20px] font-bold rounded-lg hover:bg-[#43A484]"
              onClick={() => alert("저장되었습니다.")}
            >
              저장 하기
            </button>
          </div>
        </div>
        <input
          type="text"
          id="Title"
          value={isButtonPressed.studyName}
          onChange={(e) => handleChange("studyName", e.target.value)}
          className="w-full h-[45px] px-[20px] border-[3px] border-[#E3F7EF] rounded-full focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] placeholder:font-bold placeholder:text-[14px] placeholder-[#9C9C9C] text-[#525252] text-[18px]"
        />
      </div>

      {/* 스터디방 설명 */}
      <div className="mb-[50px]">
        <label
          htmlFor="studyIntroduction"
          className="block text-[20px] ml-[15px] mb-[8px] text-[#525252]"
        >
          한 줄 소개
        </label>
        <textarea
          id="studyIntroduction"
          value={isButtonPressed.introduction}
          onChange={(e) => handleChange("introduction", e.target.value)}
          className="w-full px-[15px] py-[12px] border-[3px] bg-[#E3F7EF] border-[#E3F7EF] rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] placeholder:font-bold placeholder:text-[14px] placeholder-[#9C9C9C] text-[#525252] text-[18px] resize-none overflow-hidden"
          style={{ lineHeight: "30px", minHeight: "120px" }}
        ></textarea>
      </div>
      {/* 좌우 레이아웃 */}
      <div className="flex gap-8">
        {/* 왼쪽 패널 */}
        <div className="flex-1">
          {/* 요일 선택 */}
          <div className="mb-[25px]">
            <div className="block text-[18px] ml-[18px] mb-[6px] text-[#525252]">
              요일
            </div>
            <div className="flex justify-between mr-7">
              {Object.keys(days).map((day) => (
                <button
                  className={`text-[18px] text-black rounded-full w-10 h-10 ${
                    isButtonPressed.selectedDay[days[day]] &&
                    "bg-lightMint text-white"
                  }`}
                  onClick={() =>
                    setIsButtonPressed({
                      ...isButtonPressed,
                      selectedDay: {
                        ...isButtonPressed.selectedDay,
                        [days[day]]: !isButtonPressed.selectedDay[days[day]],
                      },
                    })
                  }
                >
                  <div>{day}</div>
                </button>
              ))}
            </div>
          </div>
          {/* 수업 시간 */}
          <div>
            <div className="mb-[25px]">
              <div className="block text-[18px] ml-[18px] mb-[8px] text-[#525252]">
                수업시간
              </div>
              <div className="flex justify-between">
                <CTimePicker
                  className="w-[10rem]"
                  placeholder="시간 선택"
                  locale="ko"
                  seconds={false}
                  time={isButtonPressed.time.start}
                  onTimeChange={(time) =>
                    time &&
                    setIsButtonPressed({
                      ...isButtonPressed,
                      time: {
                        ...isButtonPressed.time,
                        start: time.slice(0, 5),
                      },
                    })
                  }
                />
                <div className="font-semibold text-xl">~</div>
                <CTimePicker
                  className="w-[10rem]"
                  placeholder="시간 선택"
                  locale="ko"
                  seconds={false}
                  time={isButtonPressed.time.end}
                  onTimeChange={(time) =>
                    time &&
                    setIsButtonPressed({
                      ...isButtonPressed,
                      time: {
                        ...isButtonPressed.time,
                        end: time.slice(0, 5),
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="mb-[25px]">
            <div className="block text-[18px] ml-[18px] mb-[5px] text-[#525252]">
              가입 방식
            </div>
            <div className="flex justify-evenly mr-[1rem]">
              <button
                className={`text-[18px] text-black py-2 px-5 rounded-full border-4 ${
                  isButtonPressed.visibility === "public"
                    ? "border-lightMint"
                    : "border-transparent"
                }`}
                onClick={() =>
                  setIsButtonPressed({
                    ...isButtonPressed,
                    visibility: "public",
                  })
                }
              >
                전체 공개
              </button>
              <button
                className={`text-[18px] text-black py-2 px-5 rounded-full border-4 ${
                  isButtonPressed.visibility === "private"
                    ? "border-lightMint"
                    : "border-transparent"
                }`}
                onClick={() =>
                  setIsButtonPressed({
                    ...isButtonPressed,
                    visibility: "private",
                  })
                }
              >
                비공개
              </button>
            </div>
          </div>
          <div className="mb-[25px]">
            <div className="block text-[18px] ml-[18px] mb-[5px] text-[#525252]">
              가입 방식
            </div>
            <div className="flex justify-evenly">
              <button
                className={`text-[18px] text-black  py-2 px-5 rounded-full border-4 ${
                  isButtonPressed.joinType === "free"
                    ? "border-lightMint"
                    : "border-transparent"
                }`}
                onClick={() =>
                  setIsButtonPressed({
                    ...isButtonPressed,
                    joinType: "free",
                  })
                }
              >
                자유 가입제
              </button>
              <button
                className={`text-[18px] text-black py-2 px-5 rounded-full border-4 ${
                  isButtonPressed.joinType === "approval"
                    ? "border-lightMint"
                    : "border-transparent"
                }`}
                onClick={() =>
                  setIsButtonPressed({
                    ...isButtonPressed,
                    joinType: "approval",
                  })
                }
              >
                승인 가입제
              </button>
            </div>
          </div>
          <div className="mb-[25px]">
            <div className="block text-[18px] ml-[18px] mb-[10px] text-[#525252]">
              채팅방 링크
            </div>
            <input
              className="bg-inputPlaceholder rounded-full w-full py-[5px] px-3"
              value={isButtonPressed.link}
              onChange={(e) =>
                setIsButtonPressed({
                  ...isButtonPressed,
                  link: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="w-[1px] bg-[#D9D9D9] h-auto self-stretch"></div>
        {/* 오른쪽 패널 */}
        <div className="flex-1">
          {/* 스터디 인원 */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="block text-[18px] ml-[25px] mb-[6px] text-[#525252]">
                스터디 인원
              </div>
              {/* 왼쪽 끝으로 위치 end */}
              <div className="flex itmems-center gap-4">
                <button
                  className="relative"
                  value={isButtonPressed.studyNumber}
                  onClick={() => setStudentNumDropdown((prev) => !prev)}
                >
                  <IoCaretDownOutline color="#A8E6CF" />
                  {studentNumDropdown && (
                    <ul className="absolute bg-white border-[1px] border-[#D9D9D9] rounded-xl mt-[3px] z-10 w-20 right-0">
                      {[2, 3, 4, 5, 6, 7].map((num) => (
                        <li
                          key={num}
                          onClick={() =>
                            setIsButtonPressed({
                              ...isButtonPressed,
                              studyNumber: num,
                            })
                          }
                          className="font-semibold text-[16px] text-[#525252] px-4 py-[10px] hover:bg-lightMint hover:text-white cursor-pointer hover:rounded-xl"
                        >
                          {num} 명
                        </li>
                      ))}
                    </ul>
                  )}
                </button>
                <div className="text-[18px] text-black mr-[40px]">
                  {isButtonPressed.studyNumber} 명
                </div>
              </div>
            </div>
          </div>

          {/* 멤버 */}
          <div className="border-[2px] border-[#D9D9D9] rounded-[20px] mr-[20px] mb-[30px]">
            {/* 상단 제목 */}
            <div className="flex justify-center items-center border-b-[2px] border-[#D9D9D9] py-[7px]">
              <p className="text-[18px] text-[#525252]">멤버</p>
            </div>

            {/* 멤버 리스트 */}
            <div className="flex items-center justify-between px-6 py-4">
              <p className="text-[18px] text-black ml-[70px]">김효정</p>
              <button className="text-[16px] text-[#54CEA6] font-bold border-[3px] border-[#54CEA6] rounded-[10px] px-[10px] py-[3px] hover:bg-[#54CEA6] hover:text-white">
                강퇴하기
              </button>
            </div>
          </div>

          {/* 스터디 가입 신청 */}
          <div className="border-[2px] border-[#D9D9D9] rounded-[20px] mr-[20px]">
            {/* 상단 제목 */}
            <div className="flex justify-center items-center border-b-[2px] border-[#D9D9D9] py-[7px]">
              <p className="text-[18px] text-[#525252]">스터디 가입 신청</p>
            </div>

            {/* 멤버 리스트 */}
            <div className="flex items-center justify-between px-6 py-4">
              <p className="text-[18px] text-black ml-[70px]">김효정</p>
              <div className="flex gap-2">
                <button className="text-[16px] text-[#54CEA6] font-bold border-[3px] border-[#54CEA6] rounded-[10px] px-[10px] py-[3px] hover:bg-[#54CEA6] hover:text-white">
                  거절하기
                </button>
                <button className="text-[16px] text-[#54CEA6] font-bold border-[3px] border-[#54CEA6] rounded-[10px] px-[10px] py-[3px] hover:bg-[#54CEA6] hover:text-white">
                  수락하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorSettingPage;
