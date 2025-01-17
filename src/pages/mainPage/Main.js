import React, { useContext, useEffect, useState } from "react";
import mainImg from "../../images/mainImg.png";
import { FaCheck } from "react-icons/fa";
import { PiHashBold } from "react-icons/pi";
import StudyOpenModal from "./Components/StudyOpenModal";
import StudyComponent from "./Components/StudyComponent";
import { useNavigate, useOutletContext } from "react-router-dom";
import StudyDetailModal from "./Components/StudyDetailModal";
import { Context } from "../../AppProvider";
import {
  useGetMyClassroom,
  useSearchClassroom,
  useSubmitClassroomCode,
} from "../../hooks/useClassroom";
import { useQuery } from "@tanstack/react-query";
import { searchClassroom, getMyClassroom } from "../../api/classroom";
import { IoCloseSharp } from "react-icons/io5";

// Link 태그들 to 속성 값에 맞게 경로 설정 필요

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useOutletContext();
  const [isStudyDetailModalOpen, setIsStudyDetailModalOpen] = useState(null);
  const [classroomCode, setClassroomCode] = useState("");
  const [wannaAllClassroom, setWannaAllClassroom] = useState(true);
  const { token } = useContext(Context);
  const submitClassroomCodeMutation = useSubmitClassroomCode();
  const searchClassroomMutation = useSearchClassroom();
  const getMyClassroomMutation = useGetMyClassroom();
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  const {
    data: allClassrooms = [],
    isLoading: isAllLoading,
    isError: isAllError,
  } = useQuery({
    queryKey: ["allClassrooms"],
    queryFn: () => searchClassroom({ search: "" }),
    enabled: wannaAllClassroom, // wannaAllClassroom이 true일 때만 실행
  });

  const {
    data: myClassrooms = [],
    isLoading: isMyLoading,
    isError: isMyError,
  } = useQuery({
    queryKey: ["myClassrooms"],
    queryFn: () => getMyClassroom({ token }),
    enabled: !wannaAllClassroom && !!token, // wannaAllClassroom이 false일 때만 실행
  });

  const handleSubmitClassroomCode = (e) => {
    e.preventDefault();
    submitClassroomCodeMutation.mutate(
      { token, class_code: classroomCode },
      {
        onSuccess: (data) => {
          data[0]
            ? navigate("/mentee", { state: data[1] })
            : setMessage("가입 승인 대기 중입니다.");
        },
        onError: (error) => {
          error.response.data.detail === "토큰이 타당하지 않습니다."
            ? setMessage("로그인이 필요합니다.")
            : setMessage(error.response.data.detail);
        },
      }
    );
  }; //메인 화면에서 코드 입력하여 스터디방 입장장

  const handleSearchAllClassroom = () => {
    searchClassroomMutation.mutate({ search: "" });
  };

  const handleGetMyClassroom = () => {
    getMyClassroomMutation.mutate({ token });
  };

  // useEffect(() => {
  //   wannaAllClassroom ? handleSearchAllClassroom() : handleGetMyClassroom();
  // }, [wannaAllClassroom]);

  return (
    <div className="mx-20 min-h-[calc(100vh-110px)] flex flex-col">
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
              <input
                className="flex-grow outline-none ml-2 mr-3 text-[1.5rem] font-semibold text-lightBlack italic tracking-wide"
                value={classroomCode}
                onChange={(e) => setClassroomCode(e.target.value)}
              />
              <button
                className="bg-darkMint rounded-full p-[0.4rem]"
                onClick={handleSubmitClassroomCode}
              >
                <FaCheck color="white" size="18" />
              </button>
            </form>
          </div>
        </div>
      </div>
      <hr className="my-2 bg-hrColor h-[2px] border-0" />
      {/* 스터디룸 목록 섹션 */}
      <div className="flex flex-col mx-7 mt-2 flex-grow">
        <div className="flex gap-[1.6rem]">
          <button
            className={`flex text-center text-sm font-semibold border-2 px-[0.8rem] py-[0.5rem] rounded-full ${
              wannaAllClassroom
                ? "border-darkMint text-darkMint"
                : "border-[#CED4DA] text-[#495057]"
            }`}
            onClick={() => setWannaAllClassroom(true)}
          >
            🍀전체 스터디룸
          </button>
          <button
            className={`flex text-center text-sm font-semibold border-2 px-[0.8rem] py-[0.5rem] rounded-full ${
              !wannaAllClassroom
                ? "border-darkMint text-darkMint"
                : "border-[#CED4DA] text-[#495057]"
            }`}
            onClick={() => setWannaAllClassroom(false)}
          >
            👑나의 스터디룸
          </button>
        </div>
        <div className="flex-grow items-center flex gap-[2rem] overflow-x-scroll">
          {wannaAllClassroom ? (
            isAllLoading ? (
              <p className="font-semibold text-darkMint">
                전체 스터디룸을 불러오는 중...
              </p>
            ) : isAllError ? (
              <p className="font-semibold text-darkMint">
                전체 스터디룸 로드 실패
              </p>
            ) : (
              allClassrooms.map((classroom, index) => {
                return (
                  <StudyComponent
                    key={index}
                    detail={{
                      title: classroom.class_name, // API 응답의 'class_name' -> 제목
                      name: classroom.description, // API 응답의 'description' -> 스터디장 이름
                      day: classroom.day, // API 응답의 'day' -> 요일
                      time: `${classroom.start_time} ~ ${classroom.end_time}`, // 시작~종료 시간
                    }}
                    onClick={() =>
                      setIsStudyDetailModalOpen({
                        title: classroom.class_name,
                        name: classroom.description,
                        day: classroom.day,
                        startTime: classroom.start_time,
                        endTime: classroom.end_time,
                        mentor: classroom.created_by,
                        studyNumber: classroom.max_member,
                        joiningMethod: classroom.is_free
                          ? "자유 가입제"
                          : "승인 가입제",
                        classcode: classroom.class_code,
                        token,
                      })
                    }
                  />
                );
              })
            )
          ) : isMyLoading ? (
            <p className="font-semibold text-darkMint">
              나의 스터디룸을 불러오는 중...
            </p>
          ) : isMyError ? (
            <p className="font-semibold text-darkMint">
              나의 스터디룸 로드 실패
            </p>
          ) : (
            myClassrooms.map((classroom, index) => (
              <StudyComponent
                key={index}
                detail={{
                  title: classroom.class_name,
                  name: classroom.description,
                  day: classroom.day,
                  time: `${classroom.start_time} ~ ${classroom.end_time}`,
                }}
                onClick={() =>
                  setIsStudyDetailModalOpen({
                    title: classroom.class_name,
                    name: classroom.description,
                    day: classroom.day,
                    startTime: classroom.start_time,
                    endTime: classroom.end_time,
                    mentor: classroom.created_by,
                    studyNumber: classroom.max_member,
                    joiningMethod: classroom.is_free
                      ? "자유 가입제"
                      : "승인 가입제",
                    classcode: classroom.class_code,
                    token,
                  })
                }
              />
            ))
          )}
        </div>
      </div>

      {isModalOpen && <StudyOpenModal setIsModalOpen={setIsModalOpen} />}
      {isStudyDetailModalOpen && (
        <StudyDetailModal
          isStudyDetailModalOpen={isStudyDetailModalOpen}
          setIsStudyDetailModalOpen={setIsStudyDetailModalOpen}
        />
      )}
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

export default Main;
