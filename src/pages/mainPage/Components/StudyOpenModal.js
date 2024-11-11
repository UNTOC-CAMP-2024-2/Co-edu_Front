import React, { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { LuRefreshCcw } from "react-icons/lu";
import { IoCaretDownOutline } from "react-icons/io5";

const StudyOpenModal = ({ setIsModalOpen }) => {
  const [studentNumDropdown, setStudentNumDropdown] = useState(false);
  const days = {
    월: "Mon",
    화: "Tue",
    수: "Wed",
    목: "Thu",
    금: "Fri",
    토: "Sat",
    일: "Sun",
  };
  const [isButtonPressed, setIsButtonPressed] = useState({
    selectedDay: {
      Mon: false,
      Tue: false,
      Wed: false,
      Thu: false,
      Fri: false,
      Sat: false,
      Sun: false,
    },
    visibility: "",
    // pulbic -> 전체 공개
    // private -> 비공개
    joinType: "",
    // free -> 자유 가입제
    // approval -> 승인 가입제
  });

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-45 flex justify-center items-center">
      <div className="rounded-2xl bg-white shadow-lg shadow-[#575757] h-[38rem] w-[55rem] flex flex-col">
        <div className="rounded-t-2xl h-[2.5rem] bg-lightMint flex justify-start items-center px-2 gap-1 mb-[1rem]">
          <button
            className="bg-[#FF9780] rounded-full flex justify-center items-center p-1"
            onClick={() => setIsModalOpen(false)}
          >
            <IoCloseSharp color="white" size="16" />
          </button>
          <button className="bg-[#FBFFAA] rounded-full flex justify-center items-center p-1">
            <LuRefreshCcw color="#9C9C9C" size="16" />
          </button>
          <button className="bg-[#54CEA6] rounded-full flex justify-center items-center p-1">
            <FaCheck color="white" size="16" />
          </button>
        </div>
        <div className="flex-grow px-3 flex flex-col gap-[0.5rem]">
          <div className="flex-[4.5] flex gap-[1rem]">
            <div className="flex-[4] bg-black">사진</div>
            <div className="flex-[6] bg-white flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <div className="text-lightBlack font-semibold">스터디 명</div>
                <input className="border-lightLightMint border-2 rounded-2xl w-full py-1 px-3" />
              </div>
              <div className="flex flex-col gap-1 flex-grow">
                <div className="text-lightBlack font-semibold">한줄 소개</div>
                <textarea className="bg-lightLightMint rounded-xl flex-grow resize-none px-3 py-2" />
              </div>
            </div>
          </div>
          <div className="flex-[5.5] flex mb-3">
            <div className="flex-[4.4] flex flex-col gap-8 mx-3 justify-center">
              <div>
                <div className="text-lightBlack text-[0.9rem] font-semibold">
                  요일
                </div>
                <div className="flex justify-between mr-7">
                  {Object.keys(days).map((day) => (
                    <button
                      className={`font-semibold p-2 rounded-full w-10 h-10 ${
                        isButtonPressed.selectedDay[days[day]] &&
                        "bg-lightMint text-white"
                      }`}
                      onClick={() =>
                        setIsButtonPressed({
                          ...isButtonPressed,
                          selectedDay: {
                            ...isButtonPressed.selectedDay,
                            [days[day]]:
                              !isButtonPressed.selectedDay[days[day]],
                          },
                        })
                      }
                    >
                      <div>{day}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div>
                  <div className="text-lightBlack text-[0.9rem] font-semibold mb-3">
                    수업시간
                  </div>
                  <div className="flex justify-between mr-[3rem] ml-[2rem]">
                    {/* 드롭다운 기능 구현 필요 */}
                    <div className="flex gap-3">
                      <button>
                        <IoCaretDownOutline color="#A8E6CF" />
                      </button>
                      <div className="font-semibold text-lg">16 : 30</div>
                    </div>
                    <div className="font-semibold text-lg">~</div>
                    <div className="flex gap-3">
                      <button>
                        <IoCaretDownOutline color="#A8E6CF" />
                      </button>
                      <div className="font-semibold text-lg">16 : 30</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <hr className="border-hrColor border-2 border-dashed h-full w-[2px]" />
            </div>
            <div className="flex-[4.4]">
              <div className="flex flex-col gap-[1rem] mx-7 h-full justify-center">
                <div className="flex gap-[10rem]">
                  <div className="text-lightBlack font-semibold text-sm">
                    스터디 인원
                  </div>
                  <div className="flex font-semibold gap-[1rem]">
                    <button
                      className="relative"
                      onClick={() => setStudentNumDropdown((prev) => !prev)}
                    >
                      <IoCaretDownOutline color="#A8E6CF" />
                      {studentNumDropdown && (
                        <ul className="absolute bg-white border rounded-md mt-1 shadow-lg z-10 w-20 right-0">
                          {[2, 3, 4, 5, 6, 7].map((num) => (
                            <li
                              key={num}
                              className="px-4 py-2 hover:bg-lightMint hover:text-white cursor-pointer"
                            >
                              {num} 명
                            </li>
                          ))}
                        </ul>
                      )}
                    </button>
                    <div>5 명</div>
                  </div>
                </div>
                <div>
                  <div className="text-lightBlack font-semibold text-sm">
                    가입 방식
                  </div>
                  <div className="flex justify-evenly mr-[1rem]">
                    <button
                      className={`py-2 px-5 rounded-full border-4 ${
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
                      className={`py-2 px-5 rounded-full border-4 ${
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
                <div>
                  <div className="text-lightBlack font-semibold text-sm">
                    가입 방식
                  </div>
                  <div className="flex justify-evenly">
                    <button
                      className={`py-2 px-5 rounded-full border-4 ${
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
                      className={`py-2 px-5 rounded-full border-4 ${
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
                <div>
                  <div className="text-lightBlack font-semibold text-sm mb-2">
                    채팅방 링크
                  </div>
                  <input className="bg-inputPlaceholder rounded-xl w-full py-1 px-3 " />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyOpenModal;
