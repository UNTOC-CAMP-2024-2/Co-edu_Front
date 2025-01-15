import React, { useEffect, useState, useContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaEllipsisH } from "react-icons/fa";
import logoImg from "../../images/logoImg.png";
import { IoClose } from "react-icons/io5";
import { useLeaveClassroom } from "../../hooks/useClassroom";
import { Context } from "../../AppProvider";

const PostHeader = () => {
  const { token } = useContext(Context);
  const data = useLocation().state;
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const leaveClassroomMutation = useLeaveClassroom();

  useEffect(() => {
    if (isSideBarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSideBarOpen]);

  const handleNavigation = (path) => {
    setIsSideBarOpen(false); // Sidebar 닫기
    console.log("Navigating with data:", data);
    navigate(path, { state: data });
  };

  const handleLeaveClassroom = () => {
    leaveClassroomMutation.mutate({ token, class_code: data.class_code });
    console.log("class_code:", data.class_code);
  };

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
        <img src={logoImg} width="110" alt="logo" />
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
                <button
                  className="text-[#525252] font-semibold text-[1.2rem]"
                  onClick={() =>
                    handleNavigation(
                      `${pathname === "/mentor" ? "/mentor" : "/mentee"}`
                    )
                  }
                >
                  🏠메인
                </button>
              </div>
              <div>
                <button
                  className="text-[#525252] font-semibold text-[1.2rem]"
                  onClick={() =>
                    handleNavigation(
                      `${
                        pathname === "/mentor"
                          ? "/mentor/assignments"
                          : "/mentee/assignments"
                      }`
                    )
                  }
                >
                  📖과제 목록 확인하기
                </button>
              </div>
              <div>
                {pathname === "/mentee" ? (
                  <button
                    className="text-[#525252] font-semibold text-[1.2rem]"
                    onClick={() => handleNavigation("/mentee/read")}
                  >
                    🔍내가 제출한 과제 확인하기
                  </button>
                ) : (
                  <button
                    className="text-[#525252] font-semibold text-[1.2rem]"
                    onClick={() => handleNavigation("/mentor/make")}
                  >
                    ➕과제 생성하기
                  </button>
                )}
              </div>
              <div>
                {pathname === "/mentor" ? (
                  <button
                    className="text-[#525252] font-semibold text-[1.2rem]"
                    onClick={() => handleNavigation("/mentor/feedback")}
                  >
                    🔖제출된 과제 피드백하기
                  </button>
                ) : (
                  <button
                    className="text-[#525252] font-semibold text-[1.2rem]"
                    onClick={() => handleNavigation("/mentee/feedback")}
                  >
                    🔖피드백 모아보기
                  </button>
                )}
              </div>
              <div>
                {pathname === "/mentor" ? (
                  <button
                    className="text-[#525252] font-semibold text-[1.2rem]"
                    onClick={() => handleNavigation("/mentor/setting")}
                  >
                    ⚙️설정
                  </button>
                ) : (
                  <button
                    className="text-[#525252] font-semibold text-[1.2rem]"
                    onClick={handleLeaveClassroom}
                  >
                    🚪탈퇴하기
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostHeader;
