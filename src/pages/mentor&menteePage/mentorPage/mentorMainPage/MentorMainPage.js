import React from "react";
import CommonMainComponent from "../../components/CommonMainComponent";
import studyIcon1 from "../../../../images/studyIcon1.png";
import studyIcon2 from "../../../../images/studyIcon2-1.png";
import studyIcon3 from "../../../../images/studyIcon3.png";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Assignment from "./components/Assignment";

const MentorMainPage = () => {
  return (
    <div className="mx-14 mb-10">
      <CommonMainComponent />
      <div className="flex gap-5 mt-3">
        <div className="rounded-2xl border-2 border-darkMint flex-1 flex flex-col items-center py-8">
          <div className="text-studyComponentBlack text-xl font-semibold">
            전체 과제
          </div>
          <div className="w-[11rem]">
            <img src={studyIcon1} className="w-full h-full object-cover" />
          </div>
          <div>
            <Link className="flex items-center justify-end px-3 mb-2">
              <div className="text-studyComponentBlack font-semibold">
                더보기
              </div>
              <FaChevronRight size={15} color="#686868" />
            </Link>
            <div className="flex flex-col gap-3">
              <Assignment />
              <Assignment />
              <Assignment />
            </div>
          </div>
        </div>
        <div className="rounded-2xl border-2 border-darkMint flex-1 flex flex-col items-center py-8">
          <div className="text-studyComponentBlack text-xl font-semibold">
            과제 생성
          </div>
          <div className="w-[11rem]">
            <img src={studyIcon2} className="w-full h-full object-cover" />
          </div>
          <div className="flex-grow flex items-center">
            <Link className="flex gap-3 justify-center items-center px-10 py-7 border-3 bg-[rgba(141,229,230,0.3)] border-realLightMint rounded-2xl ">
              <div className="text-3xl text-lightBlack font-bold">
                바로 가기
              </div>
              <FaChevronRight size={25} />
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border-2 border-darkMint flex-1 flex flex-col items-center py-8">
          <div className="text-studyComponentBlack text-xl font-semibold">
            과제 피드백하기
          </div>
          <div className="w-[11rem]">
            <img src={studyIcon3} className="w-full h-full object-cover" />
          </div>
          <div>
            <Link className="flex items-center justify-end px-3 mb-2">
              <div className="text-studyComponentBlack font-semibold">
                더보기
              </div>
              <FaChevronRight size={15} color="#686868" />
            </Link>
            <div className="flex flex-col gap-3">
              <Assignment />
              <Assignment />
              <Assignment />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorMainPage;
