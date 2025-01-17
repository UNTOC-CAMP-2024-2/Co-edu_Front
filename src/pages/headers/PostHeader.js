import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaEllipsisH } from "react-icons/fa";
import logoImg from "../../images/logoImg.png";
import { IoClose } from "react-icons/io5";
import { useAmIbelongtoClassroom } from "../../hooks/useClassroom";
import { Context } from "../../AppProvider";
import { useLeave } from "../../hooks/useMentee";
import untocImg from "../../images/untocImg.png";
import { FaDoorOpen } from "react-icons/fa";

const PostHeader = () => {
  const { token, classCode, className } = useContext(Context);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const pathname = useLocation().pathname.split("/")[1];
  const isStudy = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();
  const useLeaveMutation = useLeave();

  useEffect(() => console.log(className), [className]);

  const handleLeave = () => {
    useLeaveMutation.mutate({ token, class_code: classCode });
  };

  const AmIbelongtoClassroomMutation = useAmIbelongtoClassroom();

  const handleAmIbelongtoClassroom = () => {
    AmIbelongtoClassroomMutation.mutate(
      {
        token,
        class_code: classCode,
      },
      {
        onSuccess: (data) => {
          console.log(data[0]);
          data[1]
            ? navigate("/mentor", { state: data[0] })
            : navigate("/mentee", { state: data[0] });
        },
      }
    );
  };

  useEffect(() => {
    if (isSideBarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSideBarOpen]);

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
        {isStudy === "study" ? (
          <div
            onClick={() => {
              handleAmIbelongtoClassroom();
            }}
            className="font-semibold text-white cursor-pointer"
          >
            <FaDoorOpen color="white" size="40" />
          </div>
        ) : (
          <Link to="/">
            <IoClose color="white" size="40" />
          </Link>
        )}
      </div>
      <Outlet />
      {isSideBarOpen && (
        <div className="z-0">
          <div className="bg-black opacity-40 fixed top-[4rem] left-0 w-full h-full"></div>
          <div className="fixed top-[4rem] left-0 w-[28rem] h-full bg-white py-5 px-7 shadow-lg shadow-[#373737]">
            <div className="h-[13rem] rounded-lg">
              <img
                src={untocImg}
                alt="untocImg"
                className="object-cover h-full w-full rounded-lg"
              />
            </div>
            <div className="text-[#525252] font-semibold text-[1.3rem] px-3 pt-2 pb-5 max-w-[26rem] overflow-auto max-h-[6rem]">
              {className}
            </div>
            <hr className="bg-[#D9D9D9] h-[2px]" />
            <div className="flex flex-col gap-7 px-3 pt-8">
              <div>
                <button
                  onClick={() => {
                    handleAmIbelongtoClassroom();
                    setIsSideBarOpen((prev) => !prev);
                  }}
                  className="text-[#525252] font-semibold text-[1.2rem]"
                >
                  🏠메인
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    navigate(`/${pathname}/assignments`);
                    setIsSideBarOpen((prev) => !prev);
                  }}
                  className="text-[#525252] font-semibold text-[1.2rem]"
                >
                  📖과제 목록 확인하기
                </button>
              </div>
              <div>
                {pathname === "mentee" ? (
                  <button
                    onClick={() => {
                      navigate("/mentee/submitted");
                      setIsSideBarOpen((prev) => !prev);
                    }}
                    className="text-[#525252] font-semibold text-[1.2rem]"
                  >
                    🔍내가 제출한 과제 확인하기
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      navigate("/mentor/make");
                      setIsSideBarOpen((prev) => !prev);
                    }}
                    className="text-[#525252] font-semibold text-[1.2rem]"
                  >
                    ➕과제 생성하기
                  </button>
                )}
              </div>
              <div>
                {pathname === "mentor" ? (
                  <button
                    onClick={() => {
                      navigate("/mentor/feedback");
                      setIsSideBarOpen((prev) => !prev);
                    }}
                    className="text-[#525252] font-semibold text-[1.2rem]"
                  >
                    🔖제출된 과제 피드백하기
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      navigate("/mentee/feedback");
                      setIsSideBarOpen((prev) => !prev);
                    }}
                    className="text-[#525252] font-semibold text-[1.2rem]"
                  >
                    🔖피드백 모아보기
                  </button>
                )}
              </div>
              <div>
                {pathname === "mentor" ? (
                  <button
                    onClick={() => {
                      navigate("/mentor/setting");
                      setIsSideBarOpen((prev) => !prev);
                    }}
                    className="text-[#525252] font-semibold text-[1.2rem]"
                  >
                    ⚙️설정
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleLeave();
                      navigate("/");
                    }}
                    className="text-[#525252] font-semibold text-[1.2rem]"
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
