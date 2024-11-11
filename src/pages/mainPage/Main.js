import React, { useEffect, useState } from "react";
import logoImg from "../../images/logoImg.png";
import mainImg from "../../images/mainImg.png";
import { FaCheck } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { PiHashBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import StudyOpenModal from "./modal/StudyOpenModal";

// Link 태그들 to 속성 값에 맞게 경로 설정 필요

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="mx-20">
      <div className="pt-6 mx-2">
        <div className="flex justify-end">
          <Link to = "/login" className="text-[0.8rem] text-[#C4C4C4] font-semibold">
            로그인 / 회원가입
          </Link>
        </div>
        <div className="flex justify-between items-end">
          <div className="flex space-x-5">
            <img src={logoImg} alt="로고이미지" />
            <form
              className="flex items-center bg-inputPlaceholder rounded-full h-[2.7rem] p-[0.3rem]"
              onSubmit={(e) => e.preventDefault()}
            >
              <input className="outline-none w-[25rem] mx-3 bg-transparent" />
              <button
                type="submit"
                className="bg-lightMint rounded-full p-[0.4rem]"
              >
                <IoSearch color="white" size="18" />
              </button>
            </form>
          </div>
          <div className="flex space-x-12 mb-1 font-semibold text-[#686868]">
            <Link>공지사항</Link>
            <button onClick={() => setIsModalOpen(true)}>스터디 개설</button>
            <Link>나의 스터디룸</Link>
          </div>
        </div>
      </div>
      <hr className="my-2 bg-hrColor h-[1px] border-0" />
      <div className="flex gap-14 mx-1">
        <div className="w-[34rem] ml-10">
          <img
            className="w-full h-full object-cover"
            src={mainImg}
            alt="메인 이미지"
          />
        </div>
        <div className="flex flex-grow justify-center items-center flex-col space-y-6">
          <div className="text-black font-bold text-[2.3rem]">
            스터디 참여하기
          </div>
          <div>
            <form className="flex items-center rounded-full py-[0.4rem] pr-[0.6rem] pl-[0.9rem] justify-between border-2 border-darkMint shadow-md w-[26rem]">
              <PiHashBold color="#54CEA6" size="25" />
              <input className="flex-grow outline-none ml-2 mr-3 text-[1.5rem] font-semibold text-lightBlack italic tracking-wide" />
              <button className="bg-darkMint rounded-full p-[0.4rem]">
                <FaCheck color="white" size="18" />
              </button>
            </form>
          </div>
        </div>
      </div>
      <hr className="my-2 bg-hrColor h-[1px] border-0" />
      <div className="mx-7 mt-5">
        <div className="flex gap-[1.6rem]">
          <button className="flex text-center text-sm font-semibold border-2 border-[#CED4DA] text-[#495057] px-[0.8rem] py-[0.5rem] rounded-full">
            🍀전체 스터디 룸
          </button>
          <button className="flex text-center text-sm font-semibold border-2 border-[#CED4DA] text-[#495057] px-[0.8rem] py-[0.5rem] rounded-full">
            👑나의 스터디 룸
          </button>
        </div>
        <div>스터디들</div>
      </div>
      {isModalOpen && <StudyOpenModal />}
    </div>
  );
};

export default Main;
