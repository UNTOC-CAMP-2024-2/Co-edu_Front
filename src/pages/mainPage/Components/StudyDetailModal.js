import React, { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { FaCircleArrowRight } from "react-icons/fa6";

const StudyDetailModal = ({ setIsStudyDetailModalOpen }) => {
  return (
    <div className="bg-black bg-opacity-45 fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="rounded-2xl bg-white shadow-lg shadow-[#575757] h-[38rem] w-[59rem] flex flex-col">
        <div className="rounded-t-2xl h-[2.5rem] bg-lightMint flex justify-start items-center px-2 gap-1 mb-[1rem]">
          <button
            className="bg-[#FF9780] rounded-full flex justify-center items-center p-1"
            onClick={() => setIsStudyDetailModalOpen(null)}
          >
            <IoCloseSharp color="white" size="16" />
          </button>
        </div>
        <div className="flex-grow px-3 flex flex-col gap-[0.5rem]">
          <div className="flex-[4.5] flex gap-[1rem]">
            <div className="flex-[4] bg-black">사진</div>
            <div className="flex-[6] bg-white flex flex-col gap-3">
              <div className="text-lightBlack text-xl font-semibold">
                세상에 나쁜 개발자는 없다
              </div>
              <div className="bg-lightLightMint rounded-xl flex-grow px-3 py-2">
                한줄 소개입니다....
              </div>
            </div>
          </div>
          <div className="flex-[5.5] flex mb-3">
            <div className="flex-[4.4] flex flex-col gap-8 mx-3 justify-center pb-10">
              <div>
                <div className="text-lightBlack text-[0.9rem] font-semibold">
                  요일
                </div>
                <div className="flex justify-between mr-7">
                  <div className="flex justify-center font-semibold p-2 rounded-full w-10 h-10">
                    월
                  </div>
                  <div className="flex justify-center font-semibold p-2 rounded-full w-10 h-10">
                    화
                  </div>
                  <div className="flex justify-center font-semibold p-2 rounded-full w-10 h-10 bg-lightMint text-white">
                    수
                  </div>
                  <div className="flex justify-center font-semibold p-2 rounded-full w-10 h-10">
                    목
                  </div>
                  <div className="flex justify-center font-semibold p-2 rounded-full w-10 h-10">
                    금
                  </div>
                  <div className="flex justify-center font-semibold p-2 rounded-full w-10 h-10">
                    토
                  </div>
                  <div className="flex justify-center font-semibold p-2 rounded-full w-10 h-10 bg-lightMint text-white">
                    일
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div className="text-lightBlack text-[0.9rem] font-semibold mb-3">
                    수업시간
                  </div>
                  <div className="flex justify-evenly">
                    <div className="text-black text-lg">16 : 30</div>
                    <div className="font-semibold text-xl">~</div>
                    <div className="text-black text-lg">16 : 30</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <hr className="border-hrColor border-2 border-dashed h-full w-[2px]" />
            </div>
            <div className="flex-[4.4]">
              <div className="flex flex-col gap-[2rem] mx-7 h-full justify-center">
                <div className="flex justify-between">
                  <div className="text-lightBlack font-semibold text-sm">
                    스터디장
                  </div>
                  <div className="text-black font-semibold text-sm">임지민</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-lightBlack font-semibold text-sm">
                    스터디 인원
                  </div>
                  <div className="text-black font-semibold text-sm">
                    최대 5명
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-lightBlack font-semibold text-sm">
                    가입 방식
                  </div>
                  <div className="text-black font-semibold text-sm">
                    자유 가입제
                  </div>
                </div>
                <div className="flex justify-center">
                  <button className="flex justify-center items-center gap-[1rem] border-2 border-darkMint rounded-full px-5 py-3">
                    <div className="text-darkMint text-xl font-semibold">
                      가입 신청하기
                    </div>
                    <FaCircleArrowRight color="#54CEA6" size={35} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyDetailModal;
