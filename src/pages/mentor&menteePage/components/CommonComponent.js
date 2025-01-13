import React from "react";
import studyIcon1 from "../../../images/studyIcon1.png";
import studyIcon2_1 from "../../../images/studyIcon2-1.png";
import studyIcon2_2 from "../../../images/studyIcon2-2.png";
import studyIcon3 from "../../../images/studyIcon3.png";
import { FaChevronRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const CommonComponent = ({ children, componentTitle }) => {
  const location = useLocation();
  const pathname = useLocation().pathname;
  const dct = {
    "전체 과제": [studyIcon1, `${pathname}/assignments`],
    "과제 생성": [studyIcon2_1, `${pathname}/make`],
    "내가 제출한 과제": [studyIcon2_2],
    "과제 피드백": [studyIcon3, `${pathname}/feedback`],
  };
  const studyIcon = dct[componentTitle][0];
  const linkAddress = dct[componentTitle][1];

  return (
    <div className="rounded-2xl border-2 border-darkMint flex-1 flex flex-col items-center py-8">
      <div className="text-studyComponentBlack text-xl font-semibold">
        {componentTitle}
      </div>
      <div className="w-[11rem]">
        <img src={studyIcon} className="w-full h-full object-cover" />
      </div>
      {studyIcon === studyIcon2_1 ? (
        <div className="flex-grow flex items-center">
          <Link
            to={{
              pathname: linkAddress,
              state: { class_code: location.state?.class_code || null },
            }}
            className="flex gap-3 justify-center items-center px-10 py-7 border-3 bg-[rgba(141,229,230,0.3)] border-realLightMint rounded-2xl "
          >
            <div className="text-3xl text-lightBlack font-bold">바로 가기</div>
            <FaChevronRight size={25} />
          </Link>
        </div>
      ) : (
        <div>
          <Link
            to={linkAddress}
            className="flex items-center justify-end px-3 mb-2"
          >
            <div className="text-studyComponentBlack font-semibold">더보기</div>
            <FaChevronRight size={15} color="#686868" />
          </Link>
          <div className="flex flex-col gap-3">{children}</div>
        </div>
      )}
    </div>
  );
};

export default CommonComponent;
