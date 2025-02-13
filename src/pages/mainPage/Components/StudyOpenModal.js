import React, { useContext, useEffect, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { LuRefreshCcw } from "react-icons/lu";
import { IoCaretDownOutline } from "react-icons/io5";
import { CTimePicker } from "@coreui/react-pro";
import { useCreateClassroom } from "../../../hooks/useClassroom";
import { Context } from "../../../AppProvider";
import { useNavigate } from "react-router-dom";
import untocImg from "../../../images/untocImg.png";

const StudyOpenModal = ({ setIsModalOpen }) => {
  const { token } = useContext(Context);
  const navigate = useNavigate();
  const [studentNumDropdown, setStudentNumDropdown] = useState(false);
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
  const [isButtonPressed, setIsButtonPressed] = useState(initialState);
  const [message, setMessage] = useState("");
  const createClassroomMutation = useCreateClassroom();
  const handleCreateClassroom = () => {
    createClassroomMutation.mutate(
      { token, isButtonPressed },
      {
        onError: (error) => {
          setMessage(
            "채팅방 링크를 제외한\n모든 항목은 빠짐없이 입력해주세요."
          );
        },
      }
    );
  };

  return (
    <div className="bg-black bg-opacity-45 fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="rounded-2xl bg-white shadow-lg shadow-[#575757] h-[38rem] w-[59rem] flex flex-col">
        <div className="rounded-t-2xl h-[2.5rem] bg-lightMint flex justify-start items-center px-2 gap-1 mb-[1rem]">
          <button
            className="bg-[#FF9780] rounded-full flex justify-center items-center p-1"
            onClick={() => setIsModalOpen(false)}
          >
            <IoCloseSharp color="white" size="16" />
          </button>
          <button
            className="bg-[#FBFFAA] rounded-full flex justify-center items-center p-1"
            onClick={() => setIsButtonPressed(initialState)}
          >
            <LuRefreshCcw color="#9C9C9C" size="16" />
          </button>
          <button
            className="bg-[#54CEA6] rounded-full flex justify-center items-center p-1"
            onClick={handleCreateClassroom}
          >
            <FaCheck color="white" size="16" />
          </button>
        </div>
        <div className="flex-grow px-3 flex flex-col gap-[0.5rem]">
          <div className="flex-[4.5] flex gap-[1rem]">
            <div className="flex-[4]">
              <img src={untocImg} alt="untocImg" />
            </div>
            <div className="flex-[6] bg-white flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <div className="text-lightBlack font-semibold">스터디 명</div>
                <input
                  className="border-lightLightMint border-2 rounded-2xl w-full py-1 px-3"
                  value={isButtonPressed.studyName}
                  onChange={(e) =>
                    setIsButtonPressed({
                      ...isButtonPressed,
                      studyName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-1 flex-grow">
                <div className="text-lightBlack font-semibold">한줄 소개</div>
                <textarea
                  className="bg-lightLightMint rounded-xl flex-grow resize-none px-3 py-2"
                  value={isButtonPressed.introduction}
                  onChange={(e) =>
                    setIsButtonPressed({
                      ...isButtonPressed,
                      introduction: e.target.value,
                    })
                  }
                />
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
                      value={isButtonPressed.studyNumber}
                      onClick={() => setStudentNumDropdown((prev) => !prev)}
                    >
                      <IoCaretDownOutline color="#A8E6CF" />
                      {studentNumDropdown && (
                        <ul className="absolute bg-white border rounded-md mt-1 shadow-lg z-10 w-20 right-0">
                          {[2, 3, 4, 5, 6, 7].map((num) => (
                            <li
                              key={num}
                              onClick={() =>
                                setIsButtonPressed({
                                  ...isButtonPressed,
                                  studyNumber: num,
                                })
                              }
                              className="px-4 py-2 hover:bg-lightMint hover:text-white cursor-pointer"
                            >
                              {num} 명
                            </li>
                          ))}
                        </ul>
                      )}
                    </button>
                    <div>{isButtonPressed.studyNumber} 명</div>
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
                  <input
                    className="bg-inputPlaceholder rounded-xl w-full py-1 px-3"
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
            </div>
          </div>
        </div>
      </div>
      {message && (
        <div className="z-30 bg-black bg-opacity-45 fixed top-0 left-0 w-full h-full flex justify-center items-center">
          <div className="rounded-2xl bg-white shadow-lg shadow-[#575757] h-[11rem] w-[30rem] flex flex-col">
            <div className="rounded-t-2xl h-[2.5rem] bg-lightMint flex justify-start items-center px-2 gap-1 mb-[1rem]">
              <button
                className="bg-[#FF9780] rounded-full flex justify-center items-center p-1"
                onClick={() => setMessage()}
              >
                <IoCloseSharp color="white" size="16" />
              </button>
            </div>
            <ul className="pt-[26px] px-[10px] flex flex-col items-center">
              <p className="text-[20px] text-[#686868] font-bold">
                <span className="text-[#FF6E6E]">{message}</span>
              </p>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyOpenModal;
