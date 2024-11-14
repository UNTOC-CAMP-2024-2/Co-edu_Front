import React, { useState } from "react";
import logoImg from "../../images/logoImg.png";
import mainImg from "../../images/mainImg.png";
import { FaCheck } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { PiHashBold } from "react-icons/pi";
import { Link, Outlet } from "react-router-dom";

// 스터디 참여 전 헤더
const PreHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="mx-20">
        <div className="pt-6 mx-2">
          <div className="flex justify-end">
            <div className="text-[0.8rem] text-[#C4C4C4] font-semibold">
              <Link to="login">로그인</Link> / <Link to="signup">회원가입</Link>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div className="flex space-x-5">
              <Link to="/">
                <img src={logoImg} alt="로고이미지" />
              </Link>
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
      </div>
      <Outlet context={[isModalOpen, setIsModalOpen]} />
    </>
  );
};

export default PreHeader;
