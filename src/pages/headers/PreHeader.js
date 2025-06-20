import React, { useContext, useState, useEffect } from "react";
import logoImg from "../../images/logoImg.png";
import mainImg from "../../images/mainImg.png";
import { FaCheck } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { PiHashBold } from "react-icons/pi";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Context } from "../../AppProvider";
import { useSearchClassroom } from "../../hooks/useClassroom";
import axios from "axios";
// 스터디 참여 전 헤더
const PreHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const { token, setToken, username, setUsername } = useContext(Context);
  const navigate = useNavigate();

  const searchClassroomMutation = useSearchClassroom();

  const handleSearchClassroom = (e) => {
    e.preventDefault();
    const data = searchClassroomMutation.mutate(
      { search: searchKeyword },
      {
        onSuccess: (data) => {
          navigate("/search", { state: { data } });
        },
      }
    );
  };
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) return;

      try {
        const res = await axios.post("/token/verify", { token });
        if (res.data.user) {
          setUsername(res.data.user);
        }
      } catch {
        setToken(null);
        setUsername(null);
      }
    };

    verifyToken();
  }, [token, setToken, setUsername]);

  return (
    <>
      <div className="mx-20">
        <div className="pt-6 mx-2">
          <div className="flex justify-end">
            <div className="text-[0.8rem] text-[#C4C4C4] font-semibold">
              {token ? (
                <div className="flex gap-4">
                  <div>반갑습니다 {username}님!</div>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setToken(null);
                      setUsername(null);
                      window.location.reload();
                    }}
                  >
                    로그아웃
                  </div>
                </div>
              ) : (
                <span>
                  <Link to="login">로그인</Link>/
                  <Link to="signup">회원가입</Link>
                </span>
              )}
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
                <input
                  className="outline-none w-[25rem] mx-3 bg-transparent"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <button
                  type="submit"
                  onClick={handleSearchClassroom}
                  className="bg-lightMint rounded-full p-[0.4rem]"
                >
                  <IoSearch color="white" size="18" />
                </button>
              </form>
            </div>
            <div className="flex space-x-12 mb-1 font-semibold text-[#686868]">
              <Link
                onClick={(e) => !token && e.preventDefault()}
                className={`${token || "cursor-not-allowed"}`}
              >
                공지사항
              </Link>
              <button
                disabled={!token}
                className={`${token || "cursor-not-allowed"}`}
                onClick={() => setIsModalOpen(true)}
              >
                스터디 개설
              </button>
              <Link
                onClick={(e) => !token && e.preventDefault()}
                className={`${token || "cursor-not-allowed"}`}
              >
                나의 스터디룸
              </Link>
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
