import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaEllipsisH } from "react-icons/fa";
import logoImg from "../../images/logoImg.png";
import { IoClose } from "react-icons/io5";

const PostHeader = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  return (
    <>
      <div
        className={`relative z-10 bg-lightMint flex justify-between items-center px-[1rem] py-3 ${
          isSideBarOpen && "shadow-md shadow-[#767676]"
        }`}
      >
        <button onClick={() => setIsSideBarOpen((prev) => !prev)}>
          <FaEllipsisH color="white" size="35" />
        </button>
        <img src={logoImg} width="110" />
        <Link to="/">
          <IoClose color="white" size="40" />
        </Link>
      </div>
      <Outlet />
      {isSideBarOpen && (
        <div className="z-0">
          <div className="bg-black opacity-40 fixed top-[4rem] left-0 w-full h-full"></div>
          <div className="fixed top-[4rem] left-0 w-[28rem] h-full bg-white py-5 px-7 shadow-lg shadow-[#373737]">
            <div className="bg-slate-500 h-[13rem] rounded-lg">image</div>
            <div className="text-[#525252] font-semibold text-[1.3rem] px-3 pt-2 pb-5 max-w-[26rem] overflow-auto max-h-[6rem]">
              이것은 스터디인가 토크쇼인가 C++ 이해하기
            </div>
            <hr className="bg-[#D9D9D9] h-[2px]" />
            <div className="flex flex-col gap-7 px-3 pt-8">
              <div>
                <button className="text-[#525252] font-semibold text-[1.2rem]">
                  🏠메인
                </button>
              </div>
              <div>
                <button className="text-[#525252] font-semibold text-[1.2rem]">
                  📖과제 목록 확인하기
                </button>
              </div>
              <div>
                <button className="text-[#525252] font-semibold text-[1.2rem]">
                  🔍내가 제출한 과제 확인하기
                </button>
              </div>
              <div>
                <button className="text-[#525252] font-semibold text-[1.2rem]">
                  🔖피드백 모아보기
                </button>
              </div>
              <div>
                <button className="text-[#525252] font-semibold text-[1.2rem]">
                  ⚙️설정
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostHeader;
