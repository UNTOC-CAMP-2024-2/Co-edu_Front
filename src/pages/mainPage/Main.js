import React, { useContext, useEffect, useState } from "react";
import mainImg from "../../images/mainImg.png";
import { FaCheck } from "react-icons/fa";
import { PiHashBold } from "react-icons/pi";
import StudyOpenModal from "./Components/StudyOpenModal";
import StudyComponent from "./Components/StudyComponent";
import { useOutletContext } from "react-router-dom";
import StudyDetailModal from "./Components/StudyDetailModal";
import { Context } from "../../AppProvider";
import {
  useGetMyClassroom,
  useSearchClassroom,
  useSubmitClassroomCode,
} from "../../hooks/useClassroom";
import { useQuery } from "@tanstack/react-query";
import { searchClassroom, getMyClassroom } from "../../api/classroom";

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

  const StudyComponent = ({ detail }) => (
    <div className="flex flex-col items-center px-[10px] w-[200px]">
      {/* 이미지 영역 */}
      <div className="w-[200px] h-[120px] bg-[#D9D9D9] rounded-[10px] mb-[3px]"></div>

      {/* 제목 */}
      <h3 className="text-[13px] text-black mb-[2px]">{detail.title}</h3>

      <div className="flex justify-center items-center text-[12px] text-[#525252[">
        <p className="mx-[1px]">{detail.name}</p>
        <span className="mx-[1px] ">|</span>
        <p>
          {detail.day} {detail.time}
        </p>
      </div>
    </div>
  );

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
    submitClassroomCodeMutation.mutate({ token, class_code: classroomCode });
  }; //메인 화면에서 코드 입력하여 스터디방 입장장

  const handleSearchAllClassroom = () => {
    searchClassroomMutation.mutate({ search: "" });
  };

  const handleGetMyClassroom = () => {
    getMyClassroomMutation.mutate({ token });
  };

  useEffect(() => {
    console.log(token);
  }, [token]);

  useEffect(() => {
    wannaAllClassroom ? handleSearchAllClassroom() : handleGetMyClassroom();
  }, [wannaAllClassroom]);

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
              <p>전체 스터디룸을 불러오는 중...</p>
            ) : isAllError ? (
              <p>전체 스터디룸 로드 실패</p>
            ) : (
              allClassrooms.map((classroom, index) => (
                <StudyComponent
                  key={index}
                  detail={{
                    title: classroom.class_name, // API 응답의 'class_name' -> 제목
                    name: classroom.description, // API 응답의 'description' -> 스터디장 이름
                    day: classroom.day, // API 응답의 'day' -> 요일
                    time: `${classroom.start_time} ~ ${classroom.end_time}`, // 시작~종료 시간
                  }}
                />
              ))
            )
          ) : isMyLoading ? (
            <p>나의 스터디룸을 불러오는 중...</p>
          ) : isMyError ? (
            <p>나의 스터디룸 로드 실패</p>
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
              />
            ))
          )}
        </div>
      </div>

      {isModalOpen && <StudyOpenModal setIsModalOpen={setIsModalOpen} />}
      {isStudyDetailModalOpen && (
        <StudyDetailModal
          setIsStudyDetailModalOpen={setIsStudyDetailModalOpen}
        />
      )}
    </div>
  );
};

export default Main;
